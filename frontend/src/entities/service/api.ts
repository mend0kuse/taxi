import { $api } from '@/shared/api/api';
import { API_ENDPOINTS } from '@/shared/api/config';
import { TService } from './model';

export const getServices = async () => {
    const response = await $api.get<TService[]>(API_ENDPOINTS.SERVICE);

    return response.data;
};

export const getServiceById = async (id: number) => {
    const response = await $api.get<TService>(API_ENDPOINTS.SERVICE_BY_ID(id));

    return response.data;
};

export const deleteServiceById = async (id: number) => {
    const response = await $api.delete<TService>(API_ENDPOINTS.SERVICE_BY_ID(id));

    return response.data;
};
