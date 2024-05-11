import { z } from 'zod';

export const signUpDto = z
    .object({
        email: z.string().email({ message: 'Неправильный формат почты' }),
        phone: z.string(),
        password: z.string().min(8, { message: 'Пароль должен содержать минимум 8 символов' }),
    })
    .required();

export type SignUpDto = z.infer<typeof signUpDto>;
