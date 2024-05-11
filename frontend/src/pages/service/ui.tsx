import { CenteredLayout, Layout } from '@/layout';
import { observer } from 'mobx-react-lite';
import { useCreateOrder, useDeleteServiceById, useGetServiceById } from '@/pages/service/lib';
import { useLoadingAndErrorHandler } from '@/shared/ui';
import { Box, Button, Card, Group, LoadingOverlay, Stack, Text, TextInput, Image } from '@mantine/core';
import { useForm } from '@mantine/form';
import { user } from '@/entities/user';

export const ServicePage = observer(() => {
    const { data: service, isPending, error } = useGetServiceById();

    const { deleteService, isPending: isPendingDelete } = useDeleteServiceById();
    const { createOrder, isPending: isPendingOrder } = useCreateOrder();

    const step = useLoadingAndErrorHandler({ isLoading: isPending, error });

    const form = useForm({
        initialValues: {
            from: '',
            to: '',
        },
        validate: {
            from: (value) => (value.length > 0 ? null : 'Обязательно поле'),
            to: (value) => (value.length > 0 ? null : 'Обязательно поле'),
        },
    });

    if (step) {
        return step;
    }

    if (!service) {
        return (
            <CenteredLayout>
                <Text c={'red'}>Услуга не найдена</Text>
            </CenteredLayout>
        );
    }

    const { createdAt, description, id, image, price, title } = service;

    const onDeleteService = () => {
        deleteService(id);
    };

    const onOrder = () => {
        createOrder({ serviceId: id, address: `${form.values.from} - ${form.values.to}` });
    };

    return (
        <Layout>
            <LoadingOverlay
                visible={isPendingDelete || isPendingOrder}
                zIndex={1000}
                overlayProps={{ radius: 'sm', blur: 2 }}
            />

            {user.isAdmin && (
                <Group>
                    <Button onClick={onDeleteService} color='red'>
                        Удалить услугу
                    </Button>
                </Group>
            )}

            <Group gap={15}>
                <Image h={300} src={image} />

                <Card withBorder radius='md'>
                    <Stack>
                        <Text fw={500}>{title}</Text>
                        <Text fz='xs' c='dimmed'>
                            {description}
                        </Text>

                        <Text fz='xl' fw={700} style={{ lineHeight: 1 }}>
                            {price} Р
                        </Text>
                    </Stack>
                </Card>
            </Group>

            {user.isClient && (
                <Box mt={30} maw={400}>
                    <form onSubmit={form.onSubmit(onOrder)}>
                        <TextInput withAsterisk label='Откуда' placeholder='Адрес' {...form.getInputProps('from')} />
                        <TextInput withAsterisk label='Куда' placeholder='Адрес' {...form.getInputProps('to')} />

                        <Group mt='md'>
                            <Button color='green' type='submit'>
                                Заказать
                            </Button>
                        </Group>
                    </form>
                </Box>
            )}
        </Layout>
    );
});
