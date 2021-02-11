import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './marketplace/user/user.module';
import { ProductsModule } from './marketplace/products/products.module';

require("dotenv").config();
const connectionString = process.env.CONNECTION_STRING;


@Module({
    imports: [ProductsModule, UserModule, MongooseModule.forRoot(connectionString)]
})

export class AppModule {

}
