import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Vendor, VendorDocument } from '../repository/schemas/vendor.schema';

@Injectable()
export class VendorService {
    constructor(@InjectModel(Vendor.name) private vendorModel: Model<VendorDocument>) { }

    async create(vendor: Vendor): Promise<any> {
        const newClient = await this.vendorModel.create(vendor);
        return newClient.save();
    }

    async findAll(): Promise<Vendor[]> {
        return this.vendorModel.find().exec();
    }

    async findByUsername(username): Promise<Vendor> {
        const customer = await this.vendorModel.findOne({ username: username }).exec();
        return customer;
    }

    async update(username, ClientUpdate: Vendor): Promise<any> {
        return await this.vendorModel.findOneAndUpdate({ username: username }, ClientUpdate, { new: true }).exec();
    }

    async delete(username): Promise<any> {
        return await this.vendorModel.findOneAndRemove({ username: username });
    }
}