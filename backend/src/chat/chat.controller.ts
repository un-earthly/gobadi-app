import { Controller, Get, Post, Body } from '@nestjs/common';
import { ChatService, ChatMessage } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('messages')
  async getMessages(): Promise<ChatMessage[]> {
    return this.chatService.getMessages();
  }

  @Post('message')
  async sendMessage(
    @Body() body: { sender: 'user' | 'doctor'; text: string }
  ): Promise<ChatMessage> {
    return this.chatService.sendMessage(body.sender, body.text);
  }
}
