<template>
  <div class="applay">
    <h3>申请</h3>
    <Form class="form" ref="formInline" :label-width="85" label-position="left" :model="form">
      <FormItem label="申请项目：" >
        <Select v-model="form.type" style="width: 400px">
          <Option v-for="(item,index) in applayType" :value="item.value" :key="index">{{item.label}}</Option>
        </Select>
      </FormItem>
      <FormItem label="申请原因：">
        <Input style="width: 400px" v-model="form.applyReason" type="textarea" :autosize="{minRows: 4, maxRows: 6}" placeholder="请输入申请原因" />
      </FormItem>
      <FormItem>
        <Button class="" type="primary" @click="sendApplay">发送申请</Button>
      </FormItem>
    </Form>
    <h3>申请记录</h3>
    <Table class="my-table" :columns="columns" :data="tableData">
    </Table>
    <Page
        v-if="tableData.length"
        class="my-page"
        :current.sync="pageForm.pageNumber"
        :total="pageForm.pageTotal"
        :page-size="pageForm.pageSize"
        show-elevator
    />
  </div>
</template>

<script>
import { getApplyList, addApplyLog } from "@/api_new/index";
import {mapMutations} from "vuex";

export default {
  data(){
    return{
      form: {
        type: "",
        applyReason: "",
      },
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
          title: "申请时间",
          align: "center",
          minWidth: 120,
          key: "createTime",
        },
        {
          title: "申请项目",
          align: "center",
          key: "type",
          minWidth: 120,
          render: (h,params)=>{
            let obj = {
              1: "浏览增量",
              2: "导出增量",
              3: "短信增量"
            }
            return(
                <span>{obj[params.row.type]}</span>
            )
          }
        },
        {
          title: "申请原因",
          align: "center",
          key: "applyReason",
          minWidth: 120,
        },
        {
          title: "日访问配置模式",
          align: "center",
          key: "visitModel",
          minWidth: 120,
          render: (h,params)=>{
            return(
                <span>{params.row.visitModel?'非共享':'共享'}</span>
            )
          }
        },
        {
          title: "日配额",
          align: "center",
          key: "visitDayNum",
          minWidth: 120,
        },
        {
          title: "月导出量配置模式",
          align: "center",
          minWidth: 120,
          key: "exportModel",
          render: (h,params)=>{
            return(
                <span>{params.row.exportModel?'非共享':'共享'}</span>
            )
          }
        },
        {
          title: "日配额",
          align: "center",
          key: "exportDayNum",
          minWidth: 120,
        },
        {
          title: "审批结论",
          align: "center",
          key: "status",
          minWidth: 120,
          render: (h,params)=>{
            let text = "";
            if (params.row.status == 0){
              text = "未审核"
            } else if (params.row.status == 1){
              text = "审核通过"
            } else if (params.row.status == 2){
              text = "审核不通过"
            }
            return(
                <span style="color: red">{text}</span>
            )
          }
        },
        {
          title: "批复内容",
          align: "center",
          key: "remark",
          minWidth: 120,
        },
      ],
      applayType: [
        { label: "浏览增量", value: 1},
        { label: "导出增量", value: 2},
        { label: "短信增量", value: 3},
      ],
      pageForm: {
        pageNumber: 1, // 当前页数
        pageTotal: 10,
        pageSize: 10,
      },
    }
  },
  computed: {
    isFreeMember(){
      let temp = false;
      if (JSON.parse(this.getStore("userInfo")).memberType == "免费会员") temp = true;
      return temp;
    },
  },
  created() {
    this.init();
  },
  methods: {
    ...mapMutations(["setShowFreeMerber"]),
    init(){
      this.getApplyList();
    },
    async getApplyList(flag){
      if (flag == 1){
        this.pageForm.pageNumber = 1;
      }
      let params = {
        createBy: JSON.parse(this.getStore("userInfo")).id,
        // userId: this.user,
        pageSize: this.pageForm.pageSize,
        pageNumber: this.pageForm.pageNumber,
        memberId: '',
        userId: '',
      }
      this.loading = true;
      let res = await getApplyList(params);
      const {success, result} = res;
      this.loading = false;
      if(success){
        this.tableData = result.content;
        this.pageForm.pageTotal = result.totalElements;
      }
    },
    async sendApplay(){
      if (this.isFreeMember){
        this.$bus.$emit('setFreeGuidedWords', "feature")
        this.setShowFreeMerber(true);
        return
      }
      let params = {
        ...this.form
      }
      if (!params.type){
        this.$Message.info("申请项目不能为空")
      }
      if (!params.applyReason){
        this.$Message.info("申请原因不能为空")
      }
      let res = await addApplyLog(params);
      if (res.success){
        this.$Message.success("已提交申请");
        this.form = {
          type: "",
          applyReason: "",
        }
        this.getApplyList(1);
      }
    }
  }
}
</script>

<style scoped lang="less">
.form {
  margin-top: 20px;
}
.my-page {
  margin-top: 15px;
  text-align: center;
}
</style>