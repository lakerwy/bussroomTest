<template>
  <div class="myTeamCont">
    <h3>账号概览</h3>
    <div class="overview">
      <div class="situation" style="width: 30%">
        <h4>子账号情况</h4>
        <div class="sitInline" style="width: 30%">
          <span class="txt">共购买子账号</span>
          <div class="num">{{accountInfo.userTotalNum}}</div>
        </div>
        <div class="sitInline" style="width: 30%">
          <span class="txt">已使用</span>
          <div class="num">{{accountInfo.userUseNum}}</div>
        </div>
        <div class="sitInline">
          <Button class="sitBtn" type="primary" @click="addUser">创建子账号</Button>
        </div>
      </div>
      <div class="situation">
        <h4>日访问量配置情况</h4>
        <div class="sitInline">
          <span class="txt">日访问总量</span>
          <div class="num">{{accountInfo.visitLimitNum}}</div>
        </div>
        <div class="sitInline">
          <span class="txt">已配置</span>
          <div class="num">{{accountInfo.visitAssignNum}}</div>
        </div>
        <div class="sitInline">
          <span class="txt">{{ !accountInfo.visitFlag?"共享":"非共享" }}</span>
          <div class="num">{{accountInfo.visitShareNum}}</div>
        </div>
        <div class="sitInline">
<!--          <Button class="sitBtn" type="primary" style="margin-top: -30px">调整配额</Button>-->
          <Button class="sitBtn" type="primary" @click="changeQuota">调整配额</Button>
<!--          <Button class="sitBtn" type="primary">配额增量</Button>-->
        </div>
      </div>
      <div class="situation">
        <h4>月导出量配置情况</h4>
        <div class="sitInline">
          <span class="txt">月导出总量</span>
          <div class="num">{{accountInfo.exportLimitNum}}</div>
        </div>
        <div class="sitInline">
          <span class="txt">已配置</span>
          <div class="num">{{accountInfo.exportAssignNum}}</div>
        </div>
        <div class="sitInline">
          <span class="txt">{{ !accountInfo.exportFlag?"共享":"非共享" }}</span>
          <div class="num">{{accountInfo.exportShareNum}}</div>
        </div>
        <div class="sitInline">
<!--          <Button class="sitBtn" type="primary" style="margin-top: -30px">调整配额</Button>-->
          <Button class="sitBtn" type="primary" @click="changeQuota">调整配额</Button>
<!--          <Button class="sitBtn" type="primary">配额增量</Button>-->
        </div>
      </div>
    </div>
    <Tabs :value="tabValue" @on-click="changeTab">
    <TabPane label="使用情况" :name="1">
      <usageTeam ref="usageTeam" v-if="tabValue == 1"></usageTeam>
    </TabPane>
    <TabPane label="权限配置" :name="2">
      <permissTeam
          ref="usageTeam"
          v-if="tabValue == 2"
          @editPermiss="editPermiss"
          :visitLimitNum="accountInfo.visitLimitNum"
          :exportLimitNum="accountInfo.exportLimitNum"
      ></permissTeam>
    </TabPane>
    <TabPane label="审批" :name="3">
      <approvalTeam ref="usageTeam" v-if="tabValue == 3"></approvalTeam>
    </TabPane>
  </Tabs>

    <Modal
        class="addUserModal"
        v-model="addUserModal"
        title="添加用户"
        ok-text="提交"
        @on-cancel="handlecancel"
        width="400"
        footer-hide
    >
      <Tabs type="card" :value="userTab" @on-click="changeUserTab">
        <TabPane label="手动添加" name="1"></TabPane>
        <TabPane label="微信邀请" name="2"></TabPane>
      </Tabs>
      <Form v-if="userTab == 1" class="form" ref="userForm" :rules="ruleValidate" :label-width="100" :model="userForm">
        <FormItem label="姓名："  prop="nickname">
          <Input v-model="userForm.nickname" placeholder=""></Input>
        </FormItem>
        <FormItem label="部门："  prop="department">
          <Input v-model="userForm.department" placeholder=""></Input>
        </FormItem>
        <FormItem label="性别："  prop="sex">
          <RadioGroup v-model="userForm.sex">
            <Radio label="男">男</Radio>
            <Radio label="女">女</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="手机号："  prop="mobile">
          <Input v-model="userForm.mobile" placeholder=""></Input>
        </FormItem>
        <FormItem label="随机密码："  prop="password">
          <Input v-model="userForm.password" placeholder="" disabled></Input>
        </FormItem>
      </Form>
      <div v-if="userTab == 2" class="wechat">
        <p style="padding-top: 100px">
          您还未生成名片：
          <Button type="primary" :disabled="timeoutFlag" @click="getCard">
            生成名片
            <span v-show="timeoutFlag">({{ timeout }}S)</span>
          </Button>
        </p>
<!--        <span>微信扫一扫，分享添加链接邀请好友</span><br>-->
<!--        <img src="../../../assets/account/wechat.png" alt="">-->
<!--        <div class="url">-->
<!--          <span>分享链接</span><Input value="https://chinabidding.cn" style="width: 240px;margin-left: 10px" search enter-button="复制" placeholder="" />-->
<!--        </div>-->
      </div>
      <div v-if="userTab == 1" style="text-align: right;margin-right: 14px">
        <Button type="text" @click="handlecancel">取消</Button>
        <Button type="primary" @click="handleok">提交</Button>
      </div>
    </Modal>
    <Modal v-model="codeFlag" title="生成二维码" style="text-align:center;">
      <p style=" text-align:center;">
        <Icon type="ios-contacts" size="30" />微信扫一扫，分享到朋友圈
      </p>
      <img :src="codeSrc" style="margin:0 auto;" alt />
    </Modal>
  </div>
</template>

<script>
import usageTeam from "./components/usageTeam";
import permissTeam from "./components/permissTeam";
import approvalTeam from "./components/approvalTeam";
import {validateMobile, validatePassword, checkEmpty} from "@/libs/validate";
import {mapMutations} from "vuex";
import Cookies from "js-cookie";

import {
  getAccountInfo,
  addUser,
  create,
  getInviteCode
} from "@/api_new/index";

export default {
  name: "accountMyTeam",
  components: {
    usageTeam,
    permissTeam,
    approvalTeam
  },
  data(){
    return{
      tabValue: 1,
      addUserModal: false,
      ruleValidate: {
        nickname: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          { validator: checkEmpty, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator: validateMobile, trigger: "blur" }
        ],
        sex: [
          { required: true, message: '性別不能为空', trigger: 'blur' },
        ],
        department: [
          { required: true, message: '部门不能为空', trigger: 'blur' },
        ]

      },
      userTab: '1',
      userForm: {
      },
      accountInfo: {
      },
      timeout: 15,
      timeoutFlag: false,
      codeSrc: "",
      codeFlag: false,
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
    if (this.$route.params.type){
      this.tabValue = this.$route.params.type;
    }
    this.init();
  },
  methods: {
    ...mapMutations(["setShowFreeMerber"]),
    init(){
      this.getAccountInfo();
    },
    async getAccountInfo(){
      let res = await getAccountInfo();
      const {success, result} = res;
      if (success){
        this.accountInfo = {
          ...result
        }
      }
    },
    changeTab(e){
      this.tabValue = e;
    },
    changeQuota(){
      if (this.isFreeMember){
        this.$bus.$emit('setFreeGuidedWords', "feature")
        this.setShowFreeMerber(true);
        return
      }
      this.tabValue = 2;
    },
    addUser(){
      if (this.isFreeMember){
        this.$bus.$emit('setFreeGuidedWords', "feature")
        this.setShowFreeMerber(true);
        return
      }
      let str = "";
      for (let i = 0; i < 6; i++) {
        str += parseInt(Math.random() * 10);
      }
      this.userForm.password = str;
      this.addUserModal = true;
    },
    changeUserTab(e){
      this.userTab = e;
    },
    handleok(){
      let that = this;
      if (this.userTab == 2) {
        this.addUserModal = false;
        return
      }
      this.$refs["userForm"].validate(valid => {
        if (valid) {
          let params = {
            ...this.userForm
          }
          params.username = that.userForm.mobile;
          params.roleIds = "1267725543390973952";
          addUser(params).then(res => {
            if (res.success) {
              this.$Message.success(res.message);
              this.getAccountInfo();
              this.$refs.usageTeam.init();
              this.addUserModal = false;
            }
          });
        }
      });
    },
    handlecancel(){
      this.addUserModal = false;
      this.$refs.userForm.resetFields();
    },
    editPermiss(){
      this.getAccountInfo();
    },
    //企业微信生成名片
    getCard() {
      this.$Modal.success({
        title: "企业名片",
        content: "通过【企业名片】您可以邀请您的同事加入到您的企业的会员账号中，一起开启高效的办公体验。",
        onOk: () => {
          this.timeout = 15;
          var timeId = setInterval(() => {
            this.timeout -= 1;
          }, 1000);
          setTimeout(() => {
            this.timeoutFlag = false;
            this.timeout = 15;
            clearInterval(timeId);
          }, 15000);

          var that = this;
          create(parseInt(Math.random() * 10000)).then(res => {
            if (res.success) {
              let v = JSON.parse(Cookies.get("userInfo"));
              var inviterId = v.id
              getInviteCode().then(response => { //这里的第一次处理后台返回来的二进制留数据 转化为base64
                //这里的data数据是后台返回来的，这里的key是params中的键值（byte）
                return 'data:image/png;base64,' + btoa(
                    new Uint8Array(response).reduce((data, key) => data + String.fromCharCode(key),
                        '')
                )
              }).then(data => { //这一次箭头函数是依赖于第一次.then函数处理的data值
                this.codeSrc = data
              })
              that.codeFlag = true;
              // that.getLinkFlag()
            } else if (res.code == 500 && res.message == "请先完善企业信息") {
              this.userTab = "1";
              this.$Message.warning(res.message);
            }
          });
        }
      });

    },
  }
}
</script>

<style scoped lang="less">
.myTeamCont {
  h3 {
    font-size: 20px;
    font-family: Microsoft YaHei-Bold, Microsoft YaHei;
    font-weight: bold;
    color: #333333;
  }
  .overview {
    width: 100%;
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
    .situation {
      width: 35%;
      background: #F4F7FF;
      height: 158px;
      margin-right: 15px;
      padding: 15px;
      .sitInline {
        width: 25%;
        margin-top: 15px;
        display: inline-block;
        vertical-align: top;
        .txt {
          font-size: 14px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #666666;
          line-height: 16px;
        }
        .num{
          font-size: 40px;
          font-family: DIN-Medium, DIN;
          font-weight: 500;
          color: #333333;
          line-height: 47px;
        }
      }
      h4{
        font-size: 16px;
        font-family: Microsoft YaHei-Bold, Microsoft YaHei;
        font-weight: bold;
        color: #333333;
      }
      .sitBtn {
        margin-left: 10px;
      }
    }
  }

  .form {
    margin-right: 30px;
  }
}
.addUserModal {
  .form {
    margin-right: 15px;
  }
  .wechat {
    height: 322px;
    text-align: center;
    span {
      font-size: 13px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #999999;
    }
    img {
      margin-top: 10px;
      width: 190px;
    }
    .url {
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
