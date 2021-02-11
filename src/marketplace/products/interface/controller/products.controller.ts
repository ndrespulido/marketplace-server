import { Controller, Post ,Get, Body,Param, Patch, Delete, Res, HttpStatus, NotFoundException} from "@nestjs/common";
import { ProductsService } from "../../infrastructure/services/products.service";
import { ProductDto } from "../dto/product.dto";

@Controller('products')
export class ProductsController{
    
    constructor(private readonly productsService: ProductsService){
    }


    @Post()
    async create(@Res() res, @Body() product: ProductDto) {

        const productExists = await this.productsService.findByReference(product.reference);
        if (productExists) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Product reference already exists."
            })
        }

        const newProduct = await this.productsService.create(product);
        return res.status(HttpStatus.OK).json({
            message: "Product has been created successfully",
            newProduct
        })
    }

    @Get()
    async getProducts(): Promise<ProductDto[]> {
        return this.productsService.findAll();
    }


    @Get(':reference')
    async findByReference(@Res() res, @Param('reference') reference: string) {
        const product = await this.productsService.findByReference(reference);
        if (!product) throw new NotFoundException('Product not found!');
        return res.status(HttpStatus.OK).json(product);
    }

}