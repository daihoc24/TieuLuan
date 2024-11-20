import { Injectable, UnauthorizedException } from '@nestjs/common';
import { loginDTO } from './dto/login.dto';
import { signupDTO } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }
  prisma = new PrismaClient();
  async login(body: loginDTO) {
    const { user_email, user_password } = body;
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          user_email,
        },
      });
      if (!user) {
        throw new UnauthorizedException();
      }

      const passComparre = await bcrypt.compare(user_password, user.user_password);

      if (!passComparre) {
        throw new UnauthorizedException();
      }
      const token = this.jwtService.sign(
        { data: { id: user.user_id, user_email } },
        {
          expiresIn: this.configService.get('EXPIRES_IN'),
          secret: this.configService.get('SECRET_KEY'),
        },
      );
      return {
        status: 200,
        message: 'Đăng nhập thành công',
        accessToken: token,
      };
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
  async signup(body: signupDTO) {
    const { address, ...userData } = body;
    const passBcrypt: string = await bcrypt.hash(userData.user_password, 10);
    const checkEmail = await this.prisma.user.findFirst({
      where: {
        user_email: userData.user_email,
      },
    });
    if (!checkEmail) {
      const createdAddress = await this.prisma.address.create({
        data: {
          soNha: address.soNha,
          duong: address.duong,
          phuong: address.phuong,
          huyen: address.huyen,
          tinh: address.tinh,
        },
      });

      // Tạo mới User và liên kết với Address
      const createdUser = await this.prisma.user.create({
        data: {
          ...userData,
          user_password: passBcrypt,
          user_role: "user",
          address: {
            connect: { address_id: createdAddress.address_id },
          },
        },
      });
      return createdUser;
    } else {
      return {
        status: 400,
        message: 'Email đã tồn tại. ',
      };
    }
  }
}
