import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import * as venom from 'venom-bot';
import * as  fs from 'fs';
import { Buffer } from 'buffer';
import { MyLogger } from 'src/logger/logger.service';
import { GatwayVenomService } from './gatwayvenom.service';
import { Server, Socket } from 'socket.io';
import { ClientKafka } from '@nestjs/microservices';
import { Producer } from 'kafkajs';



@Injectable()
export class VenomService {


  constructor(
    private gatwayVenomService: GatwayVenomService,
    private myLogger: MyLogger
) { }


  
async cliente(socket:Socket, payload:any, server:Server) {
  try {
      const init =  await venom.create(payload.session, async (base64Qr, asciiQR, attempts, urlCode) => {
        
        server.to(socket.id).emit('whatsapp-qrcode', {
          response: base64Qr
      })
    },
    // statusFicnds
    (statusSession, session) => {
      server.to(socket.id).emit('whatsapp-statussession', {
        response: statusSession
    })
        console.log('Status Session: ', statusSession); //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || noOpenBrowser || initBrowser || openBrowser || connectBrowserWs || initWhatsapp || erroPageWhatsapp || successPageWhatsapp || waitForLogin || waitChat || successChat
        console.log('Session name: ', session);
    },
    // options 
    {
        multidevice: true, // for version not multidevice use false.(default: true)
        folderNameToken: 'tokens', //folder name when saving tokens
        mkdirFolderToken: '', //folder directory tokens, just inside the venom folder, example:  { mkdirFolderToken: '/node_modules', } //will save the tokens folder in the node_modules directory
        headless: true, // Headless chrome
        devtools: false, // Open devtools by default
        useChrome: true, // If false will use Chromium instance
        debug: false, // Opens a debug session
        logQR: true, // Logs QR automatically in terminal
        browserWS: '', // If u want to use browserWSEndpoint
        browserArgs: [''], // Original parameters  ---Parameters to be added into the chrome browser instance
        addBrowserArgs: [''], // Add broserArgs without overwriting the project's original
        puppeteerOptions: {}, // Will be passed to puppeteer.launch
        disableSpins: true, // Will disable Spinnies animation, useful for containers (docker) for a better log
        disableWelcome: true, // Will disable the welcoming message which appears in the beginning
        updatesLog: true, // Logs info updates automatically in terminal
        autoClose: 60000, // Automatically closes the venom-bot only when scanning the QR code (default 60 seconds, if you want to turn it off, assign 0 or false)
        createPathFileToken: true, // creates a folder when inserting an object in the client's browser, to work it is necessary to pass the parameters in the function create browserSessionToken
        chromiumVersion: '818858', // Version of the browser that will be used. Revision strings can be obtained from omahaproxy.appspot.com.
        addProxy: [''], // Add proxy server exemple : [e1.p.webshare.io:01, e1.p.webshare.io:01]
        userProxy: '', // Proxy login username
        userPass: '' // Proxy password
    },
    // BrowserSessionToken
    // To receive the client's token use the function await clinet.getSessionTokenBrowser()
    {
        WABrowserId: '"UnXjH....."',
        WASecretBundle:
            '{"key":"+i/nRgWJ....","encKey":"kGdMR5t....","macKey":"+i/nRgW...."}',
        WAToken1: '"0i8...."',
        WAToken2: '"1@lPpzwC...."'
    },
    // BrowserInstance
    (browser, waPage) => {
        //   console.log('Browser PID:', browser.process().pid);
        //   waPage.screenshot({ path: 'screenshot.png' });
    })
    
  this.gatwayVenomService.start(init)

    

    
   } catch (error:any) {
     this.myLogger.log('Erro VenomS', error.message);
     return error.message
   }
}

 
}
