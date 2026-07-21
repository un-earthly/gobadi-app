import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { AuthModule } from './auth/auth.module';
import { AnimalsModule } from './animals/animals.module';
import { DoctorsModule } from './doctors/doctors.module';
import { MarketplaceModule } from './marketplace/marketplace.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    RedisModule,
    AuthModule,
    AnimalsModule,
    DoctorsModule,
    MarketplaceModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
