import { IsNotEmpty, IsEmail } from "class-validator";
import { ClientDto } from "./client.dto";
import { VendorDto } from "./vendor.dto";
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly password: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly role: string;

    @ApiProperty()
    readonly client: ClientDto;

    @ApiProperty()
    readonly vendor: VendorDto;
}