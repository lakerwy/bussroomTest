<template>
  <div class="approval">
    <Form class="form" ref="formInline" :label-width="80" label-position="left" :model="form" inline>
      <FormItem label="使用人：" >
        <Select v-model="user" style="width: 400px" clearable >
          <Option v-for="item in teamUserName" :key="item.id" :value="item.id">{{ item.nickName }}</Option>
        </Select>
      </FormItem>
      <FormItem :label-width="20" >
        <Button class="" type="primary" @click="getApplyList(1)">查询</Button>
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
        @on-change="getApplyList"
    />
    <Modal
        v-model="rejectModal"
        title="驳回"
        ok-text="确定"
        @on-ok="handleok"
        @on-cancel="handlecancel"
        width="500"
    >
      <Form class="form" ref="formInline" :label-width="85" label-position="left">
        <FormItem label="驳回原因：">
          <Input style="width: 320px" v-model="rejectRemark" type="textarea" :autosize="{minRows: 4, maxRows: 6}" placeholder="" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import {mapState} from "vuex";

import { getApplyList,updateApplyLog } from "@/api_new/index";

export default {
  data(){
    return{
      loading: false,
      user: "",
      tableData: [],
      columns: [
        {
          title: "序号",
          type: "index",
          width: 70,
          align: "center",
        },
        {
          title: "账号",
          align: "center",
          key: "loginId",
          minWidth: 120,
        },
        {
          title: "申请人",
          align: "center",
          key: "nickName",
          minWidth: 120,
        },
        {
          title: "申请时间",
          align: "center",
          key: "createTime",
          minWidth: 120,
          sortable: true,
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
          title: "操作",
          align: "left",
          minWidth: 120,
          fixed: 'right',
          render:(h,params) => {
            if (params.row.status == 0){
              return(
                  <div class="operaBtn">
                    <span onClick={()=>this.passApplay(params)}>通过</span>
                    <span onClick={()=>this.rejectedApplay(params)}>驳回</span>
                  </div>
              )
            } else {
              return(
                  <div class="operaBtn">
                    <span style="color: #999">通过</span>
                    <span style="color: #999">驳回</span>
                  </div>
              )
            }
          }
        },
      ],
      pageForm: {
        pageNumber: 1, // 当前页数
        pageTotal: 10,
        pageSize: 10,
      },
      rejectId: "",
      rejectRemark: "",
      rejectModal: false,
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
      this.getApplyList();
    },
    async getApplyList(flag){
      if (flag == 1){
        this.pageForm.pageNumber = 1;
      }
      let params = {
        // createBy: this.user,
        userId: this.user,
        pageSize: this.pageForm.pageSize,
        pageNumber: this.pageForm.pageNumber,
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
    passApplay(params){
      this.$Modal.confirm({
        title: "通过",
        content: "确定是否通过此条请求",
        onOk: () => {
          this.updateApplyLog(params.row.id, 1)
        },
      });
    },
    rejectedApplay(params){
      this.rejectModal = true;
      this.rejectId = params.row.id;
    },
    handleok(){
      if (!this.rejectRemark) return this.$Message.warning("驳回原因不能为空");
      this.updateApplyLog(this.rejectId, 0)
    },
    handlecancel(){
      this.rejectRemark = "";
      this.rejectId = "";
    },
    async updateApplyLog(id,flag){ //1通过， 0驳回
      let params = {
        id: id,
      }
      if (flag == 1){
        params.status = 1;
      } else {
        params.status = 2;
        params.remark = this.rejectRemark;
      }
      let res = await updateApplyLog(params);
      const {success, result} = res;
      if (success){
        this.$Message.success("审核成功");
        this.getApplyList(1)
      }
    }
  }
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

/deep/ .operaBtn {
  span {
    margin-right: 10px;
    display: inline-block;
    font-size: 14px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #3F6EF5;
    cursor: pointer;
  }
}
</style>