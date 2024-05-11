import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { excludeFields } from 'src/shared/lib/excludeFields';
import { UserService } from 'src/user/user.service';
import { SALT_OR_ROUNDS } from './constans';
import { SignInDto } from './schemas/sign-in.dto';
import { SignUpDto } from './schemas/sign-up.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) {}

    async signIn(dto: SignInDto) {
        const user = await this.usersService.getOne({ email: dto.email });

        if (!user) {
            throw new UnauthorizedException('Такого пользователя не существует');
        }

        const isMatch = await bcrypt.compare(dto.password, user?.password);

        if (!isMatch) {
            throw new UnauthorizedException('Пароль введен неверно');
        }

        return {
            access_token: await this.jwtService.signAsync(excludeFields(user, ['password'])),
        };
    }

    async signUp(user: SignUpDto) {
        const hashed = await bcrypt.hash(user.password, SALT_OR_ROUNDS);

        return this.usersService.createUser({
            email: user.email,
            phone: user.phone,
            role: 'USER',
            password: hashed,
        });
    }
}
