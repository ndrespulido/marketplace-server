import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './marketplace/user/user.module';
import { ProductsModule } from './marketplace/products/products.module';

const connectionString = "mongodb+srv://poc-backend:jiGklYRU6ExZrO49@market-poc.s2ki9.mongodb.net/market-comply?retryWrites=true&w=majority";

@Module({
    imports: [ProductsModule, UserModule, MongooseModule.forRoot(connectionString)]
})

export class AppModule {

}
