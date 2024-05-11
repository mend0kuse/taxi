import { z } from 'zod';
import { User } from '../../user/schemas/user.dto';
import { stringToNumber } from '../../validation/stringToNumber';

export const serviceDto = z.object({
    title: z.string(),
    image: z.string(),
    description: z.string(),
    price: stringToNumber,
    driver: z.string(),
});

export const serviceDtoCreate = serviceDto.required();

export type TService = z.infer<typeof serviceDto>;
export type TServiceWithUser = TService & { user: User };
export type TServiceDtoCreate = z.infer<typeof serviceDtoCreate>;
