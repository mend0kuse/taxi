import { TService } from 'src/entities/service';
import { TUser } from '../user';
import { TChat } from '../chat/chat-model';
import { TReview } from '../review/review-types';

export const ORDER_STATUS = {
    SEARCHING: 'Поиск водителя',
    WAITING: 'Водитель найден - ожидание',
    IN_PROGRESS: 'В процессе',
    COMPLETED: 'Завершен',
    CANCELED: 'Отменен',
} as const;

export type TOrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export type TOrder = {
    id: number;
    createdAt: Date;
    updatedAt: Date;

    status: TOrderStatus;
    address: string;

    clientId: number;
    client: TUser;

    driverId: number;
    driver: TUser;

    serviceId: number;
    service: TService;

    chat: TChat;
    review: TReview;
};
