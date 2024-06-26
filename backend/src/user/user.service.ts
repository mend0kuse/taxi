import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, Profile } from '@prisma/client';
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
            orderBy: {
                createdAt: 'desc' as any,
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
            orderBy: {
                createdAt: 'desc' as any,
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

    async updateProfile(params: { email?: string; phone?: string; profile: Prisma.ProfileUpdateInput }) {
        const { email, profile, phone } = params;

        const updated = await this.prisma.user.update({
            where: { email },
            data: {
                phone,
                profile: {
                    update: profile,
                },
            },
            include: this.include,
        });

        return excludeFields(updated, ['password']);
    }
}
