export const API_ENDPOINTS = {
    REGISTRATION: '/auth/signup',
    LOGIN: '/auth/signin',

    USER: (id: number) => `/user/${id}`,
    DRIVERS: `/user/drivers`,
    EDIT_PROFILE: `/user/profile`,

    SERVICE: `/service`,
    SERVICE_BY_ID: (id: number) => `/service/${id}`,

    ORDER_BY_SERVICE_ID: (id: number) => `/order/${id}`,
    ORDER_BY_ID: (id: number) => `/order/${id}`,
    ORDER: `/order`,

    REVIEW_BY_ORDER_ID: (id: number) => `/order/review/${id}`,
};

export const QUERY_KEYS = {
    USER: 'user',
    SERVICE: 'service',
    ORDER: 'order',
};
