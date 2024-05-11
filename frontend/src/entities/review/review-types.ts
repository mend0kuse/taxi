import { TOrder } from '../order';

export type TReview = {
    id: number;

    text: string;
    rating: number;

    order: TOrder;
    orderId: number;
};

export type TReviewCreate = {
    text: string;
    rating: number;
};
