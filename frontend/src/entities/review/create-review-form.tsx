import { Box, Paper, Rating, Stack, Textarea, Text, LoadingOverlay, Button } from '@mantine/core';
import { TReview, TReviewCreate } from './review-types';
import { useForm } from '@mantine/form';
import { useCreateReview } from './useCreateReview';
import { observer } from 'mobx-react-lite';

export const CreateReviewForm = observer(
    ({ onCreate, orderId }: { onCreate?: (data: TReview) => void; orderId: number }) => {
        const { mutate, isPending } = useCreateReview({ onSuccess: onCreate });

        const form = useForm<TReviewCreate>({
            initialValues: {
                rating: 4,
                text: '',
            },
        });

        return (
            <form onSubmit={form.onSubmit((values) => mutate({ ...values, orderId }))}>
                <Paper pos={'relative'}>
                    <LoadingOverlay visible={isPending} zIndex={1} overlayProps={{ radius: 'sm', blur: 2 }} />
                    <Stack align='start'>
                        <Box>
                            <Text>Оценка</Text>
                            <Rating fractions={2} {...form.getInputProps('rating')} />
                        </Box>
                        <Textarea miw={300} label='Ваш отзыв' placeholder='...' {...form.getInputProps('text')} />
                        <Button type='submit'>Отправить отзыв</Button>
                    </Stack>
                </Paper>
            </form>
        );
    }
);
