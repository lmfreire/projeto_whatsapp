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
    
    this.appService.handleWebhook(payload);
    
    return { status: 'success' };
  }
}
