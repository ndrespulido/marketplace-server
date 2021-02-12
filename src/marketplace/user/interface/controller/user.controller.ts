import { Controller, Delete, Get, HttpStatus, NotFoundException, Post, Put } from '@nestjs/common';
import { Body, Param, Query, Res } from '@nestjs/common/decorators/http/route-params.decorator';
import { User } from '../../../repository/schemas/user.schema';
import { UserService } from '../../infrastructure/services/user.service';
import { UserDto } from '../dto/user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async create(@Res() res, @Body() user: UserDto) {

        const userExists = await this.userService.findByEmail(user.email);
        if (userExists) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: "Email already exists. Please login."                
            })
        }

        const newUser = await this.userService.create(user);
        return res.status(HttpStatus.OK).json({
            message: "User has been created successfully",
            newUser
        })
    }

    @Get()
    async getUsers(): Promise<UserDto[]> {
        return this.userService.findAll();
    }

    //@Get('/login')
    //async findById(@Res() res, @Param('username') username: string, @Param('password') password: string) {
    //    const user = await this.userService.login(username, password);
    //    if (!user) throw new NotFoundException('Login does not exist, or wrong password!');
    //    return res.status(HttpStatus.OK).json(user);
    //}

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