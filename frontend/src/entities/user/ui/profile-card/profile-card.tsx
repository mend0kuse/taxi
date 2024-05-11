import { Avatar, Group, Stack, Text } from '@mantine/core';
import { TUser } from '@/entities/user';
import { AiFillMail, AiFillPhone } from 'react-icons/ai';
import { USER_ROLE_RUSSIAN_MAP } from '../../model';

export const ProfileCard = ({ user: { profile, email, role, phone } }: { user: TUser }) => {
    const avatar = profile.avatar ?? undefined;

    return (
        <Group>
            <Avatar src={avatar} size={94} radius='md' />
            <Stack gap={2}>
                <Text fz='xs' tt='uppercase' fw={700} c='dimmed'>
                    {USER_ROLE_RUSSIAN_MAP[role]}
                </Text>

                {profile.name && (
                    <Text fz='lg' fw={500}>
                        {profile.name}
                    </Text>
                )}

                <Group wrap='nowrap' gap={10}>
                    <AiFillMail size='1rem' />
                    <Text fz='xs' c='dimmed'>
                        {email}
                    </Text>
                </Group>

                <Group wrap='nowrap' gap={10}>
                    <AiFillPhone size='1rem' />
                    <Text fz='xs' c='dimmed'>
                        {phone}
                    </Text>
                </Group>
            </Stack>
        </Group>
    );
};
