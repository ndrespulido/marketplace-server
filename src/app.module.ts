import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './marketplace/user/user.module';
import { ProductsModule } from './marketplace/products/products.module';
import { VendorModule } from './marketplace/vendor/vendor.module';
import {AuthModule} from './marketplace/auth/auth.module';
import {AppController} from './app.controller';

require("dotenv").config();
const connectionString = process.env.CONNECTION_STRING;


@Module({
    imports: [ProductsModule,AuthModule, UserModule, MongooseModule.forRoot(connectionString)],
    controllers:[AppController],
})

export class AppModule {

}
