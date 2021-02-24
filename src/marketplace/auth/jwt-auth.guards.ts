import { Injectable,ExecutionContext,UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
// import { IS_PUBLIC_KEY } from 'src/app.module';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
   
}
