import { Injectable, OnModuleInit } from '@nestjs/common';
import { VenomService } from './venom.service';

@Injectable()
export class GatwayVenomService  {

    async start(client){
        //const browserSessionToken = await client.getSessionTokenBrowser(false);   
    client.onMessage((message: any) => {
        // switch (message.body === 'Hi' && message.isGroupMsg === false) {
        //     case true:

        //         client.sendText(message.from, 'Welcome Venom 🕷')
        //               .then((result) => {

        //                 console.log('Result: ', result);
        //                  //return object success
        //               }).catch((erro) => {
        //                 console.error('Error when sending: ', erro); //return object error
        //             });

        //         break;


        // }

    });
    }
    
}
