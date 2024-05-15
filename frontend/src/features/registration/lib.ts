import { useMutation } from '@tanstack/react-query';
import { $api } from '@/shared/api/api';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/routing';
import { TUser, user, UserInput } from '@/entities/user/model';
import { API_ENDPOINTS, QUERY_KEYS } from '@/shared/api/config';
import { jwtDecode } from 'jwt-decode';
import { LOCAL_STORAGE_TOKEN } from '@/entities/user';

export const useRegistration = () => {
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: async (user: UserInput) => {
            await $api.post<TUser>(API_ENDPOINTS.REGISTRATION, user);
            return $api.post<{ access_token: string }>(API_ENDPOINTS.LOGIN, user);
        },
        onSuccess: (data) => {
            const token = data.data.access_token;
            const userDecoded: TUser = jwtDecode(token);

            localStorage.setItem(LOCAL_STORAGE_TOKEN, `Bearer ${token}`);
            user.setData(userDecoded);

            navigate(ROUTES.PROFILE(userDecoded.id));
        },
    });

    return { register: mutation.mutate, ...mutation };
};
