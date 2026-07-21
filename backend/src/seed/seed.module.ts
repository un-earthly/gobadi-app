import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { Animal } from '../animals/animal.entity';
import { Doctor } from '../doctors/doctor.entity';
import { MarketItem } from '../marketplace/market-item.entity';
import { ChatMessage } from '../chat/chat-message.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Animal, Doctor, MarketItem, ChatMessage]),
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
