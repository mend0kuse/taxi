import { TUser, ProfileInput } from '../../model';
import { useForm } from '@mantine/form';
import { Avatar, Button, FileInput, Group, TextInput } from '@mantine/core';

type Props = {
    user: TUser;
    onSubmit: (profile: ProfileInput) => void;
};

export const ProfileForm = ({ user: { profile, phone }, onSubmit }: Props) => {
    const form = useForm<ProfileInput>({
        initialValues: {
            name: profile.name,
            phone: phone,
            avatar: null,
        },
    });

    const newAvatarUrl = form.values.avatar ? URL.createObjectURL(form.values.avatar) : null;

    const onReset = () => {
        form.setValues({ phone, name: profile.name, avatar: null });
    };

    return (
        <form onReset={onReset} onSubmit={form.onSubmit(onSubmit)}>
            <Avatar size={'xl'} src={newAvatarUrl ?? profile.avatar} alt="it's me" />
            <FileInput {...form.getInputProps('avatar')} label='Загрузите аватар' placeholder='...' clearable />
            <TextInput label='Имя' {...form.getInputProps('name')} />
            <TextInput label='Телефон' {...form.getInputProps('phone')} />
            <Group justify='flex-end' mt='md'>
                <Button variant={'outline'} type='reset'>
                    Сбросить
                </Button>
                <Button type='submit'>Отправить</Button>
            </Group>
        </form>
    );
};
