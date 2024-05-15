import { EnumToUnion } from '@/shared/lib/typescript/EnumToUnion';
import { makeAutoObservable } from 'mobx';
import { Nullable } from '@/shared/lib/typescript/Nullable';
import { TService } from '@/entities/service';
import { TOrder } from '../order';
import { LOCAL_STORAGE_TOKEN } from './config';

export type TUser = {
    id: number;
    email: string;
    phone: string;
    role: TUserRole;
    services: TService[];
    clientOrders: TOrder[];
    driverOrders: TOrder[];
    profile: TProfile;
};

export type TProfile = {
    name: string;
    avatar: string;
};

export type UserInput = { password: string; email: string };
export type ProfileInput = { phone?: string; name?: string; avatar?: File | null };

export const USER_ROLE = {
    USER: 'USER',
    ADMIN: 'ADMIN',
    DRIVER: 'DRIVER',
} as const;

export type TUserRole = EnumToUnion<typeof USER_ROLE>;

export const USER_ROLE_RUSSIAN_MAP: Record<TUserRole, string> = {
    USER: 'Пользователь',
    ADMIN: 'Администратор',
    DRIVER: 'Водитель',
};

export class User {
    data: Nullable<TUser> = null;

    constructor() {
        makeAutoObservable(this);
    }

    setData(data: TUser) {
        this.data = data;
    }

    logout() {
        this.data = null;
        localStorage.removeItem(LOCAL_STORAGE_TOKEN);
    }

    get isAdmin() {
        return this.data?.role === USER_ROLE.ADMIN;
    }

    get isDriver() {
        return this.data?.role === USER_ROLE.DRIVER;
    }

    get isClient() {
        return this.data?.role === USER_ROLE.USER;
    }

    get nickname() {
        return this.data?.profile.name ?? this.data?.email;
    }

    get avatar() {
        return this.data?.profile.avatar;
    }

    get role() {
        return this.data?.role;
    }

    get email() {
        return this.data?.email;
    }

    get phone() {
        return this.data?.phone;
    }

    get name() {
        return this.data?.profile.name;
    }

    get id() {
        return this.data?.id;
    }
}

export const user = new User();
