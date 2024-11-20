import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, Put, Req, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Response } from 'express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/authGuard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiFile } from './apiFile';
import { diskStorage } from 'multer';

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
  @Post('/upload-productImg/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiFile()
  @UseInterceptors(
    FilesInterceptor('file', 10, {
      storage: diskStorage({
        destination: process.cwd() + '/public/img',
        filename: (req, file, callback) =>
          callback(
            null, // define lỗi (ignore)
            new Date().getTime() + `_${file.originalname}`,
          ),
      }),
    }),
  )
  async uploadImg(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    for (const file of files) {
      console.log(file);
      res.send({
        message: 'Xử lí thành công!',
        data: await this.productService.uploadProductImg(
          +id,
          file.destination + '/' + file.originalname,
        ),
      });
    }
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
