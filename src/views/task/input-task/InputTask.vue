<template src='./InputTask.html'></template>
<style lang="scss" scoped src='./InputTask.scss'></style>

<script lang='ts'>
  import { Component, Vue } from 'vue-property-decorator';
  import { TaskDto } from '@/models/TaskDto';
  import { AxiosResponse } from 'axios';
  import { taskService } from '@/services/task.service';

  @Component
  export default class InputTask extends Vue {
    private inputTaskDto: TaskDto = new TaskDto();
    private isEdit: boolean = false;
    private isSuccess: boolean = false;
    private rules: any = null;
    private statusList: any = ['Done', 'Pending', 'In-progress', 'Delay'];

    private created() {
      if (this.$route.params.id) {
        taskService.getDetail(this.$route.params.id)
          .then((response: AxiosResponse<TaskDto>) => {
            if (response !== null) {
              this.inputTaskDto = response.data;
              this.isEdit = true;
            }
        });
      } else {
        this.isEdit = false;
      }
    }

    private mounted() {
      // Set rule
      this.rules = {
        taskName: [
          { required: true, message: 'Please input Task name', trigger: 'blur' },
        ],
        startDate: [
          { required: true, message: 'Please input start date of task', trigger: 'blur' },
        ],
        endDate: [
          { required: true, message: 'Please input end date of task', trigger: 'blur' },
        ],
        status: [
          { required: true, message: 'Please input status of task', trigger: 'blur' }
        ]
      }
    }

    private insert() {
      taskService.create(this.inputTaskDto)
        .then((response: AxiosResponse<TaskDto[]>) => {
          if (response === null) {
            alert('Insert Failed!!!!');
          } else {
            alert('Insert Successfully!!!!');
            this.$router.push({path: '/task'});
          }
      });
    }

    private update() {
      taskService.update(this.inputTaskDto)
        .then((response: AxiosResponse<TaskDto[]>) => {
          if (response === null) {
            alert('Update Failed!!!!');
          } else {
            alert('Update Successfully!!!!');
            this.$router.push({path: '/task'});
          }
        });
    }

    private remove() {
      taskService.delete(this.inputTaskDto.id || '')
        .then((response: AxiosResponse<TaskDto[]>) => {
          if (response === null) {
            alert('Delete Failed!!!!');
          } else {
            alert('Delete Successfully!!!!');
            this.$router.push({path: '/task'});
          }
      });
      this.$router.replace('task');
    }
  }
</script>