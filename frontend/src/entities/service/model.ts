import { TUser } from '@/entities/user';

export type TServiceCreate = {
    title: string;
    description: string;
    image: File | null;
    price: number;
};

export type TService = Omit<TServiceCreate, 'image'> & {
    id: number;
    createdAt: Date;
    user: TUser;
    image: string;
};
