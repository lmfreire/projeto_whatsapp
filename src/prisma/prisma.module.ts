import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDERS_SERVICE',
        transport: Transport.RMQ,
        options: {
          //urls: ['amqp://admin:admin@localhost:5672'],
          urls: ['amqps://ouxnznue:qvOdwSPLE2pVDNLrAcIN1J9k5JLPHFBq@collie.lmq.cloudamqp.com/ouxnznue'],
          //queue: 'orders_queue',
          queueOptions: {
            durable: true
          },
        },
      },
    ]),
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
