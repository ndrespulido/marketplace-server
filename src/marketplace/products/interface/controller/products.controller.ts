import { Controller, Post, Get, Body, Param, Patch, Delete, Res, HttpStatus, NotFoundException, Put, BadRequestException, Logger, UseGuards, Request} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../../auth/jwt-auth.guards";
import { Product } from "../../../repository/schemas/products.schema";
import { UserService } from "../../../user/infrastructure/services/user.service";
import { LoginDto } from "../../../user/interface/dto/login.dto";
import { UserDto } from "../../../user/interface/dto/user.dto";
import { ProductsService } from "../../infrastructure/services/products.service";
import { NewProductDto } from "../dto/new-product.dto";
import { ProductDto } from "../dto/product.dto";

@ApiTags('products')
@Controller('products')
export class ProductsController{
    private readonly logger = new Logger(ProductsController.name);

    
    constructor(private readonly userService: UserService, private readonly productsService: ProductsService) { }


    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Request() req: any, @Res() res, @Body() product: NewProductDto) {

        if (!product.reference) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Product reference mandatory."
            })
        }

        const productExists = await this.productsService.findByReference(product.reference);
        if (productExists) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Product reference already exists."
            })
        }

        let user: UserDto = req.user;
        if (user.role!='vendor') {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Client not authorized to create products."
            })
        }

        let productDto: ProductDto = {
            title: product.title,
            reference: product.reference,
            description: product.description,
            imageUrl: product.imageUrl,
            price: product.price,
            stock: product.stock,
            vendorEmail: user.email,
            vendorName: user.vendor?.companyName
        }
        const newProduct = await this.productsService.create(productDto);

        return res.status(HttpStatus.OK).json({
            message: "Product has been created successfully",
            newProduct
        })
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getProducts(@Request() req: any): Promise<ProductDto[]> {
        let user: UserDto = req.user;
        
        if (user.role == 'client')
            return this.productsService.findAll();

        if (user.role == 'vendor')
            return this.productsService.findByVendor(user.email);

        return null;
    }

    @Get(':reference')
    async findByReference(@Request() req: any, @Res() res, @Param('reference') reference: string) {
        
        const product = await this.productsService.findByReference(reference);
        if (!product) throw new NotFoundException('Product not found!');

        return res.status(HttpStatus.OK).json(product);
    }


    @Put(':reference')
    @UseGuards(JwtAuthGuard)
    async update(@Request() req: any, @Res() res, @Param('reference') reference: string, @Body() productEdit: ProductDto) {

        const product = await this.productsService.findByReference(reference);
        if (!product) throw new NotFoundException('Product not found!');

        let user: UserDto = req.user;
        if (product.vendorEmail != user.email) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'User not authorized to edit this product'
            });
        }

        const response = await this.productsService.update(reference, productEdit);

        if (!response) throw new NotFoundException('product does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Product has been successfully updated',
            response
        });
    }

    @Delete(':reference')
    @UseGuards(JwtAuthGuard)
    async delete(@Request() req: any, @Res() res, @Param('reference') reference: string) {

        const product = await this.productsService.findByReference(reference);
        if (!product) throw new NotFoundException('Product not found!');

        let user: UserDto = req.user;
        if (product.vendorEmail != user.email) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'User not authorized to delete this product'
            });
        }

        const response = await this.productsService.delete(reference);
        if (!response) throw new NotFoundException('Product does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Product has been deleted',
            response
        })
    }

}