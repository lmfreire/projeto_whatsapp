import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ContatoDTO, ContatosDTO, MessageDTO } from './message.dto';
import { ClientProxy } from '@nestjs/microservices';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {

  constructor(
    private readonly prismaService: PrismaService,
    @Inject('ORDERS_SERVICE')
    private readonly rabbitClient: ClientProxy,
    private readonly httpService: HttpService,
    @Inject('CACHE_MANAGER') 
    private cacheManager: Cache
  ) {}

  async atualizarContatos(data: ContatoDTO) {
    let contato = await this.prismaService.contato.findFirst({ 
      where: {
        numero: `5584${data.numero}@s.whatsapp.net`
      }
    });

    if (!contato) {
      contato = await this.prismaService.contato.create({
        data: {
          numero: data.numero
        }
      })
    }

    const contatos = await this.prismaService.contato.findMany();

    await this.cacheManager.set('contatos', contatos);

    return contato;
  }

  async handleWebhook(data: MessageDTO) {
    const message = data.message.conversation;
    const remoteJid = data.remoteJid;

    const contatos: ContatosDTO[] = (await this.cacheManager.get('contatos')) || [];

    console.log(contatos);
    console.log(!contatos);
    
    if (!contatos) {
      let contatos = await this.prismaService.contato.findMany();

      await this.cacheManager.set('contatos', contatos);
    }

    const contato = contatos.find((contato) => contato.numero == remoteJid);

    console.log(contato);
    
    // const contato = await this.prismaService.contato.findFirst({ 
    //   where: {
    //     numero: remoteJid
    //   }
    // });
    

    if (contato) {

      const conversa = await this.prismaService.conversa.findFirst({
        where: {
          contatoId: contato.id,
          dt_fim: null
        }
      })

      if (!conversa && message != 'Iniciar') {
        await this.EnviarMensagem(remoteJid, 'Olá, para iniciar a conversa digite "Iniciar"');
        return;
      }

      if (message == 'Iniciar') {
        await this.prismaService.conversa.create({
          data: {
            contatoId: contato.id
          }
        })

        await this.EnviarMensagem(remoteJid, 'Chat iniciado com sucesso!');
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

        await this.EnviarMensagem(remoteJid, 'Chat Finalizado com sucesso!');
        return;
      } 
      this.rabbitClient.emit('order-placed', { message: message, remoteJid: remoteJid});
    }

  }

  async EnviarMensagem(numero: string, mensagem: string) {
    const url = 'https://evolution-api.lemarq.inf.br/message/sendText/teste_whatsapp';

      const headers = {
        'Content-Type': 'application/json',
        'apikey': process.env.API_KEY, 
      };

      const data = {
        number: numero,
        text: mensagem,
      };

      try {
        const response = await firstValueFrom(
          this.httpService.post(url, data, { headers })
        );
      } catch (error) {
        console.log(error.message);
      }
      return;
  }
}
