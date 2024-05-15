import { user } from '@/entities/user';

import { Group, Box, Button, Image } from '@mantine/core';
import classes from './ui.module.css';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/routing';
import { observer } from 'mobx-react-lite';

export const Header = observer(() => {
    const onLogout = () => {
        user.logout();
    };

    return (
        <Box>
            <div className={classes.header}>
                <Group justify={'space-between'} h='100%'>
                    <Image w={150} src='./logo.png' />

                    <Group h={'100%'} gap={20}>
                        <Group h='100%' gap={0}>
                            <Link to={ROUTES.MAIN} className={classes.link}>
                                Главная
                            </Link>
                            <Link to={ROUTES.CATALOG} className={classes.link}>
                                Услуги
                            </Link>
                            {user.isAdmin && (
                                <Link to={ROUTES.CREATE_SERVICE} className={classes.link}>
                                    Создать услугу
                                </Link>
                            )}
                        </Group>

                        {user.data ? (
                            <>
                                <Button to={ROUTES.PROFILE(user.data.id)} component={Link}>
                                    Профиль
                                </Button>
                                <Button variant='outline' onClick={onLogout}>
                                    Выйти
                                </Button>
                            </>
                        ) : (
                            <Button to={ROUTES.LOGIN} component={Link}>
                                Войти
                            </Button>
                        )}
                    </Group>
                </Group>
            </div>
        </Box>
    );
});
