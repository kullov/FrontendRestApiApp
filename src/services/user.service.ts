import Vue from 'vue';
import { AxiosPromise } from 'axios';
import { UserDto } from '@/models/UserDto';

class UserService extends Vue {
  private ROOT_API = 'http://localhost:8090/api/user';  // Root api

  public getAllUser(page: number): AxiosPromise<any>  {
    return Vue.axios.get<any>(this.ROOT_API + '/all', {params: { page: page }});
  }

  public getDetail(id: string): AxiosPromise<UserDto> {
    return Vue.axios.get<UserDto>(this.ROOT_API + '/detail/' + id);
  }

  public create(data: UserDto): AxiosPromise<any> {
    return Vue.axios.post<any>(this.ROOT_API + '/create', data);
  }

  public update(data: UserDto): AxiosPromise<any> {
    return Vue.axios.put<any>(this.ROOT_API + '/update/' + data.userId, data);
  }

  public delete(id: string): AxiosPromise<any> {
    return Vue.axios.delete(this.ROOT_API + '/delete/' + id);
  }
}
export const userService = new UserService();