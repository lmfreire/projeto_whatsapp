import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { MessageDTO } from './message.dto';

@Injectable()
export class AppService {

  constructor(
    private readonly prismaService: PrismaService
  ) {}

  async handleWebhook(data: MessageDTO) {
    const message = data.message;
    const remoteJid = data.remoteJid;

    const contato = await this.prismaService.contato.findFirst({ 
      where: {
        numero: remoteJid
      }
    });

    if (contato) {
      console.log(`Mensagem de ${remoteJid}: ${message}`);
    }

  }
}
