import Vue from 'vue';
import { AxiosPromise } from 'axios';
import { LoginDto } from '@/models/LoginDto';

class LoginService extends Vue {
  // private ROOT_API = 'https://backend-task-management-1912.herokuapp.com';  // Root api
  private ROOT_API = 'http://localhost:8090';  // Root api

  // public login(userName: string, password: string): AxiosPromise<any> {
  //   return Vue.axios.post<LoginDto>(this.ROOT_API + '/authenticate', {username: userName, password: password});
  // }

  // public register(userName: string, password: string, phone: string, email: string): AxiosPromise<any> {
  //   return Vue.axios.post<LoginDto>(this.ROOT_API + '/api/user/create', {userName: userName, password: password, phone: phone, email: email});
  // }

  // public logout(request: any): AxiosPromise<any> {
  //   return Vue.axios.post<LoginDto>(this.ROOT_API + '/logout', request);
  // }

  private token: string = 'x-auth-token';
  private userDetailKey: string = 'user-detail';

  public isAuthenticated(): boolean {
    return localStorage[this.token] !== null
      && localStorage[this.token] !== undefined
      && localStorage[this.token] !== ''
      && localStorage[this.token] !== 'null';
  }

  public addToken(config: any): any {
    if (localStorage[this.token]) {
      config.headers[this.token] = localStorage[this.token];
    }
    return config;
  }

  public login(request: any): Promise<any> {
    return Vue.axios.post(this.ROOT_API + '/authenticate', request)
    .then((res) => {
        if (res.data.token) {
          // Success
          localStorage[this.token] = res.data.token;
          // localStorage[this.token] = res.headers['x-auth-token'];
          // const decoded: UserDetail = jwt_decode(res.headers['x-auth-token']);
          // localStorage[this.userDetailKey] = JSON.stringify(decoded);
          return true;
        }
        return false;
      });
  }

  public logout(): Promise<any> {
    // TODO: Server-side token handler
    localStorage[this.token] = '';
    // localStorage[this.userDetailKey] = '';
    return Promise.resolve(true);
  }

}
export const loginService = new LoginService();
