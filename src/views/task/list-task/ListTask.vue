<template src="./ListTask.html"></template>
<style scoped lang="scss">
.container {
  margin-bottom: 4rem; 
}
</style>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { TaskDto } from '@/models/TaskDto';
import { taskService } from '@/services/task.service';
import { AxiosResponse } from 'axios';

@Component
export default class ListTask extends Vue {
  private data: TaskDto[] = [];
  private id?: any;
  private searchTaskDto: TaskDto = new TaskDto();
  private tableData: any[] = [];
  private activeNames: any[] = ['1'];
  private statusList: any = ['', 'Done', 'Pending', 'In-progress', 'Delay'];
  private enableTaskName: boolean = true;
  private total: number = 0;
  private currentPage: any = 1;
  private dialogVisible: boolean = false;
  private isGetAllTasks: boolean = false;
  private isGetAllTasksByStatus: boolean = false;
  private isGetAllTasksByName: boolean = false;
  private isGetAllTasksByStartDate: boolean = false;
  private isGetAllTasksByEndDate: boolean = false;
  // private selectSearch: string = '';
  private created() {
    if (localStorage.getItem('isLogger')) {
      this.getAllTasks();
      this.$set(this.searchTaskDto, 'selectSearch', '0');
    }
  }

  private getAllTasks() {
    taskService.getAllTasks(this.currentPage)
      .then((response: AxiosResponse<any>) => {
        
        this.tableData = response.data.content.map((item: any) => TaskDto.init(item));
        this.total = response.data.totalElements;
        // this.pageSize = response.data.count;
    });
    this.isGetAllTasks = true;
  }

  private changePage(currentPage: any) {
    this.currentPage = currentPage;
    if (this.isGetAllTasks) {
      this.getAllTasks();
    } else if (this.isGetAllTasksByStatus) {
      this.searchByStatus();
    } else if (this.isGetAllTasksByStartDate) {
      this.searchByStartDate();
    } else if (this.isGetAllTasksByEndDate) {
      this.searchByEndDate();
    } else {
      this.searchByTaskName();
    }
  }

  private beforeRemove(id: any) {
    this.dialogVisible = true;
    this.id = id;
  }

  private remove() {
    if (this.id) {
      taskService.delete(this.id || '')
        .then((response: AxiosResponse<TaskDto[]>) => {
          if (response === null) {
            alert('Delete Failed!!!!');
          } else {
            alert('Delete Successfully!!!!');
            this.getAllTasks();
          }
      }).finally(() => {
        this.dialogVisible = false;
      });
    }
  }

  private default() {
    this.isGetAllTasks = false;
    this.isGetAllTasksByStatus = false;
    this.isGetAllTasksByName = false;
    this.isGetAllTasksByStartDate = false;
    this.isGetAllTasksByEndDate = false;
  }

  private init() {
    this.$set(this.searchTaskDto, 'taskName', '');
    this.$set(this.searchTaskDto, 'startDate', '');
    this.$set(this.searchTaskDto, 'endDate', '');
    this.$set(this.searchTaskDto, 'status', '');
  }

  private changeSearchField() {
    this.init();
    if (this.searchTaskDto.selectSearch === '1') {
      this.default();
      this.isGetAllTasksByName = true;
    } else if (this.searchTaskDto.selectSearch === '2') {
      this.default();
      this.isGetAllTasksByStartDate = true;
    } else if (this.searchTaskDto.selectSearch === '3') {
      this.default();
      this.isGetAllTasksByEndDate = true;
    } else if (this.searchTaskDto.selectSearch === '4') {
      this.default();
      this.isGetAllTasksByStatus = true;
    } else {
      this.default();
    }
  }

  private searchByTaskName() {
    taskService.getAllTaskByName(this.searchTaskDto.taskName || '', this.currentPage).then((response: any) => {
      this.tableData = response.data.content.map((item: any) => TaskDto.init(item));
      this.total = response.data.totalElements;
    });
    this.default();
    this.isGetAllTasksByName = true;
  }

  private searchByStatus() {
    taskService.getAllTasksByStatus(this.searchTaskDto.status || '', this.currentPage).then((response: any) => {
      this.tableData = response.data.content.map((item: any) => TaskDto.init(item));
      this.total = response.data.totalElements;
    });
    this.default();
    this.isGetAllTasksByStatus = true;
  }

  private searchByStartDate() {
    taskService.getAllTasksByStartDate(this.searchTaskDto.startDate || '', this.currentPage).then((response: any) => {
      this.tableData = response.data.content.map((item: any) => TaskDto.init(item));
      this.total = response.data.totalElements;
    });
    this.default();
    this.isGetAllTasksByStartDate = true;
  }

  private searchByEndDate() {
    taskService.getAllTasksByEndDate(this.searchTaskDto.endDate || '', this.currentPage).then((response: any) => {
      this.tableData = response.data.content.map((item: any) => TaskDto.init(item));
      this.total = response.data.totalElements;
    });
    this.default();
    this.isGetAllTasksByEndDate = true;
  }

  private search() {
    if (this.searchTaskDto.status) {
      this.searchByStatus();
    } else if (this.searchTaskDto.startDate) {
      this.searchByStartDate();
    } else if (this.searchTaskDto.endDate) {
      this.searchByEndDate();
    } else if (this.searchTaskDto.taskName) {
      this.searchByTaskName();
    } else {
      this.getAllTasks();
    }
  }
}
</script>