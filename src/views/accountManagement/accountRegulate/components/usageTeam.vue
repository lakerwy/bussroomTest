<template>
<div class="usage">
  <Form class="form" ref="formInline" :label-width="80" label-position="left" :model="form">
    <FormItem label="使用人：" >
      <Select v-model="form.userId" style="width: 400px" clearable >
        <Option v-for="item in teamUserName" :key="item.id" :value="item.id">{{ item.nickName }}</Option>
      </Select>
    </FormItem>
    <FormItem label="时间：">
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
    <FormItem :label-width="0" >
      <Button class="" type="primary" @click="getAccountUsage(1)">查询</Button>
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
      @on-change="getAccountUsage"
  />
</div>
</template>

<script>
import {timeRange} from "@/utils/const/attention";
import {mapState, mapMutations, mapGetters} from "vuex";
import {getAccountUsage} from "@/api/homepage";

export default {
  name: "usageTeam",
  data(){
    return{
      loading: false,
      form: {
        userId: "",
        dateRange: 1
      },
      dateOption: {
        disabledDate(date) {
          return date.valueOf() > Date.now() || date.valueOf() < Date.now() - 31536000000;
        },
      },
      timeRange: timeRange,
      dateArr: ["",""],
      tableData: [],
      columns: [
        {
          title: "账号",
          align: "center",
          minWidth: 120,
          key: "loginId",
        },
        {
          title: "使用人",
          align: "center",
          key: 'name',
        },
        {
          title: "访问量",
          align: "center",
          key: "visitNum"
        },
        {
          title: "导出量",
          align: "center",
          key: "exportNum",
        },
        {
          title: "收藏量",
          align: "center",
          key: 'collectNum'
        },
        {
          title: "分享量",
          align: "center",
          key: "shareNum"
        },
        // {
        //   title: "使用产品",
        //   align: "center",
        //   key: "product"
        // },
        {
          title: "最后一次登录时间",
          align: "center",
          key: "lastLoginTime",
          sortable: true,
        },
      ],
      pageForm: {
        pageNumber: 1, // 当前页数
        pageTotal: 0,
        pageSize: 10,
      },
    }
  },
  computed: {
    ...mapState(["teamUserName"]),
  },
  created() {
    this.init();
  },
  methods: {
    init(){
      this.getAccountUsage();
    },
    async getAccountUsage(flag){
      if (flag == 1){
        this.pageForm.pageNumber = 1;
      }
      let params = {
        ...this.form,
        pageSize: this.pageForm.pageSize,
        pageNumber: this.pageForm.pageNumber,
      }
      if (params.dateRange == -1) {
        delete params.dateRange;
      }
      this.loading = true;
      let res = await getAccountUsage(params);
      const {success, result} = res;
      this.loading = false;
      if(success){
        this.tableData = result.content;
        this.pageForm.pageTotal = result.totalElements;
      }
    },
    pickDate(arr) {
      this.form.startTime = this.formatDate(new Date(arr[0]));
      this.form.endTime = this.formatDate(new Date(arr[1]));
      console.log(this.searchForm);
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
  },
}
</script>

<style scoped lang="less">
.form {
  margin-left: 20px;
}
.my-page {
  margin-top: 15px;
  text-align: center;
}
</style>