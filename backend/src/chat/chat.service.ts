import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
    constructor(private prismaService: PrismaService) {}

    private chatInclude = {
        users: {
            include: {
                user: { include: { profile: true } },
            },
        },
        messages: true,
        order: true,
    };

    getChatByOrderId(orderId: number) {
        return this.prismaService.chat.findFirst({
            where: {
                order: {
                    id: orderId,
                },
            },
            include: this.chatInclude,
        });
    }

    createMessage({ userId, message, orderId }: { orderId: string; userId: number; message: string }) {
        return this.prismaService.chatMessage.create({
            data: {
                user: {
                    connect: {
                        id: userId,
                    },
                },
                chat: {
                    connect: {
                        orderId: Number(orderId),
                    },
                },
                message,
            },
            include: {
                user: {
                    include: {
                        profile: true,
                    },
                },
            },
        });
    }

    createChat(orderId: number) {
        return this.prismaService.chat.create({
            data: {
                order: {
                    connect: {
                        id: orderId,
                    },
                },
            },
            include: this.chatInclude,
        });
    }
}
