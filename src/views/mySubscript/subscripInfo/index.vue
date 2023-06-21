<!--
 * @Author: 付柏磊
 * @Date: 2022-09-01 14:37:14
 * @LastEditors: 付柏磊
 * @LastEditTime: 2022-09-01 16:04:48
 * @Description: 订阅信息
 -->
<template>
  <div class="browse">
    <Card class="card browseCont">
      <Tabs class="myTabs" v-model="procurement" @on-click="changeRrocurement">
        <TabPane label="招标与采购" name="1"></TabPane>
        <TabPane label="拟在建项目" name="2"></TabPane>
      </Tabs>
      <div class="list">
        <ul class="columm_type addSubscriber">
          <span class="column_title">订阅器：</span>
          <li v-for="(item,index) in subGroupList" :key="index" >
            <div class="tags" :class="activeIndex==index?'activeTag':''" @click="setTags(index)">
              <span>{{ item.name }}</span>
            </div>
          </li>
          <Button class="right_btn" type="primary" @click="addSubscrit">新增订阅器
            <span>（还可新增{{total}}个）</span>
          </Button>
        </ul>
        <ul class="columm_type editSub" >
          <RadioGroup v-model="searchForm.title">
            <span class="column_title">订阅关键词：</span>
            <li v-for="(item,index) in subWorldList" :key="index"><Radio :label="item">{{ item }}</Radio></li>

            <span v-if="!showKeywordInput" class="addColumnText" @click="addKeyWord">新增关键词</span>
            <Input v-if="showKeywordInput" v-model="inputVal" placeholder="请输入订阅词，回车确认" style="width: 300px" @on-blur="showKeywordInput=false" @on-enter="enterKeyWord" />
            <span class="addColumnText" style="margin-left: 15px" @click="removeKeyWord">删除关键词</span>
            <button class="right_btn" @click="editSubscrit">修改订阅器</button>
          </RadioGroup>
        </ul>
        <ul class="columm_type" v-show="procurement == 1">
<!--          <RadioGroup v-model="searchForm.infoType">-->
<!--            <span class="column_title">栏目类型：</span>-->
<!--            <li v-for="(item,index) in columnType" :key="index"><Radio :label="item.value">{{ item.label }}</Radio></li>-->
<!--          </RadioGroup>-->
          <span>栏目类型：</span>
          <Checkbox
              style="color: #333333;"
              :indeterminate="indeterminate"
              :value="checkAll"
              @click.prevent.native="handleCheckAll">全部类型
          </Checkbox>
          <CheckboxGroup style="display: inline" v-model="searchForm.infoType" @on-change="checkAllGroupChange">
            <li v-for="(item,index) in columnType" :key="index"><Checkbox :label="item.value">{{ item.label }}</Checkbox></li>
          </CheckboxGroup>
        </ul>
        <ul class="columm_type" v-show="procurement == 2">
<!--          <RadioGroup v-model="searchForm.infoType">-->
<!--            <span class="column_title">栏目类型：</span>-->
<!--            <li v-for="(item,index) in columnType2" :key="index"><Radio :label="item.value">{{ item.label }}</Radio></li>-->
<!--          </RadioGroup>-->
          <span>栏目类型：</span>
          <Checkbox
              style="color: #333333;"
              :indeterminate="indeterminate"
              :value="checkAll"
              @click.prevent.native="handleCheckAll">全部类型
          </Checkbox>
          <CheckboxGroup style="display: inline" v-model="searchForm.infoType" @on-change="checkAllGroupChange">
            <li v-for="(item,index) in columnType2" :key="index"><Checkbox :label="item.value">{{ item.label }}</Checkbox></li>
          </CheckboxGroup>
        </ul>
        <div class="search">
          <span class="column_title">筛选条件：</span>
          <Select class="searchSelect" placeholder="时间" v-model="searchForm.dateRange" style="width:230px">
            <Option v-for="item in timeRange" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <div style="width: 230px; height:33px; vertical-align: top; margin-right: 20px;display: inline-block">
            <treeselect
                v-model="searchForm.area"
                :multiple="true"
                :options="options"
                :default-expand-level="2"
                :isDefaultExpanded="true"
                :limit="2"
                :limitText="count => ` + ${count}`"
                placeholder="全部地区"
            />
          </div>
<!--          <Select class="searchSelect" placeholder="附件" v-model="searchForm.searchType" style="width:230px">-->
<!--            <Option v-for="item in searchScope" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
<!--          </Select>-->
          <div class="searchBtn">
            <Input v-model="searchForm.title2" placeholder="请输入您要搜索的信息" />
            <Button type="primary" @click="searchSub">立即搜索</Button>
          </div>
        </div>
      </div>
    </Card>
    <Card class="card">
      <div>
        <span class="total">共 {{pageForm.pageTotal}} 条</span>
        <Button v-if="!isAdmin" style="margin-left: 20px;" type="primary" @click="viewIncrement">导出增量</Button>
        <div class="list_btn">
          <Button class="right_btn" @click="exportSubInfo"><Icon style="font-size: 18px;margin-right: 5px" type="ios-download-outline" />批量导出</Button>
          <Button class="right_btn" @click="collectSubInfo"><Icon style="font-size: 18px;margin-right: 5px" type="ios-star-outline" />批量收藏</Button>
          <Button class="right_btn" @click="shareSubInfo"><Icon style="font-size: 18px;margin-right: 5px" type="ios-share-alt-outline" />批量分享</Button>
        </div>
        <div style="clear: both"></div>
        <Table class="my-table" :columns="columns" :data="tableData" :loading="loading" @on-selection-change="handleSelectChange"></Table>
        <Page
            v-if="tableData.length"
            class="my-page"
            :current.sync="pageForm.pageNumber"
            :total="pageForm.pageTotal"
            :page-size="pageForm.pageSize"
            show-elevator
            @on-change="pageChange"
        />
      </div>
    </Card>
    <ShareModal v-if="shareModal" :message.sync="message" :shareUser.sync="shareUser" @handleOk="handleOk" @handleClose="handleClose"></ShareModal>
  </div>
</template>

<script>
import { timeRange, regionData, contentRange, columnType, informationType, areaData, projectPhase, category1Data} from "@/utils/const/attention";
import { deepClone, setProjectType, filterDict, dateFormat, setAssignObj } from "@/utils/utils.js";
import {mapMutations} from "vuex";
import { ShareModal, ReadTitle } from "@/components/contentBox/index.js"
import {downAnnouncement} from "@/api/myAttention";

import {exportAnnouncement, setShare, collectMailSub} from "@/api_new/myAttention";
import {getMySubscribe, getMySub,putGroup} from "@/api_new/mySubscript";

export default {
  name: "index",
  components: {
    ShareModal
  },
  data(){
    return{
      loading: false,
      isTeam: false,
      procurement: '1',
      activeIndex: 0,
      columnType: columnType,
      columnType2: informationType,
      timeRange: timeRange,
      options: regionData, //地区
      searchScope: contentRange,
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: "标题",
          align: "center",
          minWidth: 500,
          render: (h, params)=>{
            return (
                <a target="_blank"
                   href={'https://'+ params.row.webUrl}
                   class="infoTitle"
                >{params.row.title}</a>
            )
          }
        },
        {
          title: "信息类型",
          align: "center",
          minWidth: 120,
          sortable: true,
          render: (h, params)=>{
            let obj = setProjectType(params.row)
            return (<strong class="area" >{obj.type}</strong>)
          }
        },
        {
          title: "进展阶段",
          key: "classbId",
          align: "center",
          minWidth: 200,
          render: (h,params)=>{
            let classbId = filterDict(params.row.classbId, projectPhase, {labelKey: 'label', valueKey: 'value'});
            return (
                <div>{classbId?classbId:''}</div>
            )
          }
        },
        {
          title: "行业",
          align: "center",
          minWidth: 120,
          key: "numa",
          render: (h,params)=>{
            let category = parseInt(params.row.numa) < 1 || parseInt(params.row.numa) > 18 ? '' : filterDict(parseInt(params.row.numa), category1Data, {
              labelKey: 'label',
              valueKey: 'value'
            });
            return (
                <div>{category}</div>
            )
          }
        },
        {
          title: "地区",
          align: "center",
          key: "areaId",
          minWidth: 90,
          sortable: true,
          render: (h,params)=>{
            let area = filterDict(params.row.areaId, areaData, {labelKey: 'title', valueKey: 'value'});
            return (
                <div>{area?area:'其他'}</div>
            )
          }
        },
        {
          title: "发布时间",
          key: "publishDate",
          align: "center",
          minWidth: 120,
          sortable: true,
          render: (h,params)=>{
            let date = dateFormat(new Date(params.row.publishDate), "yyyy-MM-dd")
            return (
                <div>{date}</div>
            )
          }
        },
      ],
      copyColumns: [],
      tableData: [],
      pageForm: {
        pageNumber: 1, // 当前页数
        pageTotal: 0,
        pageSize: 10,
      },
      searchForm: {
        infoType: ['1', '2', '3', '6', '7', '5', '4'],
        dateRange: 1,
        area: [],
        searchType: 0,
        title: ""
      },
      subGroupList: [], //订阅器
      subWorldList: [], //订阅词列表
      total: 0,
      showKeywordInput: false,
      inputVal: "",
      selection: [],
      shareModal: false,
      shareUser: [],
      message: "",
      indeterminate: false,
      checkAll: true,
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
  },
  created() {
    this.timeRange = timeRange.filter(col => col.value != -1)
    this.copyColumns = deepClone(this.columns);
    this.columns = this.columns.filter(col => col.title !== '行业' && col.title !== '进展阶段');
    this.init();
  },
  methods: {
    ...mapMutations(["setShowFreeMerber"]),
    init(){
      this.getMySubscribe();
    },
    //获取招采或拟在建订阅器列表
    async getMySubscribe(){
      let params = {
        pageNumber: 1,
        pageSize: 10,
        infoType: this.procurement == "1" ? "1000" : "2000",
      }
      let res = await getMySubscribe(params);
      const {success, result} = res;
      if (success){
        this.subGroupList = result.content;
        if (result.content.length){
          if (this.isFreeMember) {
            this.total =  5 - result.totalElements > 0? 5 - result.totalElements: 0;
          } else {
            this.total = this.procurement == "1" ? 10 - result.totalElements : 5 - result.totalElements;
          }
          this.subWorldList = this.subGroupList[0].keyword.split(' ');
          this.subWorldList = this.subWorldList.filter(col=>col != "");
          this.searchForm.title = this.subWorldList[0];
        } else {
          if (this.isFreeMember) {
            this.total = 5;
          } else {
            this.total = this.procurement == "1" ? 10  : 5 ;
          }
          this.subWorldList = [];
        }
        this.getMySub(1);
      }
    },
    //获取我的订阅
    async getMySub(flag){
      if (flag == 1){
        this.pageForm.pageNumber = 1;
      }
      this.loading = true;
      let params = {
        // createBy: "1436734411767904",
        createBy: JSON.parse(this.getStore("userInfo")).id,
        pageSize: this.pageForm.pageSize,
        pageNumber: this.pageForm.pageNumber,
        ...this.searchForm
      }
      if (this.subGroupList.length) params.dingyueId = this.subGroupList[this.activeIndex].id;
      params.infoType = params.infoType.join();
      if (this.procurement == 1){
        params.infoType = params.infoType?params.infoType:'1000'
      } else {
        params.infoType = params.infoType?params.infoType:'2000'
      }
      params.area = this.getAreaIds();
      if (params.title2) {
        params.title = params.title ? (params.title + ' ' + params.title2) : params.title2
      }
      delete params.title2;
      let res = await getMySub(params);
      const {success, result} = res;
      this.loading = false;
      if(success){
        this.tableData = result.content;
        this.pageForm.pageTotal = result.totalElements;
      }
    },
    //立即搜索
    searchSub(){
      //免费会员非提示付费 时间（近1月）超1月时间提示付费
      if (this.isFreeMember){
        if (this.procurement == '2'){
          this.$bus.$emit('setFreeGuidedWords', "subscrip")
          this.setShowFreeMerber(true);
          return
        }
      }
      this.getMySub(1);
    },
    //获取地区里面的ids
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
      if (this.searchForm.area.length){
        if (this.searchForm.area[0] == -1) return ""
        this.searchForm.area.forEach((item,index)=>{
          if (item > 0) {
            ids = !index? item : ids + ',' + item;
          } else {
            ids = !index? regionObj[item] : ids + ',' + regionObj[item];
          }
        })
      }
      return ids
    },
    //新增订阅
    addSubscrit(){
      if (this.isFreeMember){
        if (this.subGroupList.length >= 5 || this.procurement == '2') {
          this.$bus.$emit('setFreeGuidedWords', "subscrip")
          this.setShowFreeMerber(true);
          return
        }
      }
      this.$router.push({
        name: "addSub",
        params: { procurement: this.procurement },
      });
    },
    //修改订阅
    editSubscrit(){
      if (this.isFreeMember){
        if (this.procurement == '2') {
          this.$bus.$emit('setFreeGuidedWords', "subscrip")
          this.setShowFreeMerber(true);
          return
        }
      }
      this.$router.push({
        name: "editSub",
        params: { procurement: this.procurement },
      });
    },
    //切换招采和拟在建
    changeRrocurement(item) {
      if (this.isFreeMember){
        if (item == 2){
          this.$bus.$emit('setFreeGuidedWords', "subscrip")
          this.setShowFreeMerber(true);
          setTimeout(()=>{
            this.procurement = '1';
          })
          return
        }
      } else {
        this.procurement = item;
        this.indeterminate = false;
        this.checkAll = true;
        this.searchForm = {
          infoType: this.procurement == 1?['1', '2', '3', '6', '7', '5', '4']:['3030', '3020', '3110', '3120', '3050'],
          dateRange: 1,
          area: [],
          searchType: 0,
          title: ""
        }
        if (item == 1){
          this.columns = this.columns.filter(col => col.title !== '行业' && col.title !== '进展阶段');
        } else {
          this.columns = this.copyColumns;
        }
        this.getMySubscribe();
      }
    },
    setTags(index){
      this.activeIndex = index;
      this.subWorldList = this.subGroupList[index].keyword.split(' ');
      this.searchForm.title = this.subWorldList[0];
    },
    //添加关键词
    addKeyWord(){
      if (this.isFreeMember){
        if (this.subWorldList.length >= 5) {
          this.$bus.$emit('setFreeGuidedWords', "subscrip");
          this.setShowFreeMerber(true);
          return
        }
      }
      if (this.subWorldList.length >= 10) return this.$Message.info("最多只能添加10个订阅词");
      this.inputVal = "";
      this.showKeywordInput = !this.showKeywordInput;
    },
    //删除关键词
    removeKeyWord(){
      if (this.subWorldList.length<=1){
        return this.$Message.info("至少保留一个订阅关键词");
      }
      this.$Modal.confirm({
        title: "确认删除",
        content: "是否需要删除最后一个订阅词",
        onOk: () => {
          if (this.searchForm.title == this.subWorldList[this.subWorldList.length-1]){
            this.searchForm.title = this.subWorldList[0];
          }
          this.subWorldList.pop();
          if (this.subWorldList.length){
            this.subGroupList[this.activeIndex].keyword = this.subWorldList.join(" ");
            this.updateKeyWord();
          }
        }
      });
    },
    //确认添加关键词
    enterKeyWord(){
      if (!this.inputVal) return this.$Message.info("添加关键词不能为空");
      let isReapet = false;
      for ( let i=0; i<this.subWorldList.length; i++){
        if (this.inputVal == this.subWorldList[i]){
          isReapet = true;
          this.$Message.info("订阅关键词已添加请更换其他关键词");
          break;
        }
      }
      if (!isReapet) {
        this.subWorldList.push(this.inputVal);
        this.subGroupList[this.activeIndex].keyword = this.subWorldList.join(" ");
        this.updateKeyWord();
        this.showKeywordInput = !this.showKeywordInput;
      }
    },
    // 调用修改订阅器接口
    updateKeyWord(){
      let form = {
        id: "",
        name: "",
        keyword: "",
        keywordLogic: 1,
        excludeKeyword: "",
        infoType: "",
        searchRange: 0,
        area: "",
        isEmail: false,
        isWechat: false,
        isSms: false,
        isApp: false,
        dateRange: 1,
        type: "",
      }
      if (this.procurement == '2') {
        form.stage = "";
        form.primaryIndustry = "";
        form.secondaryIndustry = "";
      }
      let params = setAssignObj(form, this.subGroupList[this.activeIndex])
      putGroup(params).then((res) => {
        if (res.success) {
          this.$Message.success("保存成功");
        }
      });
    },
    //导出增量
    viewIncrement(){
      this.$router.push({
        name: "accountRegulate",
        params: { isTeam: true },
      });
    },
    //批量导出
    async exportSubInfo(){
      if (this.isFreeMember){
        this.$bus.$emit('setFreeGuidedWords', "feature")
        this.setShowFreeMerber(true);
        return
      }
      if (this.selection.length <= 0) {
        this.$Message.info("请勾选所需要导出的公告");
        return;
      }
      let ids = "";
      this.selection.forEach((item,index)=>{
        ids = !index? item.infoId : ids + ',' + item.infoId;
      })
      let params = {
        ids: ids
      }
      let res = await exportAnnouncement(params);
      const {success, result} = res;
      if(success){
        let title = result;
        this.$Message.success("导出公告成功")
        // downAnnouncement({
        //   path: result
        // }, title)
      }
    },
    handleSelectChange(selection){
      this.selection = selection;
    },
    //批量收藏
    collectSubInfo(){
      if (this.selection.length === 0) {
        this.$Message.warning("未选择需要收藏的公告信息");
        return
      }
      let collectionList = this.selection.map((item,index) =>{
        let typeValue = setProjectType(item);
        let collection = {
          type: typeValue.num,
          infoId: item.infoId,
          name: item.title,
          url: item.webUrl,
        };
        return collection;
      })
      collectMailSub({
        array: JSON.stringify(collectionList)
      }).then((res) => {
        if (res.success) {
          this.$Message.success("收藏成功");
        }
      });
    },
    //批量分享
    shareSubInfo(){
      if (this.isFreeMember){
        this.$bus.$emit('setFreeGuidedWords', "feature")
        this.setShowFreeMerber(true);
        return
      }
      if (this.selection.length <= 0) {
        this.$Message.info("请勾选您所需要分享的公告");
        return;
      }
      this.message = "";
      this.shareUser = [];
      this.shareModal = true;
    },
    handleClose(){
      this.shareModal = false;
    },
    handleOk(){
      if (this.shareUser.length == 0) {
        this.$Message.warning("请先选择分享人");
      } else {
        let params = this.selection.map(item=>{
          let obj = {
            createSend: false,
            delFlag: 0,
            range: 1,
            type: "信息分享",
          };
          let content = {
            message: this.message,
            searchData: {},
          }
          content.url = item.webUrl;
          obj.content = JSON.stringify(content);
          let titleObj = setProjectType(item);
          obj.title = `【${titleObj.type}】 ${item.title}`;
          obj.infoId = item.infoId;
          obj.userIds = this.shareUser;
          return obj
        })
        setShare({
          array: JSON.stringify(params)
        }).then(res=>{
          if (res.success){
            this.shareModal = false;
            this.$Message.success("分享成功");
          }
        })
      }
    },
    //切换分页
    pageChange(){
      this.getMySub();
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
        this.searchForm.infoType = this.procurement == 1?['1', '2', '3', '6', '7', '5', '4']:['3030', '3020', '3110', '3120', '3050'];
      } else {
        this.searchForm.infoType = [];
      }
    },
    checkAllGroupChange(data){
      if (data.length === 7 && this.procurement == 1) {
        this.indeterminate = false;
        this.checkAll = true;
      } else if (data.length === 5 && this.procurement == 2) {
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
.browse {
  .browseCont {
    border-top-left-radius: 0 0;
    margin-right: 10px;
    //height: 1000px;
    .list {
      .column_title {
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #999999;
        display: inline-block;
        width: 90px;
      }
      .columm_type {
        height: 33px;
        width: 100%;
        overflow: hidden;
        margin-bottom: 10px;
        vertical-align: middle;
        li {
          display: inline-block;
          margin-right: 10px;
          height: 25px;
          font-size: 14px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #333333;
        }
        .prompt {
          width: 26px;
          vertical-align: middle;
        }
      }
      .addSubscriber {
        overflow: inherit;
        height: 33px;
        border-bottom: 1px dashed #E8E8E8;
        position: relative;
        .tags {
          display: inline-block;
          height: 22px;
          margin: 2px 4px 2px 0;
          padding: 0 8px;
          border: 1px solid #adc6ff;
          border-radius: 3px;
          font-size: 12px;
          vertical-align: middle;
          opacity: 1;
          overflow: hidden;
          line-height: 20px;
          background: #f0f5ff;
          cursor: pointer;
          max-width: 100px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #1890ff;
          span {
            color: #1890ff;
          }
        }
        .activeTag {
          background: #2d8cf0;
          color: #ffffff;
          span {
            color: #ffffff;
          }
        }
        .right_btn {
          position: absolute;
          right: 0;
          bottom: 5px;
        }
      }
      .editSub {
        height: 33px;
        position: relative;
        .addColumnText {
          display: inline-block;
          text-align: center;
          vertical-align: middle;
          width: 81px;
          height: 25px;
          line-height: 23px;
          border-radius: 2px;
          border: 1px dashed #D0D0D0;
          font-size: 13px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #999999;
          cursor: pointer;
        }
        .right_btn {
          text-align: center;
          line-height: 31px;
          color: #3F6EF5;
          background: transparent;
          width: 88px;
          height: 33px;
          border-radius: 4px;
          border: 1px solid #3F6EF5;
          position: absolute;
          right: 0;
          top: 0px;
          cursor: pointer;
        }
      }
      .search {
        position: relative;
        margin-bottom: 10px;
        .searchSelect {
          margin-right: 12px;
        }
        .searchBtn {
          position: absolute;
          right: 0;
          top: 0;
          .ivu-input-wrapper {
            width: 300px;
          }
          .ivu-btn {
            width: 100px;
            margin-left: 20px;
          }
        }
      }
    }
  }
  .card {
    margin-right: 10px;
  }

  .total {
    display: inline-block;
    height: 34px;
    line-height: 32px;
  }
  .list_btn {
    float: right;
    .right_btn {
      width: 100px;
      margin-left: 20px;
      padding: 0;
    }
  }
  .my-table {
    margin-top: 10px;
    /deep/ .ivu-table-header {
      th {
        background: #EDF2FF;
        height: 50px;
      }
      //.ivu-table-cell-with-selection::after {
      //  content: '全选';
      //  position: absolute;
      //  top: 9px;
      //  left: 42px;
      //}
    }
  }
  .my-page {
    margin-top: 20px;
    margin-bottom: 30px;
    text-align: center;
  }
}

/deep/ .vue-treeselect__control{
  height: 33px;
}


</style>
