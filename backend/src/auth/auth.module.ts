import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { JWT_CONSTANTS } from './constans';

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            secret: JWT_CONSTANTS.secret,
            signOptions: { expiresIn: '500h' },
        }),
    ],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
