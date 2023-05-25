<template>
  <div class="permiss">
    <Form class="form" :label-width="80" label-position="left" :model="form" inline>
      <FormItem label="使用人：" >
        <Select v-model="user" style="width: 400px" clearable >
          <Option v-for="item in teamUserName" :key="item.id" :value="item.id">{{ item.nickName }}</Option>
        </Select>
      </FormItem>
      <FormItem :label-width="20" >
        <Button class="" type="primary" @click="getUserRights(1)">查询</Button>
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
        @on-change="getUserRights"
    />
    <Modal
        v-model="editModal"
        title="账号权限修改"
        ok-text="保存修改"
        @on-cancel="handlecancel"
        width="700"
    >
      <Form class="permissForm" ref="permissForm" :rules="ruleValidate" :label-width="120" :model="form" label-position="right"
            inline>
        <FormItem label="账号："  >
          <span>{{form.loginId}}</span>
        </FormItem>
        <FormItem label="创建时间："  >
          <span>{{form.createTime}}</span>
        </FormItem>
        <FormItem label="账号状态："  >
          <i-switch v-model="form.statusA" @on-change="change" />
          <span style="display: inline-block;margin-left: 10px">{{ isDisabled ? "正常" : "禁用" }}</span>
        </FormItem>
<!--        <FormItem label="访问权限：">-->
<!--          <Select v-model="form.statusB" :disabled="isDisabled">-->
<!--            <Option :value="0">全部</Option>-->
<!--            <Option :value="1">仅网页</Option>-->
<!--          </Select>-->
<!--        </FormItem>-->
        <FormItem label="角色类型："  >
          <span>{{ form.type?'管理员':'普通用户' }}</span><br>
<!--          <span>(角色管理修改需联系专属客服)</span>-->
        </FormItem>
        <FormItem label="联系人："  >
          <Input v-model="form.nickname" placeholder=""></Input>
        </FormItem>
        <FormItem label="邮箱："  >
          <Input v-model="form.email" placeholder=""></Input>
        </FormItem>
        <FormItem label="日访问量配置：" >
          <Select v-model="form.visitModel" @on-change="changeDisabled">
            <Option :value="0">共享</Option>
            <Option :value="1">非共享</Option>
          </Select>
        </FormItem>
        <FormItem label="日访问量："  >
          <Input v-model="form.visitDayNum" placeholder="" :disabled="form.visitModel != 1"></Input>
        </FormItem>
        <FormItem label="月导出量配置：" >
          <Select v-model="form.exportModel" @on-change="changeExportDisabled">
            <Option :value="0">共享</Option>
            <Option :value="1">非共享</Option>
          </Select>
        </FormItem>
        <FormItem label="月导出量："  >
          <Input v-model="form.exportDayNum" placeholder="" :disabled="form.exportModel != 1"></Input>
        </FormItem>
        <FormItem label="电话："  >
          <Input v-model="form.mobile" placeholder=""></Input>
        </FormItem>
<!--        <FormItem label="密码："  >-->
<!--          <Input v-model="form.newPass" placeholder=""></Input>-->
<!--        </FormItem>-->
<!--        <FormItem label="确认密码："  >-->
<!--          <Input v-model="form.rePass" placeholder=""></Input>-->
<!--        </FormItem>-->
      </Form>
      <div slot="footer">
        <Button type="text" @click="handlecancel">取消</Button>
        <Button type="primary" @click="handleok">保存</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {mapState} from "vuex";
import Cookies from "js-cookie";
import REG from "@/libs/commonExp";

import { getUserRights,detachUser, editUserInfo} from "@/api_new/index";

export default {
  props: ["visitLimitNum","exportLimitNum"],
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
          minWidth: 120
        },
        {
          title: "角色类型",
          align: "center",
          key: "type",
          minWidth: 100,
          render: (h, params) => {
            return (
                <span>{params.row.type?'管理员':'普通用户'}</span>
            )
          }
        },
        {
          title: "使用人",
          align: "center",
          key: "nickname",
          minWidth: 120
        },
        {
          title: "联系电话",
          align: "center",
          key: "mobile",
          minWidth: 120
        },
        {
          title: "邮箱",
          align: "center",
          key: "email",
          minWidth: 120
        },
        {
          title: "创建时间",
          align: "center",
          key: "createTime",
          minWidth: 120,
          sortable: true,
        },
        {
          title: "状态",
          align: "center",
          key: "status",
          minWidth: 120,
          render: (h,params)=>{
            let text = ""
            let status = params.row.status;
            if (status == 0 || status == -2 || status == 1){
              text = "正常"
            } else if(status == -1){
              text = "禁用"
            } else {
              text = "禁用"
            }
            return(
                <span>{text}</span>
            )
          }
        },
        // {
        //   title: "访问权限",
        //   align: "center",
        //   key: "status",
        //   minWidth: 120,
        //   render: (h,params)=>{
        //     let text = ""
        //     let status = params.row.status;
        //     if (status == 0 || status == -1){
        //       text = "全部"
        //     } else if(status == -2 || status == 1){
        //       text = "仅网页"
        //     } else {
        //       text = "全部"
        //     }
        //     return(
        //         <span>{text}</span>
        //     )
        //   }
        // },
        {
          title: "日访问配置模式",
          align: "center",
          key: "visitModel",
          minWidth: 100,
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
          minWidth: 120
        },
        {
          title: "月导出配置模式",
          align: "center",
          key: "exportModel",
          minWidth: 100,
          render: (h,params)=>{
            return(
                <span>{params.row.exportModel?'非共享':'共享'}</span>
            )
          }
        },
        {
          title: "月配额",
          align: "center",
          key: "exportDayNum",
          minWidth: 120
        },
        {
          title: "操作",
          align: "left",
          minWidth: 120,
          fixed: 'right',
          render:(h,params) => {
            return(
                <div class="operaBtn">
                  <span onClick={()=>this.editSub(params)}>修改</span>
                  <span onClick={()=>this.delSub(params)}>删除</span>
                </div>
            )
          }
        },

      ],
      pageForm: {
        pageNumber: 1, // 当前页数
        pageTotal: 10,
        pageSize: 10,
      },
      editModal: false,
      form: {

      },
      isDisabled: true,
      ruleValidate: {
        name: [
          { required: true, message: 'empty', trigger: 'blur' }
        ]
      },
      copyPhoneEmail: {
        mobile: "",
        email: ""
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
      this.getUserRights();
    },
    async getUserRights(flag){
      if (flag == 1){
        this.pageForm.pageNumber = 1;
      }
      let params = {
        userId: this.user,
        pageSize: this.pageForm.pageSize,
        pageNumber: this.pageForm.pageNumber,
      }
      this.loading = true;
      let res = await getUserRights(params);
      const {success, result} = res;
      this.loading = false;
      if(success){
        this.tableData = result.content;
        this.pageForm.pageTotal = result.totalElements;
      }
    },
    //修改权限
    editSub(params){
      console.log(params.row);
      this.copyPhoneEmail.mobile = params.row.mobile;
      this.copyPhoneEmail.email = params.row.email;
      this.form = {
        ...params.row
      }
      if (this.form.status == 0 || this.form.status == -2 || this.form.status == 1){
        this.form.statusA = true; //正常
        this.isDisabled = true;
      } else {
        this.form.statusA = false; //禁用
        this.isDisabled = false;
      }
      if(this.form.status == -2 || this.form.status == 1){
        this.form.statusB = 1; //仅网页
      } else {
        this.form.statusB = 0; //全部
      }
      this.editModal = true;
    },
    async handleok(){
      let params = {};
      console.log(this.form);
      params.id = this.form.id;
      if (this.form.statusA){
        params.status = 0;
      } else {
        params.status = -1;
      }
      params.nickname = this.form.nickname;
      params.email = this.form.email || "";
      params.mobile = this.form.mobile || "";
      params.visitModel = this.form.visitModel;
      params.visitDayNum = this.form.visitDayNum;
      params.exportModel = this.form.exportModel;
      params.exportDayNum = this.form.exportDayNum;

      let regNum = /^[0-9]+.?[0-9]*$/;
      if (params.visitModel == 1 && params.visitDayNum == ""){
        this.$Message.warning("非共享日访问量不能为空");
        return
      }
      if (params.visitModel == 1 && !regNum.test(params.visitDayNum)){
        this.$Message.warning("日访问量不能为非数字");
        return
      }
      if (params.visitModel == 1 && params.visitDayNum > this.visitLimitNum){
        this.$Message.warning("日访问量不能超过日访问总量");
        return
      }

      if (params.exportModel == 1 && params.exportDayNum == ""){
        this.$Message.warning("非共享月导出量不能为空");
        return
      }
      if (params.exportModel == 1 && !regNum.test(params.exportDayNum)){
        this.$Message.warning("月导出量不能为非数字");
        return
      }
      if (params.exportModel == 1 && params.exportDayNum > this.exportLimitNum){
        this.$Message.warning("月导出量不能超过月导出总量");
        return
      }

      if (params.mobile != this.copyPhoneEmail.mobile && params.mobile){
        let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (!reg.test(params.mobile)) {
          this.$Message.warning("手机号格式错误,请重新输入");
          return
        } else {
          this.$Modal.confirm({
            title: '提醒',
            content: '您修改后账号登录名、短信订阅接收手机号将变更为新手机号，是否确认修改！',
            onOk: () => {
              this.editInfo(params)
            },
            onCancel: () => {
              this.editModal = false;
            }
          });
        }
      } else {
        if (params.email != this.copyPhoneEmail.email && params.email) {
          if ((params.email.match(REG.reg.email) == null)){
            this.$Message.warning("邮箱格式有误, 请重新输入");
            return
          } else {
            this.$Modal.confirm({
              title: '提醒',
              content: '您修改后对应订阅信息接收邮箱将发生变化，是否确认修改！',
              onOk: () => {
                this.editInfo(params)
              },
              onCancel: () => {
                this.editModal = false;
              }
            });
          }
        } else {
          this.editInfo(params);
        }
      }
    },
    async editInfo(params){
      let res = await editUserInfo(params);
      if (res.success){
        this.$Message.success("保存基础信息成功");
        this.editModal = false;
        this.getUserRights();
        this.$emit("editPermiss", "")
      }
    },
    handlecancel(){
      this.$refs.permissForm.resetFields();
      this.editModal = false;
    },
    //删除子账号
    delSub(params){
      let v = params.row;
      this.$Modal.confirm({
        title: "确认删除",
        content: "您确认要删除" + v.nickname + " ?",
        loading: true,
        onOk: () => {
          detachUser({
            userId: v.id
          }).then(res => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("删除成功");
              this.getUserRights(1);
            }
          });
        }
      });
    },
    change(status){
      this.isDisabled = status;
    },
    changeDisabled(val){
      if (val){
        this.form.visitDayNum = "";
      } else {
        this.form.visitDayNum = "-";
      }
    },
    changeExportDisabled(val){
      if (val){
        this.form.exportDayNum = "";
      } else {
        this.form.exportDayNum = "-";
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

.permissForm {
  /deep/ .ivu-form-item-content{
    width: 186px;
  }
}
</style>