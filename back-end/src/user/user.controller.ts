import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Req, UnauthorizedException, UseGuards, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { getData } from './interface';
import { JwtAuthGuard } from 'src/auth/authGuard';
import { Response } from 'express';
interface UpdatePasswordDto {
  currentPassword: string;
  newPassword: string;
}
@ApiTags('User')
@Controller('api/User') export class UserController {
  constructor(private readonly userService: UserService,
    private configService: ConfigService) { }
  @Get('/getListUser')
  async getListUser(@Res() res: Response) {
    res.send({
      message: 'Xử lí thành công!',
      content: ((await this.userService.getListUser()).users)
    });
  }
  @Get('/UserInformation/:userId')
  @UseGuards(JwtAuthGuard)
  async getUserInfor(@Param('userId') userId: number, @Res() res: Response) {
    res.send({
      message: 'Xử lí thành công!',
      content: ((await this.userService.getUserInfor(+userId)).data)
    });
  }
  @Post('/creatUser')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async creatUser(@Body() CreateUserDto: CreateUserDto,
    @Req() req: getData, @Res() res: Response
  ) {
    // if (req.user.role === 'admin') {
    res.send({
      message: 'Xử lí thành công!',
      content: ((await this.userService.createUser(CreateUserDto)))
    });    // }
    // throw new UnauthorizedException('Bạn không có quyền truy cập!');
  }
  @Post('/update-password/:userId')
  @UseGuards(JwtAuthGuard)
  async updatePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param('userId') userId: number,
    @Req() req: any,
    @Res() res: Response
  ) {
    // Gọi service để thay đổi mật khẩu
    const updatedUser = await this.userService.updatePassword(+userId, updatePasswordDto);
    return res.status(200).json({
      message: 'Password updated successfully',
      content: updatedUser,
    });
  }
  @Put('/UpdateUser/:userId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Param('userId') userId: string,
    @Body() body: UpdateUserDto,
    @Req() req: getData,
    @Res() res: Response
  ) {
    // if (req.user.role === 'admin') {
    res.send({
      message: 'Xử lí thành công!',
      content: ((await this.userService.updateUser(+userId, body)))
    });      // }
    throw new UnauthorizedException('Bạn không có quyền truy cập!');
  }
  @Delete('/DeleteUser/:userId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  deleteUser(@Param('userId') userId: number,
    @Req() req: getData
  ) {
    if (req.user.role === 'admin') {
      return this.userService.deleteUser(+userId);
    }
    throw new UnauthorizedException('Bạn không có quyền truy cập!');
  }
}
