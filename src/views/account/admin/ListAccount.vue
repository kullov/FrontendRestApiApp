<template src='./ListAccount.html'></template>
<style lang="scss" scoped src='./ListAccount.scss'></style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UserDto } from '../../../models/UserDto';
import { userService } from '../../../services/user.service';
import { AxiosResponse } from 'axios';

@Component
export default class ListAccount extends Vue {
  private datas: any[] = [];
  // private userDto: UserDto = new UserDto();
  private total: number = 0;
  private id?: string;
  private currentPage: any = 1;
  private dialogVisible: boolean = false;
  private created() {
    if (localStorage.getItem('isLogger')) {
      this.getAllUsers();
    }
  }

  private getAllUsers() {
    userService.getAllUser(this.currentPage)
      .then((response: AxiosResponse<any>) => {
        this.datas = response.data.content.map((item: any) => UserDto.init(item));
        this.total = response.data.totalElements;
    });
  }

  private changePage(currentPage: any) {
    this.currentPage = currentPage;
    this.getAllUsers();
  }

  private beforeRemove(id: any) {
    this.dialogVisible = true;
    this.id = id;
  }

  private remove() {
    if (this.id) {
      userService.delete(this.id || '')
        .then((response: AxiosResponse<UserDto[]>) => {
          if (response === null) {
            alert('Delete Failed!!!!');
          } else {
            alert('Delete Successfully!!!!');
            this.getAllUsers();
          }
      }).finally(() => {
        this.dialogVisible = false;
      });
    }
  }
}
</script>