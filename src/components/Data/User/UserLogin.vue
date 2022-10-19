<template>
  <el-row class="userlogin_framwork">
    <el-col :span="24">
      <el-menu :default-active="menuItems[0].index" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <template v-for="item in menuItems">
              <el-menu-item :key="item.index" :index="item.index">
                {{ item.title }}
              </el-menu-item>
            </template>
      </el-menu>
    </el-col>
    <el-col :span="24">
      <aucode-login v-show="isAucode"></aucode-login>
      <password-login v-show="isPassword"></password-login>
    </el-col>
  </el-row>
</template>

<script>
import AucodeLogin from './AucodeLogin.vue';
import PasswordLogin from './PasswordLogin.vue';

  export default {
    name: "UserLogin",
    components: {
      AucodeLogin,
      PasswordLogin
    },
    data() {
      return {
        // 导航栏数据格式
        menuItems: [
        {
          index: "Aucode",
          title: "验证码登录",
          subMenu: [],
        },
        {
          index: "Password",
          title: " 密码登录",
          subMenu: [],
        }],
        isAucode: true,
        isPassword: false,
      };
    },
    created() {},
    methods: {
      handleSelect(index){
        if(index=="Aucode"){
          this.isAucode = true;
          this.isPassword = false;
        }
        else if(index=="Password"){
          this.isAucode = false;
          this.isPassword = true;
        }
      }
    },
  };
</script>

<style>

</style>