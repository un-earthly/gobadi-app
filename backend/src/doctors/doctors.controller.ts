import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { DoctorsService, Doctor, Booking } from './doctors.service';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  async getDoctors(): Promise<Doctor[]> {
    return this.doctorsService.getDoctors();
  }

  @Get(':id')
  async getDoctorById(@Param('id') id: string): Promise<Doctor> {
    return this.doctorsService.getDoctorById(id);
  }

  @Post('book')
  async bookSlot(
    @Body() body: { doctorId: string; date: string; time: string }
  ): Promise<Booking> {
    return this.doctorsService.bookSlot(body.doctorId, body.date, body.time);
  }

  @Get('bookings/all')
  async getBookings(): Promise<Booking[]> {
    return this.doctorsService.getBookings();
  }
}
