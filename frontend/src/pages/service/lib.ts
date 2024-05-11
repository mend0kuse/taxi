import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/api/config';
import { ROUTES } from '@/shared/routing';
import { createOrder } from '@/entities/order/api';
import { deleteServiceById, getServiceById } from '@/entities/service';

export const useGetServiceById = () => {
    const { id } = useParams<{ id: string }>();

    return useQuery({ queryKey: [id, QUERY_KEYS.SERVICE], queryFn: () => getServiceById(Number(id)) });
};

export const useDeleteServiceById = () => {
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (id: number) => {
            return deleteServiceById(id);
        },
        mutationKey: [QUERY_KEYS.SERVICE],
        onSuccess: () => {
            navigate(ROUTES.MAIN);
        },
    });

    return { deleteService: mutation.mutate, ...mutation };
};

export const useCreateOrder = () => {
    const router = useNavigate();

    const mutation = useMutation({
        mutationFn: ({ address, serviceId }: { serviceId: number; address: string }) => {
            return createOrder(serviceId, address);
        },
        mutationKey: [QUERY_KEYS.ORDER],
        onSuccess: (order) => {
            router(ROUTES.PROFILE(order.clientId));
        },
    });

    return { createOrder: mutation.mutate, ...mutation };
};
