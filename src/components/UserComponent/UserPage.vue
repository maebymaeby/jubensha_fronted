<template>
  <el-row class="userinfo_framework">
    <!--  用户基本信息  -->
    <el-col class="user_base" :span=12>
      <el-card class="user_base_card">
        <!--  用户照片  -->
        <el-row class="user_image">
          <img class="image_content" :src="this.user_photo">
        </el-row>
        <!--  用户标题  -->
        <el-row class="user_title">
          <span>{{user_name}}</span>
        </el-row>
        <!--  分割线  -->
        <el-divider></el-divider>
        <el-row class="activity_operation" v-if="notMe">
          <el-col :span=24>
            <el-tooltip class="item" effect="dark" content="发送私信" placement="bottom">
              <el-button type="primary" icon="el-icon-edit-outline" @click="messageVisible = true" circle style="font-size:22px"></el-button>
            </el-tooltip>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <!--  用户详细信息  -->
    <el-col class="user_detail" :span=12>
      <el-scrollbar class="user_detail_scrollbar">
        <el-card class="user_detail_card">
          <el-row class="info_item_detail" v-for="(item, index) in userInfo" :key="index">
            <div class="info_icon">
              <i :class="item.icon"></i>
            </div>
            <div class="info_text">
              <p class="info_text_title">{{item.title}}</p>
              <p class="info_text_content">{{item.content}}</p>
            </div>
          </el-row>
        </el-card>
      </el-scrollbar>
    </el-col>
    <el-dialog title="发送私信" :visible.sync="messageVisible" :append-to-body="true" width="500px">
      <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="messageText"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="messageVisible = false">取消</el-button>
        <el-button type="primary" @click="sendMessage">确定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "userInfo",
    components: {},
    data() {
      return {
        userInfo: [
        {
          title: "账号昵称",
          content: "",
          icon: "el-icon-user",
        },
        {
          title: "年龄",
          content: "",
          icon: "el-icon-link",
        },
        {
          title: "剧本偏好",
          content: "",
          icon: "el-icon-tickets",
        },
        {
          title: "所在地区",
          content: "",
          icon: "el-icon-place",
        },
        {
          title: "用户信用分",
          content: "",
          icon: "el-icon-magic-stick",
        }],
        user_name: "",
        user_photo: "",
        user_id: -1,
        notMe: true,
        messageVisible: false,
        messageText: "",
      };
    },
    created() {
      this.user_id = this.$route.query.user_id;
      this.user_photo = this.$route.query.user_photo;
      let myID = localStorage.getItem('id');
      if (this.user_id == myID) {
        this.notMe = false;
      }
      else {
        this.notMe = true;
      }
      this.getUserDetail();
    },
    methods: {
      // 获取用户详细信息
      getUserDetail() {
        axios.get(`http://localhost:8080/request/api/users/userpage/`,
        {
          params: {
            user_id: this.user_id
          },
          headers: {
            token: localStorage.getItem('token')
          }
        }).then(response => {
          if (response.data.code == 200) {
            let userData = response.data.data;
            this.userInfo[0].content = userData.username;
            this.userInfo[1].content = userData.user_age;
            this.userInfo[2].content = userData.user_preference;
            this.userInfo[3].content = userData.user_address;
            this.userInfo[4].content = userData.user_score;
            this.user_name = userData.username;
          }
        })
      },
      // 发送私信
      sendMessage() {
        axios.post(`http://localhost:8080/request/api/sendmessage/`,
        {
          reciver_id: this.user_id,
          message: this.messageText
        },
        {
          headers: {
            token: localStorage.getItem('token')
          }
        }).then(response => {
          if (response.data.code == 200) {
            this.messageVisible = false;
            alert(response.data.msg);
          }
          else {
            alert(response.data.msg);
          }
        });
      },
    },
  };
</script>

<style scope>
  .user_base {
    margin-top: 0;
    margin-left: 0;
    flex: 1;
    text-align: center;
    justify-content: center;
  }

  .user_base_card {
    margin-top: 40px;
    margin-left: 150px;
    width: 300px;
  }

  .user_base_card .el-card__body {
    padding: 0
  }

  .user_image {
    width: 100%;
    height: 300px;
    overflow: hidden;
  }

  .image_content {
    margin: 0 auto;
    width: 100%;
    height: 300px;
    transition: all 0.5s;
  }

  .image_content:hover {
    transform: scale(1.25);
  }

  .user_title {
    margin-top: 25px;
    font-size: 20px;
    font-weight: 500;
    line-height: 1.25;
    word-wrap: break-word;
    font-family: 'Poppins';
  }

  .user_base_scrollbar {
    flex: 1;
    text-align: left;
    justify-content: center;
    color: rgba(0, 0, 0, .54);
    height: 220px
  }

  .user_detail {
    flex: 1;
    text-align: center;
    justify-content: center;
  }

  .info_item_detail {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    padding: 10px 20px 10px 100px;
    line-height: 2;
  }

  .info_item_detail:hover {
    background-color: rgb(241, 243, 244);
  }

  .info_item {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    padding: 10px 20px;
    line-height: 1;
  }

  .info_icon {
    margin-right: 60px;
    font-size: 40px;
  }

  .info_text {
    flex: 1;
    text-align: left;
    justify-content: center;
  }

  .info_text_title {
    color: rgba(0, 0, 0, 0.93);
    font-size: 20px;
  }

  .info_text_content {
    color: rgba(0, 0, 0, .54);
    font-size: 18px;
  }

  .user_detail {
    margin-top: 0;
  }

  .user_detail_scrollbar {
    margin-top: 20px;
    margin-right: 100px;
    height: 650px;
  }

  .user_detail_card {
    margin: 20px 40px;
  }

  .el-dialog__body>.el-scrollbar .el-scrollbar__wrap {
    overflow-x: hidden !important;
  }

  .el-dialog__body>.el-scrollbar .el-scrollbar__bar.is-horizontal {
    display: none;
  }

  .activity_operation {
    margin-top: 25px;
    margin-bottom: 25px;
    flex: 1;
    text-align: center;
    justify-content: center;
  }
</style>