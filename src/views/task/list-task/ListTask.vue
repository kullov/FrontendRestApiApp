<template src="./ListTask.html"></template>
<style lang="scss" scoped src="./ListTask.scss"></style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { TaskDto } from '@/models/TaskDto';
import { taskService } from '@/services/task.service';
import { AxiosResponse } from 'axios';

@Component
export default class ListTask extends Vue {
  private data: TaskDto[] = [];
  private searchTaskDto: TaskDto = new TaskDto();
  private tableData: any[] = [];
  private statusList: any = ['Done', 'Pending', 'In-progress', 'Delay'];
  private created() {
    this.getAllTasks();
  }

  private getAllTasks() {
    taskService.getAllTasks()
      .then((response: AxiosResponse<TaskDto[]>) => {
        this.tableData = response.data.map((item: any) => TaskDto.init(item));
    });
  }

  private remove(id: any) {
    taskService.delete(id || '')
      .then((response: AxiosResponse<TaskDto[]>) => {
        if (response === null) {
          alert('Delete Failed!!!!');
        } else {
          alert('Delete Successfully!!!!');
          this.getAllTasks();
        }
    });
  }

  private search() {

    taskService.getAllTaskByName(this.searchTaskDto.taskName || '')
    .then((response: AxiosResponse<TaskDto[]>) => {
        this.tableData = response.data.map((item: any) => TaskDto.init(item));
    });

    // taskService.getTaskByStartDate(this.searchTaskDto.startDate || '')
    // .then((response: AxiosResponse<TaskDto[]>) => {
    //     this.tableData = response.data.map((item: any) => TaskDto.init(item));
    // });
  }
}
</script>