import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

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
