import { Stack, Title, Table, Button, Text, ActionIcon, Modal, Rating } from '@mantine/core';
import { TOrder, OrderStatus } from '@/entities/order';
import { observer } from 'mobx-react-lite';
import { user } from '@/entities/user';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/routing';
import { ORDER_STATUS, TOrderStatus } from '../../model';
import { AiFillMessage } from 'react-icons/ai';
import { Chat } from '@/entities/chat/chat';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { CreateReviewForm } from '@/entities/review/create-review-form';

type Props = {
    orders: TOrder[];
    onChangeStatus: (status: OrderStatus, orderId: number) => void;
    isLoading: boolean;
};

export const OrderList = observer(({ orders, onChangeStatus }: Props) => {
    const onChange = (id: number, status: TOrderStatus) => {
        onChangeStatus(status, id);
    };

    const [activeOrder, setActiveOrder] = useState<null | TOrder>(null);

    const [isChatOpened, { close: closeChat, open: openChat }] = useDisclosure(false);
    const [isReviewOpened, { close: closeReview, open: openReview }] = useDisclosure(false);

    const onOpenChat = (order: TOrder) => {
        setActiveOrder(order);
        openChat();
    };

    const onCloseChat = () => {
        closeChat();
        setTimeout(() => {
            setActiveOrder(null);
        }, 100);
    };

    const onOpenReview = (order: TOrder) => {
        setActiveOrder(order);
        openReview();
    };

    const onCloseReview = () => {
        closeReview();
        setTimeout(() => {
            setActiveOrder(null);
        }, 100);
    };

    return (
        <Stack mt={'md'}>
            <Title order={2}>Заявки</Title>
            <Table.ScrollContainer minWidth={800}>
                <Table verticalSpacing='xs'>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Id заявки</Table.Th>
                            <Table.Th>Услуга</Table.Th>
                            <Table.Th>Статус</Table.Th>

                            <Table.Th>Клиент</Table.Th>
                            <Table.Th>Водитель</Table.Th>
                            <Table.Th>Адрес</Table.Th>
                            <Table.Th>Обновлено</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {orders?.map((order) => {
                            const { address, client, driver, service, status, id, updatedAt } = order;

                            const isExecutor = user.id === driver?.id;
                            const isWithReview = !!order.review;

                            return (
                                <Table.Tr key={id}>
                                    <Table.Td>{id}</Table.Td>
                                    <Table.Td>{service.title}</Table.Td>
                                    <Table.Td>{status}</Table.Td>
                                    <Table.Td>
                                        <Button
                                            p={0}
                                            variant='transparent'
                                            component={Link}
                                            to={ROUTES.PROFILE(client.id)}
                                        >
                                            {client.email}
                                        </Button>
                                    </Table.Td>
                                    <Table.Td>
                                        {driver ? (
                                            <Button
                                                p={0}
                                                variant='transparent'
                                                component={Link}
                                                to={ROUTES.PROFILE(driver.id)}
                                            >
                                                {driver.email}
                                            </Button>
                                        ) : (
                                            <>
                                                {user.isDriver ? (
                                                    <Button onClick={() => onChange(id, ORDER_STATUS.WAITING)}>
                                                        Взять заказ
                                                    </Button>
                                                ) : (
                                                    <Text>-</Text>
                                                )}
                                            </>
                                        )}
                                    </Table.Td>
                                    <Table.Td>{address}</Table.Td>
                                    <Table.Td>{new Date(updatedAt).toLocaleString()}</Table.Td>

                                    {isExecutor && (
                                        <Table.Td>
                                            {status === ORDER_STATUS.WAITING && (
                                                <Button
                                                    onClick={() => {
                                                        onChange(id, ORDER_STATUS.IN_PROGRESS);
                                                    }}
                                                >
                                                    Начать поездку
                                                </Button>
                                            )}

                                            {status === ORDER_STATUS.IN_PROGRESS && (
                                                <Button
                                                    onClick={() => {
                                                        onChange(id, ORDER_STATUS.COMPLETED);
                                                    }}
                                                >
                                                    Завершить поездку
                                                </Button>
                                            )}
                                        </Table.Td>
                                    )}

                                    {status !== ORDER_STATUS.SEARCHING && (
                                        <Table.Td>
                                            <ActionIcon onClick={() => onOpenChat(order)}>
                                                <AiFillMessage />
                                            </ActionIcon>
                                        </Table.Td>
                                    )}

                                    {user.isClient &&
                                        status === (ORDER_STATUS.COMPLETED || status === ORDER_STATUS.CANCELED) && (
                                            <>
                                                {!isWithReview ? (
                                                    <Table.Td>
                                                        <Button onClick={() => onOpenReview(order)}>
                                                            Оставить отзыв
                                                        </Button>
                                                    </Table.Td>
                                                ) : (
                                                    <Table.Td>
                                                        <Rating readOnly value={order.review.rating} />
                                                    </Table.Td>
                                                )}
                                            </>
                                        )}
                                </Table.Tr>
                            );
                        })}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>

            <Modal onClose={onCloseChat} opened={isChatOpened && !!activeOrder}>
                {activeOrder && <Chat order={activeOrder} />}
            </Modal>

            <Modal onClose={onCloseReview} opened={isReviewOpened && !!activeOrder}>
                {activeOrder && <CreateReviewForm orderId={activeOrder.id} onCreate={onCloseReview} />}
            </Modal>
        </Stack>
    );
});
