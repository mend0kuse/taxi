import { $api } from '@/shared/api/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TUser } from '@/entities/user';
import { useParams } from 'react-router-dom';
import { API_ENDPOINTS, QUERY_KEYS } from '@/shared/api/config';
import { user } from '@/entities/user/model';
import { getUserOrders, updateOrderStatus } from '@/entities/order/api';
import { OrderStatus } from '@/entities/order';
import { isNumber } from 'lodash';

export const useGetUser = () => {
    const { id } = useParams<{ id: string }>();
    const idToNumber = Number(id);

    const response = useQuery({
        queryKey: [`user_${idToNumber}`],
        queryFn: () => $api.get<TUser>(API_ENDPOINTS.USER(idToNumber)),
        enabled: !!id && isNumber(idToNumber),
    });

    return { ...response, user: response.data?.data };
};

export const useGetOrders = (isHomeProfile: boolean) => {
    return useQuery({
        queryKey: [QUERY_KEYS.ORDER],
        queryFn: getUserOrders,
        enabled: isHomeProfile,
    });
};

export const useEditProfile = ({ onSuccess }: { onSuccess: () => void }) => {
    const queryClient = useQueryClient();

    const editProfile = useMutation({
        mutationFn: (profile: FormData) => {
            return $api.patch<TUser>(API_ENDPOINTS.EDIT_PROFILE, profile);
        },

        onSuccess: async (response) => {
            const updatedUser = response.data;
            user.setData(updatedUser);
            await queryClient.invalidateQueries({ queryKey: [`user_${updatedUser.id}`] });

            onSuccess();
        },
    });

    return { editProfile: editProfile.mutate, ...editProfile };
};

export const useEditOrderStatus = () => {
    const queryClient = useQueryClient();

    const editOrder = useMutation({
        mutationFn: ({ orderId, status }: { orderId: number; status: OrderStatus }) => {
            return updateOrderStatus(orderId, status);
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORDER] });
        },
    });

    return { editOrder: editOrder.mutate, ...editOrder };
};
