import { Logger } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MyLogger } from 'src/logger/logger.service';
import { VenomService } from 'src/venom/venom.service';





@WebSocketGateway({ transports: ['websocket'] })
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

    constructor(
        private venomService: VenomService,
        private myLogger: MyLogger
    ) { }

    @WebSocketServer()
    server: Server;

    //EVENTS RELACIONADO AO CLIENTE

    @SubscribeMessage('whatsapp-session')
    setSetor(
        @MessageBody() payload: string,
        @ConnectedSocket() client: Socket,
    ) {
        this.venomService.cliente(client, payload, this.server)

    }
 





    //EVENTS RELACIONADO AO USUARIO

    //EVENTS GLOBAIS
    handleConnection(client: any, ...args: any[]) {
        this.myLogger.log('Nova conexão', `${client.id}`);
        this.server.to(client.id).emit('connected', {
            response: 'Conexão realizada com sucesso'
        })
    }

    handleDisconnect(client: any) {
        this.myLogger.log('Conexao encerrada', `${client.id}`);
    }

    afterInit(server: any) {
        this.myLogger.log('Serviço iniciado com sucesso', "Websocket");
    }
}
