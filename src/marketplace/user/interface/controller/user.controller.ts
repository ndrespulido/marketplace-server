import { Controller, Delete, Get, HttpStatus, Logger, NotFoundException, Post, Put } from '@nestjs/common';
import { Body, Param, Query, Res } from '@nestjs/common/decorators/http/route-params.decorator';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from '../../../products/infrastructure/services/products.service';
import { ProductDto } from '../../../products/interface/dto/product.dto';
import { User } from '../../../repository/schemas/user.schema';
import { UserService } from '../../infrastructure/services/user.service';
import { HomeDto } from '../dto/home.dto';
import { LoginDto } from '../dto/login.dto';
import { UserDto } from '../dto/user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService, private readonly productsService: ProductsService) { }


    private readonly logger = new Logger(UserController.name);

    @Post()
    async create(@Res() res, @Body() user: UserDto) {

        const userExists = await this.userService.findByEmail(user.email);
        if (userExists) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Email already exists. Please login."
            })
        }

        if (!this.validateRole(user.role)) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Invalid Role."
            })
        }

        if (user.role == 'client' && user.client == null) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Please provide Client Information."
            })
        }

        if (user.role == 'vendor' && user.vendor == null) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Please provide Vendor Information."
            })
        }

        const newUser = await this.userService.create(user);
        return res.status(HttpStatus.OK).json({
            message: "User has been created successfully",
            newUser
        })
    }

    private validateRole(role: string): boolean {
        if (role == 'client' || role == 'vendor')
            return true;
        return false;
    }

    @Get()
    async getUsers(): Promise<UserDto[]> {
        return this.userService.findAll();
    }

    @Post('/login')
    async findById(@Res() res, @Body() loginDto: LoginDto) {
        this.logger.log(loginDto.email + ',' + loginDto.password);
        const userExists = await this.userService.findByEmail(loginDto.email);
        if (!userExists) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Email doesn't exists."
            })
        }
        if (userExists && userExists.password != null && userExists.password != loginDto.password) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Wrong email and password combination."
            })
        }

        let homeDto: HomeDto = {
            user: userExists,
            products: await this.getUserProducts(userExists)
        }

        return res.status(HttpStatus.OK).json({
            message: 'User has been successfully logged',
            homeDto
        });
    }

    private async getUserProducts(userDto: UserDto): Promise<ProductDto[]> {

        switch (userDto.role) {
            case 'client':
                return await this.productsService.findAll();
            case 'vendor':
                return await this.productsService.findByVendor(userDto.email);
            default:
                return null;
        }
    }

    @Put(':email')
    async update(@Res() res, @Param('email') email: string, @Body() userEdit: UserDto) {
        const userResponse = await this.userService.update(email, userEdit);
        if (!userResponse) throw new NotFoundException('username does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'User has been successfully updated',
            userResponse
        });
    }

    @Delete(':email')
    async delete(@Res() res, @Param('email') email: string) {
        const userResponse = await this.userService.deleteUser(email);
        if (!userResponse) throw new NotFoundException('User does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'User has been deleted',
            userResponse
        })
    }


}