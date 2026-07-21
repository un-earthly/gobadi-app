import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { MarketplaceService, MarketItem, Order } from './marketplace.service';

@Controller('marketplace')
export class MarketplaceController {
  constructor(private readonly marketplaceService: MarketplaceService) {}

  @Get()
  async getCatalog(): Promise<MarketItem[]> {
    return this.marketplaceService.getCatalog();
  }

  @Get(':id')
  async getCatalogItemById(@Param('id') id: string): Promise<MarketItem> {
    return this.marketplaceService.getCatalogItemById(id);
  }

  @Post('checkout')
  async checkoutOrder(
    @Body() body: { items: Array<{ itemId: string; quantity: number }>; deliveryAddress: string }
  ): Promise<Order> {
    return this.marketplaceService.checkoutOrder(body);
  }

  @Get('orders/all')
  async getOrders(): Promise<Order[]> {
    return this.marketplaceService.getOrders();
  }
}
