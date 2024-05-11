import { useLoadingAndErrorHandler } from '@/shared/ui';
import { ServiceCard } from 'src/entities/service';
import { Group, SimpleGrid, Text } from '@mantine/core';
import { useGetServices } from '@/widgets/services/lib';

export const Services = () => {
    const { data, isLoading, isFetching, isPending, error } = useGetServices();

    const item = useLoadingAndErrorHandler({ isLoading: isLoading || isFetching || isPending, error });

    if (item) {
        return item;
    }

    return (
        <Group wrap={'nowrap'}>
            {data?.length === 0 && <Text>Ничего не найдено</Text>}
            <SimpleGrid cols={3}>
                {data?.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                ))}
            </SimpleGrid>
        </Group>
    );
};
