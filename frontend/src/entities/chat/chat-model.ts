import { TOrder } from '../order';
import { TUser } from '../user';

export type TChat = {
    id: number;
    order: TOrder;
    orderId: number;
    messages: TMessage[];
};

export type TMessage = {
    id: number;
    message: string;
    createdAt: string;

    chatId: number;

    user: TUser;
    userId: number;
};
