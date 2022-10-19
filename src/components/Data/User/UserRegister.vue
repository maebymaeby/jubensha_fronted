<template>
    <div>UserRegister
        <el-button @click="dialogFormRegisterVisible = true">注册</el-button>
        <el-dialog title="注册" :visible.sync="dialogFormRegisterVisible" width="10rem">
            <el-form :model="formRegister" status-icon :rules="rules" ref="formRegister">
                <el-form-item label="账号" prop="username" :label-width="formLabelWidth" >
                    <el-input v-model="formRegister.username" autocomplete="off" placeholder="请输入账号" style="width: 5rem"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" :label-width="formLabelWidth" >
                    <el-input v-model="formRegister.password" show-password placeholder="请输入密码" style="width: 5rem">
                    </el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth" 
                :rules="[{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
                        {required:true,  message: '请输入邮箱地址', trigger: 'blur'},]" >
                    <el-input v-model="formRegister.email" placeholder="请输入邮箱" style="width: 5rem">
                    </el-input>
                    <!-- <el-button style="margin-left:0.1rem">点击获取激活链接</el-button> -->
                </el-form-item>
          
                <el-form-item>
                    <el-link :underline="false" href="#" style="float: right;font-size:0.3rem">已有账号?点击去登录</el-link>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="submitForm('formRegister')">注 册</el-button>
                <el-button @click="resetForm('formRegister')">重 置</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    name: "UserRegister",
    components: {},
    data() {
    //表单验证
        var validateUsername = (rule, value, callback) => {
            let reg = new RegExp('[a-zA-Z0-9\u4e00-\u9fa5]+');
            if(value === ''){
                callback(new Error('请输入账号'));
            }else if(!reg.test(value)){
                callback(new Error('账号格式不正确，账号的组合为汉字、数字、字母'));
            }else{
                callback();
            }
        }
        var validatePassword = (rule, value, callback) => {
            if(value === ''){
                callback(new Error('请输入密码'));
            }
        }
      return {
        dialogFormRegisterVisible: false,
        formRegister: {
            username: '',
            password: '',
            email:'',
        },
        //表单验证
        rules:{
            username: [
                {required:true, validator: validateUsername, trigger: 'blur',type:'email'}
            ],
            password: [
                {required:true, validator: validatePassword, trigger: 'blur'}
            ]
        },
        formLabelWidth: '120px'
      };
    },
    created() {},
    methods: {
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.dialogFormRegisterVisible = false;
                    alert('submit!');
                } else {
                    this.dialogFormRegisterVisible = true;
                    console.log('error submit!!');
                    return false;
                }
            });

        },
            //点击重置
        resetForm(formName) {
            this.dialogFormRegisterVisible = true;
            this.$refs[formName].resetFields();
        }
    },
  };
</script>

<style>

</style>
