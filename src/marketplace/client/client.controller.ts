import { Controller, Get } from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from '../repository/schemas/client.schema';

@Controller('Client')
export class ClientController {
    constructor(private readonly clientService: ClientService) { }

    @Get()
    async getClients(): Promise<Client[]> {
        return this.clientService.findAll();
    }
}