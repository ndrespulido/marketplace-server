import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../repository/schemas/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async create(user: User): Promise<any> {
        const newUser = await this.userModel.create(user);
        return newUser.save();
    }
    
    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findByUsername(username): Promise<User> {
        const customer = await this.userModel.findOne({ username: username }).exec();
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