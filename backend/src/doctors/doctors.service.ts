import { Injectable, BadRequestException } from '@nestjs/common';

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  avatar: string;
  bio: string;
}

export interface Booking {
  id: string;
  doctorId: string;
  slotDate: string;
  slotTime: string;
  status: string;
}

@Injectable()
export class DoctorsService {
  private doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Michael Wilson',
      specialty: 'Veterinary Surgeon',
      experience: '8 Years',
      rating: 4.8,
      avatar: 'michael_doctor.png',
      bio: 'Dr. Michael has spent over 8 years caring for farm animals, specialized in large cattle surgery and herd management.'
    },
    {
      id: '2',
      name: 'Dr. Jessica Taylor',
      specialty: 'Animal Nutritionist',
      experience: '6 Years',
      rating: 4.9,
      avatar: 'jessica_doctor.png',
      bio: 'Dr. Jessica specializes in optimal nutrition and disease prevention for cows, goats, and sheep.'
    }
  ];

  private bookings: Booking[] = [];

  async getDoctors(): Promise<Doctor[]> {
    return this.doctors;
  }

  async getDoctorById(id: string): Promise<Doctor> {
    const doctor = this.doctors.find(d => d.id === id);
    if (!doctor) {
      throw new BadRequestException('Doctor not found');
    }
    return doctor;
  }

  async bookSlot(doctorId: string, date: string, time: string): Promise<Booking> {
    const doctor = await this.getDoctorById(doctorId);
    const newBooking: Booking = {
      id: String(this.bookings.length + 1),
      doctorId: doctor.id,
      slotDate: date,
      slotTime: time,
      status: 'confirmed'
    };
    this.bookings.push(newBooking);
    return newBooking;
  }

  async getBookings(): Promise<Booking[]> {
    return this.bookings;
  }
}
