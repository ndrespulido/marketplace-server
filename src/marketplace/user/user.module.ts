import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { UserService } from './infrastructure/services/user.service';
import { UserSchema, User } from '../repository/schemas/user.schema'
import { ClientSchema, Client } from '../repository/schemas/client.schema'
import { VendorSchema, Vendor } from '../repository/schemas/vendor.schema'
import { UserController } from './interface/controller/user.controller';
import { UserRepository } from './infrastructure/repository/user.repository';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Vendor.name, schema: VendorSchema }, { name: Client.name, schema: ClientSchema }])],
    controllers: [UserController],
    providers: [{ provide: 'UserRepositoryInterface', useClass: UserRepository }, UserService]
})

export class UserModule {
    
}


