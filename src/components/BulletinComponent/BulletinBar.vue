<template>
  <div class="bulletinbar_framework">
    <!--  标记点  -->
    <el-badge :hidden="badge.isAllRead" :value="badge.totalUnRead" class="bulletinbar_badge" :max="10">
      <el-popover placement="bottom-start" width="400" trigger="click" @show="showBulletins">
        <!--  表格  -->
        <el-table :data="bulletinItems" v-loading="isLoadingMenu" max-height="400px" element-loading-spinner="el-icon-loading">
          <el-table-column label="消息列表" width="250" prop="updatedTime" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-badge is-dot :hidden="scope.row.read" class="bulletinbar_tableitem">
                <i class="el-icon-news"></i>
              </el-badge>
              <span style="margin-left: 50px">
                {{scope.row.updatedTime}}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="" width="150">
            <template slot-scope="scope">
              <el-button type="text" @click="
                  handleTableEdit(
                    scope.row.id,
                    scope.row.title,
                    scope.row.content,
                    scope.row.updatedTime,
                    scope.row.read
                  )
                ">
                <span>From&nbsp;&nbsp;{{scope.row.title}}</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="text" slot="reference">消息</el-button>
      </el-popover>
    </el-badge>
    <!--  弹出对话框  -->
    <el-dialog custom-class="bulletinbar_dialog" :visible.sync="dialog.isShowBulletin" append-to-body>
      <span slot="title" class="dialog-header">
        <i class="el-icon-news"></i>
        <span style="margin-left: 10px;font-size:24px">{{ dialog.title }}</span>
        </span>
        <div class="dialog_body" v-html="dialog.content"></div>
        <span slot="footer" class="dialog-footer">
          <pre>{{ "发布日期:  " + dialog.date }}</pre>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "ShowBulletin",
    components: {},
    data() {
      return {
        bulletinItems: [],
        dialog: {
          isShowBulletin: false, //点击详情，出现dialog对话框
          title: "", //对话框标题（==消息标题）
          content: "", //对话框内容 （==消息内容）
          date: "", //对话框日期（==消息日期）
          currentId: 1, //当前点击消息ID
          currentIsRead: false, //当前点击项状态
        },
        badge: {
          isAllRead: true, //消息消息是否全部已读
          totalUnRead: -1, //未读消息个数
        },
        isHidden: false, //未读消息为0时， 标记为不显示
        isLoadingMenu: false, //点击下拉菜单，出现loading状态
        totalPageSize: 0, //总条数
      };
    },
    async created() {
      this.isLoadingMenu = true;
      //获取下拉菜单所有消息项
      await this.getBulletin();
      this.isLoadingMenu = false;
    },
    methods: {
      async showBulletins() {
        this.isLoadingMenu = true;
        // 获取下拉菜单所有消息项
        await this.getBulletin();
        this.isLoadingMenu = false;
      },
      // 获取消息列表
      getBulletin() {
        axios.get(`http://localhost:8080/request/api/sendmessage/`,
        {
          headers: {
            token: localStorage.getItem('token')
          }
        }).then(response => {
          if (response.data.code == 200) {
            let resData = response.data.data;
            this.bulletinItems = [];
            for (let i = 0; i < resData.length; i++) {
              let dataItem = resData[i];
              this.bulletinItems.push({
                id: i,
                updatedTime: this.getDatetimeFormat(dataItem.message_time, "yyyy-MM-dd hh:mm"),
                title: dataItem.message_sponsor_name,
                content: dataItem.message_detail,
                read: dataItem.Is_read,
              })
            }
          }
        });
      },
      //点击菜单项时触发
      handleTableEdit(id, title, content, date, read) {
        this.dialog.isShowBulletin = true;
        this.dialog.currentId = id;
        this.dialog.title = title;
        this.dialog.content = content;
        this.dialog.currentIsRead = read;
        this.dialog.date = this.getDatetimeFormat(date, "yyyy-MM-dd hh:mm");
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
    },
  };
</script>

<style>
  .bulletinbar_tableitem .el-badge__content.is-fixed {
    top: 5px !important;
    right: 8px !important;
  }

  .el-badge__content.is-fixed {
    top: 14px !important;
  }

  .bulletinbar_dialog .el-dialog__header {
    font-size: 20px;
    padding-bottom: 0px;
  }

  .bulletinbar_dialog .el-dialog__body {
    padding: 20px;
  }

  .bulletinbar_dialog .el-dialog__footer {
    padding-top: 0px;
    padding-bottom: 20px;
  }

  .dialog_body {
    padding: 10px;
    border: 1px solid #ccc;
    height: 400px;
    overflow: auto;
  }

  /* table 样式 */
  .dialog_body table {
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
  }

  .dialog_body table td,
  .dialog_body table th {
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    padding: 3px 5px;
  }

  .dialog_body table th {
    border-bottom: 2px solid #ccc;
    text-align: center;
  }

  /* blockquote 样式 */
  .dialog_body blockquote {
    display: block;
    border-left: 8px solid #d0e5f2;
    padding: 5px 10px;
    margin: 10px 0;
    line-height: 1.4;
    font-size: 100%;
    background-color: #f1f1f1;
  }

  /* ul ol 样式 */
  .dialog_body ul,
  .dialog_body ol {
    margin: 10px 0 10px 20px;
  }

  /* 分页栏居中 */
  .bulletinbar_pagination.el-pagination.el-pagination--small {
    margin-top: 10px;
    text-align: center;
  }
</style>

<style scoped>
  pre {
    font-size: 14px;
    color: rgb(211, 209, 209);
    margin: 0px;
  }
</style>