import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from '../user/infrastructure/services/user.service';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService:UserService,
        private readonly jwtService:JwtService,
    ){}

    async validateUser(username:string,pass:string):Promise<any>{
        
        
        
        const user = await this.usersService.findOneUser(username);
        if(user && user.password === pass){
            const {password,...result} = user;
            return result;
        }
        return null;
    }

    async login(user:any){

        const payload = {username: user.username, sub: user.userId };

        console.log("debug mano Point A" + payload);
        
        return { access_token: this.jwtService.sign(payload),};
    }
}