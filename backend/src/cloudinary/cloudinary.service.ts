import { Injectable, Logger } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);
  private isConfigured = false;

  constructor() {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (cloudName && apiKey && apiSecret) {
      cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
      });
      this.isConfigured = true;
      this.logger.log('Cloudinary successfully configured.');
    } else {
      this.logger.warn(
        'Cloudinary credentials not found in env variables. Mock local fallback will be used.',
      );
    }
  }

  async uploadImage(fileBufferOrBase64: string): Promise<string> {
    if (this.isConfigured) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(fileBufferOrBase64, {
          folder: 'gobadi',
        });
        return uploadResponse.secure_url;
      } catch (err) {
        this.logger.error('Failed to upload image to Cloudinary, falling back to mock URL', err);
      }
    }
    // Mock placeholder fallback URL
    return 'https://res.cloudinary.com/demo/image/upload/v1570979139/sample.jpg';
  }
}
