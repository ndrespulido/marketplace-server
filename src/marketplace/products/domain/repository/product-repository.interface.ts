
import { Product } from '../../../repository/schemas/products.schema';

export interface ProductRepositoryInterface {
    
    create(product: Product): Promise<Product>;

    findAll(): Promise<Product[]>;

    findByReference(reference: string): Promise<Product>;

    findByVendor(vendorEmail: string): Promise<Product[]>;

    update(reference: string, UserUpdate: Product): Promise<any>;

    delete(reference: string): Promise<any>;

}