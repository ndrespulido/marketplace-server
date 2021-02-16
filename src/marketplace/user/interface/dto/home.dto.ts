import { IsNotEmpty } from "class-validator";
import { ProductDto } from "../../../products/interface/dto/product.dto";
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from "./user.dto";

export class HomeDto {

    @ApiProperty()
    readonly user: UserDto;

    @ApiProperty()
    readonly products: ProductDto[];
}