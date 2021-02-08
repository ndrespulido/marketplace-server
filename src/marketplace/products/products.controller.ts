import { Controller, Post ,Get, Body,Param, Patch, Delete} from "@nestjs/common";
import { serialize } from "v8";

import {ProductsService}from './products.service';

@Controller('products')
export class ProductsController{
    
    constructor(private readonly productsService: ProductsService){
    }

    @Post()
    addProduct(@Body('title')productTitle:string
    ,@Body('size')productSize:number
    ,@Body('description')productDescription:string
    ,@Body('price')productPrice:number    
    ){
        const generatedId = this.productsService.insertProduct(
            productTitle, productSize            
            ,productDescription,productPrice 
        );
        return {id: generatedId};
    }

    @Get()
    getAllProducts(){
        return this.productsService.getProducts();
    }

    @Get(':id')
    getProduct(@Param('id') productId:string){
        return this.productsService.getSingleProduct(productId);
    }

    @Patch(':id')
    updateProduct(@Param('id') prodId: string,
    @Body('title') productTitle: string,
    @Body('description')productDescription: string,
    @Body('price')producPrice:number,
    @Body('size') producteSize
    
    ){
        this.productsService.updateProduct(prodId,productTitle,
            productDescription,producPrice,producteSize);
        return null;
    }

    @Delete(':id')
    removeProduct(@Param('id') productId:string)
    {
        return this.productsService.deleteProduct(productId);
    }

}