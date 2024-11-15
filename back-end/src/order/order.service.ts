import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class OrderService {
  prisma = new PrismaClient();
  async getListOrder() {
    try {
      const data = await this.prisma.order.findMany({
        include: {
          User: {
            select: {
              user_fullname: true,
              user_phone: true,
            },
          },
          Address: {
            select: {
              soNha: true,
              duong: true,
              phuong: true,
              huyen: true,
              tinh: true,
            },
          },
          OrderProduct: {
            select: {
              quantity: true,
              Product: {
                select: {
                  products_name: true,
                  products_price: true,
                  products_image: true,
                },
              },
            },
          },
        },
      });

      return { data };
    } catch (err) {
      throw new Error(`Error getting users: ${err}`);
    }
  }
  async getOrderById(orderId: number) {
    try {
      const data = await this.prisma.order.findUnique({
        where: {
          order_id: orderId,
        },
        include: {
          User: {
            select: {
              user_fullname: true,
              user_phone: true,
            },
          },
          Address: {
            select: {
              soNha: true,
              duong: true,
              phuong: true,
              huyen: true,
              tinh: true,
            },
          },
          OrderProduct: {
            select: {
              quantity: true,
              Product: {
                select: {
                  products_name: true,
                  products_price: true,
                  products_image: true,
                },
              },
            },
          },
        },
      });

      if (!data) {
        throw new Error(`Order with id ${orderId} not found`);
      }

      return { data };
    } catch (err) {
      throw new Error(`Error getting order: ${err}`);
    }
  }
  async createOrder(body: CreateOrderDto) {
    const { user_id, address_id, orderProducts, phiShip } = body;

    // Tính tổng giá trị đơn hàng
    let totalAmount = 0;

    // Lấy thông tin giá của các sản phẩm trong order
    for (const orderProduct of orderProducts) {
      const product = await this.prisma.product.findUnique({
        where: { products_id: orderProduct.products_id },
      });

      if (product && product.products_price) {
        totalAmount += product.products_price * orderProduct.quantity;
      }
    }

    // Tạo đơn hàng
    const order = await this.prisma.order.create({
      data: {
        user_id,
        address_id,
        status:'Đang xử lí',
        phiShip:15000,
        thoiGian:'23 phút',
        totalAmount: totalAmount + phiShip, // Cộng phí ship vào tổng số tiền
        OrderProduct: {
          create: orderProducts.map((item) => ({
            quantity: item.quantity,
            products_id: item.products_id,
          })),
        },
      },
    });

    return order;
  }
}
