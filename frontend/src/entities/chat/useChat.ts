import { useState, useRef, useEffect } from 'react';
import { Socket, io } from 'socket.io-client';
import { user } from '../user';
import { TChat, TMessage } from './chat-model';

export const useChat = ({ chat }: { chat: TChat }) => {
    const [roomId, setRoomId] = useState('');
    const [messages, setMessages] = useState(chat.messages ?? []);

    const socketRef = useRef<Socket | null>(null);

    const sendMessage = (message: string) => {
        socketRef.current?.emit('message', { message, orderId: roomId, userId: user.id });
    };

    useEffect(() => {
        socketRef.current = io('http://localhost:8000');
        const socket = socketRef.current;

        socket.connect();

        socket.on('connect', () => {
            socket.emit('join', { orderId: chat.orderId });
        });

        socket.on('message', (message: TMessage) => {
            setMessages((prev) => [...prev, message]);
        });

        socket.on('room', setRoomId);

        return () => {
            socket.disconnect();
            socket.off('connect');
            socket.off('room');
        };
    }, []);

    return { messages, sendMessage };
};
