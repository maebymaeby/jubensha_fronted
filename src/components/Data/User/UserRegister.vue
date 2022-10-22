<template>
    <div>UserRegister
        <el-button v-if="noUser" el-icon-switch-button @click="dialogFormRegisterVisible = true">注册</el-button>
        <el-dialog title="注册" :visible.sync="dialogFormRegisterVisible" width="10rem">
            <el-form :model="formRegister" status-icon :rules="rules" ref="formRegister">
                <el-form-item label="昵称" prop="username" :label-width="formLabelWidth" >
                    <el-input v-model="formRegister.username" autocomplete="off" placeholder="请输入账号" style="width: 5rem"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password1" :label-width="formLabelWidth" >
                    <el-input v-model="formRegister.password1" show-password placeholder="请输入密码" style="width: 5rem">
                    </el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="password2" :label-width="formLabelWidth" >
                    <el-input v-model="formRegister.password2" show-password placeholder="请再次输入密码" style="width: 5rem">
                    </el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age" :label-width="formLabelWidth"
                    :rules="[
                        { type: 'number', min: 1, max: 100, message: '年龄必须为数字值且范围为1~100'}
                    ]"
                 >
                    <el-input v-model.number="formRegister.age" placeholder="请输入年龄,年龄只能输入数字" style="width: 5rem"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth" 
                :rules="[{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
                        {required:true,  message: '请输入邮箱地址', trigger: 'blur'},
                        { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
                        ]" >
                    <el-input v-model="formRegister.email" placeholder="请输入邮箱" style="width: 5rem">
                    </el-input>
                </el-form-item>
                <el-form-item label="剧本偏好" :label-width="formLabelWidth">
                    <el-select v-model="formRegister.preference" filterable placeholder="请选择剧本偏好">
                        <el-option
                            v-for="item in formRegister.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="text" style="float: right;font-size:0.3rem;color:#000">已有账号?点击去登录</el-button>
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
import axios from 'axios'
  export default {
    name: "UserRegister",
    components: {},
    data() {
    //表单验证
        //表单验证
            var validateUsername = (rule, value, callback) => {
                //匹配数字、字母、汉字
                let reg = new RegExp('[a-zA-Z0-9\u4e00-\u9fa5]+');
                if(value === ''){
                    callback(new Error('请输入账号'));
                }else if(!reg.test(value)){
                    callback(new Error('账号格式不正确，账号的组合为汉字、数字、字母'));
                }else{
                    callback();
                }
            }
            var validatePassword1 = (rule, value, callback) => {
                if(value === ''){
                    callback(new Error('请输入密码'));
                }else {
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
      return {
        noUser:true,
        dialogFormRegisterVisible: false,
        formRegister: {
                    existUser: false,
                    username: '',
                    password1: '',
                    password2:'',
                    age:'',
                    email:'',
                    preference:'',
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
                    },{
                        value: '换原本',
                        label: '还原本'
                    },{
                        value: '硬核本',
                        label: '硬核本'
                    },{
                        value: '其他',
                        label: '其他'
                    }]
                },
        //表单验证
        rules:{
            username: [
                        {required:true, validator: validateUsername, trigger: 'blur',type:'email'},
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
            ],
            password1: [
                {required:true, validator: validatePassword1, trigger: 'blur'},
                { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
            ],
            password2: [
                {required:true, validator: validatePassword2, trigger: 'blur'}
            ],
        },
        formLabelWidth: '2rem'
      };
    },
    created() {},
    methods: {
        submitForm(formName){
            this.dialogFormRegisterVisible = false;
                //发送Ajax注册用户信息
                axios.post('http://localhost:8080/userRegister/api/users/register/', {
                    //请求体信息，发送用户注册信息
                    username: this.formRegister.username,
                    password1: this.formRegister.password1,
                    password2: this.formRegister.password2,
                    age: this.formRegister.age,
                    email: this.formRegister.email,
                    preference: this.formRegister.preference
                }).then(response=>{
                    //状态码为2xx，注册成功
                    if(response.data.code >= 200 && response.data.code < 300){
                        alert('注册成功,快快登录吧')
                        this.dialogFormLoginVisible = true

                    }else{
                        //状态码不为2xx，注册失败
                        alert('该昵称已被注册')
                    }
                })

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
