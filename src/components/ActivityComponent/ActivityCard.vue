<template>
  <el-row class="activitycard_framework">
    <el-card shadow="never" @click.native="clickEvent()">
      <div class="image_box">
        <img :src="title2Photo(this.activityData.script_name)" class="image_content">
      </div>
      <!-- 剧本名称 -->
      <div class="info_text" style="margin-top:10px">
        <p class="info_text_title" style="font-size:18px">{{this.activityData.script_name}}</p>
      </div>

      <div class="info_box" style="margin-top:10px">
        <!-- 活动开始时间 -->
        <el-row class="info_item_base">
          <div class="info_icon">
            <i :class="this.activityInfoList[0].icon"></i>
          </div>
          <div class="info_text">
            <p class="info_text_title">{{this.activityInfoList[0].title}}</p>
            <p class="info_text_content">{{this.getDatetimeFormat(this.activityData.activity_start_time, "yyyy-MM-dd hh:mm")}}</p>
          </div>
        </el-row>

        <!-- 报名截至时间 -->
        <el-row class="info_item_base">
          <div class="info_icon">
            <i :class="this.activityInfoList[1].icon"></i>
          </div>
          <div class="info_text">
            <p class="info_text_title">{{this.activityInfoList[1].title}}</p>
            <p class="info_text_content">{{this.getDatetimeFormat(this.activityData.activity_deadline, "yyyy-MM-dd hh:mm")}}</p>
          </div>
        </el-row>

        <!-- 活动形式 -->
        <el-row class="info_item_base">
          <div class="info_icon">
            <i :class="this.activityInfoList[2].icon"></i>
          </div>
          <div class="info_text">
            <p class="info_text_title">{{this.activityInfoList[2].title}}</p>
            <p class="info_text_content">{{this.changeType()}}</p>
          </div>
        </el-row>

        <!-- 剧本类型 -->
        <el-row class="info_item_base">
          <div class="info_icon">
            <i :class="this.activityInfoList[3].icon"></i>
          </div>
          <div class="info_text">
            <p class="info_text_title">{{this.activityInfoList[3].title}}</p>
            <p class="info_text_content">{{this.activityData.script_type}}</p>
          </div>
        </el-row>

      </div>
    </el-card>
  </el-row>
</template>

<script>
  // import axios from 'axios'

  export default {
    props: {
      activityData: {
        type: Object,
        required: true,
      },
      gotoRoute: {
        type: String,
        default: "/ActivityInfo",
      },
    },
    name: "ActivityCard",
    components: {},
    data() {
      return {
        activityInfoList: [
        {
          title: "活动开始时间",
          content: "",
          icon: "el-icon-time",
        },
        {
          title: "报名截至时间",
          content: "",
          icon: "el-icon-time",
        },
        {
          title: "活动形式",
          content: "这是剧本偏好",
          icon: "el-icon-place",
        },
        {
          title: "剧本类型",
          content: "",
          icon: "el-icon-data-board",
        }],
        scriptPhoto: "../../assets/images/script1.jpeg",
      };
    },
    created() {},
    methods: {
      clickEvent() {
        this.$router.push({ path: this.gotoRoute, query: { activity_id: this.activityData.ID } });
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
      // 获取照片
      title2Photo(title) {
        if (title[1] == "日") {
          return require("@/assets/images/日日是好日.jpg");
        }
        else if (title[1] == "野") {
          return require("@/assets/images/野蔷薇.png");
        }
        else if (title[1] == "星") {
          return require("@/assets/images/星落五丈原.png");
        }
        else if (title[1] == "爱") {
          return require("@/assets/images/爱幼妇产科医院.png");
        }
        else if (title[1] == "年") {
          return require("@/assets/images/年轮.png");
        }
        else if (title[1] == "来") {
          return require("@/assets/images/来电.png");
        }
        else if (title[1] == "青") {
          return require("@/assets/images/青楼.png");
        }
      },
      changeType() {
        let res = "";
        if (this.activityData.activity_type == 1) {
          res = "线上活动"
        }
        else if (this.activityData.activity_type == 2) {
          res = "线下活动"
        }
        else {
          res = this.activityData.activity_type;
        }
        return res
      }
    },
  };
</script>

<style scoped>
  .activitycard_framework {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .image_box {
    width: 100%;
    height: 250px;
    overflow: hidden;
  }

  .image_content {
    width: 100%;
    height: 250px;
    margin: 0 auto;
    transition: all 0.5s;
  }

  .image_content:hover {
    transform: scale(1.25);
  }

  .info_item_base {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    line-height: 1.75;
  }

  .info_item_base:hover {
    background-color: rgb(241, 243, 244);
  }

  .info_icon {
    font-size: 30px;
    margin-right: 20px;
  }

  .info_text {
    flex: 1;
    text-align: left;
    justify-content: center;
  }

  .info_text_title {
    color: rgba(0, 0, 0, 0.93);
    font-size: 16px;
  }

  .info_text_content {
    color: rgba(0, 0, 0, .54);
    font-size: 12px;
  }
</style>