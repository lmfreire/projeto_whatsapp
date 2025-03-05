import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    PrismaModule,
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
