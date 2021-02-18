import { Controller, Post, Get, Body, Param, Patch, Delete, Res, HttpStatus, NotFoundException, Put, BadRequestException, Logger, UseGuards, Request} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../../auth/jwt-auth.guards";
import { Product } from "../../../repository/schemas/products.schema";
import { UserService } from "../../../user/infrastructure/services/user.service";
import { LoginDto } from "../../../user/interface/dto/login.dto";
import { UserDto } from "../../../user/interface/dto/user.dto";
import { ProductsService } from "../../infrastructure/services/products.service";
import { ProductDto } from "../dto/product.dto";

@ApiTags('products')
@Controller('products')
export class ProductsController{
    private readonly logger = new Logger(ProductsController.name);

    
    constructor(private readonly userService: UserService, private readonly productsService: ProductsService) { }


    @Post()
    async create(@Res() res, @Body() product: ProductDto) {

        if (!product.reference) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Product reference mandatory."
            })
        }

        if (!product.vendorEmail) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Vendor mandatory."
            })
        }

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
    @UseGuards(JwtAuthGuard)
    async getProducts(@Request() req: any): Promise<ProductDto[]> {
        let user: UserDto = req.user;
        console.log(user.role);
        if (user.role == 'client')
            return this.productsService.findAll();

        if (user.role == 'vendor')
            return this.productsService.findByVendor(user.email);

        return null;
    }

    @Get(':reference')
    async findByReference(@Res() res, @Param('reference') reference: string) {
        this.logger.log('reference:'+reference);
        const product = await this.productsService.findByReference(reference);
        if (!product) throw new NotFoundException('Product not found!');
        return res.status(HttpStatus.OK).json(product);
    }


    @Post('/user')
    async findById(@Res() res, @Body() loginDto: LoginDto) {
        const userExists = await this.userService.findByEmail(loginDto.email);
        if (!userExists || userExists.password != loginDto.password) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Email doesn't exists or password invalid."
            })
        }
        let products: ProductDto[] = null;
        switch (userExists.role) {
            case 'client':
                products = await this.productsService.findAll();
                break;
            case 'vendor':
                products = await this.productsService.findByVendor(userExists.email);
                break;
            default:
                break;;
        }

        return res.status(HttpStatus.OK).json({
            message: 'Products for User' + loginDto.email,
            products
        });
    }


    @Put(':reference')
    async update(@Res() res, @Param('reference') reference: string, @Body() productEdit: ProductDto) {
        
        const product = await this.productsService.findByReference(reference);
        if (!product) throw new NotFoundException('Product not found!');

        const response = await this.productsService.update(reference, productEdit);

        if (!response) throw new NotFoundException('product does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Product has been successfully updated',
            response
        });
    }

    @Delete(':reference')
    async delete(@Res() res, @Param('reference') reference: string) {
        const response = await this.productsService.delete(reference);
        if (!response) throw new NotFoundException('Product does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Product has been deleted',
            response
        })
    }

}