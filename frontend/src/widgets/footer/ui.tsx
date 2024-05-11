import { Container, Group, ActionIcon, rem, Text } from '@mantine/core';
import classes from './ui.module.css';
import { AiFillInstagram, AiFillFacebook, AiFillTwitterSquare } from 'react-icons/ai';

export const Footer = () => (
    <div className={classes.footer}>
        <Container className={classes.inner}>
            <Text>Такси</Text>
            <Group gap={0} className={classes.links} justify='flex-end' wrap='nowrap'>
                <ActionIcon size='lg' color='gray' variant='subtle'>
                    <AiFillTwitterSquare style={{ width: rem(18), height: rem(18) }} />
                </ActionIcon>
                <ActionIcon size='lg' color='gray' variant='subtle'>
                    <AiFillFacebook style={{ width: rem(18), height: rem(18) }} />
                </ActionIcon>
                <ActionIcon size='lg' color='gray' variant='subtle'>
                    <AiFillInstagram style={{ width: rem(18), height: rem(18) }} />
                </ActionIcon>
            </Group>
        </Container>
    </div>
);
