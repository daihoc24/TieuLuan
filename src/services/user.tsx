import { AxiosResponse } from "axios";
import { request } from "../config/api";
import { UpdatePasswordDto, UserLogin, UserSignup } from "../interfaces/user";

class UserService {
  loginUser(data: UserLogin) {
    return request({
      url: "/Auth/Login",
      method: "POST",
      data,
    });
  }
  signUp(data: UserSignup) {
    return request({
      url: "/Auth/Signup",
      method: "POST",
      data,
    });
  }
  verifyEmail(email: string, code: string) {
    return request({
      url: "/Auth/Verify",
      method: "POST",
      data: {email, code},
    });
  }
  getUserById(userId: number | undefined): Promise<AxiosResponse<any>> {
    return request({
      url: `/User/UserInformation/${userId}`,
      method: "GET",
    });
  }
  updateUser(userId: number, data: any) {
    return request({
      url: `/User/UpdateUser/${userId}`,
      method: "PUT",
      data,
    });
  }
  updatePassword(userId: number, data: UpdatePasswordDto) {
    return request({
      url: `/User/update-password/${userId}`,
      method: "POST",
      data,
    });
  }
  forgotPassword(email: string) {
    return request({
      url: "/Auth/forgot-password",
      method: "POST",
      data: { email },
    });
  }
  verifyForgotPasswordCode(email: string, verificationCode: string) {
    return request({
      url: "/Auth/verify-forgot-password-code",
      method: "POST",
      data: { email, verificationCode },
    });
  }
  resetPassword(email: string, newPassword: string) {
    return request({
      url: "/Auth/reset-password",
      method: "POST",
      data: { email, newPassword },
    });
  }
}

export const userService: UserService = new UserService();
