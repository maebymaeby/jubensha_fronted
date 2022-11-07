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
          <el-col :span=12>
            <el-row>
              <el-tooltip class="item" effect="dark" content="结算活动" placement="bottom">
                <el-button type="success" @click="completeVisible = true" icon="el-icon-date" circle style="font-size:22px"></el-button>
              </el-tooltip>
            </el-row>
          </el-col>
          <el-col :span=12>
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
          <!--  已参加人员信息  -->
          <el-card style="margin:20px 5px 0 0" shadow="never">
            <el-collapse class="member_collapse">
              <el-collapse-item>
                <template slot="title">
                  <i class="el-icon-user-solid member_collapse_icon" style="margin-left:22px"></i>
                  <i class="el-icon-user-solid member_collapse_icon"></i>
                  <span class="member_collapse_title">已参加人员列表</span>
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
          <!--  待审核人员信息  -->
          <el-card style="margin:20px 5px 0 0" shadow="never">
            <el-collapse class="member_collapse">
              <el-collapse-item>
                <template slot="title">
                  <i class="el-icon-user-solid member_collapse_icon" style="margin-left:22px"></i>
                  <i class="el-icon-user-solid member_collapse_icon"></i>
                  <span class="member_collapse_title">待审核人员列表</span>
                </template>
                <el-row class="member_collapse_box" shadow="never" v-for="(item,index) in applyList" :key="index">
                  <el-col class="member_icon" :span=6 @click.native="gotoUserInfo(item.ID, item.photo)">
                    <el-avatar :size="60" :src="item.photo"></el-avatar>
                  </el-col>
                  <el-col class="member_info" :span=18>
                    <el-row class="member_info_id">
                      <el-col :span=14>
                        <el-col :span="24">
                          <el-button type="text">Application</el-button>
                        </el-col>
                        <el-col :span="24">
                          <span>{{item.username}}</span>
                        </el-col>
                      </el-col>
                      <el-col :span=10 class="apply_button">
                        <el-button type="success" size="mini" circle @click="confirmApply(item.ID, true)"></el-button>
                        <el-button type="danger" size="mini" circle @click="confirmApply(item.ID, false)"></el-button>
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
    <el-dialog title="结算活动" :visible.sync="completeVisible" :append-to-body="true" width="500px">
      <el-menu :default-active="menuItems[0].index" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <template v-for="item in menuItems">
          <el-menu-item :key="item.index" :index="item.index">
            {{ item.title }}
              </el-menu-item>
        </template>
      </el-menu>
      <el-col :span="24" v-show="isAll">
        <el-row class="radio_complete">
          <el-radio v-model="allComplete" label="yes">全部参加</el-radio>
          <el-radio v-model="allComplete" label="no">全部未参加</el-radio>
        </el-row>
      </el-col>
      <el-col :span="24" v-show="isEach">
        <el-table :data="userList" style="width: 100%">
          <el-table-column prop="icon" label="头像" align="center">
            <template slot-scope="scope">
              <el-avatar :size="48" :src="scope.row.photo"></el-avatar>
            </template>
          </el-table-column>
          <el-table-column prop="username" label="用户名" align="center">
          </el-table-column>
          <el-table-column width="140" align="right">
            <template slot="header">
              <el-button type="text">是否参加活动</el-button>
            </template>
            <template slot-scope="scope">
              <el-col :span="12">
                <el-button :type="yesType" icon="el-icon-check" size="mini" circle @click="confirmComplete(scope.row.user, true)"></el-button>
              </el-col>
              <el-col :span="12">
                <el-button :type="noType" icon="el-icon-close" size="mini" circle @click="confirmComplete(scope.row.user, false)"></el-button>
              </el-col>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <div slot="footer" class="dialog-footer">
        <el-button @click="completeVisible = false">取消</el-button>
        <el-button type="primary" @click="completeActivity">确定</el-button>
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
        applyList: [],
        userList: [],
        remarkList: [],

        activity_id: -1,

        isJoined: false,
        isStared: false,

        commentText: "",
        commentVisible: false,
        completeVisible: false,

        menuItems: [
        {
          index: "forALL",
          title: "统一结算",
          subMenu: [],
        },
        {
          index: "forEach",
          title: " 分别结算",
          subMenu: [],
        }],

        isAll: true,
        isEach: false,

        allComplete: "",

        yesType: "info",
        noType: "info",
      };
    },
    created() {
      this.activity_id = this.$route.query.activity_id;
      this.getActivityDetail();
      this.getActivityUsers();
      this.getActivityRemark();
      this.getApplyUsers();
    },
    mounted() {},
    methods: {
      // 结算活动(All)
      completeActivity1() {
        let flag;
        if (this.allComplete == "yes") {
          flag = true;
        }
        else {
          flag = false
        }
        axios.post(`http://localhost:8080/request/api/users/manageactivity1/`,
        {
          activity_id: this.activity_id,
          TorF: flag
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
      // 结算活动(Each)
      completeActivity() {
        let data = {};
        for (let i = 0; i < this.userList.length; i++) {
          if (this.userList[i].attend == true) {
            data[this.userList[i].user] = this.userList[i].username;
          }
        }
        axios.post(`http://localhost:8080/request/api/users/manageactivity/`,
        {
          activity_id: this.activity_id,
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
      // 结算点击事件
      confirmComplete(user, flag) {
        this.yesType = "info";
        this.noType = "info";
        if (flag == true) {
          this.yesType = "success";
        }
        else {
          this.noType = "danger";
        }
        for (let i = 0; i < this.userList.length; i++) {
          if (this.userList[i].user == user) {
            this.userList[i].attend = flag;
            break;
          }
        }
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
      // 确认申请
      confirmApply(user_id, flag) {
        let data = {
          activity_id: this.activity_id,
          user_id: user_id,
          feedback: flag
        }
        axios.post(`http://localhost:8080/request/api/users/involveActivity`, data,
        {
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
            this.userList = this.memberList;
            for (let i = 0; i < this.userList.length; i++) {
              this.userList[i].photo = this.getPhotoFormat(this.userList[i].photo);
              this.userList[i].attend = true;
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
            console.log("活动评论：", response)
            this.remarkList = response.data.data;
            for (let i = 0; i < this.remarkList.length; i++) {
              this.remarkList[i].send_time = this.getDatetimeFormat(this.remarkList[i].send_time, "yyyy-MM-dd hh:mm");
            }
          }
        })
      },
      // 获取申请用户列表
      getApplyUsers() {
        axios.get(`http://localhost:8080/request/api/users/detial/reviewing/`,
        {
          params: {
            activity_id: this.activity_id
          },
          headers: {
            token: localStorage.getItem('token')
          }
        }).then(response => {
          if (response.data.code == 200) {
            this.applyList = response.data.data;
            for (let i = 0; i < this.applyList.length; i++) {
              this.applyList[i].photo = this.getPhotoFormat(this.applyList[i].photo);
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
      // 转换照片格式
      getPhotoFormat(url) {
        return `http://103.151.217.147/request/${url}`
      },
      // 切换结算方式
      handleSelect(index) {
        if (index == "forALL") {
          this.isAll = true;
          this.isEach = false;
        }
        else if (index == "forEach") {
          this.isAll = false;
          this.isEach = true;
        }
      },
    }
  }
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
    line-height: 2;
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

  .apply_button {
    margin-top: 35px;
    flex: 1;
    text-align: left;
    justify-content: center;
    padding: 0;
  }

  .radio_complete {
    flex: 1;
    text-align: left;
    justify-content: center;
    height: 80px;
    padding: 40px 20px;
  }
</style>