import Vue from 'vue';
import { AxiosPromise } from 'axios';
import { TaskDto } from '@/models/TaskDto';

class TaskService extends Vue {
  private ROOT_API = 'http://localhost:8090/api/task';  // Root api

  public getAllTasks(): AxiosPromise<TaskDto[]> {
    return Vue.axios.get<any>(this.ROOT_API + '/all');
  }

  public getAll(taskName: string, startDate: Date, endDate: Date, status: string): AxiosPromise<TaskDto[]> {
    return Vue.axios.get<any>(this.ROOT_API + '/findAll', { params: {taskName: taskName, startDate: startDate, endDate: endDate, status: status}});
  }

  public getTaskByName(taskName: any): AxiosPromise<TaskDto[]> {
    return Vue.axios.get<any>(this.ROOT_API + '/taskName', {params: { taskName: taskName }});
  }

  public getAllTasksByStartDate(date: string): AxiosPromise<TaskDto[]> {
    return Vue.axios.get<any>(this.ROOT_API + '/start_date/' + date);
  }

  public getAllTasksByEndDate(date: string): AxiosPromise<TaskDto[]> {
    return Vue.axios.get<any>(this.ROOT_API + '/end_date/' + date);
  }

  public getAllTasksByStatus(status: string): AxiosPromise<TaskDto[]> {
    return Vue.axios.get<any>(this.ROOT_API + '/status', {params: { status: status }});
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
