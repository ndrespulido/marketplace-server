
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException}from '@nestjs/common';
import {AuthService} from '../auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';

require("dotenv").config();
const authSecretJWT=process.env.AUTH_SECRET_JWT;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authSecretJWT,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}