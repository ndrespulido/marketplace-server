import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './marketplace/user/user.module';
import { VendorModule } from './marketplace/vendor/vendor.module';
import { ClientModule } from './marketplace/client/client.module';

var connectionString = "mongodb://localhost:27017/market-comply";

@Module({
  imports: [UserModule, VendorModule, ClientModule, MongooseModule.forRoot(connectionString)]
})

export class AppModule {

}
