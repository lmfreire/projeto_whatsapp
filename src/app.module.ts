import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    HttpModule,
    PrismaModule,
    CacheModule.register({
      isGlobal: true,
      ttl: 30 * 1000,
    }),
    ClientsModule.register([
      {
        name: 'ORDERS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://ouxnznue:qvOdwSPLE2pVDNLrAcIN1J9k5JLPHFBq@collie.lmq.cloudamqp.com/ouxnznue'],
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
