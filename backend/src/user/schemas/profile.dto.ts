import { z } from 'zod';

export const profileDto = z
    .object({
        avatar: z.string().nullable(),
        name: z.string().nullable(),
    })
    .partial();

export type ProfileDto = z.infer<typeof profileDto>;
