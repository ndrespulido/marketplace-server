import { ApiProperty } from '@nestjs/swagger';

export class ClientDto {
    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly lastname: string;
    @ApiProperty()
    readonly birthdate: Date;
}