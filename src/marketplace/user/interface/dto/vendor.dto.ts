import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from "class-validator";

export class VendorDto {
    @ApiProperty()
    @IsNotEmpty()
    readonly companyName: string;
    @ApiProperty()
    @IsNotEmpty()
    readonly siret: string;
}