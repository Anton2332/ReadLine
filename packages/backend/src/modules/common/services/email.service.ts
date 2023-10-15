import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class EmailService {
  private readonly mailer: Mail;

  constructor() {
    this.mailer = createTransport({
      service: 'gmail.com',
      authMethod: 'plain',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  sendMail(options: Mail.Options) {
    return this.mailer.sendMail(options);
  }
}
