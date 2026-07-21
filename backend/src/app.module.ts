import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { AuthModule } from './auth/auth.module';
import { AnimalsModule } from './animals/animals.module';
import { DoctorsModule } from './doctors/doctors.module';
import { MarketplaceModule } from './marketplace/marketplace.module';
import { ChatModule } from './chat/chat.module';
import { SeedModule } from './seed/seed.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5433', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgrespassword',
      database: process.env.DB_DATABASE || 'gobadi',
      autoLoadEntities: true,
      synchronize: true,
    }),
    RedisModule,
    AuthModule,
    AnimalsModule,
    DoctorsModule,
    MarketplaceModule,
    ChatModule,
    SeedModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
