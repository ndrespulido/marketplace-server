import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './marketplace/user/user.module';
import { ProductsModule } from './marketplace/products/products.module';
import {AuthModule} from './marketplace/auth/auth.module';
import {AppController} from './app.controller';
import { JwtAuthGuard } from './marketplace/auth/jwt-auth.guards';
import { APP_GUARD } from '@nestjs/core';
import { APP_FILTER } from '@nestjs/core'
import { SetMetadata } from '@nestjs/common';

// export const IS_PUBLIC_KEY = 'isPublic';
// export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

require("dotenv").config();
const connectionString = process.env.CONNECTION_STRING;


@Module({
    imports: [ProductsModule,AuthModule, UserModule, MongooseModule.forRoot(connectionString)],
    controllers:[AppController],
    // providers: [
    //     {
    //       provide: APP_GUARD,
    //       useClass: JwtAuthGuard,
    //     },
    //   ],
})

export class AppModule {

}
