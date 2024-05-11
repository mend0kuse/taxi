import { TOrder } from '@/entities/order';
import { Avatar, Card, Group, Rating, ScrollArea, Stack, Text } from '@mantine/core';

export const ReviewsList = ({ orders }: { orders: TOrder[] }) => {
    return (
        <ScrollArea h={250}>
            <Group>
                {orders.map((order) => {
                    if (!order.review) {
                        return null;
                    }

                    const { rating, text } = order.review;

                    return (
                        <Card miw={300} shadow='xs' withBorder key={order.id}>
                            <Stack gap={5}>
                                <Group>
                                    <Avatar src={order.client.profile.avatar} />
                                    <Text>{order.client.profile.name ?? order.client.email}</Text>
                                </Group>
                                <Text>{new Date(order.createdAt).toLocaleDateString()}</Text>
                                <Rating readOnly value={rating} />
                                <Text>{text}</Text>
                            </Stack>
                        </Card>
                    );
                })}
            </Group>
        </ScrollArea>
    );
};
