import { Controller, Post ,Get, Body,Param, Patch, Delete} from "@nestjs/common";
import { serialize } from "v8";

import {ProductsService}from './products.service';

@Controller('products')
export class ProductsController{
    
    constructor(private readonly productsService: ProductsService){
    }

    @Post()
    async addProduct(@Body('title')productTitle:string
    ,@Body('size')productSize:number
    ,@Body('description')productDescription:string
    ,@Body('price')productPrice:number    
    ){
        const generatedId = await this.productsService.insertProduct(
            productTitle, productSize            
            ,productDescription,productPrice 
        );
        return {id:generatedId};
    }

    @Get()
    async getAllProducts(){
        const products = await this.productsService.getProducts();
        return products; 
    }

    @Get(':id')
    async getProduct(@Param('id') productId:string){
        return await this.productsService.getSingleProduct(productId);
    }

    @Patch(':id')
    async updateProduct(@Param('id') prodId: string,
    @Body('title') productTitle: string,
    @Body('description')productDescription: string,
    @Body('price')producPrice:number,
    @Body('size') producteSize
    
    ){
        await this.productsService.updateProduct(prodId,productTitle,
            productDescription,producPrice,producteSize);
        return null;
    }

    @Delete(':id')
    async removeProduct(@Param('id') productId:string)
    {
        await this.productsService.deleteProduct(productId);
        return null;
    }

}