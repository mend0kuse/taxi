import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/api/config';
import { getServices } from '@/entities/service';

export const useGetServices = () => {
    return useQuery({ queryKey: [QUERY_KEYS.SERVICE], queryFn: getServices });
};
