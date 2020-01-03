<template src="./User.html"></template>
<style lang="scss" scoped src="./User.scss"></style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UserDto } from '../../../models/UserDto';
import { userService } from '../../../services/user.service';
import { AxiosResponse } from 'axios';

@Component
export default class User extends Vue {
  private isEdit: boolean = false;
  private inputUserDto: UserDto = new UserDto();
  private isSuccess: boolean = false;
  private rules: any = null;
  private dialogVisible: boolean = false;
  private rolesList: any[] = ['SUPER_ADMIN', 'ADMIN', 'USER'];

  private created() {
    if (this.$route.params.userId) {
      userService.getDetail(this.$route.params.userId)
        .then((response: AxiosResponse<UserDto>) => {
          if (response !== null) {
            this.inputUserDto = response.data;
            console.log(this.inputUserDto);
            this.isEdit = true;
          }
      });
    } else {
      this.isEdit = false;
      this.$set(this.inputUserDto, 'role', 'USER');
    }
  }

  private mounted() {
    // Set rule
    this.rules = {
      userName: [
        { required: true, message: 'Please input Task name', trigger: 'blur' },
      ],
      password: [
        { required: true, message: 'Please input your password', trigger: 'blur' },
        
      ],
      confirmPassword: [
        { validator: this.validatePassword, trigger: 'blur' },
      ],
      email: [
        { required: true, message: 'Please input your email', trigger: 'blur' },
      ],
      phone: [
        { required: true, message: 'Please input your phone', trigger: 'blur' }
      ],
    }
  }

  private validatePassword(rule: any, value: any, callback: any) {
    if (!this.inputUserDto.password && !this.inputUserDto.confirmPassword) {
      callback(new Error('You must input your password').toString());
    } else {
      if (this.inputUserDto.password !== this.inputUserDto.confirmPassword) {
        callback(new Error('Password does not match!').toString());
      }
    }
  }

  private insert() {
    debugger
      userService.create(this.inputUserDto)
        .then((response: AxiosResponse<UserDto[]>) => {
          if (response === null) {
            alert('Register Failed!!!!');
          } else {
            alert('Register Successfully!!!!');
            this.$router.push({path: '/'});
          }
      });
    }

    private update() {
      userService.update(this.inputUserDto)
        .then((response: AxiosResponse<UserDto[]>) => {
          if (response === null) {
            alert('Update Failed!!!!');
          } else {
            alert('Update Successfully!!!!');
            this.$router.push({path: '/admin'});
          }
        });
    }

    private remove() {
      userService.delete(this.inputUserDto.userId || '')
        .then((response: AxiosResponse<UserDto[]>) => {
          if (response === null) {
            alert('Delete Failed!!!!');
          } else {
            alert('Delete Successfully!!!!');
            this.$router.push({path: '/'});
          }
      });
      this.$router.replace('/admin');
    }
}
</script>