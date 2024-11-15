import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Req, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { getData } from './interface';

@ApiTags('User')
@Controller('api/User') export class UserController {
  constructor(private readonly userService: UserService,
    private configService: ConfigService) { }
  @Get('/getListUser')
  getListUser() {
    return this.userService.getListUser();
  }
  @Get('/UserInformation/:userId')
  getUserInfor(@Param('userId') userId: number) {
    return this.userService.getUserInfor(+userId);
  }
  @Post('/creatUser')
  creatUser(@Body() CreateUserDto: CreateUserDto,
    // @Req() req: getData
  ) {
    // if (req.user.role === 'admin') {
    return this.userService.createUser(CreateUserDto);
    // }
    // throw new UnauthorizedException('Bạn không có quyền truy cập!');
  }
  @Put('/UpdateUser/:userId')
  updateUser(
    @Param('userId') userId: string,
    @Body() body: UpdateUserDto,
    // @Req() req: getData,
  ) {
    // if (req.user.role === 'admin') {
    return this.userService.updateUser(+userId, body);
    // }
    // throw new UnauthorizedException('Bạn không có quyền truy cập!');
  }
  @Delete('/DeleteUser/:userId')
  deleteUser(@Param('userId') userId: number,
    // @Req() req: getData) 
  ) {
    // if (req.user.role === 'admin') {
    return this.userService.deleteUser(+userId);
    // }
    // throw new UnauthorizedException('Bạn không có quyền truy cập!');
  }
}
