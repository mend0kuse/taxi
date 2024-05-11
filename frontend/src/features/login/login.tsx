import { Anchor, Box, Button, Group, PasswordInput, TextInput, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/routing';
import { useLogin } from '@/features/login/lib';
import { Text } from '@mantine/core';
import { transformAxiosError } from '@/shared/lib/axios/transformAxiosError';
import { useForm } from '@mantine/form';

export const Login = () => {
    const { login, isPending, error } = useLogin();

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = (user: typeof form.values) => {
        login(user);
    };

    return (
        <Box h='100%' mt={200} maw={340} mx='auto'>
            <form onSubmit={form.onSubmit(onSubmit)}>
                <Title mb={20} ta={'center'}>
                    Вход
                </Title>

                {error && <Text c={'red'}>{transformAxiosError(error)}</Text>}

                <TextInput {...form.getInputProps('email')} label='Email' placeholder='your@email.com' />
                <PasswordInput {...form.getInputProps('password')} label='Пароль' />

                <Group justify='center' mt='md'>
                    <Anchor component={Link} to={ROUTES.REGISTRATION}>
                        Нет аккаунта?
                    </Anchor>

                    <Button loading={isPending} type='submit'>
                        Войти
                    </Button>
                </Group>
            </form>
        </Box>
    );
};
