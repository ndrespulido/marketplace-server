import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type VendorDocument = Vendor & Document;

@Schema()
export class Vendor {
	@Prop()
	name: string;
	@Prop()
	siret: string;
	@Prop()
	email: string;
}
export const VendorSchema = SchemaFactory.createForClass(Vendor);