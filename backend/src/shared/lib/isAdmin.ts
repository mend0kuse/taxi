import { type User } from 'src/user/schemas/user.dto';

export const isAdmin = (user: User | undefined) => {
    return user.role === 'ADMIN';
};
