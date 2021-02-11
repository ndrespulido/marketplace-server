import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { Product, ProductDocument } from "../../../repository/schemas/products.schema";
import { ProductRepositoryInterface } from "../../domain/repository/product-repository.interface";
import { ProductDto } from "../../interface/dto/product.dto";

@Injectable()
export class ProductsService {

    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>,
        @Inject('ProductRepositoryInterface') private repository: ProductRepositoryInterface) { }


    async create(productDto: ProductDto): Promise<any> {

        const registerProduct: Product = {
            title: productDto.title,
            reference: productDto.reference,
            description: productDto.description,
            price: productDto.price,
            stock: productDto.price,
            vendorEmail: productDto.vendorEmail
        };

        const newProduct = await this.repository.create(registerProduct);
        return productDto;
    }


    async findAll(): Promise<ProductDto[]> {
        let productListDto: ProductDto[] = [];
        var productList = await this.repository.findAll();
        for (let product of productList) {

            let productDto: ProductDto = {
                title: product.title,
                reference: product.reference,
                description: product.description,
                price: product.price,
                stock: product.price,
                vendorEmail: product.vendorEmail
            };
            productListDto.push(productDto);
        }
        return productListDto;
    }

    async findByReference(reference: string): Promise<ProductDto> {

        var product = await this.repository.findByReference(reference);
        if (!product) return null;
        let productDto: ProductDto = {
            title: product.title,
            reference: product.reference,
            description: product.description,
            price: product.price,
            stock: product.price,
            vendorEmail: product.vendorEmail
        };
        return productDto;
    }

    //findByVendor(vendorEmail: string): Promise<Product>;

    //update(reference: string, UserUpdate: Product): Promise<any>;

    //delete(reference: string): Promise<any>;

}