export class LoginDto {
  public id?: string;
  public userName?: string;
  public password?: string;

  constructor(init?: Partial<LoginDto>) {
    Object.assign(this, init);
  }

  public static init(response: any): LoginDto {
    return new LoginDto({
      id: response.id,
      userName: response.userName,
      password: response.password,
    });
  }
}
