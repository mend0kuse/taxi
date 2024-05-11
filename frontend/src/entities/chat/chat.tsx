import {
    ChatContainer,
    ConversationHeader,
    MessageList,
    MessageInput,
    Message,
    Avatar,
} from '@chatscope/chat-ui-kit-react';
import { user } from '../user';
import { observer } from 'mobx-react-lite';
import { useChat } from './useChat';
import { TOrder } from '../order';
import { Box } from '@mantine/core';

export const Chat = observer(({ order }: { order: TOrder }) => {
    const users = [order.driver, order.client];

    const ownIndex = users.findIndex((chatUser) => chatUser.id === user.id);
    const oppositeUser = users[ownIndex === 0 ? 1 : 0];

    const { messages, sendMessage } = useChat({ chat: order.chat });

    const placeholder =
        'https://avatars.mds.yandex.net/i?id=49d0cefc784cb41ef7ac670b52e7a066326d3b7d-12819212-images-thumbs&n=13';

    return (
        <Box mih={500}>
            <ChatContainer>
                <ConversationHeader>
                    <Avatar size={'md'} src={oppositeUser.profile.avatar ?? placeholder} />
                    <ConversationHeader.Content
                        info={oppositeUser.phone}
                        userName={oppositeUser.profile.name ?? oppositeUser.email}
                    />
                </ConversationHeader>
                <MessageList style={{ minHeight: 450 }}>
                    {messages.length > 0 &&
                        messages.map((message) => {
                            return (
                                <Message
                                    key={message.id}
                                    model={{
                                        direction: message.user.id === user.id ? 'outgoing' : 'incoming',
                                        position: 'single',
                                        message: message.message,
                                        sentTime: message.createdAt,
                                        sender: message.user.profile.name ?? message.user.email,
                                    }}
                                >
                                    <Avatar src={message.user.profile.avatar ?? placeholder} />
                                </Message>
                            );
                        })}
                </MessageList>
                <MessageInput onSend={sendMessage} attachButton={false} placeholder='...' />
            </ChatContainer>
        </Box>
    );
});
