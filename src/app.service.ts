import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { MessageDTO } from './message.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {

  constructor(
    private readonly prismaService: PrismaService,
    @Inject('ORDERS_SERVICE')
    private readonly rabbitClient: ClientProxy
  ) {}

  async handleWebhook(data: MessageDTO) {
    const message = data.message.conversation;
    const remoteJid = data.remoteJid;

    const contato = await this.prismaService.contato.findFirst({ 
      where: {
        numero: remoteJid
      }
    });

    if (contato) {
      // console.log({message: message});
      this.rabbitClient.emit('order-placed', { message: message, remoteJid: remoteJid});
    }

  }
}
