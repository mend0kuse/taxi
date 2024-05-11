import { CenteredLayout } from '@/layout';
import { Loader, Text } from '@mantine/core';
import { AxiosError } from 'axios';

type Args = {
    isLoading: boolean;
    error: AxiosError<unknown, any> | null;
};

export const useLoadingAndErrorHandler = ({ isLoading, error }: Args) => {
    if (isLoading) {
        return (
            <CenteredLayout>
                <Loader />
            </CenteredLayout>
        );
    }

    if (error) {
        return (
            <CenteredLayout>
                <Text c={'red'} size='lg'>
                    {error.message}
                </Text>
            </CenteredLayout>
        );
    }

    return null;
};
