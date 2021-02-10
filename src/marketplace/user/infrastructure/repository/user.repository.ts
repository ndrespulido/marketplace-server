
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Client, ClientDocument } from "../../../repository/schemas/client.schema";
import { User, UserDocument } from '../../../repository/schemas/user.schema';
import { Vendor, VendorDocument } from "../../../repository/schemas/vendor.schema";
import { UserRepositoryInterface } from "../../domain/repository/user-repository.interface";


@Injectable()
export class UserRepository implements UserRepositoryInterface {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
        @InjectModel(Vendor.name) private vendorModel: Model<VendorDocument>
    ) { }

    async create(user: User): Promise<any> {
        const newUser = await this.userModel.create(user);
        return newUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findByEmail(email: string): Promise<User> {
        const customer = await this.userModel.findOne({ email: email }).exec();
        return customer;
    }

    async login(username, password): Promise<User> {
        const customer = await this.userModel.findOne({ username: username, password: password }).exec();
        return customer;
    }

    async update(email: string, UserUpdate: User): Promise<any> {
        return await this.userModel.findOneAndUpdate({ email: email }, UserUpdate, { new: true }).exec();
    }

    async delete(email: string): Promise<any> {
        return await this.userModel.findOneAndRemove({ email: email });
    }

    //Client
    async createClient(client: Client): Promise<any> {
        const newClient = await this.clientModel.create(client);
        return newClient.save();
    }

    async findClientByEmail(email): Promise<Client> {
        const customer = await this.clientModel.findOne({ email: email }).exec();
        return customer;
    }

    //Vendor
    async createVendor(vendor: Vendor): Promise<any> {
        const newClient = await this.vendorModel.create(vendor);
        return newClient.save();
    }

    async findVendorByEmail(email): Promise<Vendor> {
        const vendor = await this.vendorModel.findOne({ email: email }).exec();
        return vendor;
    }
}