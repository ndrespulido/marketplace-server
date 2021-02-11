
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product, ProductDocument } from "../../../repository/schemas/products.schema";
import { ProductRepositoryInterface } from "../../domain/repository/product-repository.interface";


@Injectable()
export class ProductRepository implements ProductRepositoryInterface {

    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) { }


    async create(product: Product): Promise<any> {
        const newProduct = await this.productModel.create(product);
        return newProduct.save();
    }

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async findByReference(reference: string): Promise<Product> {
        const product = await this.productModel.findOne({ reference: reference }).exec();
        return product;
    }

    async findByVendor(vendorEmail: string): Promise<Product> {
        const product = await this.productModel.findOne({ vendorEmail: vendorEmail }).exec();
        return product;
    }

    async update(reference: string, productUpdate: Product): Promise<any> {
        return await this.productModel.findOneAndUpdate({ reference: reference }, productUpdate, { new: true }).exec();
    }

    async delete(reference: string): Promise<any> {
        return await this.productModel.findOneAndRemove({ reference: reference });
    }
}