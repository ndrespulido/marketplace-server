import { Module } from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {UserModule} from '../user/user.module';
import {AuthService} from './auth.service';
//import {JwtConstants} from './constants';
import {JwtStrategy} from './passportStrategies/jwt.strategy';
import {LocalStrategy} from './local.strategy';
import { AuthController } from './auth.controller';

require("dotenv").config();
const authExpireIn=process.env.AUTH_EXPIRE_IN;
const authSecretJWT=process.env.AUTH_SECRET_JWT;

@Module({
    imports:[UserModule,PassportModule,
        JwtModule.register({ secret: authSecretJWT,
            signOptions: {expiresIn:authExpireIn},     
    })],
providers:[AuthService,LocalStrategy,JwtStrategy],
exports:[AuthService],
controllers: [AuthController],
})

export class AuthModule{}