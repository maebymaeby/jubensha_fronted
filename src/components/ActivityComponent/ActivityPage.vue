<template>
  <el-row class="activitypage_framework">
    <el-col :span="24" class="header clearfix">
      <el-button class="select" @click="dialog = true">筛选</el-button>
    </el-col>
    <el-col class="activity_card" :span="6" v-for="(item,index) in form.activities" :key="index">
      <el-row>
        <activity-card :activityData="item"></activity-card>
      </el-row>
    </el-col>
    <!--抽屉-->
    <el-drawer :visible.sync="dialog" direction="rtl" custom-class="demo-drawer" ref="drawer">
      <template slot="title">
        <span style="margin-top:20px;margin-left:32px;font-size:16px;color:#409EFF">筛选</span>
      </template>
      <div class=" demo-drawer__content">
        <el-form :model="form" style="margin-left:40px">
          <el-form-item label="活动形式" :label-width="formLabelWidth">
            <el-radio v-model="form.activity_form" label="线上活动">线上</el-radio>
            <el-radio v-model="form.activity_form" label="线下活动">线下</el-radio>
          </el-form-item>
          <el-form-item label="剧本类型" :label-width="formLabelWidth">
            <el-select v-model="form.dramaType" placeholder="请选择剧本类型">
              <el-option label="阵营本" value="阵营本"></el-option>
              <el-option label="机制本" value="机制本"></el-option>
              <el-option label="沉浸本" value="沉浸本"></el-option>
              <el-option label="情感本" value="情感本"></el-option>
              <el-option label="恐怖本" value="恐怖本"></el-option>
              <el-option label="还原本" value="还原本"></el-option>
              <el-option label="硬核本" value="硬核本"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="剧本名称" :label-width="formLabelWidth">
            <el-input v-model="form.dramaName" style="width:4rem" placeholder="请输入剧本名称"></el-input>
          </el-form-item>

          <el-form-item label="活动地点" :label-width="formLabelWidth">
            <el-input v-model="form.activity_location" style="width:4rem" placeholder="请输入活动地点">
            </el-input>
          </el-form-item>
          <el-form-item>
            <div class="block">
              <el-date-picker v-model="form.enrollDeadline" type="date" placeholder="选择报名截止日期" value-format="yyyy-MM-dd">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="block">
              <el-date-picker v-model="form.startTime" type="date" placeholder="选择活动开始日期" value-format="yyyy-MM-dd">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer" style="margin-top:40px;margin-left:40px">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </div>
    </el-drawer>
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
        dialog: false,
        form: {
          activities: [],
          name: '',
          dramaType: '',
          activity_form: '',
          enrollDeadline: '',
          startTime: '',
          dramaName: '',
          activity_location: '',
        },
        formLabelWidth: '1.5rem',
      };
    },
    created() {
      this.getAcitivityList();
    },
    mounted() {
      this.$bus.$on('getActivity', (activities) => {
        this.form.activities = activities
      })
    },
    beforeDestroy() {
      this.$bus.$off('getActivity');
    },
    methods: {
      // 获取活动列表
      getAcitivityList() {
        axios.get(`http://localhost:8080/request/api/users/activity/`,
        {
          headers: {
            token: localStorage.getItem('token')
          }
        }).then(res => {
          if (res.data.code == 200) {
            this.form.activities = res.data.data;
          }
          else {
            this.openMessage(res.data.msg, 'error');
          }
        })
      },
      // 提交筛选框
      submitForm() {
        this.dialog = false;
        axios.post('http://localhost:8080/request/api/users/get_activity/', {
          activityForm: this.form.activity_form,
          dramaType: this.form.dramaType,
          dramaName: this.form.dramaName,
          activity_location: this.form.activity_location,
          startTime: this.form.startTime,
          enrollDeadline: this.form.enrollDeadline,
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        }).then(response => {
          this.form.activity_form = ''
          this.form.dramaType = ''
          if (response.data.code === 200) {
            this.form.activities = response.data.data
          } else {
            this.openMessage(response.data.msg, 'error');
          }
        })
      },
      // 关闭筛选框
      cancelForm() {
        this.dialog = false;
      },
      // 显示错误信息
      openMessage(text, type) {
        this.$message({
          message: text,
          type: type,
        });
      }
    },
  };
</script>

<style scope>
  .activity_card {
    margin-top: 30px
  }

  .clearfix {
    flex: 1;
    text-align: right;
    justify-content: center;
  }

  .select {
    margin-top: 20px;
    margin-right: 80px;
  }
</style>