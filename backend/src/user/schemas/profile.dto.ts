import { z } from 'zod';

export const profileDto = z
    .object({
        phone: z.string().nullable(),
        avatar: z.string().nullable(),
    })
    .partial();

export type ProfileDto = z.infer<typeof profileDto>;
