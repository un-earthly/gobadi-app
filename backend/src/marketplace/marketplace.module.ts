import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import { MarketplaceService } from './marketplace.service';
import { MarketplaceController } from './marketplace.controller';
import { MarketItem } from './market-item.entity';
import { Order } from './order.entity';
import { OrderProcessor } from './order.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([MarketItem, Order]),
    BullModule.registerQueue({
      name: 'order-queue',
    }),
  ],
  controllers: [MarketplaceController],
  providers: [MarketplaceService, OrderProcessor],
  exports: [MarketplaceService],
})
export class MarketplaceModule {}
