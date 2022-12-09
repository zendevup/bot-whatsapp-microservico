import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LoggerModule } from 'src/logger/logger.module';
import { GatwayVenomService } from './gatwayvenom.service';
import { VenomService } from './venom.service';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({ isGlobal: true, }),
   
  
  ],
  controllers: [],
  providers: [
    GatwayVenomService,
    VenomService
  ],
  exports: [
    VenomService,
    GatwayVenomService,
  ]
})
export class VenomModule { }
