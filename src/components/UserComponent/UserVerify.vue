<template>
  <div class="safe_verify">
    <el-card shadow="never" :body-style="{padding:'40px'}">
      <h1>请上传您的身份证/学生证/校园卡照片</h1>
      <el-upload class="uploadBox" action="http://103.151.217.147/request/api/users/judgesafe/" :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleSuccess" :on-error="handleError" :file-list="fileList" multiple :limit="1" :on-exceed="handleExceed" name="image" list-type="picture" :headers="u_token">
        <el-button size="large">点击上传</el-button>
        <div slot="tip" class="el-upload__tip" style="margin-top:40px;font-size:16px">只需要上传一张图片哦</div>
        <div slot="tip" class="el-upload__tip" style="font-size:16px">{{msg}}</div>
      </el-upload>
    </el-card>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'SafeVerify',
    data() {
      return {
        imgPath: '',
        msg: '',
        fileList: [
          // {name: '您已上传!', url: `http://103.151.217.147/getImg/media/photos/avatar.jpeg`}
          // {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, 
          // {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
        ],
        u_token: {
          token: localStorage.getItem('token')
        }
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      // handleExceed(files, fileList) {
      handleExceed() {
        this.$message.warning(`只能选择 1 张图片哦`);
      },
      handleSuccess(response) {
        if (response.code === 200) {
          alert('上传成功!')
        }
        // console.log(response);
      },
      handleError(err) {
        console.log(err);
      }
    },
    mounted() {
      axios.get('http://103.151.217.147/request/api/users/judgesafe/', {
        headers: {
          token: localStorage.getItem('token')
        }
      }).then(response => {
        if (response.data.code === 200) {
          // console.log(response.data.msg);
          this.fileList.push({ name: '您已上传!', url: `http://103.151.217.147/request/media/${response.data.msg}` })
        } else {
          this.msg = response.data.msg
        }
      })
    },
  }
</script>

<style scoped>
  .safe_verify {
    width: 40%;
    height: 95%;
    margin: 1rem auto;
    display: flex;
    flex-direction: column;
  }

  .uploadBox {
    margin-top: 1rem;
  }
</style>