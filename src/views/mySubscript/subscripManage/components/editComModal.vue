<!--
 * @Author: 付柏磊
 * @Date: 2022-09-01 08:49:16
 * @LastEditors: 付柏磊
 * @LastEditTime: 2022-09-01 11:33:14
 * @Description: 我的订阅编辑订阅弹窗
 -->
<template>
  <div class="modal">
    <Modal
        v-model="modal1"
        title="订阅信息修改"
        width="970"
        @on-cancel="cancel"
    >
      <Form class="form" ref="editForm" :rules="ruleValidate" :model="form" :label-width="120" label-position="left">
        <FormItem label="订阅器名称：" prop="name">
          <Input v-model="form.name" placeholder="请输入订阅器名称（仅用于区别不同订阅规则，不作为订阅词）"></Input>
        </FormItem>
        <FormItem label="订阅词：" prop="keyword">
          <div>
            <div class="tag" v-for="(item,index) in form.keyword" :key="index" >
              <Tag style="" closable @on-close="tagClose(index)">{{item}}</Tag>
            </div>
            <div class="dashedBox">
              <Button v-if="!showKeywordInput" class="dashedBtn" type="dashed" @click="addKeyWord">添加关键词</Button>
              <Input v-if="showKeywordInput" v-model="inputVal" placeholder="请输入订阅词，回车确认" style="width: 300px" @on-enter="enterKeyWord" />
              <span class="dashedTxt">（还可添加<span style="color: #333333">{{ freeTotal-form.keyword.length }}</span>/{{ freeTotal }}个关键词）</span>
            </div>
            <div class="peer">
              <span class="word">同行订阅的关键词: </span>
              <div class="peerWordBox">
                <span v-for="item in peerWord" :key="item.id" class="peerTxt" @click="choosePeer(item.keyword)">
                {{ item.keyword }}
                </span>
              </div>
              <div class="rightBtn" @click="getPeerKeyWord(0)"><Icon style="font-size: 18px" type="md-sync" /> 换一批</div>
            </div>
          </div>
        </FormItem>
        <FormItem label="订阅逻辑：" prop="keywordLogic">
          <div class="logic">
            <RadioGroup v-model="form.keywordLogic">
              <Radio style="margin-right: 30px" :label="1">包含全部订阅词（与关系）</Radio>
              <Radio :label="0">包含任何一个订阅词（或关系）</Radio>
            </RadioGroup>
          </div>
        </FormItem>
        <FormItem label="排除词：">
          <div class="tag" v-for="(item,index) in form.excludeKeyword" :key="index" >
            <Tag style="" closable @on-close="tagCloseExclude(index)">{{item}}</Tag>
          </div>
          <div class="dashedBox">
            <Button v-if="!showExcludeInput" class="dashedBtn" type="dashed" :disabled="isFreeMember" @click="addExcludeWord">添加关键词</Button>
            <Input v-if="showExcludeInput" v-model="inputRuleVal" placeholder="请输入订阅词，回车确认" style="width: 300px" @on-enter="enterExcludeWord" />
            <span class="dashedTxt">（还可添加<span style="color: #333333">{{3-form.excludeKeyword.length}}</span>/3个排除词）</span>
            <span style="color: #999999" v-if="isFreeMember">该功能属于付费客户权限，请尽快联系专属客户开通权限。</span>
          </div>
        </FormItem>
        <div v-show="flag == 1">
          <FormItem label="栏目类型：">
<!--            <RadioGroup v-model="form.infoType">-->
<!--              <template v-for="(item,index) in columnType">-->
<!--                <Radio style="margin-right: 20px" :key="item.value" :label="item.value">{{ item.label }}</Radio>-->
<!--              </template>-->
<!--            </RadioGroup>-->
            <Checkbox
                :indeterminate="indeterminate"
                :value="checkAll"
                @click.prevent.native="handleCheckAll">全部类型
            </Checkbox>
            <CheckboxGroup style="display: inline" v-model="form.infoType" @on-change="checkAllGroupChange">
              <template v-for="(item,index) in columnType"><Checkbox :label="item.value">{{ item.label }}</Checkbox></template>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="内容范围：">
            <RadioGroup v-model="form.searchRange">
              <template v-for="(item,index) in contentRange">
                <Radio style="margin-right: 20px" :key="item.value" :label="item.value">{{ item.label }}</Radio>
              </template>
            </RadioGroup>
          </FormItem>
        </div>
        <div v-show="flag == 2">
          <FormItem label="信息类型：">
<!--            <RadioGroup v-model="form.infoType">-->
<!--              <template v-for="(item,index) in informationType">-->
<!--                <Radio style="margin-right: 20px" :key="item.value" :label="item.value">{{ item.label }}</Radio>-->
<!--              </template>-->
<!--            </RadioGroup>-->
            <Checkbox
                :indeterminate="indeterminate"
                :value="checkAll"
                @click.prevent.native="handleCheckAll">全部类型
            </Checkbox>
            <CheckboxGroup style="display: inline" v-model="form.infoType" @on-change="checkAllGroupChange">
              <template v-for="(item,index) in informationType"><Checkbox :label="item.value">{{ item.label }}</Checkbox></template>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="内容范围：">
            <RadioGroup v-model="form.searchRange">
              <template v-for="(item,index) in contentRange">
                <Radio style="margin-right: 20px" :key="item.value" :label="item.value">{{ item.label }}</Radio>
              </template>
            </RadioGroup>
          </FormItem>
          <FormItem label="项目阶段：">
            <RadioGroup v-model="form.stage">
              <template v-for="(item,index) in projectPhase">
                <Radio style="margin-right: 20px" :key="item.value" :label="item.value">{{ item.label }}</Radio>
              </template>
            </RadioGroup>
          </FormItem>
          <FormItem label="行业范围：">
            <div class="industry">
              一级行业
              <Select v-model="form.primaryIndustry" placeholder="全部行业" @on-change="changeCate">
                <Option
                    v-for="(item, i) in category1Data"
                    :value="item.value"
                    :key="i"
                >{{ item.label }}</Option>
              </Select>
            </div>
            <div class="industry">
              二级行业
              <Select v-model="form.secondaryIndustry" placeholder="全部行业">
                <Option value="-1">全部行业</Option>
                <Option
                    v-for="item in category2Data[form.primaryIndustry - 1]"
                    :value="item.value"
                    :key="item"
                >
                  {{ item.name }}</Option>
              </Select>
            </div>
          </FormItem>
        </div>
        <FormItem label="地区：" class="tree">
<!--          <Input v-model="form.name" placeholder="" ></Input>-->
          <treeselect
              style="width: 400px"
              v-model="form.area"
              :multiple="true"
              :options="options"
              :default-expand-level="2"
              :isDefaultExpanded="true"
              placeholder="所有地区"
          />
        </FormItem>
        <FormItem label="订阅发送：">
          <div class="switch">
            <span>邮件订阅</span>&nbsp;&nbsp;&nbsp;<i-switch size="small" v-model="form.isEmail" />
          </div>
          <div class="switch">
            <span>微信订阅</span>&nbsp;&nbsp;&nbsp;<i-switch size="small" v-model="form.isWechat" @on-change="(type)=>changeWechat(type)" />
          </div>
          <div class="switch">
            <span>短信订阅</span>&nbsp;&nbsp;&nbsp;<i-switch size="small" v-model="form.isSms" />
          </div>
          <div class="switch">
            <span>APP订阅</span>&nbsp;&nbsp;&nbsp;<i-switch size="small" v-model="form.isApp" />
          </div>
        </FormItem>
        <Alert style="margin-left: 120px" type="warning" show-icon>若修改订阅接收邮箱、微信、手机号，请进入账号管理中修改。</Alert>
      </Form>
      <div slot="footer">
        <Button type="text" @click="cancel">取消</Button>
        <Button type="primary" @click="handleOk">保存</Button>
      </div>
    </Modal>
    <Modal v-model="wechatFlag" title="您还未绑定微信公众号，请扫下方二维码进行绑定" @on-cancel="closeWechat" @on-ok="closeWechat">
      <div style="text-align:center;">
        <img :src="wechatSrc" alt="扫一扫绑定微信">
      </div>
    </Modal>
  </div>
</template>

<script>
import {columnType, contentRange, informationType, projectPhase, regionData, category1Data, category2Data} from "@/utils/const/attention";
import {setAssignObj} from "@/utils/utils";
import Cookies from "js-cookie";

import {getSwsuserInfo as userInfo, toBindWechat} from "@/api_new/index";
import {putGroup,getPeerKeyWord} from "@/api_new/mySubscript";


export default {
  props: {
    flag: {
      type: String,
      default: "1"
    },
    editParams: {
      type: Object,
      default: ()=>({})
    }
  },
  name: "editComModal",
  data(){
    const validateKeyword = (rule, value, callback) => {
      let temp = this.setJoinValue(value);
      if (!temp) {
        callback(new Error("订阅词不能为空，请您输入产品词进行订阅"));
      } else {
        callback();
      }
    };
    return{
      value: null,
      modal1: false,
      ruleValidate: {
        name: [
          { required: true, message: '订阅器名称不能为空', trigger: 'blur' }
        ],
        keyword: [
          {
            required: true,
            validator: validateKeyword,
            trigger: "blur",
          },
        ],
      },
      columnType: columnType,
      contentRange: contentRange,
      informationType: informationType,
      projectPhase: projectPhase,
      options: regionData,
      category1Data: category1Data,
      category2Data: category2Data,
      peerWord: [
        {id:1, keyword:"绿化"},
        {id:2, keyword:"园林"},
        {id:3, keyword:"花卉"},
        {id:4, keyword:"苗木"},
      ],
      form: {
        id: "",
        name: "",
        keyword: ["1","2","3"],
        keywordLogic: 1,
        excludeKeyword: ["4","5","6"],
        infoType: ['1', '2', '3', '6', '7', '5', '4'],
        searchRange: 0,
        area: [],
        isEmail: false,
        isWechat: false,
        isSms: false,
        isApp: false,
      },
      showKeywordInput: false,
      showExcludeInput: false,
      inputVal: "",
      inputRuleVal: "",
      pageForm: {
        pageNumber: 1,
        totalPages: 1,
      },
      indeterminate: false,
      checkAll: true,
      freeTotal: 10,
      wechatFlag: false,
      wechatSrc: "",
    }
  },
  computed: {
    isFreeMember(){
      let temp = false;
      if (JSON.parse(this.getStore("userInfo")).memberType == "免费会员") {
        temp = true;
        this.freeTotal = 5;
      }
      return temp;
    },
  },
  created() {
    this.modal1 = true;
    this.getPeerKeyWord();
    this.form = this.setEditForm();
  },
  methods: {
    //获取同行关键词
    async getPeerKeyWord(flag) {
      let params = {
        keywords: this.form.keyword,
        pageNumber: flag === 0 ? 0 : this.pageForm.pageNumber,
        pageSize: 10
      }
      let res = await getPeerKeyWord(params);
      const {success, result} = res;
      if (success) {
        this.peerWord = result.content;
        this.pageForm.totalPages = result.totalPages;
      }
    },
    cancel(){
      this.$emit("handleClose", false);
    },
    handleOk(){
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          let type = this.flag == '1' ? 0 : 1;
          let params = {
            ...this.form
          }
          params.keyword = this.setJoinValue(params.keyword);
          params.excludeKeyword = this.setJoinValue(params.excludeKeyword);
          params.area = this.getAreaIds();
          // 采购与招标默认为零
          params.type = type;

          //Todo: 修改订阅接口不需要必时间，且传了订阅发送的值编辑不生效
          params.dateRange = 1;
          putGroup(params).then((res) => {
            if (res.success) {
              this.$Message.success("保存订阅器成功");
              this.$emit("handleOk", false);
            }
          });
        }
      })
    },
    //点击编辑时回显
    setEditForm(){
      console.log(this.editParams);
      if (this.flag == '2') {
        this.form = {
          id: "",
          name: "",
          keyword: ["","",""],
          keywordLogic: 1,
          excludeKeyword: ["","",""],
          infoType: ['3030', '3020', '3110', '3120', '3050'],
          searchRange: 0,
          stage: "",
          primaryIndustry: "",
          secondaryIndustry: "",
          area: [],
          isEmail: false,
          isWechat: false,
          isSms: false,
          isApp: false,
        }
      }
      let params = setAssignObj(this.form, this.editParams);
      params.keyword = params.keyword.split(" ");
      if (params.infoType) {
        params.infoType = params.infoType.split(",");
      } else {
        params.infoType = this.form.infoType;
      }
      if (params.excludeKeyword){
        params.excludeKeyword = params.excludeKeyword.replace(/\s+/g," ")
        params.excludeKeyword = params.excludeKeyword.split(" ");
      } else {
        params.excludeKeyword = [];
      }
      params.area = params.area?params.area.split(","):[];
      return params
    },
    //处理keyword关键字
    setJoinValue(arr) {
      let temp = "";
      arr.forEach((item, index) => {
        if (item) {
          temp = temp + " " + item;
        }
      })
      if (temp) temp = temp.trim();
      return temp;
    },
    //获取地区里id列表
    getAreaIds(){
      let regionObj = {
        "-11": "1,3,5,6,7",
        "-12": "2,16,11,13,15,12,14",
        "-13": "18,19,17",
        "-14": "20,21,22",
        "-15": "8,9,10",
        "-16": "26,28,31,30,29",
        "-17": "4,27,23,24,25",
        "-18": "36,32,33,34"
      }
      let ids = "";
      if (this.form.area.length){
        if (this.form.area[0] == -1) return ""
        this.form.area.forEach((item,index)=>{
          if (item > 0) {
            ids = !index? item : ids + ',' + item;
          } else {
            ids = !index? regionObj[item] : ids + ',' + regionObj[item];
          }
        })
      }
      return ids
    },
    changeCate(value) {
      if (value == -1) {
        this.form.secondaryIndustry = "-1";
      }
    },
    //添加关键词
    addKeyWord(){
      if (this.isFreeMember){
        if (this.form.keyword.length >= 5) return this.$Message.info("最多只能添加5个订阅词");
      } else {
        if (this.form.keyword.length >= 10) return this.$Message.info("最多只能添加10个订阅词");
      }
      this.inputVal = "";
      this.showKeywordInput = !this.showKeywordInput;
    },
    //确认添加关键词
    enterKeyWord(){
      if (!this.inputVal) return this.$Message.info("添加关键词不能为空");
      this.form.keyword.push(this.inputVal);
      this.showKeywordInput = !this.showKeywordInput;
    },
    //删除关键词
    tagClose(index){
      if (this.form.keyword.length == 1) return this.$Message.info("订阅词不能为空");
      this.form.keyword.splice(index, 1)
    },
    tagCloseExclude(index){
      this.form.excludeKeyword.splice(index, 1)
    },
    //选择同行关键词
    choosePeer(val){
      if (this.showKeywordInput) {
        this.inputVal = val;
        this.form.keyword.push(this.inputVal);
        this.showKeywordInput = !this.showKeywordInput;
      }
    },
    //添加排除词
    addExcludeWord(){

      if (this.form.excludeKeyword.length >= 3) return this.$Message.info("最多只能添加3个排除词词");
      this.inputRuleVal = "";
      this.showExcludeInput = !this.showExcludeInput;
    },
    //确认添加排除词
    enterExcludeWord(){
      if (!this.inputRuleVal) return this.$Message.info("添加排除词不能为空");
      this.form.excludeKeyword.push(this.inputRuleVal);
      this.showExcludeInput = !this.showExcludeInput;
    },
    //栏目类型多选
    handleCheckAll(){
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
        this.form.infoType = this.flag == 1?['1', '2', '3', '6', '7', '5', '4']:['3030', '3020', '3110', '3120', '3050'];
      } else {
        this.form.infoType = [];
      }
    },
    checkAllGroupChange(data){
      if (data.length === 7 && this.flag == 1) {
        this.indeterminate = false;
        this.checkAll = true;
      } else if (data.length === 5 && this.flag == 2) {
        this.indeterminate = false;
        this.checkAll = true;
      } else if (data.length > 0) {
        this.indeterminate = true;
        this.checkAll = false;
      } else {
        this.indeterminate = false;
        this.checkAll = false;
      }
    },
    //微信二维码
    changeWechat(type){
      let userInfo = JSON.parse(this.getStore("userInfo"));
      if (!userInfo.wechat && type){
        this.bindWechat();
      }
    },
    //绑定微信号
    bindWechat() {
      let that = this
      // this.wechatFlag = true;
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
            // this.updateUserInfo();
            let endDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000 - 1);
            // 避免超过大小限制
            delete res.result.permissions;
            Cookies.set("userInfo", JSON.stringify(res.result), {
              expires: endDate
            });
            this.setStore("userInfo", res.result);
            clearInterval(this.timeId);
          }
        })
      }, 1000)
    },
    closeWechat(){
      // 取消绑定
      clearInterval(this.timeId);
      let userInfoWechat = JSON.parse(this.getStore("userInfo")).wechat;
      if (!userInfoWechat){
        this.form.isWechat = false;
      }
    },
  }
}
</script>

<style scoped lang="less">
.modal {

}
/deep/ .ivu-form{
  .ivu-form-item-label {
    font-size: 14px;
    font-family: Microsoft YaHei-Bold, Microsoft YaHei;
    font-weight: bold;
    color: #999999;
  }
  .ivu-input-wrapper{
    width: 400px;
  }
  .ivu-select {
    width: 200px;
  }

  .ivu-tag-default {
    background-color: #ECF1FE;
  }

  .tag {
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 5px;
    margin-right: 15px;
  }

  .dashedBox {
    display: inline-block;
    .dashedBtn {
      font-size: 13px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #3F6EF5;
      border-color: #3F6EF5;
    }
    .dashedTxt {
      font-size: 12px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #999999;
    }
  }
  .peer {
    padding: 0 16px;
    font-size: 13px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    line-height: 50px;
    color: #333333;
    margin-top: 15px;
    height: 50px;
    background: #F6F6F6;
    border-radius: 2px 2px 2px 2px;
    .peerWordBox {
      display: inline-block;
      width: 564px;
      height: 50px;
      overflow: hidden;
    }
    .word {
      display: inline-block;
      vertical-align: top;
      margin-right: 5px;
    }
    .peerTxt {
      display: inline-block;
      color: #666666;
      margin-right: 20px;
      cursor: pointer;
    }
    .rightBtn {
      float: right;
      font-size: 12px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #3F6EF5;
      cursor: pointer;
    }
  }

  .switch {
    display: inline-block;
    margin-right: 20px;
  }

  .industry {
    display: inline-block;
    margin-right: 20px;
  }
}

.tree {
  /deep/ .ivu-form-item-content {
    line-height: inherit;
  }
}
</style>