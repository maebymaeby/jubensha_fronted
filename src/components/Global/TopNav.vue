<template>
  <el-row class="topnav_framework">
    <el-col>
      <el-col :span="14" class="topnav_title">
        <p>高分项</p>
      </el-col>
      <el-col :span="10" class="topnav_profile">
        <el-col :span="18" v-if="isLogined">
          <p class="topnav_profile">
            <span>13366699999</span>，欢迎您！
          </p>
        </el-col>
        <el-col :span="18" v-else>
          <p class="topnav_profile">
            <span></span>
          </p>
        </el-col>
        <el-col :span="3" v-if="isLogined">
          <el-button class="topnav_log" type="text" @click="adminLogout()">退出登录</el-button>
        </el-col>
        <el-col :span="3" v-else>
          <el-button class="topnav_log" type="text" @click="adminLogin()">登录</el-button>
        </el-col>
      </el-col>
    </el-col>
    <el-dialog title="登录" :visible.sync="loginVisible" :append-to-body="true" width="500px">
      <user-login></user-login>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelLogin()">取消</el-button>
        <el-button type="primary" @click="confirmLogin()">确定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
  import UserLogin from "../Data/User/UserLogin.vue"

  export default {
    name: "TopNav",
    components: {
      UserLogin,
    },
    data() {
      return {
        isLogined: false,
        loginData: {
          mobile: '',
          password: '',
        },
        loginVisible: false,
        formRules: {
          mobile: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
        },
      };
    },
    created() {
    },
    methods: {
      adminLogin() {
        this.loginVisible = true;
        console.log("adminLogin");
      },
      adminLogout() {
        console.log("adminLogout");
      },
      cancelLogin() {
        this.loginVisible = false;
        console.log("cancelLogin");
      },
      confirmLogin() {
        console.log("confirmLogin");
      }
    },
  };
</script>

<style>
  * {
    font-family: PingFangSC-Medium, PingFang SC;
  }

  .topnav_framework {
    border-bottom: 1px solid #eee;
  }

  .topnav_title {
    text-align: left;
  }

  .topnav_title p {
    font-size: 20px;
    line-height: 50px;
    margin: 0 0 0 20px;
  }

  .topnav_profile {
    text-align: end;
    font-size: 14px;
  }

  .el-button.el-button--text.el-popover__reference,
  .el-button.topnav_log.el-button--text {
    line-height: 50px;
    padding: 0 0 0 0;
  }

  .el-dialog {
    display: flex;
    flex-direction: column;
    margin: 0 !important;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>