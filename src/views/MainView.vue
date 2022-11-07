<template>
  <el-row class="data_framework">
    <el-col :span="24">
      <!-- 侧边导航栏 -->
      <el-col :span="4">
        <el-menu router :default-active="$route.path" class="el-menu-vertical-demo">
          <template v-for="item in menuItems">
            <el-menu-item v-if="item.subMenu.length === 0" :key="item.index" :index="item.index">
              <p style="margin-left:20px"><i :class="item2icon[item.title]" style="margin-right:20px"></i>{{ item.title }}</p>
            </el-menu-item>
            <el-submenu v-else :key="item.index" :index="item.index">
              <template slot="title">
                <p style="margin-left:20px"><i :class="item2icon[item.title]" style="margin-right:20px"></i>{{ item.title }}</p>
              </template>
              <el-menu-item v-for="subItem in item.subMenu" :key="subItem.index" :index="subItem.index">
                <p style="margin-left:33px">{{ subItem.title }}</p>
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-col>
      <!-- 右侧窗口栏 -->
      <el-col :span="20" :style="{ height: innerHeight }">
        <el-scrollbar class="routerview_scrollbar" style="background-color: #fafafa;">
          <router-view></router-view>
        </el-scrollbar>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "MainView",
    data() {
      return {
        clientHeight: "", // 浏览器可视高度
        innerHeight: "", // router-view可视高度

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
            index: "/ActivityPage",
            title: "活动大厅",
            subMenu: [],
          },
          // 活动相关
          {
            index: "/CreateActivity",
            title: "发起活动",
            subMenu: [],
          },
          // 用户活动相关
          {
            index: "/UserPage",
            title: "我的活动",
            subMenu: [
            {
              index: "/CreatePage",
              title: "我发起的活动",
            },
            {
              index: "/ConcernPage",
              title: "我关注的活动",
            },
            {
              index: "/AttendPage",
              title: "我加入的活动",
            }, ],
          },
        ],

        // 导航栏内容对应图标
        item2icon: {
          首页: "el-icon-data-analysis",
          活动大厅: "el-icon-receiving",
          发起活动: "el-icon-circle-plus-outline",
          我的活动: "el-icon-office-building",
        },
      };
    },
    computed: {},
    watch: {
      clientHeight() {
        this.updateInnerHeight(this.clientHeight);
      },
    },
    created() {
      this.$router.push({ path: '/Frontpage' });
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
        this.innerHeight = clientHeight - 70 + "px";
      },
    },
  };
</script>

<style>
  .routerview_scrollbar {
    height: 100%;
  }

  .routerview_scrollbar .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  .el-select {
    width: 100%;
  }

  .search_autocomplete {
    width: 100%;
  }

  .el-autocomplete {
    width: 100%;
  }

  .el-menu-vertical-demo {
    text-align: left;
  }

  .el-submenu .el-menu.el-menu--inline {
    padding-left: 10px;
  }

  .el-submenu .el-menu-item {
    min-width: 100px;
  }
</style>