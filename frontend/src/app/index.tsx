import React from 'react';
import { createRoot } from 'react-dom/client';
import { createTheme, Loader, MantineProvider } from '@mantine/core';

import { RingLoader } from '@/shared/ui/ringLoader';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App } from './app';

import '@mantine/carousel/styles.css';
import '@mantine/core/styles.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import './styles/index.css';

const domNode = document.getElementById('root');

if (!domNode) {
    throw new Error('Root container not found');
}

const root = createRoot(domNode);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

const theme = createTheme({
    primaryColor: 'blue',

    components: {
        Loader: Loader.extend({
            defaultProps: {
                loaders: { ...Loader.defaultLoaders, ring: RingLoader },
                type: 'ring',
            },
        }),
    },
});

root.render(
    <React.StrictMode>
        <MantineProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </MantineProvider>
    </React.StrictMode>
);
