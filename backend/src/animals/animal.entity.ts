import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('animals')
export class Animal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  breed: string;

  @Column()
  weight: string;

  @Column()
  age: string;

  @Column()
  color: string;

  @Column({ nullable: true })
  image?: string;
}
