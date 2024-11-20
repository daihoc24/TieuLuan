import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class ProductService {
  prisma = new PrismaClient();
  async getListProduct() {
    try {
      const product = await this.prisma.product.findMany({
        select: {
          products_id: true,
          products_name: true,
          products_image: true,
          products_price: true,
          products_comments: true,
          products_type:true,
        },
      });
      return { product };
    } catch (error) {
      console.error(error);
      throw new Error("Can't retrieve products!");
    }
  }
  async getProductInfor(id: number) {
    try {

      const product = await this.prisma.product.findUnique({
        where: {
          products_id: id,
        }
      });
      return { product };
    } catch {
      throw new Error("Can't find productID!");
    }
  }
  async addProduct(body: CreateProductDto) {
    try {
      const product = await this.prisma.product.create({
        data: body
      });
      return { product };
    } catch (err) {
      throw new Error(`Error creating user: ${err}`);
    }
  }
  async uploadProductImg(id: number, image: string) {
    try {
      const data = await this.prisma.product.findUnique({
        where: {
          products_id: id,
        },
      });
      if (!data) {
        throw new Error(`Product with id ${id} not found`);
      }
      const upload = await this.prisma.product.update({
        where: {
          products_id: id,
        },
        data: {
          products_image: image,
        },
      });

      return { data: upload };
    } catch (err) {
      throw new Error(`Error creating user: ${err}`);
    }
  }
  async updateProduct(id: number, body: UpdateProductDto) {
    try {
      const productExists = await this.prisma.product.findUnique({
        where: { products_id: id },
      });

      if (!productExists) {
        throw new Error(`Sản phẩm với id ${id} không tồn tại.`);
      }

      const product = await this.prisma.product.update({
        where: {
          products_id: id,
        },
        data: body,
      });
      return { product };
    } catch { }
  }
  async deleteProduct(id: number) {
    try {
      const product = await this.prisma.product.delete({
        where: {
          products_id: id,
        },
      });
      return {
        message: 'Order deleted successfully',
        product,
      };
    } catch { }
  }
}
