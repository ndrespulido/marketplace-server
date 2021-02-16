import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDate } from "class-validator";

export class ClientDto {
    @ApiProperty()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly lastname: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    readonly birthdate: Date;
}