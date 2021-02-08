import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { VendorController } from './vendor.controller';
import { VendorService } from './vendor.service';
import { VendorSchema, Vendor } from '../repository/schemas/vendor.schema'

@Module({
  imports: [ MongooseModule.forFeature([{ name: Vendor.name, schema: VendorSchema }])],
  controllers: [VendorController],
  providers: [VendorService]
})

export class VendorModule {
    
}



