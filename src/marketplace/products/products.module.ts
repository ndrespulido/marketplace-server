import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { Product, ProductSchema } from '../repository/schemas/products.schema';
import { ProductRepository } from './infrastructure/repository/product.repository';
import { ProductsService } from './infrastructure/services/products.service';
import { ProductsController } from './interface/controller/products.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])],
    controllers: [ProductsController],
    providers: [{ provide: 'ProductRepositoryInterface', useClass: ProductRepository }, ProductsService]
})

export class ProductsModule {}  