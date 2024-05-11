import { z } from 'zod';

export const signInDto = z
    .object({
        email: z.string().email({ message: 'Неправильный формат почты' }),
        password: z.string().min(8, { message: 'Пароль должен содержать минимум 8 символов' }),
    })
    .required();

export type SignInDto = z.infer<typeof signInDto>;
