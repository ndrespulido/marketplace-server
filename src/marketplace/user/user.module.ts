import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { UserService } from './infrastructure/services/user.service';
import { UserSchema, User } from '../repository/schemas/user.schema'
import { ClientSchema, Client } from '../repository/schemas/client.schema'
import { VendorSchema, Vendor } from '../repository/schemas/vendor.schema'
import { UserController } from './interface/controller/user.controller';
import { UserRepository } from './infrastructure/repository/user.repository';
import { ProductsService } from '../products/infrastructure/services/products.service';
import { ProductRepository } from '../products/infrastructure/repository/product.repository';
import { Product, ProductSchema } from '../repository/schemas/products.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema },{ name: User.name, schema: UserSchema }, { name: Vendor.name, schema: VendorSchema }, { name: Client.name, schema: ClientSchema }])],
    controllers: [UserController],
    providers: [{ provide: 'UserRepositoryInterface', useClass: UserRepository }, { provide: 'ProductRepositoryInterface', useClass: ProductRepository }, UserService, ProductsService]
})

export class UserModule {
    
}


