import { Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import {AuthGuard} from '@nestjs/passport';
import { AuthService } from './marketplace/auth/auth.service';
import { LocalAuthGuard } from './marketplace/auth/local-auth.guards';
import {JwtAuthGuard } from './marketplace/auth/jwt-auth.guards';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Param('username') username: string, @Param('password') password: string)
  //(@Request() req)
  {
    return this.authService.login({username,password})
    //(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}
