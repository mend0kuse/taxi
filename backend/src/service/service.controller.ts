import {
    Body,
    Controller,
    Delete,
    ForbiddenException,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Request,
    UploadedFile,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { NotFoundException } from '@nestjs/common/exceptions';
import { AuthGuard } from '../auth/auth.guard';
import { RequestWithUser } from '../user/schemas/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { makeImagePath } from '../shared/lib/makeImagePath';
import { isAdmin } from '../shared/lib/isAdmin';
import { TServiceDtoCreate } from './models/service';

@Controller('service')
export class ServiceController {
    constructor(readonly serviceService: ServiceService) {}
    @Get()
    getAll() {
        return this.serviceService.getAll();
    }

    @Post()
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('image', { dest: 'uploads/' }))
    create(
        @Body() dto: TServiceDtoCreate,
        @Request() req: RequestWithUser,
        @UploadedFile() image: Express.Multer.File
    ) {
        return this.serviceService.createOne({ ...dto, image: makeImagePath(image) }, req.user?.id);
    }

    @Get(':id')
    async getOneById(@Param('id', ParseIntPipe) id: number) {
        const founded = await this.serviceService.getOne(id);

        if (!founded) {
            throw new NotFoundException();
        }

        return founded;
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async delete(@Param('id', ParseIntPipe) id: number, @Request() req: RequestWithUser) {
        if (!isAdmin(req.user)) {
            throw new ForbiddenException();
        }

        return this.serviceService.deleteOne(id);
    }
}
