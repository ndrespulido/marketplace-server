import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Res } from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from '../repository/schemas/client.schema';

@Controller('client')
export class ClientController {
    constructor(private readonly clientService: ClientService) { }

    @Post('/create')
    async addCustomer(@Res() res, @Body() Client: Client) {
        const newClient = await this.clientService.create(Client);
        return res.status(HttpStatus.OK).json({
            message: "Client has been created successfully",
            newClient
        })
    }

    @Get()
    async getClients(): Promise<Client[]> {
        return this.clientService.findAll();
    }


    @Get(':username')
    async findById(@Res() res, @Param('username') username: string) {
        const client = await this.clientService.findByUsername(username);
        if (!client) throw new NotFoundException('Login does not exist, or wrong password!');
        return res.status(HttpStatus.OK).json(client);
    }

    @Put(':username')
    async update(@Res() res, @Param('username') username: string, @Body() ClientEdit: Client) {
        const ClientResponse = await this.clientService.update(username, ClientEdit);
        if (!ClientResponse) throw new NotFoundException('Clientname does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Client has been successfully updated',
            ClientResponse
        });
    }

    @Delete(':username')
    async delete(@Res() res, @Param('Clientname') Clientname: string) {
        const ClientResponse = await this.clientService.delete(Clientname);
        if (!ClientResponse) throw new NotFoundException('Client does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Client has been deleted',
            ClientResponse
        })
    }


}