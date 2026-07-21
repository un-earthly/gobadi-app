import { Injectable, BadRequestException } from '@nestjs/common';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'doctor';
  text: string;
  time: string;
  avatar?: string;
}

@Injectable()
export class ChatService {
  private messages: ChatMessage[] = [
    {
      id: '1',
      sender: 'doctor',
      text: 'Hello, how can I help you and your animal today?',
      time: '09:54',
      avatar: 'doctor_avatar.png',
    },
    {
      id: '2',
      sender: 'user',
      text: 'Thank you for reaching out!\nWe are looking for a surgery.',
      time: '09:55',
      avatar: 'user_profile.png',
    },
  ];

  async getMessages(): Promise<ChatMessage[]> {
    return this.messages;
  }

  async sendMessage(sender: 'user' | 'doctor', text: string): Promise<ChatMessage> {
    if (!text || !text.trim()) {
      throw new BadRequestException('Message text cannot be empty');
    }
    const newMessage: ChatMessage = {
      id: String(this.messages.length + 1),
      sender,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: sender === 'user' ? 'user_profile.png' : 'doctor_avatar.png',
    };
    this.messages.push(newMessage);
    return newMessage;
  }
}
