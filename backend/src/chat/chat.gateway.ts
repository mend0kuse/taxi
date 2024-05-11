import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class ChatGateway {
    @WebSocketServer()
    server: Server;

    constructor(private chatService: ChatService) {}

    @SubscribeMessage('join')
    async join(
        @ConnectedSocket() client,
        @MessageBody()
        { orderId }: { orderId: number }
    ) {
        const room = orderId.toString();

        client.join(room);
        this.server.to(room).emit('room', room);
    }

    @SubscribeMessage('message')
    async findAll(@MessageBody() { orderId, message, userId }: { orderId: string; message: string; userId: number }) {
        const createdSMS = await this.chatService.createMessage({ orderId, message, userId });

        this.server.to(orderId).emit('message', createdSMS);
    }
}
