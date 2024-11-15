import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, Put, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
@Controller('api/Product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get('/GetListProduct')
  async getListProduct(@Res() res: Response) {
    res.send({
      message: 'Xử lí thành công!',
      data: (await this.productService.getListProduct()).product,
    });
  }
  @Get('/ProductInformation')
  async getProductInfor(@Query('products_id') products_id: string, @Res() res: Response) {
    res.send({
      message: 'Xử lí thành công!',
      data: (await this.productService.getProductInfor(+products_id)).product,
    });
  }
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Post('/AddProduct')
  addProduct(@Body() CreateProductDto: CreateProductDto // , @Req() req: getData
  ) {
    // if (req.user.role === 'admin') {
    return this.productService.addProduct(CreateProductDto);
    // } else {
    //   throw new UnauthorizedException('Bạn không có quyền truy cập!');
    // }
  }
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Put('/UpdateProduct/:id')
  updateProduct(
    @Param('id') id: string,
    @Body() body: UpdateProductDto,
    // @Req() req: getData,
  ) {
    // if (req.user.role === 'admin') {
    return this.productService.updateProduct(+id, body);
    // }
    // throw new UnauthorizedException('Bạn không có quyền truy cập!');
  }
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Delete('/DeleteProduct/:id')
  deleteProduct(@Param('id') id: string
    // ,@Req() req: getData
  ) {
    // if (req.user.role === 'admin') {
    return this.productService.deleteProduct(+id);
    // }
    // throw new UnauthorizedException('Bạn không có quyền truy cập!');
  }

}
