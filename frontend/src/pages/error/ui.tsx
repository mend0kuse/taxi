import { Container, Title, Text, Button, Group, Stack } from '@mantine/core';
import { Illustration } from './Illustration';
import classes from './ui.module.css';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/routing';

export const NothingFound = () => (
    <Container className={classes.root}>
        <div className={classes.inner}>
            <Illustration className={classes.image} />
            <Stack align='center' className={classes.content}>
                <Title className={classes.title}>Здесь ничего нет</Title>
                <Text c='dimmed' size='lg' ta='center' className={classes.description}>
                    Страница, которую вы пытаетесь открыть, не существует. Возможно, вы неправильно ввели адрес или
                    страница была перемещена на другой URL. Если вы считаете, что это ошибка, обратитесь в службу
                    поддержки.
                </Text>
                <Group justify='center'>
                    <Button component={Link} to={ROUTES.MAIN} size='md'>
                        Вернуться на главную
                    </Button>
                </Group>
            </Stack>
        </div>
    </Container>
);
