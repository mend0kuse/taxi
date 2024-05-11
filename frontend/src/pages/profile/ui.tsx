import { useEditOrderStatus, useEditProfile, useGetOrders, useGetUser } from '@/pages/profile/lib';
import { Button, LoadingOverlay, Modal, Stack, Text, Title } from '@mantine/core';
import { CenteredLayout, Layout } from '@/layout';
import { useLoadingAndErrorHandler } from '@/shared/ui';
import { ProfileCard, ProfileForm } from '@/entities/user';
import { useDisclosure } from '@mantine/hooks';
import { ProfileInput, user as userStore } from '@/entities/user/model';
import { transformAxiosError } from '@/shared/lib/axios/transformAxiosError';
import { convertToFormData } from '@/shared/lib/form/convertToFormData';
import { observer } from 'mobx-react-lite';
import { OrderList } from '@/entities/order/ui/order-list';
import { OrderStatus } from '@/entities/order';
import { ReviewsList } from './reviews-list';

export const Profile = observer(() => {
    const [openedEdit, { open, close }] = useDisclosure(false);

    const { user, error, isFetching: isFetchingUser } = useGetUser();

    const isHomeProfile = !!userStore.id && user?.id === userStore.id;
    const isDriverProfile = user?.role === 'DRIVER';

    const { data: orders, isFetching: isFetchingOrders } = useGetOrders(isHomeProfile);
    const { editProfile, isPending, error: errorEdit } = useEditProfile({ onSuccess: close });

    const { editOrder, isPending: isPendingOrder } = useEditOrderStatus();

    const item = useLoadingAndErrorHandler({ isLoading: isFetchingUser || isFetchingOrders, error });

    const onSubmit = (profile: ProfileInput) => {
        editProfile(convertToFormData(profile, 'avatar'));
    };

    if (item) {
        return item;
    }

    if (!user) {
        return (
            <CenteredLayout>
                <Text c={'red'} size='lg'>
                    Пользователь не найден
                </Text>
            </CenteredLayout>
        );
    }

    if (!user) {
        return null;
    }

    const onEditOrder = (status: OrderStatus, orderId: number) => {
        editOrder({ orderId, status });
    };

    return (
        <Layout>
            <Stack gap={50}>
                <Stack gap={10} align={'start'}>
                    <ProfileCard user={user} />

                    {isHomeProfile && (
                        <Button onClick={open} aria-label='Edit'>
                            Редактировать
                        </Button>
                    )}
                </Stack>

                {orders && orders.length > 0 && isHomeProfile && (
                    <OrderList isLoading={isPendingOrder} onChangeStatus={onEditOrder} orders={orders} />
                )}

                {user.driverOrders.length > 0 && isDriverProfile && (
                    <Stack>
                        <Title>Отзывы</Title>
                        <ReviewsList orders={user.driverOrders ?? []} />
                    </Stack>
                )}

                <Modal pos={'relative'} opened={openedEdit} onClose={close} title='Редактировать профиль'>
                    <LoadingOverlay visible={isPending} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
                    <ProfileForm onSubmit={onSubmit} user={user} />
                    {errorEdit && <Text c={'red'}>{transformAxiosError(errorEdit)}</Text>}
                </Modal>
            </Stack>
        </Layout>
    );
});
