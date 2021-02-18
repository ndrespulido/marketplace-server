import { Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import {AuthGuard} from '@nestjs/passport';
import { AuthService } from './marketplace/auth/auth.service';
import { LocalAuthGuard } from './marketplace/auth/local-auth.guards';
import {JwtAuthGuard } from './marketplace/auth/jwt-auth.guards';
import { Console } from 'console';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req)
  {
      console.log(req.body.username);
      console.log(req.user._doc);
      return this.authService.login(req.body.username);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req : any) {
    return req.user;
  }

}
