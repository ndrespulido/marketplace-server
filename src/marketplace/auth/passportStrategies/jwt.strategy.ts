
import {PassportStrategy} from '@nestjs/passport';
import {HttpException, HttpStatus, Injectable, UnauthorizedException}from '@nestjs/common';
import {AuthService} from '../auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserDto } from '../../user/interface/dto/user.dto';
import { UserService } from '../../user/infrastructure/services/user.service';

require("dotenv").config();
const authSecretJWT=process.env.AUTH_SECRET_JWT;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authSecretJWT,
    });
    }

    async validateUser(payload: any): Promise<UserDto> {
        const user = await this.userService.findByPayload(payload);
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }

    async validate(payload: any): Promise<UserDto> {
        const user = await this.validateUser(payload);
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
}