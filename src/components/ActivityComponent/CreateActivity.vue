<template>
  <div class="subActivity">
    <el-card shadow="never" :body-style="{padding:'40px'}" style="margin-top:20px">
      <el-form :model="formInfo" status-icon ref="formInfo" :label-position="labelPosition" :rules="rules">
        <el-form-item size="mini" label="活动名称" prop="activity_name" :label-width="formLabelWidth" :rules="[
                    { required: true, message: '活动名称不能为空'},
                    { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
                ]">
          <el-input v-model="formInfo.activity_name" placeholder="请输入活动名称" style="width: 4rem;margin-left:0.5rem"></el-input>
        </el-form-item>
        <el-form-item size="mini" label="活动开始时间" prop="startTime" :label-width="formLabelWidth" :rules="[
                    { required: true, message: '活动开始时间不能为空'},
                ]">
          <div class="block" style="margin-left:0.5rem">
            <el-date-picker v-model="formInfo.startTime" type="datetime" placeholder="选择活动开始时间" value-format="yyyy-MM-dd hh:mm:ss">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item size="mini" label="报名截止时间" prop="enrollDeadline" :label-width="formLabelWidth" :rules="[
                    { required: true, message: '报名截止时间不能为空'},
                ]">
          <div class="block" style="margin-left:0.5rem">
            <el-date-picker v-model="formInfo.enrollDeadline" type="datetime" placeholder="选择报名截止时间" value-format="yyyy-MM-dd hh:mm:ss">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="活动形式" :label-width="formLabelWidth">
          <el-radio v-model="formInfo.activity_form" label="1" style="margin-left:0.5rem">线上</el-radio>
          <el-radio v-model="formInfo.activity_form" label="2" style="margin-left:0.5rem">线下</el-radio>
        </el-form-item>
        <el-form-item size="mini" label="活动地点" :label-width="formLabelWidth" prop="location" :rules="[
                    { required: true, message: '活动地点不能为空',trigger:'blur'},
                ]">
          <el-input v-model="formInfo.location" placeholder="请输入活动地点" style="width: 5rem;margin-left:0.5rem"></el-input>
        </el-form-item>
        <el-form-item size="mini" label="剧本类型" :label-width="formLabelWidth">
          <el-select v-model="formInfo.selectDramaValue" filterable placeholder="请选择剧本类型" style="margin-left:0.5rem">
            <el-option v-for="item in formInfo.dramaOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="mini" label="剧本名称:" prop="dramaName" :label-width="formLabelWidth">
          <el-select v-model="formInfo.dramaName" filterable placeholder="请选择剧本名称" no-match-text=" " style="margin-left:0.5rem">
            <el-option v-for="item in formInfo.dramaNameOptions[formInfo.selectDramaValue]" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="其他说明" :label-width="formLabelWidth">
          <el-input type="textarea" style="width:7rem;margin-left:0.5rem" placeholder="其他说明" v-model="formInfo.textarea" maxlength="30" show-word-limit>
          </el-input>
        </el-form-item>
        <el-form-item style="margin-left:2.5rem">
          <el-button @click="submitForm">确认提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'SubmitActivity',
    data() {
      //验证剧本名称
      var validateDramaName = (rule, value, callback) => {
        // console.log(value);
        if (value === '无' || value === '未确定') {
          callback(new Error('剧本名称不能为空'))
        } else {
          callback();
        }
      }
      return {
        formInfo: {
          u_token: '',
          activity_name: '',
          startTime: '',
          enrollDeadline: '',
          activity_form: '1',
          location: '',
          selectDramaValue: '',
          selectTimeValue: '',
          dramaName: '无',
          activityTime: '',
          maleNum: '',
          femaleNum: '',
          textarea: '',
          dramaOptions: [{
            value: '未确定',
            label: '未确定'
          }, {
            value: '阵营本',
            label: '阵营本'
          }, {
            value: '机制本',
            label: '机制本'
          }, {
            value: '沉浸本',
            label: '沉浸本'
          }, {
            value: '情感本',
            label: '情感本'
          }, {
            value: '恐怖本',
            label: '恐怖本'
          }, {
            value: '还原本',
            label: '还原本'
          }, {
            value: '硬核本',
            label: '硬核本'
          }, {
            value: '其他',
            label: '其他'
          }],
          dramaNameOptions: {
            "未确定": [{ value: "未确定", label: "未确定" }],
            "阵营本": [{ value: "《日日是好日》", label: "《日日是好日》" }, { value: "《野の蔷薇》", label: "《野の蔷薇》" }],
            "机制本": [{ value: "《日日是好日》", label: "《日日是好日》" }, { value: "《野の蔷薇》", label: "《野の蔷薇》" }, { value: "《星落五丈原》", label: "《星落五丈原》" }, ],
            "沉浸本": [{ value: "《爱幼妇产医院》", label: "《爱幼妇产医院》" }],
            "情感本": [{ value: "《年轮》", label: "《年轮》" }, { value: "《爱幼妇产医院》", label: "《爱幼妇产医院》" }],
            "恐怖本": [{ value: "《来电》", label: "《来电》" }, { value: "《日日是好日》", label: "《日日是好日》" }],
            "还原版": [{ value: "《来电》", label: "《来电》" }],
            "硬核本": [{ value: "《青楼》", label: "《青楼》" }],
            "其他": [{ value: "《青楼》", label: "《青楼》" }, { value: "《野の蔷薇》", label: "《野の蔷薇》" }]
          }

        },
        formLabelWidth: '2rem',
        labelPosition: 'right',
        rules: {
          dramaName: [
            { required: true, validator: validateDramaName, trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      submitForm() {
        this.$refs.formInfo.validate((valid) => {
          if (valid) {
            // console.log(this.formInfo.u_token);
            if (confirm('是否确认提交')) {
              axios.post('http://localhost:8080/request/api/users/publish/', {
                activity_name: this.formInfo.activity_name,
                start_time: this.formInfo.startTime,
                enroll_deadline: this.formInfo.enrollDeadline,
                activity_form: this.formInfo.activity_form,
                location: this.formInfo.location,
                selectDramaValue: this.formInfo.selectDramaValue,
                dramaName: this.formInfo.dramaName,
                textarea: this.formInfo.textarea
              }, {
                headers: {
                  token: localStorage.getItem('token')
                }
              }).then(response => {
                if (response.data.code === 200) {
                  // console.log(response);
                  alert('发布活动成功!')
                } else {
                  alert(response.data.msg)
                }
                // console.log(response);
              })
            }
          } else {
            return false
          }
        })

      }
    },

  }
</script>

<style scoped>
  .subActivity {
    width: 95%;
    height: 100%;
    margin: .125rem auto;
  }

  span {
    color: #606266;
  }

  .roleNum span {
    margin-right: .625rem;
  }
</style>