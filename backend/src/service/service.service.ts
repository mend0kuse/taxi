import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common/exceptions';
import { TServiceDtoCreate } from './models/service';

@Injectable()
export class ServiceService {
    constructor(private prismaService: PrismaService) {}

    async getAll() {
        return this.prismaService.service.findMany({ include: this.serviceInclude });
    }

    async getOne(id: number) {
        return this.prismaService.service.findFirst({ where: { id }, include: this.serviceInclude });
    }

    async update(params: { id: number }) {
        const { id } = params;

        try {
            return await this.prismaService.service.update({
                where: { id: id },
                include: this.serviceInclude,

                data: {},
            });
        } catch (error) {
            throw new NotFoundException();
        }
    }

    async deleteOne(id: number) {
        const deleteOrders = this.prismaService.order.deleteMany({ where: { serviceId: id } });
        const deleteService = this.prismaService.service.delete({ where: { id }, include: this.serviceInclude });

        try {
            return await this.prismaService.$transaction([deleteOrders, deleteService]);
        } catch (error) {
            throw new Error(error);
        }
    }

    async createOne(service: TServiceDtoCreate, userId: number) {
        try {
            return await this.prismaService.service.create({
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                data: {
                    ...service,
                    price: Number(service.price),
                    user: {
                        connect: {
                            id: userId,
                        },
                    },
                },
                include: this.serviceInclude,
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    private selectUser = {
        id: true,
        role: true,
        email: true,
        profile: true,
    };

    private serviceInclude = {
        user: {
            select: this.selectUser,
        },
    };
}
