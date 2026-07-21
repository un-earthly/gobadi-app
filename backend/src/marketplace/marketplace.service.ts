import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarketItem } from './market-item.entity';
import { Order } from './order.entity';
export { MarketItem } from './market-item.entity';
export { Order } from './order.entity';

@Injectable()
export class MarketplaceService {
  constructor(
    @InjectRepository(MarketItem)
    private readonly marketItemRepository: Repository<MarketItem>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getCatalog(): Promise<MarketItem[]> {
    return this.marketItemRepository.find({ order: { id: 'ASC' } });
  }

  async getCatalogItemById(id: string): Promise<MarketItem> {
    const item = await this.marketItemRepository.findOneBy({ id: parseInt(id, 10) });
    if (!item) {
      throw new BadRequestException('Item not found');
    }
    return item;
  }

  async checkoutOrder(data: {
    items: Array<{ itemId: string; quantity: number }>;
    deliveryAddress: string;
  }): Promise<Order> {
    if (!data.items || data.items.length === 0) {
      throw new BadRequestException('No items in order');
    }

    let totalPrice = 0;
    for (const itemRef of data.items) {
      const dbItem = await this.getCatalogItemById(itemRef.itemId);
      totalPrice += dbItem.price * itemRef.quantity;
    }

    const orderId = `GBD-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = this.orderRepository.create({
      id: orderId,
      items: data.items,
      totalPrice,
      deliveryAddress: data.deliveryAddress,
      status: 'Placed',
    });

    return this.orderRepository.save(newOrder);
  }

  async getOrders(): Promise<Order[]> {
    return this.orderRepository.find({ order: { id: 'DESC' } });
  }
}
