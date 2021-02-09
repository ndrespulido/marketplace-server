import { Injectable, NotFoundException } from "@nestjs/common";
import {InjectModel} from '@nestjs/mongoose';
import { Model } from "mongoose";
import {Product} from './product.model';

@Injectable()
export class ProductsService{

    constructor(@InjectModel('Product') private readonly productModel:Model<Product>){
    }

    async insertProduct(title:string,size: number,description:string,price:number){
        const newProduct = new this.productModel({
            title,
            size,
            description,
            price
    });
        const productResult = await newProduct.save();
        return productResult.id as string;
    }

    async getProducts(){
        const products = await this.productModel.find().exec();
        return products.map((prod)=>({
            id:prod.id, title:prod.title,description:prod.description, 
            price: prod.price, size:prod.size
        }));
    }

    async getSingleProduct(productId:string){
      const product = await this.findProduct(productId);
        return {id:product.id, size:product.size, description:product.description,price: product.price, title:product.title};;
    }

    async updateProduct(productId:string, title:string, description:string, price:number, size:number)
    {
        const updatedProduct = await this.findProduct(productId);

        if(size){
            updatedProduct.size = size;
        }
        if(title){
            updatedProduct.title = title;
        }
        if(description){
            updatedProduct.description = description;
        }
        if(price){
            updatedProduct.price = price;
        }

        updatedProduct.save();
    }

    async deleteProduct(productId : string)
    {
        //await this.findProduct(productId);

        const deletedResult = await this.productModel.deleteOne({_id:productId}).exec();
        if(deletedResult.n===0)
        {
            throw new NotFoundException('Could not delete product. It was not find')
        }
    }

    
    private async findProduct(productId: string) :Promise<Product> 
    {
        let product;
        try{
             product = await this.productModel.findById(productId);
        }
        catch(error)
        {
            throw new NotFoundException('Could not found product {bad Id}');
        }

        if(!product){
            throw new NotFoundException('Could not found product {bad Id}');
        }    

        return product;
    }                 
}