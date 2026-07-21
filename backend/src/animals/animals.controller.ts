import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { AnimalsService, Animal } from './animals.service';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Get()
  async getAnimals(): Promise<Animal[]> {
    return this.animalsService.getAnimals();
  }

  @Get(':id')
  async getAnimalById(@Param('id') id: string): Promise<Animal> {
    return this.animalsService.getAnimalById(id);
  }

  @Post()
  async addAnimal(@Body() body: Omit<Animal, 'id'>): Promise<Animal> {
    return this.animalsService.addAnimal(body);
  }
}
