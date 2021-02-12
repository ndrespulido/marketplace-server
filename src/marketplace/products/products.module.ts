import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { Product, ProductSchema } from '../repository/schemas/products.schema';
import { UserRepository } from '../user/infrastructure/repository/user.repository';
import { ProductRepository } from './infrastructure/repository/product.repository';
import { ProductsService } from './infrastructure/services/products.service';
import { ProductsController } from './interface/controller/products.controller';
import { UserSchema, User } from '../repository/schemas/user.schema'
import { ClientSchema, Client } from '../repository/schemas/client.schema'
import { VendorSchema, Vendor } from '../repository/schemas/vendor.schema'

@Module({
    imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }, { name: User.name, schema: UserSchema }, { name: Vendor.name, schema: VendorSchema }, { name: Client.name, schema: ClientSchema }])],
    controllers: [ProductsController],
    providers: [{ provide: 'ProductRepositoryInterface', useClass: ProductRepository },
                { provide: 'UserRepositoryInterface', useClass: UserRepository }, ProductsService]
})

export class ProductsModule {}  