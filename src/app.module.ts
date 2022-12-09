import { ArrayUsuariosService } from './usuario/arrayusuarios.service';
import { UsuarioModule } from './usuario/usuario.module';
import { WebsocketGateway } from './websocket/websocket.gateway';
import { GatwayVenomService } from './venom/gatwayvenom.service';
import { Module } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';
import { VenomModule } from './venom/venom.module';
import { VenomService } from './venom/venom.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsuarioModule,
    LoggerModule,
    VenomModule,
    ConfigModule.forRoot({ isGlobal: true, }),

  ],

  providers: [
    ArrayUsuariosService,
    WebsocketGateway,
  ]


})
export class AppModule { }
