import { ApiProperty } from '@nestjs/swagger';

export class VendorDto {
    @ApiProperty()
    readonly companyName: string;
    @ApiProperty()
    readonly siret: string;
}