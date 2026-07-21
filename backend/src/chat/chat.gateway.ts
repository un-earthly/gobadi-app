import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(ChatGateway.name);

  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  afterInit(server: Server) {
    this.logger.log('WebSocket Gateway Initialized');
  }

  handleConnection(client: Socket) {
    const token = client.handshake.auth?.token || client.handshake.query?.token;

    if (!token || typeof token !== 'string' || !token.startsWith('gobadi_session_token_')) {
      this.logger.warn(`Unauthorized WebSocket connection attempt: ${client.id}. Disconnecting.`);
      client.disconnect(true);
      return;
    }

    this.logger.log(`Authorized client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(@MessageBody() data: { sender: 'user' | 'doctor'; text: string }) {
    this.logger.log(`Message received from socket client: ${JSON.stringify(data)}`);

    // Save message into PostgreSQL
    const savedMsg = await this.chatService.sendMessage(data.sender, data.text);

    // Broadcast to all subscribers in real-time
    this.server.emit('messageReceived', savedMsg);

    return savedMsg;
  }
}
