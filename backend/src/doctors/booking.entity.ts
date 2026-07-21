import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('bookings')
@Index(['doctorId', 'slotDate', 'slotTime'])
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  doctorId: number;

  @Column()
  slotDate: string;

  @Column()
  slotTime: string;

  @Column({ default: 'confirmed' })
  status: string;
}
