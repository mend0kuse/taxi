import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ORDER_STATUS, OrderStatus } from './statuses';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrderService {
    constructor(private prismaService: PrismaService) {}

    private selectUser = {
        id: true,
        role: true,
        email: true,
        profile: true,
        phone: true,
    };

    private orderInclude = {
        client: {
            select: this.selectUser,
        },
        driver: {
            select: this.selectUser,
        },
        service: true,
        chat: {
            include: {
                messages: {
                    include: {
                        user: {
                            select: this.selectUser,
                        },
                    },
                },
            },
        },
        review: {
            include: {
                order: {
                    include: {
                        client: {
                            select: this.selectUser,
                        },
                        driver: {
                            select: this.selectUser,
                        },
                    },
                },
            },
        },
    };

    create({ clientId, serviceId, address }: { clientId: number; serviceId: number; address: string }) {
        return this.prismaService.order.create({
            data: {
                address,
                status: ORDER_STATUS.SEARCHING,
                client: {
                    connect: { id: clientId },
                },
                service: {
                    connect: { id: serviceId },
                },
                chat: {
                    create: {},
                },
            },
            include: this.orderInclude,
        });
    }

    update(orderId: number, status: OrderStatus, userId: number) {
        return this.prismaService.order.update({
            where: { id: orderId },
            data: {
                status,
                ...(status === ORDER_STATUS.WAITING && {
                    driver: {
                        connect: {
                            id: userId,
                        },
                    },
                }),
            },
            include: this.orderInclude,
        });
    }

    getAll(where?: Prisma.OrderWhereInput) {
        return this.prismaService.order.findMany({
            where,
            include: this.orderInclude,
        });
    }

    createReview(review: Prisma.ReviewCreateInput) {
        return this.prismaService.review.create({
            data: review,
        });
    }

    getReviewsByDriverId(driverId: number) {
        return this.prismaService.review.findMany({
            where: {
                order: {
                    driverId,
                },
            },
        });
    }
}
