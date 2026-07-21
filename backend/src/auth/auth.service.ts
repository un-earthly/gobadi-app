import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class AuthService {
  // In-memory fallback if Redis is unavailable
  private otpMemoryFallback = new Map<string, { code: string; expiresAt: number }>();

  constructor(
    private readonly redisService: RedisService,
    @InjectQueue('mail-queue')
    private readonly mailQueue: Queue,
  ) {}

  async sendOtp(phone: string): Promise<{ success: boolean; message: string; otp: string }> {
    if (!phone) {
      throw new BadRequestException('Phone number or email is required');
    }

    // Generate a random 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const expirySeconds = 300; // 5 minutes

    // Try storing in Redis
    try {
      await this.redisService.set(`otp:${phone}`, otp, expirySeconds);
    } catch {
      // Fallback to in-memory store
      this.otpMemoryFallback.set(phone, {
        code: otp,
        expiresAt: Date.now() + expirySeconds * 1000,
      });
    }

    // If identifier is an email address, queue an async OTP email job via BullMQ
    if (phone.includes('@')) {
      try {
        await this.mailQueue.add('send-otp', {
          email: phone,
          otp,
        });
      } catch (err) {
        console.warn('Failed to queue send-otp email job', err);
      }
    }

    // Return success, including the OTP in response for development / demo purposes
    return {
      success: true,
      message: `OTP sent successfully to ${phone}`,
      otp, // For client-side testing convenience
    };
  }

  async verifyOtp(phone: string, code: string): Promise<{ verified: boolean; token?: string; message: string }> {
    if (!phone || !code) {
      throw new BadRequestException('Phone number and OTP code are required');
    }

    let savedOtp: string | null = null;

    try {
      savedOtp = await this.redisService.get(`otp:${phone}`);
      if (savedOtp) {
        await this.redisService.del(`otp:${phone}`);
      }
    } catch {
      // Fallback lookup
      const entry = this.otpMemoryFallback.get(phone);
      if (entry && entry.expiresAt > Date.now()) {
        savedOtp = entry.code;
        this.otpMemoryFallback.delete(phone);
      }
    }

    if (!savedOtp) {
      return {
        verified: false,
        message: 'OTP has expired or does not exist. Please request a new one.',
      };
    }

    if (savedOtp !== code) {
      return {
        verified: false,
        message: 'Invalid OTP code. Please try again.',
      };
    }

    // Successful verification, return a mock JWT token
    const mockToken = `gobadi_session_token_${Math.random().toString(36).substring(2, 15)}`;

    return {
      verified: true,
      token: mockToken,
      message: 'OTP verified successfully.',
    };
  }
}
