import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { excludeFields } from 'src/shared/lib/excludeFields';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfileDto } from './schemas/profile.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    private include = {
        profile: true,
        clientOrders: {
            include: {
                client: true,
                driver: true,
                service: true,
                review: true,
            },
        },
        driverOrders: {
            include: {
                client: {
                    include: {
                        profile: true,
                    },
                },
                driver: true,
                service: true,
                review: true,
            },
        },
    };

    async getAll(where: Prisma.UserWhereInput) {
        return this.prisma.user.findMany({
            where,
            include: this.include,
        });
    }

    async getOne({ id, email }: { id?: number; email?: string }) {
        return this.prisma.user.findFirst({
            where: { OR: [{ id: { equals: id } }, { email: { equals: email } }] },
            include: this.include,
        });
    }

    async createUser(data: Prisma.UserCreateInput) {
        const found = await this.getOne({ email: data.email });

        if (found) {
            throw new BadRequestException(
                'There is a unique constraint violation, a new user cannot be created with this email'
            );
        }

        const created = await this.prisma.user.create({
            data: {
                ...data,
                profile: { create: {} },
            },
        });

        return excludeFields(created, ['password']);
    }

    async updateProfile(params: { email?: string; profile: ProfileDto }) {
        const { email, profile } = params;

        const updated = await this.prisma.user.update({
            where: { email },
            data: {
                profile: {
                    update: profile,
                },
            },
            include: this.include,
        });

        return excludeFields(updated, ['password']);
    }
}
