import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('market_items')
export class MarketItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('float')
  price: number;

  @Column()
  category: string;

  @Column()
  image: string;
}
