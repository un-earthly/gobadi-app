import { Injectable, BadRequestException } from '@nestjs/common';

export interface MarketItem {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

export interface Order {
  id: string;
  items: Array<{ itemId: string; quantity: number }>;
  totalPrice: number;
  deliveryAddress: string;
  status: string;
}

@Injectable()
export class MarketplaceService {
  private catalog: MarketItem[] = [
    { id: '1', name: 'Cattle Bhushi Mix Feed', price: 1350, category: 'Feeds', image: 'feed.png' },
    { id: '2', name: 'Premium Milk Pail', price: 850, category: 'Milk', image: 'milk.png' },
    { id: '3', name: 'Albenian Buffalo', price: 320000, category: 'Animals', image: 'albino_buffalo.png' },
    { id: '4', name: 'Pure Mutton Cuts', price: 1200, category: 'Meat', image: 'meat.png' },
  ];

  private orders: Order[] = [];

  async getCatalog(): Promise<MarketItem[]> {
    return this.catalog;
  }

  async getCatalogItemById(id: string): Promise<MarketItem> {
    const item = this.catalog.find(i => i.id === id);
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

    const newOrder: Order = {
      id: `GBD-${Math.floor(100000 + Math.random() * 900000)}`,
      items: data.items,
      totalPrice,
      deliveryAddress: data.deliveryAddress,
      status: 'Placed'
    };

    this.orders.push(newOrder);
    return newOrder;
  }

  async getOrders(): Promise<Order[]> {
    return this.orders;
  }
}
