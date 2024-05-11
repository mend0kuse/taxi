import { z } from 'zod';
import { ORDER_STATUS, OrderStatus } from './statuses';

const statuses: [OrderStatus, ...OrderStatus[]] = [ORDER_STATUS[0], ...Object.values(ORDER_STATUS).slice(1)];

export const updateOrderDto = z.object({
    status: z.enum(statuses),
});

export type TOrderUpdate = z.infer<typeof updateOrderDto>;

export const createOrderDto = z.object({
    address: z.string(),
});

export type TOrderCreate = z.infer<typeof createOrderDto>;