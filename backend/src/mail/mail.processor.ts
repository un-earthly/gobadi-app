import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { MailService } from './mail.service';

@Processor('mail-queue')
export class MailProcessor extends WorkerHost {
  private readonly logger = new Logger(MailProcessor.name);

  constructor(private readonly mailService: MailService) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.log(`Processing email job ${job.id} of type ${job.name}...`);

    if (job.name === 'send-otp') {
      const { email, otp } = job.data;
      const subject = 'Your Gobadi Verification OTP Code';
      const text = `Hello,\n\nYour Gobadi verification OTP is: ${otp}.\nThis code is valid for 5 minutes.\n\nBest regards,\nGobadi App Team`;
      const html = `<p>Hello,</p><p>Your Gobadi verification OTP is: <strong>${otp}</strong>.</p><p>This code is valid for 5 minutes.</p><p>Best regards,<br>Gobadi App Team</p>`;

      await this.mailService.sendMail(email, subject, text, html);
      return { success: true, email };
    }

    if (job.name === 'send-booking-confirmation') {
      const { email, doctorName, date, time } = job.data;
      const subject = 'Gobadi Booking Confirmation';
      const text = `Hello,\n\nYour appointment with ${doctorName} has been successfully scheduled for:\nDate: ${date}\nTime: ${time}.\n\nThank you for choosing Gobadi!\n\nBest regards,\nGobadi App Team`;
      const html = `<p>Hello,</p><p>Your appointment with <strong>${doctorName}</strong> has been successfully scheduled for:</p><ul><li><strong>Date:</strong> ${date}</li><li><strong>Time:</strong> ${time}</li></ul><p>Thank you for choosing Gobadi!</p><p>Best regards,<br>Gobadi App Team</p>`;

      await this.mailService.sendMail(email, subject, text, html);
      return { success: true, email };
    }
  }
}
