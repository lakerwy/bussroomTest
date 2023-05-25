<template>
  <div class="record">
    <div class="myteam" v-if="isAdmin">
      <span :class="!isTeam?'active':''" @click="setMyTeam(0)">我的</span>
      <span :class="isTeam?'active':''" @click="setMyTeam(1)">我的团队</span>
    </div>
    <div class="myteam" v-if="!isAdmin">
      <span class="active">我的</span>
    </div>
    <Card class="card recordCont">
      <h3>历史操作记录</h3>
      <Form class="form" ref="formInline" :rules="ruleValidate" :label-width="85" label-position="left" :model="form">
        <FormItem label="操作类型：">
          <Select v-model="form.operationType" style="width: 400px">
<!--            <Option :value="0">默认操作</Option>-->
            <Option :value="1">登录操作</Option>
          </Select>
        </FormItem>
        <FormItem label="时间范围：">
          <RadioGroup v-model="form.dateRange" @on-change="changeRange">
            <template v-for="(item,index) in timeRange">
              <Radio style="margin-right: 20px" :key="item.value" :label="item.value">{{ item.label }}</Radio>
            </template>
          </RadioGroup>
          <DatePicker
              class="datePicker"
              v-show="form.dateRange == -1"
              type="daterange"
              :options="dateOption"
              transfer
              placement="bottom-end"
              placeholder="选择日期"
              @on-change="pickDate"
              v-model="dateArr"
          ></DatePicker>
        </FormItem>
        <FormItem :label-width="0">
          <Button class="" type="primary" @click="getHistoryOperList">查询</Button>
        </FormItem>
      </Form>
      <Table class="my-table" :columns="columns" :data="tableData" :loading="loading">
      </Table>
      <Page
          v-if="tableData.length"
          class="my-page"
          :current.sync="pageForm.pageNumber"
          :total="pageForm.pageTotal"
          :page-size="pageForm.pageSize"
          show-elevator
          @on-change="getHistoryOperList"
      />
    </Card>
  </div>
</template>

<script>
import {timeRange} from "@/utils/const/attention";
import { deepClone } from "@/utils/utils.js";
import {mapMutations} from "vuex";

import { getHistoryOperList } from "@/api_new/index";

export default {
  name: "index",
  data() {
    return {
      loading: false,
      isTeam: 0,
      form: {
        operationType: 1,
        dateRange: 1,
        order: "desc",
        sort: "createTime"
      },
      ruleValidate: {
        name: [
          {required: true, message: 'empty', trigger: 'blur'}
        ]
      },
      timeRange: timeRange,
      dateOption: {
        disabledDate(date) {
          return date.valueOf() > Date.now() || date.valueOf() < Date.now() - 31536000000;
        },
      },
      dateArr: ["", ""],
      tableData: [],
      columns: [
        {
          title: "序号",
          width: 70,
          align: "center",
          render: (h, params) => {
            let index = params.index + 1 + this.pageForm.pageSize * (this.pageForm.pageNumber - 1);
            return (
                <span>{index}</span>
            )
          }
        },
        {
          title: "操作人",
          align: "center",
          minWidth: 100,
          key: "nickName"
        },
        {
          title: "操作类型",
          align: "center",
          minWidth: 120,
          key: "logType",
          render: (h,params)=>{
            return(
                <span>{params.row.logType?'登录操作':'默认操作'}</span>
            )
          }
        },
        {
          title: "地区",
          align: "center",
          minWidth: 120,
          key: "ipInfo",
          sortable: true,
        },
        {
          title: "IP地址",
          align: "center",
          key: "ip",
          minWidth: 120,
        },
        {
          title: "浏览器",
          align: "center",
          minWidth: 100,
          key: "updateBy"
        },
        {
          title: "登录时间",
          align: "center",
          key: "createTime",
          minWidth: 150,
          sortable: true,
        },
      ],
      copyColumns: [],
      pageForm: {
        pageNumber: 1, // 当前页数
        pageTotal: 10,
        pageSize: 10,
      },
    }
  },
  computed: {
    isAdmin() {
      let temp = false;
      if (JSON.parse(this.getStore("userInfo")).type) temp = true;
      return temp;
    },
    isFreeMember(){
      let temp = false;
      if (JSON.parse(this.getStore("userInfo")).memberType == "免费会员") temp = true;
      return temp;
    },
  },
  created() {
    this.copyColumns = deepClone(this.columns);
    this.columns = this.columns.filter(col => col.title !== '操作人');
    this.init();
  },
  methods: {
    ...mapMutations(["setShowFreeMerber"]),
    init() {
      this.getHistoryOperList();
    },
    async getHistoryOperList(flag) {
      if (flag == 1){
        this.pageForm.pageNumber = 1;
      }
      let params = {
        pageSize: this.pageForm.pageSize,
        pageNumber: this.pageForm.pageNumber,
        ...this.form
      }
      if (params.dateRange == -1) {
        delete params.dateRange;
      }
      params.type = this.isTeam;
      this.loading = true;
      let res = await getHistoryOperList(params);
      const {success, result} = res;
      this.loading = false;
      if(success){
        this.tableData = result.content;
        this.pageForm.pageTotal = result.totalElements;
      }
    },
    setMyTeam(e) {
      if (this.isFreeMember && e){
        this.$bus.$emit('setFreeGuidedWords', "myTeam")
        this.setShowFreeMerber(true);
        return
      }
      this.isTeam = e;
      if (this.isTeam == 0){
        this.columns = this.columns.filter(col => col.title !== '操作人');
      } else {
        this.columns = this.copyColumns;
      }
    },
    pickDate(arr) {
      this.form.startTime = this.formatDate(new Date(arr[0]));
      this.form.endTime = this.formatDate(new Date(arr[1]));
    },
    changeRange() {
      if (this.form.startTime){
        delete this.form.startTime;
        delete this.form.endTime;
      }
      this.dateArr = ["", ""];
    },
    formatDate(date) {
      return (
          date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
      );
    },
  }
}
</script>

<style scoped lang="less">
.record {
  .recordCont {
    border-top-left-radius: 0 0;
    margin-right: 10px;

    h3 {
      font-size: 20px;
      font-family: Microsoft YaHei-Bold, Microsoft YaHei;
      font-weight: bold;
      color: #333333;
    }

    .form {
      margin-top: 20px;

      /deep/ .ivu-form-item-label {
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #999999;
      }
    }

    .my-page {
      margin-top: 15px;
      text-align: center;
    }
  }
}
</style>