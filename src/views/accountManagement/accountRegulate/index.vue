<template>
  <div class="account">
    <div class="myteam">
      <span :class="!isTeam?'active':''" @click="setMyTeam(0)">{{ isAdmin?"我的":"信息管理" }}</span>
      <span :class="isTeam?'active':''" @click="setMyTeam(1)">{{ isAdmin?"我的团队":"配额申请" }}</span>
    </div>
    <Card v-if="isTeam==0" class="card accountCont" style="height: 100%">
      <Tabs :value="userTabs" @on-click="changeTab">
        <TabPane label="基础信息" :name="1">
          <h3>基础信息</h3>
          <Form class="form" ref="formInline" :rules="formInlineRule" :label-width="120" :model="form" inline>
            <div style="display: flex">
              <div style="width: 80px;margin-top: 5px">
                <span class="info">个人信息</span>
              </div>
              <div style="width: calc(100% - 80px);" class="inline">
                <FormItem label="公司名称：">
                  <Input v-model="form.companyName" placeholder="" disabled></Input>
                </FormItem>
                <FormItem label="部门：" >
                  <Input v-model="form.department" placeholder=""></Input>
                </FormItem>
                <FormItem label="职务：" >
                  <Input v-model="form.jobTitile" placeholder=""></Input>
                </FormItem>
                <FormItem label="姓名：" >
                  <Input v-model="form.nickname" placeholder=""></Input>
                </FormItem>
                <FormItem label="邮箱："  prop="email">
                  <Input v-model="form.email" placeholder=""></Input>
                </FormItem>
              </div>
            </div>
            <div style="display: flex" class="inline">
              <div style="width: 80px;margin-top: 5px">
                <span class="info">账号信息</span>
              </div>
              <div style="width: calc(100% - 80px);">
                <FormItem label="账号等级：" prop="name">
                  <Input v-model="form.memberType" placeholder="" disabled></Input>
                </FormItem>
                <FormItem label="角色权限：" >
                  <Input v-model="form.roles" placeholder="" disabled></Input>
                </FormItem>
                <FormItem label="地区权限：" >
                  <Input v-model="form.address" placeholder="" disabled></Input>
                </FormItem>
                <FormItem label="到期时间：" >
                  <Input v-model="form.expireTime" placeholder="" disabled></Input>
                </FormItem>
              </div>
            </div>
            <FormItem :label-width="0">
              <Button class="" type="primary" @click="saveBaseInfo">保存</Button>
            </FormItem>
          </Form>
<!--          <div class="line"></div>-->
        </TabPane>
        <TabPane label="绑定信息" :name="2">
          <h3>绑定信息</h3>
          <div style="margin-bottom: 20px">
<!--            <div class="bindInfo"><span class="bindLabel">绑定手机号：</span> <span class="bindNum">{{ infoForm.mobile || '未绑定手机号'}}</span>-->
<!--              <span class="bindBtn" @click="editPhone">{{ infoForm.mobile?"修改":"立即绑定" }}</span></div>-->
            <div class="bindInfo"><span class="bindLabel">绑定邮箱：</span> <span class="bindNum">{{ infoForm.email || '未绑定邮箱' }}</span>
              <span class="bindBtn" @click="editEmail">{{ infoForm.email?"修改":"立即绑定" }}</span></div>
            <div class="bindInfo"><span class="bindLabel">绑定微信：</span> <span class="bindNum">{{
                infoForm.wechat ? '已绑定微信号' : '未绑定微信号'
              }}</span> <span class="bindBtn" @click="bindWechat">{{ infoForm.wechat?'解除绑定':'立即绑定' }}</span></div>
          </div>
<!--          <div class="line"></div>-->
        </TabPane>
        <TabPane label="密码设定" :name="3">
          <h3>密码设定</h3>
          <div class="changePass">
            <div class="setPass">
              <ButtonGroup>
                <Button :class="isSetPass==0?'active':''" @click="setPass(0)">修改密码</Button>
                <Button :class="isSetPass==1?'active':''" @click="setPass(1)">密码重置</Button>
              </ButtonGroup>
              <Form v-show="isSetPass==0" ref="editPasswordForm" :model="editPasswordForm" class="form" :rules="passwordValidate" :label-width="120" label-position="right">
                <FormItem label="原密码："  prop="oldPass">
                  <Input
                      type="password"
                      v-model="editPasswordForm.oldPass"
                      autocomplete="new-password"
                      placeholder="请输入现在使用的密码"
                  ></Input>
                </FormItem>
                <FormItem label="新密码："  prop="newPass">
                  <SetPassword
                      v-model="editPasswordForm.newPass"
                      @on-change="changeInputPass"
                  />
                </FormItem>
                <FormItem label="确认新密码："  prop="rePass">
                  <Input
                      type="password"
                      v-model="editPasswordForm.rePass"
                      placeholder="请再次输入新密码"
                  ></Input>
                </FormItem>
                <FormItem>
                  <Button class="" type="primary" style="margin-right: 20px" @click="saveEditPass">保存</Button>
                  <Button class="" @click="cancelEditPass">取消</Button>
                </FormItem>
              </Form>

              <Form v-show="isSetPass==1" ref="resetForm" :model="resetForm" class="form" :rules="resetRules" :label-width="140" label-position="right">
                <FormItem label="验证方式：">
                  <Select v-model="resetForm.resetType">
                    <Option :value="0" >手机</Option>
                    <Option :value="1" >邮箱</Option>
                  </Select>
                </FormItem>
                <FormItem label="手机号/邮箱号：">
                  <Input v-model="resetPhoneEmail" placeholder="请绑定手机号或邮箱" disabled></Input>
                </FormItem>
                <FormItem label="验证码："  prop="code" >
                  <Row type="flex" justify="space-between">
                    <Input v-model="resetForm.code" placeholder="请输入验证码" style="width:140px;" />
                    <CountDownButton ref="countDownPhoneEmail" @on-click="sendVerifyPhoneEmail" :disabled="canSendEditEmail"
                                     :autoCountDown="false" :loading="sending" :text="getSms" />
                  </Row>
                </FormItem>
                <FormItem label="输入新密码："  prop="newPass" >
                  <Input v-model="resetForm.newPass" placeholder="" type="password"></Input>
                </FormItem>
                <FormItem label="确认新密码："  prop="rePass" >
                  <Input v-model="resetForm.rePass" placeholder="" type="password"></Input>
                </FormItem>
                <FormItem>
                  <Button class="" type="primary" style="margin-right: 20px" @click="resetPass">立即找回</Button>
                  <Button class="" @click="cancelResetPass">取消</Button>
                </FormItem>
              </Form>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </Card>
    <Card v-if="isTeam==1" class="card accountCont">
      <accountMyTeam v-if="isAdmin"></accountMyTeam>
      <applayQuota v-if="!isAdmin"></applayQuota>
    </Card>

    <Modal
        v-model="editphoneModal"
        title="绑定手机号"
        ok-text="提交"
        width="450"
        @on-cancel="handlecancel"
    >
      <Form style="margin-right: 15px" class="form" ref="phoneForm" :rules="ruleValidate" :label-width="100" :model="phoneForm">
        <FormItem v-if="infoForm.mobile" label="原手机号："  prop="oldMobile">
          <Input v-model="phoneForm.oldMobile" placeholder=""></Input>
        </FormItem>
        <FormItem label="新手机号："  prop="mobile">
          <Input v-model="phoneForm.mobile" placeholder=""></Input>
        </FormItem>
        <FormItem label="验证码：" prop="code" :error="codeError">
          <Row type="flex" justify="space-between">
            <Input v-model="phoneForm.code" placeholder="请输入您收到的验证码" style="width:180px;" />
            <CountDownButton ref="countDownPhone" @on-click="sendVerifyPhone" :disabled="canSendEditEmail"
                             :autoCountDown="false" :loading="sending" :text="getSms" />
          </Row>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="handlecancel">取消</Button>
        <Button type="primary" @click="handleok">提交</Button>
      </div>
    </Modal>
    <Modal
        v-model="editemailModal"
        title="绑定邮箱"
        ok-text="提交"
        width="450"
        @on-cancel="handlecancel"
    >
      <Form style="margin-right: 15px" class="form" ref="emailForm" :rules="ruleValidate" :label-width="100" :model="emailForm">
        <FormItem v-if="infoForm.email" label="原邮箱："  prop="oldEmail">
          <Input v-model="emailForm.oldEmail" placeholder=""></Input>
        </FormItem>
        <FormItem label="新邮箱："  prop="email">
          <Input v-model="emailForm.email" placeholder=""></Input>
        </FormItem>
        <FormItem label="验证码：" :error="codeErrorEmail">
          <Row type="flex" justify="space-between">
            <Input v-model="emailForm.code" placeholder="请输入您收到的验证码" style="width:180px;" />
            <CountDownButton ref="countDownEmail" @on-click="sendVerifyEmail" :disabled="canSendEditEmail"
                             :autoCountDown="false" :loading="sending" :text="getSms" />
          </Row>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="handlecancel">取消</Button>
        <Button type="primary" @click="handleokEmail">提交</Button>
      </div>
    </Modal>
    <Modal v-model="wechatFlag" title="扫一扫绑定微信" @on-cancel="closeWechat" @on-ok="closeWechat">
      <div style="text-align:center;">
        <img :src="wechatSrc" alt="扫一扫绑定微信">
      </div>
    </Modal>
  </div>
</template>

<script>
import CountDownButton from "@/views/my-components/xboot/count-down-button";
import { changePass, getOtherSet, ticketLogout, userInfo, toBindWechat, } from "@/api/index";
import { getSwsuserInfo, sendVerifyCode, editUserInfo, updateUserInfo, setRestPwd } from "@/api/account";
import SetPassword from "@/views/my-components/xboot/set-password";
import accountMyTeam from "./accountMyTeam";
import applayQuota from "./applayQuota";
import Cookies from "js-cookie";
import {validateMobile, validateEmail} from "@/libs/validate";
import REG from "@/libs/commonExp";
import {mapMutations} from "vuex";

export default {
  name: "index",
  components: {
    accountMyTeam,
    applayQuota,
    SetPassword,
    CountDownButton
  },
  data(){
    const validePass = (rule,value,callback) =>{
      // var patrn = /^[^\u4e00-\u9fa5]{6,32}$/;
      var patrn = /^(?=.{6,32})(?=.*[a-zA-Z\d\W])(?!.*[\u4e00-\u9fa5]).*$/;
      if (!patrn.test(value)){
        callback(new Error("密码不能为中文"));
      } else {
        callback();
      }
    }
    const valideRePassword = (rule, value, callback) => {
      if (value !== this.editPasswordForm.newPass) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    const validateInEamil = (rule, value, callback) => {
      if (value && value.match(REG.reg.email) == null) {
        callback(new Error("输入的邮箱格式有误,请重新输入！"));
      } else {
        callback();
      }
    };
    const validateRePass = (rule, value, callback) => {
      if (value !== this.resetForm.newPass) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    }
    return{
      isTeam: 0,
      form: {
        companyName: "",
        department: "",
        jobTitile: "",
        nickname: "",
        email: "",
        memberType: "",
        roles: "",
        address: "",
        expireTime: "",
      },
      infoForm: {
        mobile: "13260515623",
        email: "123234@sda.com",
        wechat: "",
      },
      strength: "",
      editPasswordForm: {

      },
      resetForm: {
        resetType: 0,
      },
      isSetPass: 0,
      formInlineRule: {
        email: [
          { required: true, validator: validateInEamil, trigger: "blur"},
        ],
      },
      ruleValidate: {
        oldMobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator: validateMobile, trigger: "blur"},
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator: validateMobile, trigger: "blur"},
        ],
        oldEmail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { validator: validateEmail, trigger: "blur"},
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { validator: validateEmail, trigger: "blur"},
        ]
      },
      resetRules: {
        phoneEmail: [
          { required: true, message: '手机号或邮箱不能为空', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
        ],
        newPass: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 32, message: '请输入6-32个字符密码', trigger: 'blur' }
        ],
        rePass: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
          { validator: validateRePass, trigger: "blur"},
        ]
      },
      passwordValidate: {
        oldPass: [
          {
            required: true,
            message: "请输入原密码",
            trigger: "blur",
          },
        ],
        newPass: [
          {
            required: true,
            message: "请输入新密码",
            trigger: "blur",
          },
          {
            min: 6,
            message: "请至少输入6个字符",
            trigger: "blur",
          },
          {
            max: 32,
            message: "最多输入32个字符",
            trigger: "blur",
          },
          {
            validator: validePass,
            trigger: "blur",
          },
        ],
        rePass: [
          {
            required: true,
            message: "请再次输入新密码",
            trigger: "blur",
          },
          {
            validator: valideRePassword,
            trigger: "blur",
          },
        ],
      },
      editphoneModal: false,
      editemailModal: false,
      canSendEditEmail: false,
      sending: false,
      getSms: "获取验证码",
      phoneForm: {
        oldMobile: "",
        mobile: "",
        code: "",
      },
      captchaId: "",
      codeError: "",
      codeErrorEmail: "",
      emailForm: {
        oldEmail: "",
        email: "",
        code: "",
      },
      wechatFlag: false,
      wechatSrc: "",
      userInfoDetail: {},
      timeId: null,
      userTabs: 1,

    }
  },
  computed: {
    isAdmin(){
      let temp = false;
      if (JSON.parse(this.getStore("userInfo")).type) temp = true;
      return temp;
    },
    isFreeMember(){
      let temp = false;
      if (JSON.parse(this.getStore("userInfo")).memberType == "免费会员") temp = true;
      return temp;
    },
    resetPhoneEmail(){
      let temp = "";
      if (this.resetForm.resetType){
        temp = this.userInfoDetail.email || "";
      } else {
        temp = this.userInfoDetail.mobile || "";
      }
      return temp;
    },
  },
  created() {
    if (this.$route.params.isTeam){
      this.isTeam = 1;
    }
    if (this.$route.params.type){
      this.userTabs = this.$route.params.type;
    }
    // this.userInfoDetail = JSON.parse(this.getStore("userInfo"));
    this.init();
  },
  methods: {
    ...mapMutations(["setShowFreeMerber"]),
    //初始化化获取用户信息
    init(){
      getSwsuserInfo().then((res) => {
        if (res.success) {
          // 避免超过大小限制
          delete res.result.permissions;
          this.userInfoDetail = {
            ...res.result
          }
          this.form.companyName = this.userInfoDetail.companyName;
          this.form.department = this.userInfoDetail.department;
          this.form.jobTitile = this.userInfoDetail.jobTitile;
          this.form.nickname = this.userInfoDetail.nickname;
          this.form.email = this.userInfoDetail.email;
          this.form.memberType = this.userInfoDetail.memberType;
          this.form.roles = this.userInfoDetail.roles[0].name;
          this.form.address = this.userInfoDetail.address;
          this.form.expireTime = this.userInfoDetail.expireTime;

          this.infoForm.mobile = this.userInfoDetail.mobile;
          this.infoForm.email = this.userInfoDetail.email;
          this.infoForm.wechat = this.userInfoDetail.wechat;
        }
      })
    },
    //保存基础信息
    saveBaseInfo(){
      this.$refs["formInline"].validate(async (valid) => {
        if (valid) {
          let params = {};
          params.id = this.userInfoDetail.id;
          params.companyName = this.form.companyName;
          params.department = this.form.department;
          params.jobTitile = this.form.jobTitile;
          params.nickname = this.form.nickname;
          params.email = this.form.email;
          let res = await editUserInfo(params);
          if (res.success){
            this.$Message.success("保存基础信息成功");
            this.updateUserInfo();
          }
        }
      })
    },
    changeInputPass(v, grade, strength) {
      this.strength = strength;
    },
    //保存密码
    saveEditPass() {
      let params = {
        password: this.editPasswordForm.oldPass,
        newPass: this.editPasswordForm.newPass,
        passStrength: this.strength,
      };
      this.$refs["editPasswordForm"].validate((valid) => {
        if (valid) {
          this.savePassLoading = true;
          changePass(params).then((res) => {
            this.savePassLoading = false;
            if (res.success) {
              this.$Message.success("修改密码成功")
              this.cancelEditPass();
              // this.handlelogOut();
            }
          });
        }
      });
    },
    //修改密码成功后是否需要重新登录
    handlelogOut(){
      this.$Modal.confirm({
        title: "修改密码成功",
        content: "修改密码成功，需重新登录",
        onOk: () => {
          this.$store.commit("setLoading", true);
          let sessionId = localStorage.getItem("sessionId");
          ticketLogout({ sessionId }).then((res) => {
            if (res.success) {
              getOtherSet().then((res) => {
                this.$store.commit("setLoading", false);
                if (res.result) {
                  let domain = res.result.ssoDomain;
                  Cookies.set("accessToken", "", {
                    domain: domain,
                    expires: 7,
                  });
                }
                this.$store.commit("logout", this);
                this.$store.commit("clearOpenedSubmenu");
                this.setStore("accessToken", "");
                // 强制刷新页面 重新加载router
                location.reload();
              });
            }
          });
        },
      });
    },
    cancelEditPass() {
      this.editPasswordForm.newPass = "";
      this.editPasswordForm.rePass = "";
      this.$refs["editPasswordForm"].resetFields();
    },
    editPhone(){
      this.editphoneModal = true;
    },
    editEmail(){
      this.editemailModal = true;
    },
    //handleok 手机号
    handleok(){
      this.$refs["phoneForm"].validate(async valid => {
        debugger
        if (valid) {
          if (!this.phoneForm.code) {
            this.codeError = "验证码不能为空";
            return;
          } else {
            this.codeError = "";
          }
          let params = {
            captchaId: this.captchaId,
            ...this.phoneForm,
            type: 1,
            verifyType: 0,
          }
          let res = await updateUserInfo(params)
          if (res.success){
            this.$Message.success("修改成功");
            this.handlecancel();
            this.updateUserInfo();
          }
        }
      });
    },
    handleokEmail(){
      this.$refs["emailForm"].validate(async valid => {
        if (valid) {
          if (!this.emailForm.code) {
            this.codeErrorEmail = "验证码不能为空";
            return;
          } else {
            this.codeErrorEmail = "";
          }
          let params = {
            captchaId: this.captchaId,
            ...this.emailForm,
            type: 2,
            verifyType: 1,
          }
          let res = await updateUserInfo(params)
          if (res.success){
            this.$Message.success("修改成功");
            this.handlecancel();
            this.updateUserInfo();
          }
        }
      });
    },
    handlecancel(){
      this.editphoneModal = false;
      this.editemailModal = false;
      this.$refs["phoneForm"].resetFields();
      this.$refs["emailForm"].resetFields();
      this.getSms = "获取验证码";
    },
    sendVerifyPhone(){
      this.$refs["phoneForm"].validate(valid => {
        if (valid) {
          this.getSms = "发送中";
          this.sending = true;
          let params = {
            mobile: this.phoneForm.mobile,
            oldMobile: this.phoneForm.oldMobile,
            type: 1,//修改手机
            verifyType: 0
          }
          sendVerifyCode(params).then(res=>{
            this.getSms = "获取验证码";
            this.sending = false;
            if (res.success) {
              this.captchaId = res.result;
              this.$Message.success("发送短信验证码成功，请注意查收");
              // 开始倒计时
              this.$refs.countDownPhone.startCountDown();
            }
          })
        }
      });
    },
    sendVerifyEmail(){
      this.$refs["emailForm"].validate(valid => {
        if (valid) {
          this.getSms = "发送中";
          this.sending = true;
          let params = {
            email: this.emailForm.email,
            oldEmail: this.emailForm.oldEmail,
            type: 2,//修改手机
            verifyType: 1
          }
          sendVerifyCode(params).then(res=>{
            this.getSms = "获取验证码";
            this.sending = false;
            if (res.success) {
              this.captchaId = res.result;
              this.$Message.success("发送邮件验证码成功，请注意查收");
              // 开始倒计时
              this.$refs.countDownEmail.startCountDown();
            }
          })
        }
      });
    },
    //获取重置密码验证码
    sendVerifyPhoneEmail(){
      if (this.resetPhoneEmail == ""){
        this.$Message.error("手机号/邮箱号不能为空，请先绑定手机号/邮箱号");
        return
      }
      this.getSms = "发送中";
      this.sending = true;
      let params = {
        type: 0,//重置密码
        verifyType: this.resetForm.resetType
      }
      sendVerifyCode(params).then(res=>{
        this.getSms = "获取验证码";
        this.sending = false;
        if (res.success) {
          this.captchaId = res.result;
          this.$Message.success("发送验证码成功，请注意查收");
          // 开始倒计时
          this.$refs.countDownPhoneEmail.startCountDown();
        }
      })
    },
    // sendVerifyPhoneEmail(){
    //   this.$refs["resetForm"].validate(valid => {
    //     if (valid) {
    //       let verifyType;
    //       let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    //       if (reg.test(this.resetForm.phoneEmail)){
    //         verifyType = 0;
    //         this.verifyPhoneEmail(verifyType)
    //       } else {
    //         if (this.resetForm.phoneEmail.match(REG.reg.email) != null){
    //           verifyType = 1;
    //           this.verifyPhoneEmail(verifyType)
    //         } else {
    //           this.errorObj.phoneEmailError = "请输入正确的手机号或邮箱"
    //         }
    //       }
    //     }
    //   })
    // },
    // verifyPhoneEmail(verifyType){
    //   this.getSms = "发送中";
    //   this.sending = true;
    //   let params = {
    //     type: 0,//重置密码
    //     verifyType: verifyType
    //   }
    //   if (verifyType) {
    //     params.email = this.resetForm.phoneEmail;
    //   } else {
    //     params.mobile = this.resetForm.phoneEmail;
    //   }
    //   sendVerifyCode(params).then(res=>{
    //     this.getSms = "获取验证码";
    //     this.sending = false;
    //     if (res.success) {
    //       this.captchaId = res.result;
    //       this.$Message.success("发送验证码成功，请注意查收");
    //       // 开始倒计时
    //       this.$refs.countDownPhoneEmail.startCountDown();
    //     }
    //   })
    // },
    //重置密码
    resetPass(){
      this.$refs["resetForm"].validate(async valid => {
        if (valid) {
          let params = {
            captchaId: this.captchaId,
            code: this.resetForm.code,
            pwd: this.resetForm.newPass,
            repwd: this.resetForm.rePass
          }
          let res = await setRestPwd(params);
          if (res.success){
            // this.handlelogOut();
            this.$Message.success("重置密码成功")
            this.cancelResetPass();
          }
        }
      })
    },
    //取消重置密码
    cancelResetPass(){
      this.$refs["resetForm"].resetFields();
      this.$refs.countDownPhoneEmail.clearCountDown();
      this.resetForm = {
        resetType: 0,
        phoneEmail: "",
        code: "",
        newPass: "",
        rePass: "",
      }
    },
    closeWechat() {
      // 取消绑定
      clearInterval(this.timeId)
    },
    //绑定微信号
    bindWechat() {
      let that = this
      toBindWechat().then(res => {
        if (res.success) {
          var ticket = res.result.ticket;
          this.wechatSrc =
              "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=" + ticket;
          this.wechatFlag = true;
          this.getLinkFlag()
        }
      });
    },
    getLinkFlag() {
      // 定时获取是否绑定微信
      clearInterval(this.timeId)
      this.timeId = setInterval(() => {
        userInfo().then((res) => {
          if(res.code === 404){
            clearInterval(this.timeId)
          }
          if (res.result.wechat) {
            this.wechatFlag = false;
            this.$Message.success("绑定成功");
            this.updateUserInfo();
            this.userForm.wechat = res.result.wechat;
            clearInterval(this.timeId);
          }
        })
      }, 1000)
    },
    setMyTeam(e){
      if (this.isFreeMember && e){
        this.$bus.$emit('setFreeGuidedWords', "myTeam")
        this.setShowFreeMerber(true);
        return
      }
      this.isTeam = e;
    },
    setPass(e){
      this.isSetPass = e;
    },
    updateUserInfo() {
      // 更新用户信息
      getSwsuserInfo().then(res => {
        if (res.success) {
          let endDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000 - 1);
          // 避免超过大小限制
          delete res.result.permissions;
          Cookies.set("userInfo", JSON.stringify(res.result), {
            expires: endDate
          });
          this.setStore("userInfo", res.result);

          this.userInfoDetail = {
            ...res.result
          }
          this.infoForm.mobile = this.userInfoDetail.mobile;
          this.infoForm.email = this.userInfoDetail.email;
          this.infoForm.wechat = this.userInfoDetail.wechat;
          this.$store.commit("getNickName")
        }
      });
    },
    changeTab(e){
      this.userTabs = e;
    },
  }
}
</script>

<style scoped lang="less">
.account {
  .accountCont {
    border-top-left-radius: 0 0;
    margin-right: 10px;
    h3 {
      font-size: 20px;
      font-family: Microsoft YaHei-Bold, Microsoft YaHei;
      font-weight: bold;
      color: #333333;
    }
    .form {
      margin-top: 15px;
      .info {
        font-size: 16px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #333333;
      }
    }
    .inline {
      /deep/ .ivu-input-wrapper {
        width: 220px;
      }
    }
    .line {
      width: 100%;
      height: 0px;
      border: 1px solid #D0D0D0;
      margin: 10px 0 20px 0;
    }
    .bindInfo {
      margin: 10px 0;
      .bindLabel {
        display: inline-block;
        width: 100px;
      }
      .bindNum {
        display: inline-block;
        //width: 120px;
        margin-right: 20px;
      }
      .bindBtn {
        color: #2b85e4;
        cursor: pointer;
      }
    }

    .changePass {
      margin-top: 20px;
      display: flex;
      .active {
        //border-top: 2px solid #83A1F8;
        background: white;
        color: #2F77FF;
      }
      .setPass {
        margin-right: 40px;
        width: 400px;
      }
    }

  }

}
</style>