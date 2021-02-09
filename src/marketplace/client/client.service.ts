import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Client, ClientDocument } from '../repository/schemas/client.schema';

@Injectable()
export class ClientService {
    constructor(@InjectModel(Client.name) private clientModel: Model<ClientDocument>) { }


    async create(client: Client): Promise<any> {
        const newClient = await this.clientModel.create(client);
        return newClient.save();
    }

    async findAll(): Promise<Client[]> {
        return this.clientModel.find().exec();
    }

    async findByUsername(username): Promise<Client> {
        const customer = await this.clientModel.findOne({ username: username }).exec();
        return customer;
    }

    async update(username, ClientUpdate: Client): Promise<any> {
        return await this.clientModel.findOneAndUpdate({ username: username }, ClientUpdate, { new: true }).exec();
    }

    async delete(username): Promise<any> {
        return await this.clientModel.findOneAndRemove({ username: username });
    }
}