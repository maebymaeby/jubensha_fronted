<template>
  <el-row class="activitypage_framework">
    <el-col :span="24" style="margin-top:20px;margin-left:20px">
      <span style="font-size:20px"> 已关注的活动</span>
    </el-col>
    <el-col class="activity_card" :span="6" v-for="(item,index) in activityList" :key="index">
      <el-row>
        <activity-card :activityData="item"></activity-card>
      </el-row>
    </el-col>
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
        activityList: [],
      };
    },
    created() {
      this.getAcitivityList();
    },
    methods: {
      getAcitivityList() {
        axios.get(`http://localhost:8080/request/api/users/concern/`, {
          headers: {
            token: localStorage.getItem('token')
          }
        }).then(res => {
          if (res.data.code == 200) {
            console.log("我关注的活动：", res)
            this.activityList = res.data.activity_infos;
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