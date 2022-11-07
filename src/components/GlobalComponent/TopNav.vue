<template>
  <el-row class="topnav_framework">
    <el-col>
      <el-col :span="14" class="topnav_title">
        <p style="margin-left:40px">剧本杀平台</p>
      </el-col>
      <el-col :span="10" class="topnav_profile" v-if="isLogined">
        <el-col :span="15">
          <show-bulletin class="topnav_bulletin"> </show-bulletin>
        </el-col>
        <el-col :span="6">
          <el-dropdown @command="handleCommand" trigger="click">
            <el-button class="topnav_log" type="text">{{curHello}}&nbsp;&nbsp;{{this.curUserName}}</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="profile">个人信息</el-dropdown-item>
              <el-dropdown-item command="update">修改资料</el-dropdown-item>
              <el-dropdown-item command="safe">安全审核</el-dropdown-item>
              <el-dropdown-item command="exit">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-col>
      <el-col :span="10" class="topnav_profile" v-else>
        <el-col :span="3" :offset="15">
          <el-button class="topnav_log" type="text" @click="dialogFormLoginVisible = true">登录</el-button>
        </el-col>
        <el-col :span="3">
          <el-button class="topnav_log" type="text" @click="dialogFormRegisterVisible = true">注册</el-button>
        </el-col>
      </el-col>
    </el-col>
    <el-dialog title="登录" :visible.sync="dialogFormLoginVisible" width="10rem">
      <el-dialog width="10rem" title="忘记密码" :visible.sync="dialogForgetPassword" append-to-body>
        <el-form :model="formForgetPassword" status-icon :rules="rules" class="forgetPwd" ref="formForgetPassword">
          <el-form-item label="昵称" prop="uname" :label-width="formLabelWidth">
            <el-input v-model.trim="formForgetPassword.uname" autocomplete="off" placeholder="请输入昵称" style="width: 5rem"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="uemail" :label-width="formLabelWidth" :rules="[{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
                        {required:true,  message: '请输入邮箱地址', trigger: 'blur'},
                        { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
                    ]">
            <el-input v-model="formForgetPassword.uemail" placeholder="请输入邮箱" style="width: 5rem">
            </el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="pwd1" :label-width="formLabelWidth">
            <el-input v-model.trim="formForgetPassword.pwd1" show-password placeholder="请输入新密码" style="width: 5rem">
            </el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="pwd2" :label-width="formLabelWidth">
            <el-input v-model.trim="formForgetPassword.pwd2" show-password placeholder="请再次输入密码" style="width: 5rem">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="float:right" @click="confirmReset">确认重置密码</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-form :model="formLogin" status-icon :rules="rules" ref="formLogin">
        <el-form-item label="昵称" prop="username" :label-width="formLabelWidth">
          <el-input v-model="formLogin.username" autocomplete="off" placeholder="请输入昵称" style="width: 5rem">
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
          <el-input v-model="formLogin.password" show-password placeholder="请输入密码" style="width: 5rem">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="text" style="float: right;font-size:0.3rem;color:#000" @click="goRegister">
            还没有账号?点击去注册</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="text" style="float: right;font-size:0.3rem;color:#000" @click="forgetPassword">
            忘记密码?</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="submitForm('formLogin')">登 录</el-button>
        <el-button @click="resetForm('formLogin')">重 置</el-button>
      </div>
    </el-dialog>
    <el-dialog title="注册" :visible.sync="dialogFormRegisterVisible" width="10rem">
      <el-form :model="formRegister" status-icon :rules="rules" ref="formRegister">
        <el-form-item label="昵称" prop="username" :label-width="formLabelWidth">
          <el-input v-model.trim="formRegister.username" autocomplete="off" placeholder="请输入账号" style="width: 5rem"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password1" :label-width="formLabelWidth">
          <el-input v-model.trim="formRegister.password1" show-password placeholder="请输入密码" style="width: 5rem">
          </el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2" :label-width="formLabelWidth">
          <el-input v-model.trim="formRegister.password2" show-password placeholder="请再次输入密码" style="width: 5rem">
          </el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age" :label-width="formLabelWidth" :rules="[
                        { type: 'number', min: 1, max: 200, message: '年龄必须为数字值且范围为1~200'}
                    ]">
          <el-input v-model.number="formRegister.age" placeholder="请输入年龄,年龄只能输入数字" style="width: 5rem">
          </el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth" :rules="[{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
                        {required:true,  message: '请输入邮箱地址', trigger: 'blur'},
                        { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
                        ]">
          <el-input v-model="formRegister.email" placeholder="请输入邮箱" style="width: 5rem">
          </el-input>
        </el-form-item>
        <el-form-item label="剧本偏好" :label-width="formLabelWidth">
          <el-select v-model="formRegister.preference" filterable placeholder="请选择剧本偏好">
            <el-option v-for="item in formRegister.options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="text" style="float: right;font-size:0.3rem;color:#000" @click="goLogin">已有账号?点击去登录
          </el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="submitForm('formRegister')">注 册</el-button>
        <el-button @click="resetForm('formRegister')">重 置</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
  import ShowBulletin from "../BulletinComponent/BulletinBar.vue"
  import axios from 'axios'

  export default {
    name: "TopNav",
    components: {
      ShowBulletin,
    },
    data() {
      //表单验证
      var validateUsername = (rule, value, callback) => {
        //匹配数字、字母、汉字
        let reg = new RegExp('[a-zA-Z0-9\u4e00-\u9fa5]+');
        if (value === '') {
          callback(new Error('请输入账号'));
        } else if (!reg.test(value)) {
          callback(new Error('账号格式不正确，账号的组合为汉字、数字、字母'));
        } else {
          callback();
        }
      }
      var validatePassword1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.formRegister.password2 !== '') {
            this.$refs.formRegister.validateField('password2');
          }
          callback();
        }
      }
      var validatePassword2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formRegister.password1) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
      var validatePwd1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.formForgetPassword.pwd2 !== '') {
            this.$refs.formForgetPassword.validateField('pwd2');
          }
          callback();
        }
      }
      var validatePwd2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formForgetPassword.pwd1) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
      return {
        noUser: true,
        //表单数据
        dialogFormLoginVisible: false,
        dialogFormRegisterVisible: false,
        dialogForgetPassword: false,
        formLogin: {
          username: '',
          password: '',
        },

        formRegister: {
          existUser: false,
          username: '',
          password1: '',
          password2: '',
          age: '',
          email: '',
          preference: '',
          options: [{
            value: '阵营本',
            label: '阵营本'
          }, {
            value: '机制本',
            label: '机制本'
          }, {
            value: '沉浸本',
            label: '沉浸本'
          }, {
            value: '情感本',
            label: '情感本'
          }, {
            value: '恐怖本',
            label: '恐怖本'
          }, {
            value: '换原本',
            label: '还原本'
          }, {
            value: '硬核本',
            label: '硬核本'
          }, {
            value: '其他',
            label: '其他'
          }]
        },
        formForgetPassword: {
          uname: '',
          uemail: '',
          pwd1: '',
          pwd2: ''
        },
        //表单验证
        rules: {
          uname: [{
            required: true,
            validator: validateUsername,
            trigger: 'blur'
          },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          }],
          pwd1: [{
            required: true,
            validator: validatePwd1,
            trigger: 'blur'
          },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          }],
          pwd2: [{
            required: true,
            validator: validatePwd2,
            trigger: 'blur'
          }],
          username: [{
            required: true,
            validator: validateUsername,
            trigger: 'blur'
          },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            validator: validatePassword1,
            trigger: 'blur'
          },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          }],
          password1: [{
            required: true,
            validator: validatePassword1,
            trigger: 'blur'
          },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          }],
          password2: [{
            required: true,
            validator: validatePassword2,
            trigger: 'blur'
          }],

        },
        formLabelWidth: '2rem',
        curUserInfo: '',
        curUserName: '',
        curHello: ''
      };
    },
    computed: {
      // 获取登录状态
      isLogined: function () {
        return localStorage.getItem("token") !== null;
      },
    },
    created() {
      if (this.isLogined == true) {
        this.getCurUserInfo();
        this.curHello = this.getHello();
      }
    },
    methods: {
      // 获取当前用户信息
      getCurUserInfo() {
        axios.get(`http://localhost:8080/request/api/users/update/`,
        {
          headers: {
            token: localStorage.getItem('token')
          }
        }).then(response => {
          if (response.data.code == 200) {
            this.curUserInfo = response.data.data;
            this.curUserName = response.data.data.username;
          }
        })
      },
      // 根据时间生成问候
      getHello() {
        let timeNow = new Date();
        let hours = timeNow.getHours();
        let res = ``;
        if (hours >= 0 && hours <= 10) {
          res = `早上好`;
        }
        else if (hours > 10 && hours <= 14) {
          res = `中午好`;
        }
        else if (hours > 14 && hours <= 18) {
          res = `下午好`;
        }
        else if (hours > 18 && hours <= 24) {
          res = `晚上好`;
        }
        return res;
      },
      // 下拉菜单点击事件
      handleCommand(command) {
        if (command == "profile") {
          let userID = localStorage.getItem('id');
          let userPhoto = localStorage.getItem('photo');
          userPhoto = this.getPhotoFormat(userPhoto);
          this.$router.push({ path: '/UserPage', query: { user_id: userID, user_photo: userPhoto } });
        }
        else if (command == "update") {
          this.$router.push({ path: '/UserSetting' });
        }
        else if (command == "safe") {
          this.$router.push({ path: '/UserVerify' });
        }
        else if (command == "exit") {
          this.exit();
        }
      },
      // 提交表单
      submitForm(formName) {
        //点击登录/注册
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 登录
            if (formName === 'formLogin') {
              this.dialogFormLoginVisible = false;
              //发送Ajax验证用户登录信息
              axios.post(`http://localhost:8080/request/api/users/login/`, {
                //请求体信息，发送用户登录信息
                username: this.formLogin.username,
                password: this.formLogin.password
              }).then(res => {
                console.log(res.data);
                //状态码为2xx，登录成功
                if (res.data.code >= 200 && res.data.code < 300) {
                  localStorage.setItem('token', res.data.token)
                  localStorage.setItem('id', res.data.user_id)
                  localStorage.setItem('photo', res.data.avatar)
                  this.noUser = false;
                  setTimeout(window.location.href = 'http://localhost:8080', 1000);
                  //显示所有活动
                  axios.get('http://localhost:8080/request/api/users/get_activity/')
                    .then(response => {
                      // console.log(response);
                      // this.$bus.$emit('getUserInfo', res.data.token);
                      this.$bus.$emit('getActivity', response.data.data)
                    })
                } else {
                  //状态码不为2xx，登陆失败
                  this.openMessage(res.data.msg, 'error');
                }
              })

            }
            // 注册
            else {
              this.dialogFormRegisterVisible = false;
              //发送Ajax注册用户信息
              axios.post('http://localhost:8080/request/api/users/register/', {
                //请求体信息，发送用户注册信息
                username: this.formRegister.username,
                password1: this.formRegister.password1,
                password2: this.formRegister.password2,
                age: Number(this.formRegister.age),
                email: this.formRegister.email,
                preference: this.formRegister.preference
              }).then(response => {
                //状态码为2xx，注册成功
                if (response.data.code >= 200 && response.data.code < 300) {
                  this.openMessage('注册成功,快快登录吧', 'success');
                  this.dialogFormLoginVisible = true
                }
                else {
                  //状态码不为2xx，注册失败
                  console.log(response);
                  this.openMessage(response.data.msg, 'error');
                }
              })
            }
            // alert('submit!');
          } else {
            if (formName === 'formLogin') {
              this.dialogFormLoginVisible = true;
            } else {
              this.dialogFormRegisterVisible = true;
            }
            // console.log('error submit!!');
            return false;
          }
        });

      },
      // 点击重置
      resetForm(formName) {
        if (formName === 'formLogin') {
          //点击登录模块的重置
          this.dialogFormLoginVisible = true;
        } else {
          //点击注册模块的重置
          this.dialogFormRegisterVisible = true;
        }
        this.$refs[formName].resetFields();
      },
      // 忘记密码
      forgetPassword() {
        this.dialogForgetPassword = true
      },
      // 退出
      exit() {
        if (confirm('确认要退出吗?')) {
          axios.get('http://localhost:8080/request/api/users/logout/')
            .then(response => {
              console.log(response);
            })
          window.location.href = 'http://localhost:8080/'
          localStorage.removeItem('token');
        }
      },
      // 确认重置密码
      confirmReset() {
        this.$refs.formForgetPassword.validate((valid) => {
          if (valid) {
            axios.post('http://localhost:8080/request/api/users/change_password/', {
              username: this.formForgetPassword.uname,
              password: this.formForgetPassword.pwd1,
              email: this.formForgetPassword.uemail
            }).then(response => {
              alert(response.data.msg)
            })
          } else {
            console.log('error');
          }
        })
      },
      // 登录或注册后跳转
      goLogin() {
        this.dialogFormLoginVisible = true;
        this.dialogFormRegisterVisible = false;
      },
      goRegister() {
        this.dialogFormLoginVisible = false;
        this.dialogFormRegisterVisible = true;
      },
      // 显示错误信息
      openMessage(text, type) {
        this.$message({
          message: text,
          type: type,
        });
      },
      // 转换照片格式
      getPhotoFormat(url) {
        return `http://103.151.217.147/request/${url}`
      },
    },
  };
</script>

<style>
  * {
    font-family: PingFangSC-Medium, PingFang SC;
  }

  .topnav_framework {
    border-bottom: 1px solid #eee;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, .5);
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
    font-size: 16px;
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