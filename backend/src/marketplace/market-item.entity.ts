import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('market_items')
export class MarketItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('float')
  price: number;

  @Index()
  @Column()
  category: string;

  @Column()
  image: string;
}
