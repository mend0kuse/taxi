import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { $api } from '@/shared/api/api';
import { TUser, user } from '@/entities/user';
import { ROUTES } from '@/shared/routing';
import { UserInput } from '@/entities/user';
import { jwtDecode } from 'jwt-decode';
import { LOCAL_STORAGE_TOKEN } from '@/entities/user';
import { API_ENDPOINTS, QUERY_KEYS } from '@/shared/api/config';

export const useLogin = () => {
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (user: UserInput) => {
            return $api.post<{ access_token: string }>(API_ENDPOINTS.LOGIN, user);
        },

        mutationKey: [QUERY_KEYS.USER],

        onSuccess: (data) => {
            const token = data.data.access_token;
            const userDecoded: TUser = jwtDecode(token);

            localStorage.setItem(LOCAL_STORAGE_TOKEN, `Bearer ${token}`);
            user.setData(userDecoded);

            navigate(ROUTES.PROFILE(userDecoded.id));
        },
    });

    return { login: mutation.mutate, ...mutation };
};
