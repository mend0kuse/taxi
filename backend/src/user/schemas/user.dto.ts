import { profileDto } from './profile.dto';
import { z } from 'zod';
import { Request } from 'express';

export const user = z.object({
    id: z.number(),
    email: z.string(),
    role: z.string(),
    password: z.string(),
    profile: profileDto,
});

export type User = z.infer<typeof user>;

export const USER_ROLE = {
    ADMIN: 'ADMIN',
    DRIVER: 'DRIVER',
    USER: 'USER',
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export interface RequestWithUser extends Request {
    user?: User;
}
