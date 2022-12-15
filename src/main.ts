import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { MyLogger } from './logger/logger.service';



async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      cors: false,
      bufferLogs: true,
    });

    // app.connectMicroservice<MicroserviceOptions>({
    //   transport: Transport.KAFKA,
    //   options: {
    //     client: {
    //       brokers: [process.env.KAFKA_BROKER], 
    //       ssl: false,
    //       // sasl: {
    //       //   mechanism: 'scram-sha-256', // scram-sha-256 or scram-sha-512
    //       //   username: process.env.KAFKA_USERNAME,
    //       //   password: process.env.KAFKA_PASSWORD
    //       // },
    //     },
    //     consumer: { 
    //       groupId: "WHATSAPP" + Math.random(),
    //     },


    //   }
    // });

  

    await app.startAllMicroservices();
    await app.listen(process.env.PORT);
  } catch (error: any) {

    console.log(error.message)

  }

}
bootstrap();

