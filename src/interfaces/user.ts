export interface UserLogin {
  user_email: string;
  user_password: string;
}
export interface User {
  user_fullname: string;
  user_email: string;
  user_address: string;
  user_phone: string;
  user_birthDate: string;
}
export interface UpdatePasswordDto {
  currentPassword: string;
  newPassword: string;
}
export interface UserSignup {
  user_fullname: string;
  user_email: string;
  user_password: string;
  user_address: string;
  user_phone: string;
  user_birthDate: string;
}