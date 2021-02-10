import { IsNotEmpty } from "class-validator";
import { ClientDto } from "./client.dto";
import { VendorDto } from "./vendor.dto";

export class UserDto {

    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;

    @IsNotEmpty()
    readonly role: string;

    readonly client: ClientDto;

    readonly vendor: VendorDto;
}