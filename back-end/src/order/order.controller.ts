import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags } from '@nestjs/swagger';

ApiTags('Order')
@Controller('api/Order') export class OrderController {
  constructor(private readonly orderService: OrderService) { }
  @Get('/getListOrder')
  getListOrder() {
    return this.orderService.getListOrder();
  }
  @Get('/getOrderById/:orderId')
  getOrderById(@Param('orderId') orderId: number) {
    return this.orderService.getOrderById(+orderId);
  }
  @Post('/createOrder')
  createOrder(@Body() CreateOrderDto: CreateOrderDto,
  ) {
    return this.orderService.createOrder(CreateOrderDto);
  }
  @Put('/UpdateOrder/:id')
  updateOrder(
    @Param('id') id: string,
    @Body() body: UpdateOrderDto,
  ) {
    return this.orderService.updateOrder(+id, body);
  }
  @Delete('/DeleteOrder/:id')
  deleteOrder(@Param('id') id: string
  ) {
    return this.orderService.deleteOrder(+id);
  }
}
