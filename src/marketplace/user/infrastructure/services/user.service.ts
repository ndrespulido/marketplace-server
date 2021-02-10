import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../../repository/schemas/user.schema';
import { UserRepositoryInterface } from '../../domain/repository/user-repository.interface';
import { UserDto } from '../../interface/dto/user.dto';
import { Client } from '../../../repository/schemas/client.schema';
import { Vendor } from '../../../repository/schemas/vendor.schema';
import { ClientDto } from '../../interface/dto/client.dto';
import { VendorDto } from '../../interface/dto/vendor.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
        @Inject('UserRepositoryInterface') private repository: UserRepositoryInterface) { }

    async create(userDto: UserDto): Promise<any> {

        const registerUser: User = {
            email: userDto.email,
            password: userDto.password,
            role: userDto.role
        };

        const newUser = await this.repository.create(registerUser);

        switch (userDto.role) {
            case 'client':
                if (!userDto.client) break;
                const registerClient: Client = {
                    email: userDto.email,
                    name: userDto.client.name,
                    lastname: userDto.client.lastname,
                    birthdate: userDto.client.birthdate
                };
                var newClient = this.repository.createClient(registerClient);
                break;
            case 'vendor':
                if (!userDto.vendor) break;
                const registerVendor: Vendor = {
                    email: userDto.email,
                    name: userDto.vendor.companyName,
                    siret: userDto.vendor.siret
                };
                var newVendor = this.repository.createVendor(registerVendor);
                break;
            default:
        }

        return userDto;
    }

    async findAll(): Promise<UserDto[]> {
        let userListDto: UserDto[] = [];
        var userList = await this.repository.findAll();
        for (let user of userList) {

            let userDto: UserDto = {
                email: user.email,
                password: user.password,
                role: user.role,
                client: await this.getClientFromUser(user),
                vendor: await this.getVendorFromUser(user)
            }; 
            userListDto.push(userDto);
        }
        return userListDto;
    }

    async getClientFromUser(user: User): Promise<ClientDto> {
        if (user.role != 'client')
            return null;
        const client = await this.repository.findClientByEmail(user.email);
        if (!client)
            return null;
        const clientDto : ClientDto = {
            name: client.name,
            lastname: client.lastname,
            birthdate: client.birthdate
        };
        return clientDto;
    }

    async getVendorFromUser(user: User): Promise<VendorDto> {
        if (user.role != 'vendor')
            return null;
        const vendor = await this.repository.findVendorByEmail(user.email);
        if (!vendor)
            return null;
        const vendorDto: VendorDto = {
            companyName: vendor.name,
            siret: vendor.siret
        };
        return vendorDto;
    }

    async findByEmail(email: string): Promise<User> {
        const customer = await this.repository.findByEmail(email);
        return customer;
    }

    async login(username, password): Promise<User> {
        const customer = await this.userModel.findOne({ username: username, password: password }).exec();
        return customer;
    }

    async update(username, UserUpdate: User): Promise<any> {
        return await this.userModel.findOneAndUpdate({ username: username }, UserUpdate, { new: true }).exec();
    }

    async delete(username): Promise<any> {
        return await this.userModel.findOneAndRemove({ username: username });
    }

}