import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
    @ApiProperty()
    @IsNotEmpty()
    products_name: string;

    @ApiProperty()
    @IsNotEmpty()
    products_price: number;

    @ApiProperty()
    @IsNotEmpty()
    products_type: string;

    @ApiProperty()
    @IsNotEmpty()
    products_comments: string;


}
