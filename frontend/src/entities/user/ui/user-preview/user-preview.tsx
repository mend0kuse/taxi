import { Group, Avatar, Text, rem, Anchor } from '@mantine/core';
import { BsChevronRight } from 'react-icons/bs';
import classes from './user-preview.module.css';
import { TUser } from '@/entities/user';
import { ROUTES } from '@/shared/routing';
import { Link } from 'react-router-dom';

export const UserPreview = ({ user }: { user: TUser }) => {
    const avatar = user.profile.avatar ?? undefined;

    return (
        <Anchor component={Link} my={'sm'} p={'sm'} to={ROUTES.PROFILE(user.id)} className={classes.user}>
            <Group>
                <Avatar src={avatar} radius='xl' />

                <div style={{ flex: 1 }}>
                    <Text size='sm' fw={500}>
                        {user.profile.name}
                    </Text>

                    <Text c='dimmed' size='xs'>
                        {user.email}
                    </Text>
                </div>

                <BsChevronRight style={{ width: rem(14), height: rem(14) }} stroke={rem(1.5)} />
            </Group>
        </Anchor>
    );
};
