<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url("//unpkg.com/element-ui@2.12.0/lib/theme-chalk/index.css");
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.inline-label {
    display: inline-block;
    .el-form-item__label {
      width: auto !important;
    }
    .el-form-item__content {
      margin-left: 0 !important;
      display: inline-block !important;
    }
  }
</style>
