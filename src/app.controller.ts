import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return "Hello";
  }
  
  @Post('webhook')
  @HttpCode(200)
  handleWebhook(@Body() payload: any) {
    const message = payload.data.message;
    const remoteJid = payload.data.key.remoteJid;

    this.appService.handleWebhook({ message, remoteJid });
    return { status: 'success' };
  }
}
