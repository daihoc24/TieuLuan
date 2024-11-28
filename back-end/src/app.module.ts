import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { BankAccountsModule } from './bank_accounts/bank_accounts.module';

@Module({
  imports: [ProductModule, UserModule, OrderModule, AuthModule, BankAccountsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
