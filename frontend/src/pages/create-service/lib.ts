import { useMutation, useQuery } from '@tanstack/react-query';
import { $api } from '@/shared/api/api';
import { API_ENDPOINTS, QUERY_KEYS } from '@/shared/api/config';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/routing';
import { TService } from '@/entities/service';
import { TUser } from '@/entities/user';

export const useCreateService = () => {
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (apartment: FormData) => {
            return $api.post<TService>(API_ENDPOINTS.SERVICE, apartment);
        },
        mutationKey: [QUERY_KEYS.SERVICE],
        onSuccess: (data) => {
            navigate(ROUTES.SERVICE(data.data.id));
        },
    });

    return { createService: mutation.mutate, ...mutation };
};

export const useGetDrivers = () => {
    return useQuery({
        queryKey: [],
        queryFn: () => {
            return $api.get<TUser[]>(API_ENDPOINTS.DRIVERS);
        },
    });
};
