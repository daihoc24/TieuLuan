import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PaymentService } from './bank_accounts.service';
import { ValidatePaymentDto } from './dto/validatePayment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/authGuard';

ApiTags('Payment')
@Controller('api/Payment') export class BankAccountsController {
  constructor(private readonly paymenService: PaymentService) { }
  @Post('/validate-payment/:orderId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async validatePayment(@Body() paymentData: ValidatePaymentDto, @Param('orderId') orderId: string) {
    return this.paymenService.validatePayment(paymentData, +orderId);
  }

}
