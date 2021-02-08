import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Client, ClientDocument } from '../repository/schemas/client.schema';

@Injectable()
export class ClientService {
    constructor(@InjectModel(Client.name) private clientModel: Model<ClientDocument>) { }

    async findAll(): Promise<Client[]> {
        return this.clientModel.find().exec();
    }
}