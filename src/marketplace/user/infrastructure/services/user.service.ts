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
import { LoginDto } from '../../interface/dto/login.dto';

@Injectable()
export class UserService {
    constructor(@Inject('UserRepositoryInterface') private repository: UserRepositoryInterface) { }

    async create(userDto: UserDto): Promise<any> {

        const registerUser = await this.userDtoToUser(userDto);
        const newUser = await this.repository.create(registerUser);

        switch (userDto.role) {
            case 'client':
                if (!userDto.client) break;
                const registerClient = await this.userDtoToClient(userDto);
                var newClient = this.repository.createClient(registerClient);
                break;
            case 'vendor':
                if (!userDto.vendor) break;
                const registerVendor = await this.userDtoToVendor(userDto);
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
            userListDto.push(await this.userToUserDto(user));
        }
        return userListDto;
    }

    private async userToUserDto(user: User): Promise<UserDto> {        
        let userDto: UserDto = {
            email: user.email,
            password: user.password,
            role: user.role,
            client: await this.getClientFromUser(user),
            vendor: await this.getVendorFromUser(user)
        };
        return userDto;
    }

    private async userDtoToUser(userDto: UserDto): Promise<User> {
        let user: User = {
            email: userDto.email,
            password: userDto.password,
            role: userDto.role
        };
        return user;
    }

    private async userDtoToClient(userDto: UserDto): Promise<Client> {
        if (!userDto.client) return null;
        let client: Client = {
            email: userDto.email,
            name: userDto.client.name,
            lastname: userDto.client.lastname,
            birthdate: userDto.client.birthdate
        };
        return client;
    }

    private async userDtoToVendor(userDto: UserDto): Promise<Vendor> {
        if (!userDto.vendor) return null;
        let vendor: Vendor = {
            email: userDto.email,
            name: userDto.vendor.companyName,
            siret: userDto.vendor.siret
        };
        return vendor;
    }

    //Client
    async getClientFromUser(user: User): Promise<ClientDto> {
        if (user.role != 'client')
            return null;
        const client = await this.repository.findClientByEmail(user.email);
        if (!client)
            return null;
        const clientDto: ClientDto = {
            name: client.name,
            lastname: client.lastname,
            birthdate: client.birthdate
        };
        return clientDto;
    }

    //Vendor
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

    async findByEmail(email: string): Promise<UserDto> {
        const user = await this.repository.findByEmail(email);
        if (!user) return null;
        return await this.userToUserDto(user);
    }

    async login(email, password): Promise<LoginDto> {
        const customer = await this.repository.findByEmail(email);
        return customer;
    }

    async update(email, userUpdate: UserDto): Promise<any> {
        const user = await this.userDtoToUser(userUpdate);
        const response = await this.repository.updateUser(email, user);

        const client = await this.userDtoToClient(userUpdate);
        await this.repository.updateClient(email, client);

        const vendor = await this.userDtoToVendor(userUpdate);
        await this.repository.updateVendor(email, vendor);

        return response;
    }

    async deleteUser(email): Promise<any> {
        return await this.repository.deleteUser(email);
    }

}
