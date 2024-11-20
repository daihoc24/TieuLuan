import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  prisma = new PrismaClient();

  // Thông tin chọn lọc cho người dùng
  selectInfoUser = {
    user_fullname: true,
    user_email: true,
    user_phone: true,
    user_birthDate: true,
    user_role: true,
    address: {  // Chú ý rằng chúng ta gọi tên bảng là 'address' (vì Prisma dùng 'address' thay vì 'Address')
      select: {
        soNha: true,
        duong: true,
        phuong: true,
        huyen: true,
        tinh: true,
      },
    },
  };

  // Lấy danh sách người dùng
  async getListUser() {
    try {
      const users = await this.prisma.user.findMany({
        select: {
          user_id: true,
          user_fullname: true,
          user_email: true,
          user_phone: true,
          user_birthDate: true,
          user_role: true,
          address: {
            select: {
              soNha: true,
              duong: true,
              phuong: true,
              huyen: true,
              tinh: true,
            },
          },
        },
      });
      return { users };
    } catch (err) {
      throw new Error(`Error getting users: ${err}`);
    }
  }

  // Lấy thông tin người dùng theo ID
  async getUserInfor(userId: number) {
    try {
      const data = await this.prisma.user.findUnique({
        select: this.selectInfoUser,
        where: {
          user_id: userId,
        },
      });
      return { data };
    } catch (err) {
      throw new Error(`Error fetching user info: ${err}`);
    }
  }

  // Tạo người dùng mới
  async createUser(body: CreateUserDto) {
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
          // Sử dụng quan hệ để kết nối User với Address (thay vì gán address_id trực tiếp)
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

  // Cập nhật thông tin người dùng
  async updateUser(userId: number, body: UpdateUserDto) {
    const { address, ...userData } = body;

    // Cập nhật hoặc tạo mới thông tin Address nếu có
    let updatedAddresses;
    if (address) {
      updatedAddresses = await this.prisma.address.upsert({
        where: { user_id: userId },
        update: address,
        create: {
          user_id: userId,
        },
      });
    }

    // Cập nhật thông tin User
    const updatedUser = await this.prisma.user.update({
      where: { user_id: userId },
      data: {
        ...userData,
        // Không cần cập nhật address_id nữa vì mối quan hệ là 1-nhiều
        address: updatedAddresses ? { connect: { address_id: updatedAddresses.address_id } } : undefined,
      },
    });

    return updatedUser;
  }

  // Xóa người dùng
  async deleteUser(userId: number) {
    try {
      const data = await this.prisma.user.delete({
        where: {
          user_id: userId,
        },
      });
      return { data };
    } catch (err) {
      throw new Error(`Error deleting user: ${err}`);
    }
  }
}
