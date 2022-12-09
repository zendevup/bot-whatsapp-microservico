import { MyLogger } from './logger.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [],
    providers: [
        MyLogger,
    ],
    exports: [
        MyLogger
    ]
})
export class LoggerModule { }
