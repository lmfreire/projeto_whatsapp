import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { MessageDTO } from './message.dto';
import { ClientProxy } from '@nestjs/microservices';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {

  constructor(
    private readonly prismaService: PrismaService,
    @Inject('ORDERS_SERVICE')
    private readonly rabbitClient: ClientProxy,
    private readonly httpService: HttpService
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

      const conversa = await this.prismaService.conversa.findFirst({
        where: {
          contatoId: contato.id,
          dt_fim: null
        }
      })

      if (!conversa && message != 'Iniciar') {
        const url = 'https://evolution-api.lemarq.inf.br/message/sendText/teste_whatsapp';

        const headers = {
          'Content-Type': 'application/json',
          'apikey': process.env.API_KEY, 
        };

        const data = {
          number: contato.numero,
          text: 'Envie "Iniciar" para começar a conversa',
        };

        // console.log(headers);
        // console.log(data);
        try {
          const response = await firstValueFrom(
            this.httpService.post(url, data, { headers })
          );
          // console.log(response.data);
          // return response.data;
        } catch (error) {
          // throw new Error(`Erro na requisição: ${error.message}`);
          // console.log(error.message);
        }
        return;
      }

      if (message == 'Iniciar') {
        await this.prismaService.conversa.create({
          data: {
            contatoId: contato.id
          }
        })

        return;
      } 
      
      if (message == 'Fim') {
        await this.prismaService.conversa.updateMany({
          where: {
            contatoId: contato.id
          },
          data: {
            dt_fim: new Date()
          }
        })

        return;
      } 
      this.rabbitClient.emit('order-placed', { message: message, remoteJid: remoteJid});
    }

  }
}
