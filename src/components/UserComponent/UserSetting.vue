<template>
  <div class="basic_info">
    <el-card shadow="never" :body-style="{padding:'40px'}">
      <el-form :model="formInfo" status-icon ref="formInfo" :label-position="labelPosition">
        <el-form-item label="头像" :label-width="formLabelWidth">
          <div class="avatar_box" title="点击修改头像" @click="uploadImg" style="margin-left:0.5rem">
            <el-avatar :size="60" :src="formInfo.avatarUrl" alt="图片加载失败"></el-avatar>
            <input type="file" ref="uploadAvatar" style="display:none" @change="chooseFile">
          </div>
        </el-form-item>
        <el-form-item label="昵称" prop="username" :label-width="formLabelWidth" :rules="[
                { required: true, message: '昵称不能为空'},
                { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
            ]">
          <el-input v-model="formInfo.username" autocomplete="off" placeholder="请输入昵称" style="width: 5rem; margin-left:0.5rem">
          </el-input>
          <label style="margin-left:0.5rem">个人信用分数:{{formInfo.score}}</label>
        </el-form-item>
        <el-form-item label="年龄" prop="age" :label-width="formLabelWidth" :rules="[
                {type: 'number', min: 1, max: 200,message:'年龄必须为数字且范围为1~200'}
            ]">
          <el-input v-model.number="formInfo.age" style="width: 2.5rem;margin-left:0.5rem"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio v-model="formInfo.sex" label="M" style="margin-left:0.5rem">男</el-radio>
          <el-radio v-model="formInfo.sex" label="W" style="margin-left:0.5rem">女</el-radio>
        </el-form-item>
        <el-form-item label="所在地区" prop="location" :label-width="formLabelWidth">
          <el-input v-model="formInfo.location" placeholder="请输入所在地区" style="width: 5rem;margin-left:0.5rem"></el-input>
        </el-form-item>
        <el-form-item label="剧本偏好" :label-width="formLabelWidth">
          <el-select v-model="formInfo.preference" filterable placeholder="请选择剧本偏好" style="width: 5rem;margin-left:0.5rem">
            <el-option v-for="item in formInfo.options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-left:2.5rem">
          <el-button @click="submitInfo">确认修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'BasicInfo',
    data() {
      return {
        formInfo: {
          avatarUrl: '',
          sex: '',
          username: '',
          score: '',
          age: 1,
          preference: '',
          location: '',
          avatar: '',
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
            value: '还原本',
            label: '还原本'
          }, {
            value: '硬核本',
            label: '硬核本'
          }, {
            value: '其他',
            label: '其他'
          }]

        },
        formLabelWidth: '2rem',
        labelPosition: 'right',
        dialogVisible: false
      }
    },
    methods: {
      submitInfo() {
        //借助formData上传文件
        const formData = new FormData();

        formData.append("username", this.formInfo.username)
        formData.append("address", this.formInfo.location)
        formData.append("age", this.formInfo.age)
        formData.append("preference", this.formInfo.preference)
        formData.append("gender", this.formInfo.sex)
        formData.append("image", this.formInfo.avatar)
        // console.log(typeof(this.formInfo.avatar));
        axios.post('http://103.151.217.147/request/api/users/update/', formData
          // username: this.formInfo.username,
          // address: this.formInfo.location,
          // age: this.formInfo.age,
          // preference: this.formInfo.preference,
          // gender: this.formInfo.sex,
          // // formData
          // image: this.formInfo.avatar
          , {
            headers: {
              token: localStorage.getItem('token')
            }
          }).then(response => {
          if (response.data.msg === 200) {
            alert('修改成功')
          } else {
            alert(response.data.msg)
          }
          // console.log(response);
        })
      },
      uploadImg() {
        this.$refs.uploadAvatar.click();
        // this.avatar = e.target.files[0]
      },
      chooseFile() {
        this.formInfo.avatar = this.$refs.uploadAvatar.files[0]
        console.log(this.formInfo.avatar);
      },
      getInfo() {
        axios.get('http://103.151.217.147/request/api/users/update/', {
          headers: {
            token: localStorage.getItem('token')
          }
        }).then(response => {
          if (response.data.code === 200) {
            this.formInfo.username = response.data.data.username,
              this.formInfo.age = response.data.data.user_age,
              this.formInfo.sex = response.data.data.user_gender
            this.formInfo.location = response.data.data.user_address,
              this.formInfo.preference = response.data.data.user_preference,
              this.formInfo.avatarUrl =
              `http://103.151.217.147/request/media/${response.data.data.avater}`
            this.formInfo.score = response.data.data.user_score
          } else {
            alert(response.data.msg)
          }
          console.log(response);
        })
      }
    },
    activated() {
      this.getInfo()
    },
  }
</script>

<style scoped>
  span,
  li {
    font-size: 0.25rem;
  }

  .basic_info {
    margin: 1rem auto;
    height: 60%;
    width: 60%;
  }

  label {
    margin-left: .375rem;
  }

  .avatar_box {
    cursor: pointer;
    height: 60px;
    width: 60px;
  }
</style>