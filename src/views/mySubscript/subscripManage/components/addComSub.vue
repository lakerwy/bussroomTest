<!--
 * @Author: 付柏磊
 * @Date: 2022-09-01 09:36:32
 * @LastEditors: 付柏磊
 * @LastEditTime: 2022-09-01 10:13:32
 * @Description: desc
 -->
<template>
  <div class="comSub">
    <Card class="card left">
      <Form class="addForm" ref="formInline" :rules="ruleValidate" :model="form" :label-width="110" label-position="left">
        <FormItem label="订阅器名称：" prop="name">
          <Input v-model="form.name" placeholder="请输入订阅器名称（仅用于区别不同订阅规则，不作为订阅词）"></Input>
<!--          <Button class="right_btn" type="primary">新增订阅器<span>（还可新增9个）</span></Button>-->
        </FormItem>
        <div class="line"></div>
        <FormItem label="订阅词：" prop="keyword">
          <div v-for="(item,index) in form.keyword" :key="index" class="addInput">
            <span v-if="index != 0" class="txtYu">{{ yuHuoTxt }}</span>
            <Input v-model="form.keyword[index]" placeholder="请输入订阅词"></Input>
            <Icon v-if="index == 0" class="IconMd" type="md-add" @click="setKeyword(index)" />
            <Icon v-if="index != 0" class="IconMd" type="md-remove" @click="setKeyword(index)" />
            <PromptBox v-if="index == 0" class="prompt">
              <Icon class="icon" type="ios-information-circle" />
              <p>
                订阅词的合理设定是获取价值公告的关键！用“+”添加订阅词，多个关键词按照订阅逻辑筛选公告。还可添加 <span class="red">{{freeTotal-form.keyword.length}}</span>/{{freeTotal}}个订阅词
              </p>
            </PromptBox>
          </div>
        </FormItem>
        <FormItem label="订阅逻辑：" prop="name">
          <div class="logic">
            <RadioGroup v-model="form.keywordLogic">
              <Radio class="logicRadio" :label="1">包含全部订阅词（与关系）</Radio>
              <Radio :label="0">包含任何一个订阅词（或关系）</Radio>
            </RadioGroup>
            <PromptBox class="logicPrompt">
              <h4>示例</h4>
              <ul>
                <li>
                  <span class="cir">1</span>
                  <span class="logicTitle">订阅逻辑：</span>包含全部订阅词（与关系）
                </li>
                <li>
                  <span class="logicTitle">订阅词：</span>酒店 <span style="color: #999999">与</span> 绿化 <span style="color: #2b85e4">与</span> 租摆
                </li>
                <li>
                  <span class="logicTitle">订阅公告：</span>宁波市北仑区公共资源交易中心关于丽都<span style="color: #2b85e4">酒店</span>物业部<span style="color: #2b85e4">绿化租摆</span>的公开招标公告
                </li>
                <li>
                  <span class="cir">2</span>
                  <span class="logicTitle">订阅逻辑：</span>包含任何一个订阅词（或关系）
                </li>
                <li>
                  <span class="logicTitle">订阅词：</span>酒店 <span style="color: #2b85e4">或</span> 绿化 <span style="color: #2b85e4">或</span> 租摆
                </li>
                <li>
                  <span class="logicTitle">订阅词：</span>欢乐海岸<span style="color: #2b85e4">绿化</span>管养服务采购招标公告
                </li>
              </ul>
            </PromptBox>
          </div>
        </FormItem>
        <FormItem label="排除词：">
          <div v-for="(item,index) in form.excludeKeyword" :key="index" class="addInput">
            <span v-if="index != 0 " class="txtYu">与</span>
            <Input  v-model="form.excludeKeyword[index]" placeholder="请输入排除词" :disabled="isFreeMember"></Input>
          </div>
          <span style="position: absolute;bottom: -34px;color: #999999" v-if="isFreeMember">该功能属于付费客户权限，请尽快联系专属客户开通权限。</span>
        </FormItem>
        <div v-if="flag == 1">
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
        <div v-if="flag == 2">
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
              class="treeSelect"
              style="width: 412px"
              v-model="form.area"
              :multiple="true"
              :options="options"
              :default-expand-level="2"
              :isDefaultExpanded="true"
              placeholder="全部地区"
          />
        </FormItem>
        <FormItem label="订阅发送：">
          <div class="switch">
            <span>邮件订阅</span>&nbsp;&nbsp;&nbsp;<i-switch size="small" v-model="form.isEmail" @on-change="(type)=>changeEmail(type,0)" />
          </div>
          <div class="switch">
            <span>微信订阅</span>&nbsp;&nbsp;&nbsp;<i-switch size="small" v-model="form.isWechat" @on-change="(type)=>changeEmail(type,1)"/>
          </div>
          <div class="switch">
            <span>短信订阅</span>&nbsp;&nbsp;&nbsp;<i-switch size="small" v-model="form.isSms" @on-change="(type)=>changeEmail(type,2)"/>
          </div>
          <div class="switch">
            <span>APP订阅</span>&nbsp;&nbsp;&nbsp;<i-switch size="small" v-model="form.isApp" />
          </div>

        </FormItem>
<!--        <FormItem label="APP订阅：">-->
<!--          <div style="width: 200px;height: 200px; margin: 9px 0">-->
<!--            <img style="width: 200px" src="https://cdn.chinabidding.cn/public/2020/img/sy_cont_image3.png" alt="">-->
<!--          </div>-->
<!--          <Alert style="width: 550px" type="warning" show-icon>APP订阅需下载安装APP后自行订阅，暂不遵循商务室内订阅器设定。</Alert>-->
<!--        </FormItem>-->
        <FormItem>
          <Button type="primary" @click="saveSubscrib">保存订阅器</Button>
          <Button style="margin-left: 20px" @click="clearSub">清空</Button>
        </FormItem>
      </Form>
    </Card>
    <Card class="card right">
      <div class="rightHeader">
        <h3>订阅规则</h3>
        <div class="ruleTitle">
          <div>
            <span class="point"></span>全文<span style="color: red">包含</span>
            <div class="subWord" v-for="(item, index) in form.keyword" :key="item.id">
              <span class="txthuo">{{ index != 0 ? yuHuoTxt : '' }}</span>
              订阅词{{index+1}}：<span class="blue">{{ item }}</span>
            </div>
          </div>
          <div style="margin-top: 10px" v-if="excludeWord?true:false">
            <span class="point"></span>全文<span style="color: red">不包含</span>
            <div class="subWord" v-for="(item,index) in form.excludeKeyword" :key="item.id">
              <span class="txthuo">{{ index != 0 ? '与' : '' }}</span>
              排除词{{index+1}}：<span class="blue">{{ item }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="rightCont">
        <h3>智能预览</h3>
        <div class="my-explain"><Icon class="icon" type="md-information-circle" />近一周可获取 {{previewTotal}} 条中标信息</div>
        <ul class="preview">
          <li v-for="item in previewList" :key="item.id">
            <h4 v-html="item.title"></h4>
            <p v-html="item.description"></p>
          </li>
        </ul>
      </div>
    </Card>

    <Modal v-model="bindFlag" title="请注意：">
      <p>
        您还未绑定您的
        <span style="color:#ed4014">{{bindStr}}</span>
      </p>
      <p>请您进入“个人中心”进行绑定</p>
      <div slot="footer">
        <Button type="text" @click="bindFlag = false">取消</Button>
        <Button type="primary" @click="goBind">立即前往</Button>
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
import { columnType, contentRange, informationType, projectPhase, regionData, category1Data, category2Data } from "@/utils/const/attention";
import { PromptBox } from "@/components/contentBox/index.js"
import {mapMutations} from "vuex";
import Cookies from "js-cookie";

import {getSwsuserInfo as userInfo, toBindWechat} from "@/api_new/index";
import {saveSearch, getZbPreview, getNzjPreview } from "@/api_new/mySubscript";

export default {
  components: {
    PromptBox
  },
  name: "addComSub",
  props: {
    flag: String,
  },
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
        ]
      },
      columnType: columnType,
      contentRange: contentRange,
      informationType: informationType,
      projectPhase: projectPhase,
      options: regionData,
      category1Data: category1Data,
      category2Data: category2Data,
      withOr: [
        {id: 1, name: '与关系'},
        {id: 0, name: '或关系'}
      ],
      previewList: [
        // {id: 1, title: "湘南国际大酒店管理委员会关于主机的网", txt1: "湘南国际酒店管理委员会", txt2: "“湘南国际大酒店管理委"},
        // {id: 2, title: "湘南国际大酒店管理委员会关于主机的网", txt1: "湘南国际酒店管理委员会", txt2: "“湘南国际大酒店管理委"},
        // {id: 3, title: "湘南国际大酒店管理委员会关于主机的网", txt1: "湘南国际酒店管理委员会", txt2: "“湘南国际大酒店管理委"},
        // {id: 4, title: "湘南国际大酒店管理委员会关于主机的网", txt1: "湘南国际酒店管理委员会", txt2: "“湘南国际大酒店管理委"}
      ],
      previewTotal: 0,
      form: {
        name: "",
        keyword: ["","",""],
        keywordLogic: 1,
        excludeKeyword: ["","",""],
        infoType: ['1', '2', '3', '6', '7', '5', '4'],
        searchRange: 0,
        area: [],
        isEmail: false,
        isWechat: false,
        isSms: false,
        isApp: false,
      },
      bindStr: "邮箱",
      bindFlag: false,
      wechatFlag: false,
      wechatSrc: "",
      indeterminate: false,
      checkAll: true,
      freeTotal: 10,
    }
  },
  computed: {
    yuHuoTxt() {
      return this.form.keywordLogic == 1 ? '与' : '或'
    },
    excludeWord() {
      return this.setJoinValue(this.form.excludeKeyword);
    },
    keyword() {
      return this.setJoinValue(this.form.keyword);
    },
    isFreeMember(){
      let temp = false;
      if (JSON.parse(this.getStore("userInfo")).memberType == "免费会员") temp = true;
      return temp;
    },
  },
  watch: {
    excludeWord: {
      handler(newVal, oldVal){
        this.getZtbSearch();
      }
    },
    keyword: {
      handler(newVal, oldVal){
        this.getZtbSearch();
      }
    }
  },
  created() {
    this.init();
    if (this.isFreeMember) {
      this.freeTotal = 5;
    }
  },
  activated() {
    this.init();
  },
  methods: {
    ...mapMutations(["setShowFreeMerber"]),
    init(){
      this.clearSub();
    },
    //保存订阅器
    saveSubscrib(){
      this.$refs.formInline.validate((valid) => {
        if (valid) {
          if (this.flag == 1){
            // if (this.groupData.pageTotal >= 10) {
            //   this.$Message.warning("最多只能添加10个分组");
            //   return
            // }
            this.saveBiddingData(0);
          } else {
            // if (this.groupData.pageTotal >= 5) {
            //   this.$Message.warning("最多只能添加5个分组");
            //   return
            // }
            this.saveBiddingData(1);
          }
        }
      })
    },
    //保存招标与采购订阅器和拟在建
    saveBiddingData(type){
      let params = {
        ...this.form
      }
      params.keyword = this.setJoinValue(params.keyword);
      params.excludeKeyword = this.setJoinValue(params.excludeKeyword);
      params.area = this.getAreaIds();

      //免费会员非提示付费 时间（近1月）超1月时间提示付费
      if (this.isFreeMember){
        if (params.excludeKeyword || type == 1){
          this.$bus.$emit('setFreeGuidedWords', "subscrip")
          this.setShowFreeMerber(true);
          return
        }
      }

      // 采购与招标默认为零
      params.type = type;
      saveSearch(params).then((res) => {
        if (res.success) {
          this.$Message.success("保存订阅器成功");
        }
      });
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
    //清空
    clearSub(){
      let name = this.form.name;
      if (this.flag == 1){
        this.form =  {
          name: name,
          keyword: ["","",""],
          keywordLogic: 1,
          excludeKeyword: ["","",""],
          infoType: ['1', '2', '3', '6', '7', '5', '4'],
          searchRange: 0,
          area: [],
          isEmail: false,
          isWechat: false,
          isSms: false,
          isApp: false,
        }
      } else {
        this.form = {
          name: name,
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
      this.$nextTick(()=>{
        document.getElementsByClassName("single-page-con")[0].scrollTo(0,0);
      })
    },
    // 添加
    setKeyword(index){
      if (index == 0){
        if (this.isFreeMember){
          if (this.form.keyword.length >= 5) return this.$Message.info("最多只能添加5个订阅词");
        } else {
          if (this.form.keyword.length >= 10) return this.$Message.info("最多只能添加10个订阅词");
        }
        this.form.keyword.push("");
      } else {
        this.form.keyword.splice(index, 1)
      }
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
    changeCate(value) {
      if (value == -1) {
        this.form.secondaryIndustry = "-1";
      }
    },
    //招标和拟在建查询
    // 招标与采购查询
    async getZtbSearch(){
      let params = {
        table: "",
        page: 1,
        rows: 5,
        range: 1,
        keywordLogic: this.form.keywordLogic
      }
      params.keyword = this.setJoinValue(this.form.keyword);
      params.excludeKeyword = this.setJoinValue(this.form.excludeKeyword);
      let res;
      if (this.flag == 1){
        res = await getZbPreview(params);
      } else {
        res = await getNzjPreview(params);
      }
      const {status, result} = res;
      if(status == "OK" && result){
        this.previewList = result.items;
        this.previewTotal = result.total;
      }
    },
    //邮件订阅
    changeEmail(type, flag){
      let userInfo = JSON.parse(this.getStore("userInfo"));
      let status;
      if(flag === 0){
        status = userInfo.email;
      }else if(flag === 1){
        status = userInfo.wechat;
        if(!status && type){
          this.bindWechat();
          return
        }
      }else if(flag === 2){
        status = userInfo.mobile;
      }
      if(!status && type){
        this.bindFlag = true;
      }
    },
    goBind(){
      this.$router.push({
        name: "accountRegulate",
        params: {
          type: 2
        }
      });
      this.bindFlag = false;
    },
    closeWechat(){
      // 取消绑定
      clearInterval(this.timeId);
      let userInfoWechat = JSON.parse(this.getStore("userInfo")).wechat;
      if (!userInfoWechat){
        this.form.isWechat = false;
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
    }
  }
}
</script>

<style scoped lang="less">
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.comSub {
  margin-top: 20px;
  display: flex;
  .left {
    margin-right: 20px;
    width: 80%;
    .addForm {
      margin-left: 10px;
      /deep/.ivu-form-item-label {
        position: relative;
        &::before{
          position: absolute;
          left: -13px;
        }
      }
    }
    .right_btn{
      position: absolute;
      right: 0;
    }
    .line {
      width: 100%;
      height: 1px;
      border-bottom: 1px dotted #999999;
      margin-bottom: 15px;
    }
    .addInput {
      position: relative;
      margin-bottom: 15px;
      .prompt {
        width: 281px;
        height: 88px;
        position: absolute;
        left: calc(40% + 40px);
        top: -3px;
        padding-left: 30px;
        .icon {
          position: absolute;
          left: 10px;
          top: 10px;
        }
        p {
          font-size: 12px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #666666;
          line-height: 22px;
          .red {
            color: red;
          }
        }
      }
      .IconMd {
        font-size: 20px;
        margin-left: 30px;
        cursor: pointer;
      }
      .txtYu {
        position: absolute;
        left: -30px;
        top: 0;
      }
    }
    .switch {
      display: inline-block;
      margin-right: 20px;
    }
    .logic {
      position: relative;
      .ivu-radio-group {
        width: 40%;
      }
      //.logicRadio {
      //  margin-right: 20px
      //}
      .logicPrompt {
        width: 50%;
        min-width: 350px;
        //height: 202px;
        position: absolute;
        left: calc(40% + 4px);
        top: 0px;
        li {
          padding-left: 30px;
          font-size: 12px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #666666;
          line-height: 25px;
          .logicTitle {
            display: inline-block;
            color: #999999;
            width: 65px;
          }
        }
        .cir{
          margin-left: -25px;
          margin-right: 10px;
          line-height: 14px;
          text-align: center;
          vertical-align: middle;
          display: inline-block;
          width: 14px;
          height: 14px;
          background: #CCCCCC;
          color: rgba(255, 255, 255, 1);
          font-size: 10px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #FFFFFF;
          border-radius: 7px;
        }
      }
    }
    .industry {
      display: inline-block;
      margin-right: 20px;
    }
  }
  .right {
    width: 20%;
    /deep/ .ivu-card-body {
      padding: 0;
    }
    h3{
      font-size: 20px;
      font-family: Microsoft YaHei-Bold, Microsoft YaHei;
      font-weight: bold;
      color: #333333;
    }
    .rightHeader {
      padding: 16px;
      border-bottom: 1px solid #D0D0D0;
      .point {
        vertical-align: middle;
        display: inline-block;
        width: 6px;
        height: 6px;
        background: rgba(63, 110, 245, 1);
        border-radius: 3px;
        margin-left: -7px;
        margin-right: 10px;
      }
      .ruleTitle {
        font-size: 14px;
        font-weight: 400;
        font-family: Microsoft YaHei-Regular;
        padding: 15px 0 0 10px;

        .subWord:nth-of-type(1){
          margin-top: 5px;
        }
        .subWord {
          font-size: 14px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #333333;
          margin-left: 10px;
          line-height: 25px;
        }
        .txthuo {
          vertical-align: middle;
          display: inline-block;
          width: 25px;
        }
        .blue {
          color: rgba(63, 110, 245, 1);
        }
      }
    }
    .rightCont {
      padding: 16px;
      .my-explain {
        margin: 15px 0 10px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .preview {
        li {
          border-bottom: 1px dashed #E8E8E8;
          margin-bottom: 15px;
          padding-bottom: 15px;
          h4{
            font-size: 14px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #333333;
            line-height: 25px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-bottom: 10px;
          }
          p {
            font-size: 13px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #999999;
            line-height: 25px;
            overflow: hidden;				//溢出内容隐藏
            text-overflow: ellipsis;		//文本溢出部分用省略号表示
            display: -webkit-box;			//特别显示模式
            -webkit-line-clamp: 2;			//行数
            line-clamp: 2;
            -webkit-box-orient: vertical;	//盒子中内容竖直排列
          }
        }
      }
    }
  }
}
.tree {
  /deep/ .ivu-form-item-content {
    line-height: inherit;
  }
}
</style>