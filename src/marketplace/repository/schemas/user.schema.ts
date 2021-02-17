
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {hash} from 'bcrypt';

require("dotenv").config();
const bcryptWorkFactor=process.env.BCRYPT_WORK_FACTOR;

export type UserDocument = User & Document;

@Schema()
export class User {
	@Prop()
	password: string;
	@Prop()
	email: string;
	@Prop()
	role: string;
	// @Prop()
	// username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save',async function(){
	if(this.isModified('password')){
		this.password = await hash(this.password,bcryptWorkFactor)
	}
});
