import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { Product, ProductDocument } from "../../../repository/schemas/products.schema";
import { UserRepositoryInterface } from "../../../user/domain/repository/user-repository.interface";
import { UserDto } from "../../../user/interface/dto/user.dto";
import { ProductRepositoryInterface } from "../../domain/repository/product-repository.interface";
import { ProductDto } from "../../interface/dto/product.dto";

@Injectable()
export class ProductsService {

    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
        @Inject('ProductRepositoryInterface') private repository: ProductRepositoryInterface,
        @Inject('UserRepositoryInterface') private userRepository: UserRepositoryInterface
    ) { }


    async create(productDto: ProductDto): Promise<any> {

        const registerProduct: Product = {
            title: productDto.title,
            reference: productDto.reference,
            description: productDto.description,
            imageUrl: productDto.imageUrl,
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
            let productDto = await this.productToProductDto(product);
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
            imageUrl: product.imageUrl,
            price: product.price,
            stock: product.price,
            vendorEmail: product.vendorEmail,
            vendorName: product.vendorEmail
        };
        return productDto;
    }

    async findByVendor(vendorEmail: string): Promise<ProductDto[]> {
        let productListDto: ProductDto[] = [];
        var productList = await this.repository.findByVendor(vendorEmail);
        for (let product of productList) {
            let productDto = await this.productToProductDto(product);
            productListDto.push(productDto);
        }
        return productListDto;
    }


    async update(email: string, productEdit: ProductDto): Promise<any> {
        
    }

    private async productToProductDto(product: Product): Promise<ProductDto> {
        if (!product) return null;

        let vendorName: string = '';
        if (product.vendorEmail) {
            const vendor = await this.userRepository.findVendorByEmail(product.vendorEmail);
            if (!vendor) vendorName = vendor.name ? vendor.name : '';
        }
        let productDto: ProductDto = {
            title: product.title,
            reference: product.reference,
            description: product.description,
            imageUrl: product.imageUrl,
            price: product.price,
            stock: product.price,
            vendorEmail: product.vendorEmail,
            vendorName: vendorName
        };

        return productDto;
    }

    private async productDtoToProduct(productDto: ProductDto): Promise<Product> {
        if (!productDto) return null;
        let product: Product = {
            title: productDto.title,
            reference: productDto.reference,
            description: productDto.description,
            imageUrl: productDto.imageUrl,
            price: productDto.price,
            stock: productDto.price,
            vendorEmail: productDto.vendorEmail
        };
        return product;
    }

    //delete(reference: string): Promise<any>;

}