import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type ClientDocument = Client & Document;

@Schema()
export class Client {
	@Prop()
	name: string;
	@Prop()
	lastname: string;
	@Prop()
	bithdate: Date;
	@Prop()
	username: string;
}
export const ClientSchema = SchemaFactory.createForClass(Client);