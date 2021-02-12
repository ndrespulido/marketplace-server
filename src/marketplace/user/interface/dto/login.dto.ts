import { IsNotEmpty } from "class-validator";
import { ProductDto } from "../../../products/interface/dto/product.dto";
import { ClientDto } from "./client.dto";
import { VendorDto } from "./vendor.dto";

export class LoginDto {

    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    readonly role: string;

    readonly products: ProductDto[];
}