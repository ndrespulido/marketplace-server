import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from '../user/infrastructure/services/user.service';
import {JwtService} from '@nestjs/jwt';

require("dotenv").config();
const authExpireIn=process.env.AUTH_EXPIRE_IN;

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService:UserService,
        private readonly jwtService:JwtService,
    ){}

    async validateUser(email:string,pass:string):Promise<any>{
        const user = await this.usersService.login(email,pass)
        if(user && user.password === pass){
            const {password,...result} = user;
            return result;
        }
        return null;
    }

    async login(user:any){

        const payload = {username: user.username, sub: user.userId };
        return { access_token: this.jwtService.sign(payload),expiresIn:authExpireIn};
    }
}