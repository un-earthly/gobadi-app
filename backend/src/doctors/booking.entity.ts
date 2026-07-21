import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('bookings')
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
