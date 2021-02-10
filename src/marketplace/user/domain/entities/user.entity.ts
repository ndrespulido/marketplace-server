import { ClientEntity } from "./client.entity";
import { VendorEntity } from "./vendor.entity";


export class UserEntity {
	email: string;
	password: string;
	role: string;
	client: ClientEntity;
	vendor: VendorEntity;
}