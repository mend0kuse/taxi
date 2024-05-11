import { useMutation } from '@tanstack/react-query';
import { $api } from '@/shared/api/api';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/routing';
import { TUser, user, UserInput } from '@/entities/user/model';
import { API_ENDPOINTS, QUERY_KEYS } from '@/shared/api/config';

export const useRegistration = () => {
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (user: UserInput) => {
            return $api.post<TUser>(API_ENDPOINTS.REGISTRATION, user);
        },
        mutationKey: [QUERY_KEYS.USER],
        onSuccess: (data) => {
            const userData = data.data;
            user.setData(userData);
            navigate(ROUTES.PROFILE(userData.id));
        },
    });

    return { register: mutation.mutate, ...mutation };
};
