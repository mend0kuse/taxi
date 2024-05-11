import { $api } from '@/shared/api/api';
import { useMutation } from '@tanstack/react-query';
import { TReview, TReviewCreate } from './review-types';
import { API_ENDPOINTS, QUERY_KEYS } from '@/shared/api/config';

export const useCreateReview = ({ onSuccess }: { onSuccess?: (data: TReview) => void }) => {
    return useMutation({
        mutationFn: ({ orderId, rating, text }: TReviewCreate & { orderId: number }) => {
            return $api.post<TReview>(API_ENDPOINTS.REVIEW_BY_ORDER_ID(orderId), { rating, text });
        },
        onSuccess: ({ data }) => {
            onSuccess?.(data);
        },
        mutationKey: [QUERY_KEYS.ORDER],
    });
};
