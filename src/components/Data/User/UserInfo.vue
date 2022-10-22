<template>
    <div class="basic_info">
    <el-form :model="formInfo" status-icon ref="formInfo" :label-position="labelPosition" >
                
        <el-form-item label="昵称" prop="username" :label-width="formLabelWidth" 
            :rules="[
                { required: true, message: '昵称不能为空'},
                { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
            ]"
        >
            <el-input v-model="formInfo.username" autocomplete="off" placeholder="请输入昵称" style="width: 5rem"></el-input>
            <label>个人信用分数:???</label>
        </el-form-item>
        <el-form-item label="年龄" prop="age" :label-width="formLabelWidth"
            :rules="[
                {type: 'number', min: 1, max: 100,message:'年龄必须为数字且范围为1~100'}
            ]">
            <el-input  v-model.number="formInfo.age"  style="width: 1.3rem"></el-input>
        </el-form-item>
        <el-form-item label="所在地区" prop="location" :label-width="formLabelWidth">
            <el-input v-model="formInfo.location" placeholder="请输入所在地区" style="width: 5rem"></el-input>
        </el-form-item>
        <el-form-item label="剧本偏好" :label-width="formLabelWidth">
            <el-select v-model="formInfo.selectValue" filterable placeholder="请选择剧本偏好">
                <el-option
                    v-for="item in formInfo.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item style="margin-left:2rem">
            <el-button @click="submitInfo">确认修改</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "UserInfo",
    components: {},
    data() {
      return {
            formInfo:{
                username:'',
                age:1,
                selectValue: '',
                location:'',
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
                    value: '还原本',
                    label: '还原本'
                },{
                    value: '硬核本',
                    label: '硬核本'
                },{
                    value: '其他',
                    label: '其他'
                }]

            },
            formLabelWidth: '1.5rem',
            labelPosition:'right',
                
                
         };
    },
    created() {},
    methods: {
        submitInfo(){

        }
    },
  };
</script>

<style>
    span, li{
        font-size: 0.25rem;
    }
    .basic_info{
        margin: .5rem 1.25rem;
        height: 50%;
        width: 50%;
    }
    label{
        margin-left: .375rem;
    }
</style>
