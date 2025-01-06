import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { BankAccountsModule } from './bank_accounts/bank_accounts.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ProductModule,
    UserModule,
    OrderModule,
    AuthModule,
    BankAccountsModule,
    ConfigModule.forRoot({
      isGlobal: true, // Đảm bảo ConfigModule khả dụng trên toàn bộ ứng dụng
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
