import Vue from 'vue';
import { AxiosPromise } from 'axios';
import { TaskDto } from '@/models/TaskDto';

class TaskService extends Vue {
  private ROOT_API = 'http://localhost:8090/api/task';  // Root api

  public getAllTasks(page: number): AxiosPromise<TaskDto[]> {
    return Vue.axios.get<any>(this.ROOT_API + '/all', {params: { page: page }});
  }

  public getAll(taskName: string, startDate: Date, endDate: Date, status: string, page: number): AxiosPromise<TaskDto[]> {
    return Vue.axios.get<any>(this.ROOT_API + '/findAll', { params: {taskName: taskName, startDate: startDate, endDate: endDate, status: status, page: page}});
  }

  public getAllTaskByName(taskName: any, page: number): AxiosPromise<TaskDto[]> {
    return Vue.axios.get<any>(this.ROOT_API + '/taskName', {params: { taskName: taskName, page: page}});
  }

  public getAllTasksByStartDate(date: string, page: number): AxiosPromise<TaskDto[]> {
    return Vue.axios.get<any>(this.ROOT_API + '/start_date', {params: { date, page: page}});
  }

  public getAllTasksByEndDate(date: string, page: number): AxiosPromise<TaskDto[]> {
    return Vue.axios.get<any>(this.ROOT_API + '/end_date', {params: { date, page: page}});
  }

  public getAllTasksByStatus(status: string, page: number): AxiosPromise<TaskDto[]> {
    return Vue.axios.get<any>(this.ROOT_API + '/status', {params: { status: status, page: page }});
  }

  public getDetail(id: string): AxiosPromise<TaskDto> {
    return Vue.axios.get<TaskDto>(this.ROOT_API + '/detail/' + id);
  }

  public create(data: TaskDto): AxiosPromise<any> {
    return Vue.axios.post<any>(this.ROOT_API + '/create', data);
  }

  public update(data: TaskDto): AxiosPromise<any> {
    return Vue.axios.put<any>(this.ROOT_API + '/update/' + data.id, data);
  }

  public delete(id: string): AxiosPromise<any> {
    return Vue.axios.delete(this.ROOT_API + '/delete/' + id);
  }

}
export const taskService = new TaskService();
