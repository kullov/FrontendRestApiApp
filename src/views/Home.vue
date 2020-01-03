<template>
  <div class="container">
    <div>
      <router-link v-if="isLogger" to="/task">List Task</router-link>
      <span class="ml-3 mr-3">|</span>
      <router-link v-if="isLogger" to="/insert">Insert</router-link>
      <span class="ml-3 mr-3">|</span>
      <router-link v-if="isLogger" to="/admin">Admin</router-link>
      <span class="ml-3 mr-3">|</span>
      <router-link v-if="isLogger" to="/user">User</router-link>
    </div>
    <div id="nav">
      <el-button @click="logout()" v-if="isLogger">Logout</el-button>
      <div v-else>
        <el-button @click="loginFun()">Sign In</el-button>
        <span class="ml-3 mr-3">|</span>
        <el-button @click="signUpFun()">Sign Up</el-button>
      </div>
    </div>
      <Login v-if="isLogin"></Login>
      <User v-if="isSignUp"></User>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Login from './login/Login.vue';
import User from './account/user/User.vue';
import { loginService } from '../services/login.service';

@Component({
  components: {
    Login,
    User,
  }
})
export default class Home extends Vue {
  private isLogger: boolean = false;
  private isLogin: boolean = false;
  private isSignUp: boolean = false;
  private label: string = 'Sign In';
  private mounted() {
    this.checkLogger();
  }

  private checkLogger() {
    this.isLogger = JSON.parse(localStorage.getItem('isLogger') || '');
  }

  private loginFun() {
    this.isLogin = true;
    this.isSignUp = false;
  }

  private signUpFun() {
    this.isLogin = false;
    this.isSignUp = true;
  }

  private logout() {
    // loginService.logout().then((response: any) => {
      
    // })
    localStorage.removeItem('user');
    if (localStorage.getItem('user')) {
      localStorage.setItem('isLogger', 'true');
    } else {
      localStorage.setItem('isLogger', 'false');
    }
    this.$router.go(0);
      // remove the axios default header
      // delete Home.axios.defaults.headers.common['Authorization'];
  }
}
</script>