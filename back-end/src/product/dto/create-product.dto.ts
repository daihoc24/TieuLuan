import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

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
    quantitySold: number = 0;  // Mặc định quantitySold = 0
}
