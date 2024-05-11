import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';

export const renderWrapper = (component: ReactNode) => {
    const queryClient = new QueryClient();

    render(
        <MantineProvider>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>{component}</BrowserRouter>
            </QueryClientProvider>
        </MantineProvider>
    );
};
