import { Layout } from '@/layout';
import { Box, Button, Image, Select, Stack, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useMemo } from 'react';
import { useGetServices } from '@/widgets/services/lib';
import { observer } from 'mobx-react-lite';
import { user } from '@/entities/user';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/routing';
import { useCreateOrder } from '@/pages/service/lib';

export const Main = observer(() => {
    const form = useForm<{ from: string; to: string; service: null | string }>({
        initialValues: {
            from: '',
            to: '',
            service: null,
        },
        validate: {
            from: (value) => (value.length > 0 ? null : 'Обязательно поле'),
            to: (value) => (value.length > 0 ? null : 'Обязательно поле'),
            service: (value) => (value && value.length > 0 ? null : 'Обязательно поле'),
        },
    });

    const { data } = useGetServices();
    const { createOrder } = useCreateOrder();

    const mappedServices = useMemo(() => {
        if (!data) {
            return [];
        }

        return data.map((service) => service.title);
    }, [data]);

    const onOrder = () => {
        if (!data) {
            return;
        }

        const selectedId = data.find((service) => service.title === form.values.service)?.id;

        if (!selectedId) {
            return;
        }

        createOrder({
            serviceId: selectedId,
            address: `${form.values.from} - ${form.values.to}`,
        });
    };

    return (
        <Layout px={0}>
            <Image radius={0} src={'./slider.png'} />

            <Title mt={'xl'} ta={'center'}>
                Воспользуйся нашими услугами
            </Title>

            <Box mx={'auto'} w={500} m='md'>
                <form onSubmit={form.onSubmit(onOrder)}>
                    <Stack gap={10}>
                        <TextInput label='Откуда' placeholder='Адрес' {...form.getInputProps('from')} />
                        <TextInput label='Куда' placeholder='Адрес' {...form.getInputProps('to')} />
                        <Select
                            onChange={(service) => form.setValues({ service })}
                            placeholder={'Выбери услугу'}
                            value={form.values.service}
                            label={'Услуга'}
                            data={mappedServices}
                        />
                        <Stack mt='md'>
                            {!user.data && (
                                <Button component={Link} variant='transparent' to={ROUTES.LOGIN}>
                                    Пройти авторизацию
                                </Button>
                            )}
                            <Button disabled={!user.data} color='green' type='submit'>
                                Заказать
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </Box>
        </Layout>
    );
});
