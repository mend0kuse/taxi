import { NotFoundException } from '@nestjs/common/exceptions';
import {
    Body,
    Controller,
    Patch,
    Req,
    UseGuards,
    Get,
    Param,
    ParseIntPipe,
    UseInterceptors,
    UploadedFile,
    ParseFilePipeBuilder,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { excludeFields } from 'src/shared/lib/excludeFields';
import { ProfileDto } from './schemas/profile.dto';
import { RequestWithUser } from './schemas/user.dto';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { makeImagePath } from '../shared/lib/makeImagePath';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Patch('profile')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('avatar', { dest: 'uploads/' }))
    updateProfile(
        @Req() request: RequestWithUser,
        @Body() dto: ProfileDto & { phone?: string },
        @UploadedFile(
            new ParseFilePipeBuilder().build({
                fileIsRequired: false,
            })
        )
        file?: Express.Multer.File
    ) {
        return this.userService.updateProfile({
            email: request.user?.email,
            phone: dto.phone,
            profile: { name: dto.name, avatar: file ? makeImagePath(file) : undefined },
        });
    }

    @Get('/drivers')
    async getDrivers() {
        const founded = await this.userService.getAll({ role: 'DRIVER' });

        if (!founded) {
            throw new NotFoundException();
        }

        return founded;
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        const found = await this.userService.getOne({ id });

        if (!found) {
            throw new NotFoundException();
        }

        return excludeFields(found, ['password']);
    }
}
