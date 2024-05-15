import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/router';
import { useSavedLogin } from '@/entities/user/useSavedLogin';
import { Loader } from '@mantine/core';

export const App = () => {
    const { isLoading } = useSavedLogin();

    if (isLoading) return <Loader />;

    return <RouterProvider router={router} />;
};
