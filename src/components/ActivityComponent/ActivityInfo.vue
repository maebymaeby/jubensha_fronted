<template>
  <el-row class="activityinfo_framework">
    <!--  活动基本信息  -->
    <el-col class="activity_base" :span=6>
      <el-card class="activity_base_card" shadow="never">
        <!--  活动照片  -->
        <el-row class="activity_image">
          <img class="image_content" src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png">
        </el-row>
        <!--  活动标题  -->
        <el-row class="activity_title">
          <span>{{this.activityName}}</span>
        </el-row>
        <!--  分割线  -->
        <el-divider></el-divider>
        <!--  按钮操作  -->
        <el-row class="activity_operation">
          <el-col :span=8>
            <el-row v-if="isJoined">
              <el-button type="primary" @click="exitActivity" icon="el-icon-check" circle style="font-size:22px"></el-button>
            </el-row>
            <el-row v-else>
              <el-row v-if="isWaiting">
                <el-tooltip class="item" effect="dark" content="审核中" placement="bottom">
                  <el-button type="primary" icon="el-icon-check" plain disabled circle style="font-size:22px"></el-button>
                </el-tooltip>
              </el-row>
              <el-row v-else>
                <el-tooltip class="item" effect="dark" content="加入活动" placement="bottom">
                  <el-button type="info" @click="joinActivity" icon="el-icon-check" circle style="font-size:22px"></el-button>
                </el-tooltip>
              </el-row>
            </el-row>
          </el-col>
          <el-col :span=8>
            <el-row v-if="isStared">
              <el-tooltip class="item" effect="dark" content="取消关注" placement="bottom">
                <el-button type="warning" @click="unStarActivity" icon="el-icon-star-on" circle style="font-size:22px"></el-button>
              </el-tooltip>
            </el-row>
            <el-row v-else>
              <el-tooltip class="item" effect="dark" content="关注活动" placement="bottom">
                <el-button type="info" @click="starActivity" icon="el-icon-star-off" circle style="font-size:22px"></el-button>
              </el-tooltip>
            </el-row>
          </el-col>
          <el-col :span=8>
            <el-tooltip class="item" effect="dark" content="评论活动" placement="bottom">
              <el-button type="info" icon="el-icon-edit" @click="commentVisible = true" circle style="font-size:22px"></el-button>
            </el-tooltip>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <!--  活动详细信息  -->
    <el-col class="activity_detail" :span=18>
      <el-scrollbar class="activity_detail_scrollbar">
        <!--  活动全部信息  -->
        <el-col :span=16 class="activity_detail">
          <el-card class="activity_detail_card" shadow="never">
            <el-row class="info_item_detail" v-for="(item, index) in baseInfo" :key="index">
              <div class="info_icon">
                <i :class="item.icon"></i>
              </div>
              <div class="info_text">
                <p class="info_text_title">{{item.title}}</p>
                <p class="info_text_content">{{item.content}}</p>
              </div>
            </el-row>
          </el-card>
        </el-col>
        <!--  活动人员信息  -->
        <el-col :span=8 class="member_list">
          <el-card style="margin:20px 5px 0 0" shadow="never">
            <el-collapse class="member_collapse">
              <el-collapse-item>
                <template slot="title">
                  <i class="el-icon-user-solid member_collapse_icon" style="margin-left:22px"></i>
                  <i class="el-icon-user-solid member_collapse_icon"></i>
                  <span class="member_collapse_title">活动人员列表</span>
                </template>
                <el-row class="member_collapse_box" shadow="never" v-for="(item,index) in memberList" :key="index" @click.native="gotoUserInfo(item.user, item.photo)">
                  <el-col class="member_icon" :span=6>
                    <el-avatar :size="60" :src="item.photo"></el-avatar>
                  </el-col>
                  <el-col class="member_info" :span=18>
                    <el-row class="member_info_id">
                      <el-col :span="24">
                        <el-button type="text">Member</el-button>
                      </el-col>
                      <el-col :span="24">
                        <span>{{item.username}}</span>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </el-col>
        <!--  活动评论信息  -->
        <el-col :span=24 class="remark">
          <el-card class="activity_detail_card" shadow="never">
            <el-row class="info_item_detail" v-for="(item, index) in remarkList" :key="index">
              <div class="info_remark">
                <span class="info_remark_title">{{item.send_time}}</span>
                <span class="info_remark_title">{{item.user}}</span>
              </div>
              <div class="info_remark">
                <span class="info_remark_content">{{item.comment_message}}</span>
              </div>
            </el-row>
          </el-card>
        </el-col>
      </el-scrollbar>
    </el-col>
    <el-dialog title="评论活动" :visible.sync="commentVisible" :append-to-body="true" width="500px">
      <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="commentText"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="commentVisible = false">取消</el-button>
        <el-button type="primary" @click="addComment">确定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "ActivityInfo",
    components: {},
    data() {
      return {
        baseInfo: [
        {
          title: "活动开始时间",
          content: "",
          icon: "el-icon-time",
        },
        {
          title: "报名截止时间",
          content: "",
          icon: "el-icon-time",
        },
        {
          title: "活动形式",
          content: "",
          icon: "el-icon-place",
        },
        {
          title: "活动平台",
          content: "",
          icon: "el-icon-place",
        },
        {
          title: "剧本类型",
          content: "",
          icon: "el-icon-tickets",
        },
        {
          title: "其他说明",
          content: "",
          icon: "el-icon-tickets",
        },
        {
          title: "发布者分数",
          content: "",
          icon: "el-icon-tickets",
        }, ],
        activityName: "",
        memberList: [],
        remarkList: [],

        activity_id: -1,

        isJoined: false,
        isStared: false,
        isWaiting: false,

        commentText: "",
        commentVisible: false,

        concernList: [],
        attendedList: [],
        toAttendList: [],
      };
    },
    created() {
      this.activity_id = this.$route.query.activity_id;
      this.getActivityDetail();
      this.getActivityUsers();
      this.getActivityRemark();

      this.getAttendAcitivityList();
      this.getConcernAcitivityList();
    },
    mounted() {},
    methods: {
      // 加入活动
      joinActivity() {
        axios.post(`http://localhost:8080/request/api/users/application`,
        {
          activity_id: this.activity_id,
        },
        {
          headers: {
            token: localStorage.getItem('token')
          }
        }).then(response => {
          if (response.data.code == 200) {
            this.isJoined = true;
          }
          else {
            alert(response.data.msg);
          }
        })
      },
      // 退出活动
      deleteActivity() {
        let requestData = {
          "activity_id": this.activity_id
        };
        if (confirm('确认要删除吗?')) {
          axios.get(`http://localhost:8080/request/api/users/participate/delete/`,
          {
            params: requestData,
            headers: {
              token: localStorage.getItem('token')
            }
          }).then(response => {
            if (response.data.code == 200) {
              alert(response.data.msg);
            }
            else {
              alert(response.data.msg);
            }
          })
        }
      },
      // 关注活动
      starActivity() {
        axios.post(`http://localhost:8080/request/api/users/concernactivity/`,
        {
          activity_id: this.activity_id,
        },
        {
          headers: {
            token: localStorage.getItem('token')
          }
        }).then(response => {
          if (response.data.code == 200) {
            this.isStared = true;
            alert(response.data.msg);
          }
          else {
            alert(response.data.msg);
          }
        })
      },
      // 取关活动
      unStarActivity() {
        axios.get(`http://localhost:8080/request/api/users/concern/delete/`,
        {
          params: {
            activity_id: this.activity_id
          },
          headers: {
            token: localStorage.getItem('token')
          }
        }).then(response => {
          if (response.data.code == 200) {
            this.isStared = false;
            alert(response.data.msg);
          }
          else {
            alert(response.data.msg);
          }
        })
      },
      // 新增评论
      addComment() {
        axios.post(`http://localhost:8080/request/api/users/detial/comment/`,
        {
          activity_id: this.activity_id,
          comment: this.commentText,
        },
        {
          headers: {
            token: localStorage.getItem('token')
          }
        }).then(response => {
          if (response.data.code == 200) {
            alert(response.data.msg);
          }
        })
      },
      // 跳转指定个人主页
      gotoUserInfo(userID, photo) {
        this.$router.push({ path: '/UserPage', query: { user_id: userID, user_photo: photo } });
      },
      // 获取活动详细信息
      getActivityDetail() {
        axios.get(`http://localhost:8080/request/api/users/detial/`,
        {
          params: {
            activity_id: this.activity_id
          },
          headers: {
            token: localStorage.getItem('token')
          }
        }).then(response => {
          let activity = response.data.data;
          this.baseInfo[0].content = this.getDatetimeFormat(activity.activity_start_time, "yyyy-MM-dd hh:mm")
          this.baseInfo[1].content = this.getDatetimeFormat(activity.activity_deadline, "yyyy-MM-dd hh:mm");
          this.baseInfo[2].content = activity.activity_type;
          this.baseInfo[3].content = activity.activity_address;
          this.baseInfo[4].content = activity.script_type;
          this.baseInfo[5].content = activity.activity_explain;
          this.baseInfo[6].content = activity.sponsor_score;
          this.activityName = activity.script_name
        })
      },
      // 获取活动参与用户
      getActivityUsers() {
        axios.get(`http://localhost:8080/request/api/users/detial/participants/`,
        {
          params: {
            activity_id: this.activity_id
          },
          headers: {
            token: localStorage.getItem('token')
          }
        }).then(response => {
          if (response.data.code == 200) {
            this.memberList = response.data.data;
            for (let i = 0; i < this.memberList.length; i++) {
              this.memberList[i].photo = this.getPhotoFormat(this.memberList[i].photo);
            }
          }
        })
      },
      // 获取活动评论
      getActivityRemark() {
        axios.get(`http://localhost:8080/request/api/users/detial/comment/`,
        {
          params: {
            activity_id: this.activity_id
          },
          headers: {
            token: localStorage.getItem('token')
          }
        }).then(response => {
          if (response.data.code == 200) {
            this.remarkList = response.data.data;
            for (let i = 0; i < this.remarkList.length; i++) {
              this.remarkList[i].send_time = this.getDatetimeFormat(this.remarkList[i].send_time, "yyyy-MM-dd hh:mm");
            }
          }
        })
      },
      // 转换时间格式
      getDatetimeFormat(rawDatetime, format) {
        let datetime = new Date(rawDatetime);
        let o = {
          "M+": datetime.getMonth() + 1, //月份
          "d+": datetime.getDate(), //日
          "h+": datetime.getHours(), //小时
          "m+": datetime.getMinutes(), //分
          "s+": datetime.getSeconds(), //秒
          "q+": Math.floor((datetime.getMonth() + 3) / 3), //季度
          "S": datetime.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(format))
          format = format.replace(RegExp.$1, (datetime.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
          if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return format;
      },
      // 获取加入列表
      getAttendAcitivityList() {
        axios.get(`http://localhost:8080/request/api/users/participate/`,
        {
          headers: {
            token: localStorage.getItem('token')
          }
        }).then(res => {
          if (res.data.code == 200) {
            console.log("我加入的活动：", res)
            this.attendedList = res.data.activity_attended;
            for (let i = 0; i < this.attendedList.length; i++) {
              if (this.attendedList[i].ID == this.activity_id) {
                this.isJoined = true;
                break;
              }
            }
            this.toAttendList = res.data.activity_to_attend;
            for (let i = 0; i < this.toAttendList.length; i++) {
              if (this.toAttendList[i].ID == this.activity_id) {
                this.isWaiting = true;
                break;
              }
            }
          }
          else {
            alert(res.data.message);
          }
        })
      },
      // 转换照片格式
      getPhotoFormat(url) {
        return `http://103.151.217.147/request/${url}`
      },
      // 获取关注列表
      getConcernAcitivityList() {
        axios.get(`http://localhost:8080/request/api/users/concern/`, {
          headers: {
            token: localStorage.getItem('token')
          }
        }).then(res => {
          if (res.data.code == 200) {
            console.log("我关注的活动：", res)
            this.concernList = res.data.activity_infos;
            for (let i = 0; i < this.concernList.length; i++) {
              if (this.concernList[i].ID == this.activity_id) {
                this.isStared = true;
                break;
              }
            }
          }
          else {
            alert(res.data.message);
          }
        })
      },
    },
  };
</script>

<style scope>
  .activity_base {
    margin-top: 20px;
    margin-left: 0;
  }

  .activity_base_card .el-card__body {
    padding: 0
  }

  .activity_image {
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

  .activity_title {
    margin-top: 25px;
    font-size: 30px;
    font-weight: 500;
    line-height: 1.25;
    word-wrap: break-word;
    font-family: 'Poppins';
    text-align: center;
  }

  .activity_operation {
    margin-top: 25px;
    margin-bottom: 25px;
    flex: 1;
    text-align: center;
    justify-content: center;
  }

  .activity_base_scrollbar {
    flex: 1;
    text-align: left;
    justify-content: center;
    padding-left: 20px;
    color: rgba(0, 0, 0, .54);
    height: 220px
  }

  .activity_detail {
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
    text-align: center;
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

  .activity_detail {
    margin-top: 0;
  }

  .activity_detail_scrollbar {
    height: 650px;
  }

  .activity_detail_card {
    margin: 20px 40px;
  }

  .member_list .el-card__body {
    padding: 0;
  }

  .member_collapse_icon {
    font-size: 20px;
    color: rgba(0, 0, 0, .54);
  }

  .member_collapse_title {
    font-size: 16px;
    color: rgba(0, 0, 0, .54);
    margin-left: 20px;
  }

  .member_collapse_box {
    margin-top: 5px
  }

  .member_collapse_box:hover {
    background-color: rgb(241, 243, 244);
  }

  .member_info {
    flex: 1;
    text-align: left;
    justify-content: center;
    padding-left: 30px;
  }

  .member_info_id {
    font-size: 16px
  }

  .member_icon {
    margin-top: 8px;
  }

  .info_remark {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
  }

  .info_remark_title {
    color: rgba(0, 0, 0, 0.93);
    font-size: 20px;
    margin-right: 80px;
  }

  .info_remark_content {
    color: rgba(0, 0, 0, .54);
    font-size: 18px;
  }

  .el-dialog__body>.el-scrollbar .el-scrollbar__wrap {
    overflow-x: hidden !important;
  }

  .el-dialog__body>.el-scrollbar .el-scrollbar__bar.is-horizontal {
    display: none;
  }
</style>