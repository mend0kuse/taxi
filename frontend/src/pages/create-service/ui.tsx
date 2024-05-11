import { Layout } from '@/layout';
import { useForm } from '@mantine/form';
import { Button, Group, LoadingOverlay, NumberInput, Stack, Textarea, TextInput, Text, FileInput } from '@mantine/core';
import { DEFAULT_FORM_VALUES } from './config';
import { useCreateService } from './lib';
import { transformAxiosError } from '@/shared/lib/axios/transformAxiosError';
import { convertToFormData } from '@/shared/lib/form/convertToFormData';
import { TServiceCreate } from '@/entities/service';

export const CreateService = () => {
    const form = useForm<TServiceCreate>({
        initialValues: DEFAULT_FORM_VALUES,
    });

    const { createService, isPending, error } = useCreateService();
    const onSubmit = (service: TServiceCreate) => {
        createService(convertToFormData(service, 'image'));
    };

    return (
        <Layout>
            <form onSubmit={form.onSubmit(onSubmit)}>
                <Stack pos={'relative'}>
                    <LoadingOverlay visible={isPending} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />

                    <Stack gap={20}>
                        <TextInput {...form.getInputProps('title')} withAsterisk label='Название' />
                        <Textarea {...form.getInputProps('description')} withAsterisk label='Описание' />
                        <NumberInput {...form.getInputProps('price')} withAsterisk label='Цена' />
                        <FileInput
                            label='Обложка'
                            clearable
                            value={form.values.image}
                            onChange={(image) => form.setValues({ image })}
                        />
                    </Stack>

                    <Group gap={10}>
                        <Button type='submit' radius='xl'>
                            Создать
                        </Button>

                        {error && <Text c={'red'}>{transformAxiosError(error)}</Text>}
                    </Group>
                </Stack>
            </form>
        </Layout>
    );
};
