import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { url } from 'inspector';

@Catch()
export class ExceptionsLoggerFilter extends BaseExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();

        let bunyan = require('bunyan');
        let seq = require('bunyan-seq');

        var log = bunyan.createLogger({
            name: 'marketplace-server',
            streams: [
                {
                    stream: process.stdout,
                    level: 'warn',
                },
                seq.createStream({
                    serverUrl: 'http://localhost:5341',
                    level: 'info'
                })
            ]
        });

        log.error({ url: request.url, method: request.method, exception: exception }, 'Exception thrown.');
        super.catch(exception, host);
    }
}