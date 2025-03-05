import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @Post('webhook')
  @HttpCode(200)
  handleWebhook(@Body() payload: any) {
    const message = payload.data.message;
    console.log('Payload recebido do webhook:', message);

    // console.log('Payload recebido do webhook:', payload);
    // console.log(payload);
    return { status: 'success' };
  }
}
