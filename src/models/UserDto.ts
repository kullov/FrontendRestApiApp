export class UserDto {

  public static init(response: any): UserDto {
    return new UserDto({
      userId: response.userId,
      userName: response.userName,
      password: response.password,
      email: response.email,
      phone: response.phone,
      enable: response.enable,
      imageUser: response.imageUser,
      role: response.roles[0].roleName
    });
  }
  public userId?: string;
  public userName?: string;
  public password?: string;
  public email?: string;
  public phone?: string;
  public enable?: number;
  public imageUser?: string;
  public confirmPassword?: string;
  public role?: string;


  constructor(init?: Partial<UserDto>) {
    Object.assign(this, init);
  }
}
