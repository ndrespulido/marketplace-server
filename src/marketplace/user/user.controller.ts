import { Controller, Delete, Get, HttpStatus, NotFoundException, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../repository/schemas/user.schema';
import { Body, Param, Query, Res } from '@nestjs/common/decorators/http/route-params.decorator';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async addCustomer(@Res() res, @Body() user: User) {
        const newUser = await this.userService.create(user);
        return res.status(HttpStatus.OK).json({
            message: "User has been created successfully",
            newUser
        })
    }

    @Get()
    async getUsers(): Promise<User[]> {
        return this.userService.findAll();
    }    

    @Get('/login')
    async findById(@Res() res, @Param('username') username: string, @Param('password') password: string) {
        const user = await this.userService.login(username, password);
        if (!user) throw new NotFoundException('Login does not exist, or wrong password!');
        return res.status(HttpStatus.OK).json(user);
    }

    @Put(':username')
    async update(@Res() res, @Param('username') username: string, @Body() userEdit: User) {
        const userResponse = await this.userService.update(username, userEdit);
        if (!userResponse) throw new NotFoundException('username does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'User has been successfully updated',
            userResponse
        });
    }

    @Delete(':username')
    async delete(@Res() res, @Param('username') username: string) {
        const userResponse = await this.userService.delete(username);
        if (!userResponse) throw new NotFoundException('User does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'User has been deleted',
            userResponse
        })
    }


}