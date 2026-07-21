import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from '../animals/animal.entity';
import { Doctor } from '../doctors/doctor.entity';
import { MarketItem } from '../marketplace/market-item.entity';
import { ChatMessage } from '../chat/chat-message.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(Animal)
    private readonly animalRepository: Repository<Animal>,
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @InjectRepository(MarketItem)
    private readonly marketItemRepository: Repository<MarketItem>,
    @InjectRepository(ChatMessage)
    private readonly chatMessageRepository: Repository<ChatMessage>,
  ) {}

  async onModuleInit() {
    this.logger.log('Checking database status to run seeder...');
    await this.seedDoctors();
    await this.seedAnimals();
    await this.seedMarketItems();
    await this.seedChatMessages();
    this.logger.log('Database seeding checks completed successfully!');
  }

  private async seedDoctors() {
    const count = await this.doctorRepository.count();
    if (count === 0) {
      this.logger.log('Seeding doctors...');
      await this.doctorRepository.save([
        {
          name: 'Dr. Michael Wilson',
          specialty: 'Veterinary Surgeon',
          experience: '8 Years',
          rating: 4.8,
          avatar: 'michael_doctor.png',
          bio: 'Dr. Michael has spent over 8 years caring for farm animals, specialized in large cattle surgery and herd management.',
        },
        {
          name: 'Dr. Jessica Taylor',
          specialty: 'Animal Nutritionist',
          experience: '6 Years',
          rating: 4.9,
          avatar: 'jessica_doctor.png',
          bio: 'Dr. Jessica specializes in optimal nutrition and disease prevention for cows, goats, and sheep.',
        },
      ]);
    }
  }

  private async seedAnimals() {
    const count = await this.animalRepository.count();
    if (count === 0) {
      this.logger.log('Seeding animals...');
      await this.animalRepository.save([
        {
          name: 'Donald Tramp',
          breed: 'Albino Buffalo',
          weight: '725 Kg',
          age: '28 Months',
          color: 'Pinkish White',
        },
        {
          name: 'Kabir Cow',
          breed: 'Bangladeshi Cow',
          weight: '650 Kg',
          age: '24 Months',
          color: 'Brown',
        },
      ]);
    }
  }

  private async seedMarketItems() {
    const count = await this.marketItemRepository.count();
    if (count === 0) {
      this.logger.log('Seeding marketplace catalog...');
      await this.marketItemRepository.save([
        {
          name: 'Cattle Bhushi Mix Feed',
          price: 1350,
          category: 'Feeds',
          image: 'feed.png',
        },
        {
          name: 'Premium Milk Pail',
          price: 850,
          category: 'Milk',
          image: 'milk.png',
        },
        {
          name: 'Albenian Buffalo',
          price: 320000,
          category: 'Animals',
          image: 'albino_buffalo.png',
        },
        {
          name: 'Pure Mutton Cuts',
          price: 1200,
          category: 'Meat',
          image: 'meat.png',
        },
      ]);
    }
  }

  private async seedChatMessages() {
    const count = await this.chatMessageRepository.count();
    if (count === 0) {
      this.logger.log('Seeding chat messages...');
      await this.chatMessageRepository.save([
        {
          sender: 'doctor',
          text: 'Hello, how can I help you and your animal today?',
          time: '09:54',
          avatar: 'doctor_avatar.png',
        },
        {
          sender: 'user',
          text: 'Thank you for reaching out!\nWe are looking for a surgery.',
          time: '09:55',
          avatar: 'user_profile.png',
        },
      ]);
    }
  }
}
