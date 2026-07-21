import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './doctor.entity';
import { Booking } from './booking.entity';
export { Doctor } from './doctor.entity';
export { Booking } from './booking.entity';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async getDoctors(): Promise<Doctor[]> {
    return this.doctorRepository.find({ order: { id: 'ASC' } });
  }

  async getDoctorById(id: string): Promise<Doctor> {
    const doctor = await this.doctorRepository.findOneBy({ id: parseInt(id, 10) });
    if (!doctor) {
      throw new BadRequestException('Doctor not found');
    }
    return doctor;
  }

  async bookSlot(doctorId: string, date: string, time: string): Promise<Booking> {
    const doctor = await this.getDoctorById(doctorId);
    const newBooking = this.bookingRepository.create({
      doctorId: doctor.id,
      slotDate: date,
      slotTime: time,
      status: 'confirmed',
    });
    return this.bookingRepository.save(newBooking);
  }

  async getBookings(): Promise<Booking[]> {
    return this.bookingRepository.find({ order: { id: 'DESC' } });
  }
}
