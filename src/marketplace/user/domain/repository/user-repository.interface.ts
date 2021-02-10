import { Client } from '../../../repository/schemas/client.schema';
import { User } from '../../../repository/schemas/user.schema';
import { Vendor } from "../../../repository/schemas/vendor.schema";


/**
 * Implement this repository for user storage
 */
export interface UserRepositoryInterface {
    /**
     * Create a user and register it into the database
     * @param user
     */
    create(user: User): Promise<User>;

    /**
     * Implement this function to retrieve the list of users    
     * @throws UserNotFoundException
     */
    findAll(): Promise<User[]>;

    /**
     * Finds a user by its email
     * @param email
     * @throws UserNotFoundException
     */
    findByEmail(email: string): Promise<User>;

    login(email: string, password: string): Promise<User>;

    update(email: string, UserUpdate: User): Promise<any>;

    delete(email: string): Promise<any>;

    createClient(client: Client): Promise<any>;

    findClientByEmail(email): Promise<Client>;

    createVendor(vendor: Vendor): Promise<any>;

    findVendorByEmail(email): Promise<Vendor>;
    

}