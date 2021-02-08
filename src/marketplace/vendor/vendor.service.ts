import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Vendor, VendorDocument } from '../repository/schemas/vendor.schema';

@Injectable()
export class VendorService {
    constructor(@InjectModel(Vendor.name) private vendorModel: Model<VendorDocument>) { }

    async findAll(): Promise<Vendor[]> {
        return this.vendorModel.find().exec();
    }
}