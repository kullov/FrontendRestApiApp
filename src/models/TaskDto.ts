export class TaskDto {

  public static init(response: any): TaskDto {
    return new TaskDto({
      id: response.id,
      taskName: response.taskName,
      startDate: response.startDate,
      endDate: response.endDate,
      status: response.status,
      totalPages: response.totalPages
    });
  }
  public id?: string;
  public taskName?: string;
  public status?: string;
  public startDate?: string;
  public endDate?: string;
  public page?: number;
  public totalPages?: number;
  public selectSearch?: string;

  constructor(init?: Partial<TaskDto>) {
    Object.assign(this, init);
  }
}
