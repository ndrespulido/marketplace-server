import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
    @ApiProperty()
    readonly title: string;
    @ApiProperty()
    readonly reference: string;
    @ApiProperty()
    readonly description: string;
    @ApiProperty()
    readonly imageUrl: string;
    @ApiProperty()
    readonly price: number;
    @ApiProperty()
    readonly stock: number;
    @ApiProperty()
    readonly vendorEmail: string;
    @ApiProperty()
    readonly vendorName: string;
}