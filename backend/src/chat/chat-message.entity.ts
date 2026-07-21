import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('chat_messages')
export class ChatMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sender: 'user' | 'doctor';

  @Column('text')
  text: string;

  @Column()
  time: string;

  @Column({ nullable: true })
  avatar?: string;
}
