import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryColumn()
  id: string;

  @Column('float')
  totalPrice: number;

  @Column()
  deliveryAddress: string;

  @Column({ default: 'Placed' })
  status: string;

  @Column({ nullable: true })
  transactionId?: string;

  @Column({ default: 'Pending' })
  paymentStatus: string;

  @Column('jsonb', { nullable: true })
  items: Array<{ itemId: string; quantity: number }>;
}
