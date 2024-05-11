import { Image, Card, Text, Button, Stack } from '@mantine/core';
import classes from './service-card.module.css';
import { TService } from '@/entities/service';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/routing';

type Props = {
    service: TService;
};

export const ServiceCard = ({ service: { image, id, title, description, price } }: Props) => {
    return (
        <Card p={0} withBorder radius='md' className={classes.card}>
            <Card.Section className={classes.imageSection}>
                <Image src={image} />
            </Card.Section>

            <Stack p={'xs'} mt='md'>
                <Text fw={500}>{title}</Text>
                <Text fz='xs' c='dimmed'>
                    {description}
                </Text>
            </Stack>

            <Card.Section className={classes.section}>
                <Stack mx={'md'} p={'md'}>
                    <Text fz='xl' fw={700} style={{ lineHeight: 1 }}>
                        {price} Р
                    </Text>

                    <Button
                        component={Link}
                        to={ROUTES.SERVICE(id)}
                        mb={'xs'}
                        p={'xs'}
                        size={'xl'}
                        radius='xl'
                        style={{ flex: 1 }}
                    >
                        Заказать
                    </Button>
                </Stack>
            </Card.Section>
        </Card>
    );
};
