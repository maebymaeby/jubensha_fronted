<template>
  <el-row class="data_framework">
    <el-col :span="24">
      <!-- 侧边导航栏 -->
      <el-col :span="3">
        <el-menu router :default-active="$route.path" class="el-menu-vertical-demo">
          <template v-for="item in menuItems">
            <el-menu-item v-if="item.subMenu.length === 0" :key="item.index" :index="item.index">
              <i :class="item2icon[item.title]"></i>{{ item.title }}
            </el-menu-item>
            <el-submenu v-else :key="item.index" :index="item.index">
              <template slot="title"><i :class="item2icon[item.title]"></i>{{ item.title }}</template>
              <el-menu-item v-for="subItem in item.subMenu" :key="subItem.index" :index="subItem.index">
                <i :class="item2icon[subItem.title]"></i>{{ subItem.title }}
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-col>
      <!-- 右侧窗口栏 -->
      <el-col :span="21" :style="{ height: innerHeight }">
        <el-scrollbar class="routerview_scrollbar">
          <router-view></router-view>
        </el-scrollbar>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
import GLOBAL from "@/utils/global.js";

export default {
  name: "Data",
  data() {
    return {
      clientHeight: "", // 浏览器可视高度
      innerHeight: "", // router-view可视高度

      // 导航栏图标
      item2icon: {
        // 首页
        首页: "el-icon-error",
        // 活动相关
        发布活动: "el-icon-error",
        参加活动: "el-icon-error",
        浏览活动: "el-icon-error",
        搜索活动: "el-icon-error",
        // 用户相关
        用户注册: "el-icon-error",
        个人信用评分: "el-icon-error",
        个人信息管理: "el-icon-error",
        // 管理员相关
        管理员管理用户: "el-icon-error",
        用户分组: "el-icon-error",
      },

      // 导航栏数据格式
      menuItems: [
        // 首页
        {
          index: "/FrontPage",
          title: "首页",
          subMenu: [],
        },
        // 活动相关
        {
          index: "/Activity",
          title: "活动相关",
          subMenu: [
            {
              index: "/CreateActivity",
              title: "发布活动",
            },
            {
              index: "/JoinActivity",
              title: "参加活动",
            },
            {
              index: "/BrowseActivity",
              title: "浏览活动",
            },
            {
              index: "/SearchActivity",
              title: "搜索活动",
            },
          ],
        },
        // 用户相关
        {
          index: "/User",
          title: "用户相关",
          subMenu: [
            {
              index: "/UserRegister",
              title: "用户注册",
            },
            {
              index: "/UserCredit",
              title: "个人信用评分",
            },
            {
              index: "/UserInfo",
              title: "个人信息管理",
            },
          ],
        },
        // 管理员相关
        {
          index: "/Admin",
          title: "管理员相关",
          subMenu: [
            {
              index: "/UserManagement",
              title: "管理员管理用户",
            },
            {
              index: "/UserGroup",
              title: "用户分组",
            },
          ],
        },
      ],
    };
  },
  computed: {},
  watch: {
    clientHeight() {
      this.updateInnerHeight(this.clientHeight);
    },
  },
  mounted() {
    // 根据浏览器高度自动条件routerview高度，控制scrollbar效果
    this.clientHeight = document.documentElement.clientHeight; // 获取浏览器可视区域高度
    let that = this;
    window.onresize = function () {
      this.clientHeight = document.documentElement.clientHeight;
      that.updateInnerHeight(this.clientHeight);
    };
  },
  updated() {},
  methods: {
    // 更新可视区域高度
    updateInnerHeight(clientHeight) {
      this.innerHeight = clientHeight - GLOBAL.topnavHeight + "px";
    },
  },
};
</script>

<style>
@import "../style/Data.css";
@import "../style/Global.css";
</style>