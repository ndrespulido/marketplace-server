import { IsEmail, IsNotEmpty } from "class-validator";
import { ProductDto } from "../../../products/interface/dto/product.dto";
import { ClientDto } from "./client.dto";
import { VendorDto } from "./vendor.dto";
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from "./user.dto";

export class LoginDto {

    @ApiProperty()
    @IsEmail()
    readonly email: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly password: string;
}