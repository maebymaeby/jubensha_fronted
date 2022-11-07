<template>
  <el-row class="activitypage_framework">
    <el-row>
      <el-col :span="24" style="margin-top:20px;margin-left:20px">
        <span style="font-size:20px"> 已加入的活动</span>
      </el-col>
      <el-col class="activity_card" :span="6" v-for="(item,index) in attendedList" :key="index">
        <el-row>
          <activity-card :activityData="item"></activity-card>
        </el-row>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="24" style="margin-top:20px;margin-left:20px">
        <span style="font-size:20px"> 待审核的活动</span>
      </el-col>
      <el-col class="activity_card" :span="6" v-for="(item,index) in toAttendList" :key="index">
        <el-row>
          <activity-card :activityData="item"></activity-card>
        </el-row>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
  import ActivityCard from "./ActivityCard.vue"
  import axios from 'axios'

  export default {
    name: "ActivityPage",
    components: {
      ActivityCard
    },
    data() {
      return {
        attendedList: [],
        toAttendList: [],
      };
    },
    created() {
      this.getAttendAcitivityList();
    },
    methods: {
      getAttendAcitivityList() {
        axios.get(`http://localhost:8080/request/api/users/participate/`,
        {
          headers: {
            token: localStorage.getItem('token')
          }
        }).then(res => {
          if (res.data.code == 200) {
            console.log("我的活动：", res)
            this.attendedList = res.data.activity_to_attend;
            this.toAttendList = res.data.waiting;
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
  .activity_card {
    margin-top: 30px
  }
</style>