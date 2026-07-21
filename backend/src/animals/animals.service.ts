import { Injectable, BadRequestException } from '@nestjs/common';

export interface Animal {
  id: string;
  name: string;
  breed: string;
  weight: string;
  age: string;
  color: string;
  image?: string;
}

@Injectable()
export class AnimalsService {
  private animals: Animal[] = [
    { id: '1', name: 'Donald Tramp', breed: 'Albino Buffalo', weight: '725 Kg', age: '28 Months', color: 'Pinkish White' },
    { id: '2', name: 'Kabir Cow', breed: 'Bangladeshi Cow', weight: '650 Kg', age: '24 Months', color: 'Brown' },
  ];

  async getAnimals(): Promise<Animal[]> {
    return this.animals;
  }

  async getAnimalById(id: string): Promise<Animal> {
    const animal = this.animals.find(a => a.id === id);
    if (!animal) {
      throw new BadRequestException('Animal not found');
    }
    return animal;
  }

  async addAnimal(data: Omit<Animal, 'id'>): Promise<Animal> {
    if (!data.name || !data.breed) {
      throw new BadRequestException('Name and Breed are required');
    }
    const newAnimal: Animal = {
      id: String(this.animals.length + 1),
      ...data
    };
    this.animals.push(newAnimal);
    return newAnimal;
  }
}
