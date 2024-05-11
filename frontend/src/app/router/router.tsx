import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '@/shared/routing';
import { Profile } from '@/pages/profile';
import { LoginPage } from '@/pages/login';
import { RegistrationPage } from '@/pages/registration';
import { Main } from '@/pages/main';
import { NothingFound } from '@/pages/error';
import { Catalog } from '@/pages/catalog';
import { ServicePage } from '@/pages/service';
import { CreateService } from '@/pages/create-service';

export const router = createBrowserRouter([
    {
        path: '/profile/:id',
        element: <Profile />,
    },
    {
        path: ROUTES.MAIN,
        element: <Main />,
        errorElement: <NothingFound />,
    },
    {
        path: ROUTES.CATALOG,
        element: <Catalog />,
    },
    {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
    },
    {
        path: ROUTES.REGISTRATION,
        element: <RegistrationPage />,
    },
    {
        path: ROUTES.CREATE_SERVICE,
        element: <CreateService />,
    },
    {
        path: '/service/:id',
        element: <ServicePage />,
    },
]);
