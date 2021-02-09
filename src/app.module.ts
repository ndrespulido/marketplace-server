import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './marketplace/user/user.module';
import { VendorModule } from './marketplace/vendor/vendor.module';
import { ClientModule } from './marketplace/client/client.module';
import {ProductsModule} from './marketplace/products/products.module';

var connectionString = "mongodb+srv://poc-backend:jiGklYRU6ExZrO49@market-poc.s2ki9.mongodb.net/market-comply?retryWrites=true&w=majority";

@Module({
  imports: [ProductsModule,UserModule, VendorModule, ClientModule, MongooseModule.forRoot(connectionString)]
})

export class AppModule {

}
