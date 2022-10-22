<template>
    <div class="safe_verify">
        <h2>请上传您的身份证/学生证/校园卡正反面照片</h2>
        <div class="front">
            <div class="front_box">
                <h3>正面</h3>
                <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="1"
                    :on-exceed="handleExceed"
                    >
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </div>
        </div>
        <hr>
        <div class="back">
            <div class="back_box">
                <h3>反面</h3>
                <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="1"
                    :on-exceed="handleExceed"
                    >
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </div>
            
        </div>
    </div>
</template>

<script>
  export default {
    name: "UserCredit",
    components: {},
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        fileList:[
            {fileName:'',url:''},
            {fileName:'',url:''}
        ]
      };
    },
    created() {},
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        //   handleExceed(files, fileList) {
        handleExceed() {
            // this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            this.$message.warning(`只能上传一张图片哦`);
        },
        //   beforeRemove(file, fileList) {
        beforeRemove(file) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        }
    },
  };
</script>

<style scoped>
    .safe_verify{
        width: 95%;
        height: 95%;
        margin: 0.25rem auto;
        display: flex;
        flex-direction: column;
    }
    .front,.back{
        width: 100%;
        flex:1;
    }
    .front_box,.back_box{
        width: 50%;
        height: 60%;
        margin: 1rem auto;
    }
    .front_box h3,.back_box h3{
        margin: .25rem;
    }
    .el-upload-list--picture-card .el-upload-list__item{
        width: 3.75rem;
    }
</style>
