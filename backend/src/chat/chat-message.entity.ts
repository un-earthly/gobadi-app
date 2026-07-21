import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('chat_messages')
export class ChatMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sender: 'user' | 'doctor';

  @Column('text')
  text: string;

  @Index()
  @Column()
  time: string;

  @Column({ nullable: true })
  avatar?: string;
}
