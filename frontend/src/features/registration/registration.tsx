import { TextInput, Button, Group, Box, Text, PasswordInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { isValidEmail, isValidPassword } from '@/shared/lib/validator/regexp';
import { useRegistration } from '@/features/registration/lib';
import { transformAxiosError } from '@/shared/lib/axios/transformAxiosError';

export const Registration = () => {
    const { register, error, isPending } = useRegistration();

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
            phone: '',
        },

        validate: {
            email: (value) => (isValidEmail(value) ? null : 'Неправильная почта'),
            password: (value) => (isValidPassword(value) ? null : 'Неправильный пароль. Минимум 8 символов'),
            phone: (value) => (value.length > 10 ? null : 'Неправильный формат номера телефона'),
        },
    });

    const onSubmit = (user: typeof form.values) => {
        register(user);
    };

    return (
        <Box h='100%' mt={200} maw={340} mx='auto'>
            <form onSubmit={form.onSubmit(onSubmit)}>
                <Title mb={20} ta={'center'}>
                    Регистрация
                </Title>

                {error && <Text c={'red'}>{transformAxiosError(error)}</Text>}

                <TextInput required label='Email' placeholder='your@email.com' {...form.getInputProps('email')} />
                <TextInput required label='Номер телефона' placeholder='+7' {...form.getInputProps('phone')} />
                <PasswordInput required label='Пароль' {...form.getInputProps('password')} />

                <Group justify='center' mt='md'>
                    <Button loading={isPending} type='submit'>
                        Зарегистрироваться
                    </Button>
                </Group>
            </form>
        </Box>
    );
};
