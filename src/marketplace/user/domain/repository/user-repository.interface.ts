import { Client } from '../../../repository/schemas/client.schema';
import { User } from '../../../repository/schemas/user.schema';
import { Vendor } from "../../../repository/schemas/vendor.schema";

export interface UserRepositoryInterface {

    create(user: User): Promise<User>;

    findAll(): Promise<User[]>;

    findByEmail(email: string): Promise<User>;

    login(email: string, password: string): Promise<User>;

    updateUser(email: string, UserUpdate: User): Promise<any>;

    deleteUser(email: string): Promise<any>;

    createClient(client: Client): Promise<any>;

    findClientByEmail(email): Promise<Client>;

    updateClient(email: string, clientUpdate: Client): Promise<any>;

    createVendor(vendor: Vendor): Promise<any>;

    findVendorByEmail(email): Promise<Vendor>;

    updateVendor(email: string, vendorUpdate: Vendor): Promise<any>;   

}