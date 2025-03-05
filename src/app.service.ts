import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {

  constructor(
    private readonly prismaService: PrismaService
  ) {}

  async handleWebhook(payload: any) {
    const message = payload.data.message;
    const remoteJid = payload.data.key.remoteJid;

    const contato = await this.prismaService.contato.findFirst({ 
      where: {
        numero: remoteJid
      }
    });

    if (contato) {
      console.log(`Mensagem de ${message}: ${message}`);
    }

  }
}
