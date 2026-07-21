import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessage } from './chat-message.entity';
export { ChatMessage } from './chat-message.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatMessage)
    private readonly chatMessageRepository: Repository<ChatMessage>,
  ) {}

  async getMessages(): Promise<ChatMessage[]> {
    return this.chatMessageRepository.find({ order: { id: 'ASC' } });
  }

  async sendMessage(sender: 'user' | 'doctor', text: string): Promise<ChatMessage> {
    if (!text || !text.trim()) {
      throw new BadRequestException('Message text cannot be empty');
    }
    const newMessage = this.chatMessageRepository.create({
      sender,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: sender === 'user' ? 'user_profile.png' : 'doctor_avatar.png',
    });
    return this.chatMessageRepository.save(newMessage);
  }
}
