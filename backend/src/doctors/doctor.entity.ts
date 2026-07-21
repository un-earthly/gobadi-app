import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Index()
  @Column()
  specialty: string;

  @Column()
  experience: string;

  @Column('float', { default: 4.8 })
  rating: number;

  @Column()
  avatar: string;

  @Column('text')
  bio: string;
}
