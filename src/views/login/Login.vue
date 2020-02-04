
<template src="./Login.html"></template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { AxiosResponse } from 'axios';
import { LoginDto } from '@/models/LoginDto';
import { loginService } from '@/services/login.service';

@Component
export default class Login extends Vue {
  private inputLoginDto: LoginDto = new LoginDto();
  private rules: any = null;
  private isLogger: boolean = false;
  private isError: boolean = false;
  private isServerError: boolean = false;
  private isUnauthorized: boolean = false;
  private isPasswordError: boolean = false;
  private passwordType: string = 'password';

  private created() {
    // this.$store.dispatch('user', {});
  }

  private mounted() {
    // if (this.loggedIn) {
    //   this.$router.push('/api/task/all');
    // }
    // Set rule
      this.rules = {
        userName: [
          { required: true, message: 'Please input username', trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'Please input password', trigger: 'blur' },
        ],
      };
  }

  private loggedIn() {
    return this.$store.state.auth.status.loggedIn;
  }

  private showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }
    }

  private signIn() {
    const loginData = {
      username: this.inputLoginDto.userName,
      password: this.inputLoginDto.password,
    };
    loginService.login(loginData)
      .then((isSuccess) => {
        if (isSuccess) {
          this.$router.push({ path: '/task' });
          this.isLogger = true;
        } else {
          this.isLogger = false;
        }
        // if(localStorage) {
        //   console.log(localStorage['x-auth-token']);
        // }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          this.isUnauthorized = true;
        } else if (error.response && error.response.status === 500) {
          this.isServerError = true;
        } else {
          this.isError = true;
        }
      }).finally(() => {
        localStorage.setItem('isLogger', this.isLogger + '');
      });
  }
}
</script>