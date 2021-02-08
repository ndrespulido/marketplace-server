import { Injectable, NotFoundException } from "@nestjs/common";

import {Product} from './product.model';

@Injectable()
export class ProductsService{
    private products:Product[]=[];

    insertProduct(
        title:string,
        size: number,
        description:string,
        price:number
    )
    {
    const productId = Math.floor(Math.random() * (9999999999)) + 1;

    const newProduct = new Product(
        productId.toString(),
        title,
        size,
        description,
        price
    )
    this.products.push(newProduct);

    return productId
    }

    /*async*/ getProducts(){
        //const products = await this.productModel.find()
        return [ ...this.products ];
    }

    getSingleProduct(productId:string){
      const product = this.findProduct(productId)[0];
        return { ...product };
    }

    updateProduct(productId:string, title:string, description:string, price:number, size:number)
    {
        const [product,index] = this.findProduct(productId);
        const updatedProduct = {...product};

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
        this.products[index]=updatedProduct;
    }

    deleteProduct(productId : string)
    {
        const  productIndex = this.findProduct(productId)[1];
        if(productIndex){
            this.products.splice(productIndex,1);
            return "Removed"
        }
        return "Nothing happend";
    }

    
    private findProduct(productId: string) :[Product, number] 
    {
        const productIndex = this.products.findIndex(prod => prod.id ==productId);
        const product =this.products[productIndex];
        if(!product){
            throw new NotFoundException('Could not found product {bad Id}');
        }
        
        return [product,productIndex];
    }                 
}