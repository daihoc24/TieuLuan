import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDTO } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { signupDTO } from './dto/signup.dto';

@ApiTags('Auth')
@Controller('/api/Auth') export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post('/Login')
  login(@Body() loginDTO: loginDTO) {
    return this.authService.login(loginDTO);
  }
  @Post('/Signup')
  signup(@Body() signupDTO: signupDTO) {
    return this.authService.signup(signupDTO);
  }
}
