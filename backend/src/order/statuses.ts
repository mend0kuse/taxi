export const ORDER_STATUS = {
    SEARCHING: 'Поиск водителя',
    WAITING: 'Водитель найден - ожидание',
    IN_PROGRESS: 'В процессе',
    COMPLETED: 'Завершен',
    CANCELED: 'Отменен',
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];
