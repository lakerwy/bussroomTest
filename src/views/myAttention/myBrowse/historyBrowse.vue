<template>
  <div class="browse">
    <div class="myteam" v-if="isAdmin">
      <span :class="!isTeam?'active':''" @click="setMyTeam(0)">我的</span>
      <span :class="isTeam?'active':''" @click="setMyTeam(1)">我的团队</span>
    </div>
    <div class="myteam" v-if="!isAdmin">
      <span class="active">我的</span>
    </div>
    <Card class="card browseCont">
      <Tabs class="myTabs" v-model="procurement" @on-click="changeRrocurement">
        <TabPane label="招标与采购" name="1"></TabPane>
        <TabPane label="拟在建项目" name="2"></TabPane>
      </Tabs>
      <div class="search">
        <div class="search_main">
          <div class="formining" v-show="procurement==1">
            <h3>筛选条件：</h3>
            <ul class="columm_type">
<!--              <RadioGroup v-model="searchForm.infoType">-->
<!--                <span>栏目类型：</span>-->
<!--                <li v-for="(item,index) in columnType" :key="index"><Radio :label="item.value">{{ item.label }}</Radio></li>-->
<!--              </RadioGroup>-->
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
            <ul class="columm_type">
              <RadioGroup v-model="searchForm.searchType">
                <span>搜索范围：</span>
                <li v-for="(item,index) in searchScope" :key="index">
                  <Radio :label="item.id">{{ item.name }}</Radio>
                </li>
              </RadioGroup>
            </ul>
            <ul class="columm_type">
              <span style="display: inline-block; vertical-align: top; line-height: 34px">地区范围：</span>
              <li>
                <treeselect
                    style="width: 412px"
                    v-model="searchForm.area"
                    :multiple="true"
                    :options="options"
                    :default-expand-level="2"
                    :isDefaultExpanded="true"
                    placeholder="全部地区"
                />
              </li>
            </ul>
            <ul class="columm_type">
              <RadioGroup v-model="searchForm.dateRange" @on-change="changeRange">
                <span>时间范围：</span>
                <li v-for="(item,index) in timeRange" :key="index">
                  <Radio :label="item.value">{{ item.label }}</Radio>
                </li>
              </RadioGroup>
              <DatePicker
                  class="datePicker"
                  v-show="searchForm.dateRange == -1"
                  type="daterange"
                  :options="dateOption"
                  transfer
                  placement="bottom-end"
                  placeholder="选择日期"
                  @on-change="pickDate"
                  v-model="dateArr"
              ></DatePicker>
            </ul>
            <ul class="columm_type column_input">
              搜索词：
              <li>
                <Input style="width: 400px" v-model="searchForm.title" placeholder="请输入关键词" />
              </li>
            </ul>
          </div>
          <div class="building" v-show="procurement==2">
            <h3>筛选条件：</h3>
            <ul class="columm_type">
<!--              <RadioGroup v-model="searchForm.infoType">-->
<!--                <span>栏目类型：</span>-->
<!--                <li v-for="(item,index) in columnType2" :key="index"><Radio :label="item.value">{{ item.label }}</Radio></li>-->
<!--              </RadioGroup>-->
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
            <ul class="columm_type">
              <RadioGroup v-model="searchForm.searchType">
                <span>搜索范围：</span>
                <li v-for="(item,index) in searchScope" :key="index">
                  <Radio :label="item.id">{{ item.name }}</Radio>
                </li>
              </RadioGroup>
            </ul>
<!--            <ul class="columm_type">-->
<!--              <RadioGroup v-model="searchForm.category1">-->
<!--                <span>行业类型：</span>-->
<!--                <li v-for="(item,index) in industryType" :key="index">-->
<!--                  <Radio :label="item.value">{{ item.label }}</Radio>-->
<!--                </li>-->
<!--              </RadioGroup>-->
<!--            </ul>-->
<!--            <ul class="columm_type">-->
<!--              <RadioGroup v-model="searchForm.stage">-->
<!--                <span>进展阶段：</span>-->
<!--                <li v-for="(item,index) in developmentPhase" :key="index">-->
<!--                  <Radio :label="item.value">{{ item.label }}</Radio>-->
<!--                </li>-->
<!--              </RadioGroup>-->
<!--            </ul>-->
            <ul class="columm_type">
              <span style="display: inline-block; vertical-align: top; line-height: 34px">地区范围：</span>
              <li>
                <treeselect
                    style="width: 412px"
                    v-model="searchForm.area"
                    :multiple="true"
                    :options="options"
                    :default-expand-level="2"
                    :isDefaultExpanded="true"
                    placeholder="全部地区"
                />
              </li>
            </ul>
            <ul class="columm_type">
              <RadioGroup v-model="searchForm.dateRange" @on-change="changeRange">
                <span>时间范围：</span>
                <li v-for="(item,index) in timeRange" :key="index">
                  <Radio :label="item.value">{{ item.label }}</Radio>
                </li>
              </RadioGroup>
              <DatePicker
                  class="datePicker"
                  v-show="searchForm.dateRange == -1"
                  type="daterange"
                  :options="dateOption"
                  transfer
                  placement="bottom-end"
                  placeholder="选择日期"
                  @on-change="pickDate"
                  v-model="dateArr"
              ></DatePicker>
            </ul>
            <ul class="columm_type column_input ">
              搜索词：
              <li>
                <Input style="width: 400px" v-model="searchForm.title" placeholder="请输入关键词" />
              </li>
            </ul>
          </div>
          <Button class="column_btn" type="primary" @click="getZtbSearch">立即搜索</Button>
          <Button class="column_btn" @click="clearSearchValue" >清空搜索条件</Button>
        </div>
      </div>
      <div class="list">
        <h3>浏览结果</h3>
        <span>共 {{ pageForm.pageTotal }} 条</span>
        <Button v-if="!isAdmin" @click="viewIncrement" style="margin-left: 30px; width: 100px" type="primary">浏览增量</Button>
        <div class="list_btn">
          <Button class="right_btn" @click="exportDetail"><Icon style="font-size: 18px;margin-right: 5px" type="ios-download-outline" />导出</Button>
          <Button class="right_btn" @click="handleShare"><Icon style="font-size: 18px;margin-right: 5px" type="ios-share-alt-outline" />分享</Button>
          <Button class="right_btn" @click="handleCollect"><Icon style="font-size: 18px;margin-right: 5px" type="ios-star-outline" />收藏</Button>
          <Button class="right_btn" @click="handleRemoveCollect">取消收藏</Button>
        </div>
        <div style="clear: both"></div>
        <Table class="my-table" :columns="columns" :data="tableData" @on-selection-change="handleSelectChange" :loading="loadingFlag">
          <template slot-scope="{ row }" slot="title">
            <ReadTitle :url="'https://'+ row.webUrl" :title="row.title" :id="row.infoId"></ReadTitle>
          </template>
        </Table>
        <Page
            v-if="tableData.length"
            class="my-page"
            :current.sync="pageForm.pageNumber"
            :total="pageForm.pageTotal"
            :page-size="pageForm.pageSize"
            show-elevator
            @on-change="getZtbSearch"
        />
      </div>
    </Card>
    <ShareModal v-if="shareModal" :message.sync="message" :shareUser.sync="shareUser" @handleOk="handleOk" @handleClose="handleClose"></ShareModal>
  </div>
</template>

<script>
import {
  downAnnouncement,
} from "@/api/myAttention";
import { deepClone, setProjectType, filterDict, dateFormat } from "@/utils/utils.js";
import { columnType, informationType, timeRange, projectPhase, areaData, category1Data, regionData } from "@/utils/const/attention";
import { ShareModal, ReadTitle } from "@/components/contentBox/index.js"
import {mapMutations, mapState} from "vuex";

import {
  getMyVisit,
  saveCollection,
  removeCollection,
  collectMailSub,
  removeCollect,
  exportAnnouncement,
  setShare
} from "@/api_new/myAttention";

export default {
  name: "index",
  components: {
    ShareModal,
    ReadTitle
  },
  data(){
    return{
      loadingFlag: false,
      isTeam: 0, //0 我的 1 我的团队
      procurement: '1',
      columnType: columnType,
      columnType2: informationType,
      dateOption: {
        disabledDate(date) {
          return date.valueOf() > Date.now() || date.valueOf() < Date.now() - 31536000000;
        },
      },
      dateArr: ["", ""],
      searchScope: [
        {id: 1, name: '标题'},
        {id: 0, name: '内容'},
        {id: 3, name: '招标编号'},
      ],
      industryType: category1Data,
      developmentPhase: projectPhase,
      options: regionData, //地区
      timeRange: timeRange,
      withOr: [
        {id: 1, name: '与关系'},
        {id: 0, name: '或关系'}
      ],
      columns: [
        {
          type: 'selection',
          width: 80,
          align: 'left'
        },
        {
          title: "标题",
          align: "center",
          minWidth: 500,
          slot: "title",
        },
        {
          title: "信息类型",
          align: "center",
          minWidth: 80,
          sortable: true,
          render: (h, params)=>{
            let obj = setProjectType(params.row)
            return (<strong class="area" >{obj.type}</strong>)
          }
        },
        {
          title: "收藏",
          align: "center",
          key: "isCollected",
          minWidth: 80,
          sortable: true,
          render: (h,params)=>{
            let temp;
            if (params.row.isCollected != '0') {
              temp = <Icon style="cursor: pointer; font-size: 20px; color: rgb(45, 140, 240)" type="ios-star" onClick={() => this.changeShare(params)} />
            } else {
              temp = <Icon style="cursor: pointer; font-size: 20px" type="ios-star-outline" onClick={() => this.changeShare(params)} />
            }
            return (temp)
          }
        },
        {
          title: "行业",
          align: "center",
          minWidth: 90,
          render: (h,params)=>{
            let category = filterDict(params.row.numa, category1Data, {labelKey: 'label', valueKey: 'value'});
            return (
                <div>{category?category:''}</div>
            )
          }
        },
        {
          title: "阶段",
          align: "center",
          minWidth: 90,
          render: (h,params)=>{
            let classb_id = filterDict(params.row.classbId, projectPhase, {labelKey: 'label', valueKey: 'value'});
            return (
                <div>{classb_id?classb_id:''}</div>
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
          minWidth: 100,
          sortable: true,
          render: (h,params)=>{
            let date = dateFormat(new Date(params.row.publishDate), "yyyy-MM-dd")
            return (
                <div>{date}</div>
            )
          }
        },
        {
          title: "访问时间",
          key: "createTime",
          align: "center",
          minWidth: 100,
          sortable: true,
          render: (h,params)=>{
            let date = dateFormat(new Date(params.row.createTime), "yyyy-MM-dd")
            return (
                <div>{date}</div>
            )
          }
        },
        {
          title: "访问人",
          key: "name",
          align: "center",
          minWidth: 100,
          filters: [
            {
              label: '小王',
              value: 1
            },
            {
              label: '小马',
              value: 2
            },
            {
              label: '小刘',
              value: 2
            },
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            return row.name == value
          }
        },
      ],
      tableData: [],
      copyColumns: [],
      selection: [],
      pageForm: {
        pageNumber: 1, // 当前页数
        pageTotal: 0,
        pageSize: 10,
      },
      searchForm: {
        infoType: ['1', '2', '3', '6', '7', '5', '4'], //信息类型
        searchType: 0,
        area: [],
        dateRange: 1, //日期范围
        title: "", //搜索标题
        type: 0, //0个人1团队
      },
      shareModal: false,
      message: "",
      shareUser: [],
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
    ...mapState(["teamUserName"]),
  },
  created() {
    if (this.$route.params.isTeam){
      this.isTeam = this.$route.params.isTeam;
      this.searchForm.type = this.$route.params.isTeam;
    }
    this.copyColumns = deepClone(this.columns);
    this.columns = this.columns.filter(col => col.title !== '访问人' && col.title !== '阶段' && col.title !== '行业');
    this.init();
  },
  methods: {
    ...mapMutations(["setShowFreeMerber"]),
    init(){
      this.getZtbSearch();
    },
    // 招标与采购查询 和拟在建查询
    async getZtbSearch(flag){
      if (flag == 1){
        this.pageForm.pageNumber = 1;
      }
      let params = {
        ...this.searchForm,
        pageNumber: this.pageForm.pageNumber,
        pageSize: this.pageForm.pageSize,
        createBy: JSON.parse(this.getStore("userInfo")).id,
      }

      //免费会员非提示付费 时间（近1月）超1月时间提示付费
      if (this.isFreeMember){
        if (![0,1,2,3].includes(params.dateRange)){
          this.$bus.$emit('setFreeGuidedWords', "feature")
          this.setShowFreeMerber(true);
          return
        }
      }

      params.infoType = params.infoType.join();
      if (this.procurement == '1'){
        params.infoType = params.infoType ? params.infoType : '1000';
      } else {
        params.infoType = params.infoType ? params.infoType : '2000';
      }
      if (params.dateRange == -1) {
        delete params.dateRange;
      }
      params.area = this.getAreaIds();
      this.loadingFlag = true;
      this.tableData = [];
      let res = await getMyVisit(params);
      const {success, result} = res;
      this.loadingFlag = false;
      if(success && result){
        console.log(result)
        this.tableData = result.content;
        this.pageForm.pageTotal = result.totalElements;
      }
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
    //清空搜索条件
    clearSearchValue(){
      debugger
      this.dateArr = ["",""];
      this.indeterminate = false;
      this.checkAll = true;
      if (this.procurement == '1'){
        this.searchForm = {
          infoType: ['1', '2', '3', '6', '7', '5', '4'], //信息类型
          searchType: 0,
          area: [],
          dateRange: 1, //日期范围
          title: "", //搜索标题
          type: 0, //0个人1团队
        }
      } else {
        this.searchForm = {
          infoType: ['3030', '3020', '3110', '3120', '3050'], //信息类型
          searchType: 0,
          area: [],
          dateRange: 1, //日期范围
          title: "", //搜索标题
          type: 0, //0个人1团队
        }
      }
    },
    //表格选中
    handleSelectChange(selection){
      this.selection = selection;
    },
    //收藏与取消收藏
    changeShare(params) {
      let obj = setProjectType(params.row);
      // 收藏
      if (params.row.isCollected =="0") {
        saveCollection({
          infoId: params.row.id,
          name: params.row.title,
          url: params.row.url,
          type: obj.num,
        }).then(res => {
          if (res.success) {
            this.$set(this.tableData[params.index], 'isCollected', res.result.id)
            this.$Message.success("收藏成功")
          }
        })
      } else {
        removeCollection({
          // id: params.row.id,
          id: params.row.isCollected
        }).then(res => {
          if (res.success) {
            this.tableData[params.index].isCollected = "0";
            this.$Message.success("取消收藏成功")
          }
        })
      }

    },
    //导出功能
    async exportDetail(){
      if (this.isFreeMember){
        this.$bus.$emit('setFreeGuidedWords', "feature")
        this.setShowFreeMerber(true);
        return
      }
      if (this.selection.length <= 0) {
        this.$Message.info("请选择需要导出的公告");
        return;
      }
      let ids = "";
      this.selection.forEach((item,index)=>{
        ids = !index? item.infoId : ids + ',' + item.infoId;
      })
      let params = {
        // ids: "2209186137"
        ids: ids
      }
      let res = await exportAnnouncement(params);
      const {success, result} = res;
      if(success){
        this.$Message.success("导出公告成功")
        // let title = "导出明细.xlsx"
        // downAnnouncement({
        //   path: result
        // }, title)
      }
    },
    //批量收藏功能
    handleCollect() {
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
          url: item.url,
        };
        return collection;
      })
      collectMailSub({
        array: JSON.stringify(collectionList)
      }).then((res) => {
        if (res.success) {
          this.$Message.success("收藏成功");
          this.selection = [];
          this.getZtbSearch();
        }
      });
    },
    //批量移除收藏
    handleRemoveCollect(){
      if (this.selection.length === 0) {
        this.$Message.warning("未选择需要取消收藏的公告信息");
        return
      }
      let ids = [];
      this.selection.forEach((item,index)=>{
        if (item.isCollected !== '0') ids.push(item.isCollected);
      })
      if (ids.length <= 0 ){
        this.$Message.warning("未选择已收藏的公告信息");
        return
      }
      let params = {
        // ids: "2209186137"
        ids: ids
      }
      removeCollect(params).then((res)=>{
        if (res.success) {
          this.$Message.success("取消收藏成功");
          this.selection = [];
          this.getZtbSearch();
        }
      })
    },
    pickDate(arr) {
      this.searchForm.startTime = this.formatDate(new Date(arr[0]));
      this.searchForm.endTime = this.formatDate(new Date(arr[1]));
      console.log(this.searchForm);
    },
    changeRange() {
      if (this.searchForm.startTime){
        delete this.searchForm.startTime;
        delete this.searchForm.endTime;
      }
      this.dateArr = ["", ""];
    },
    formatDate(date) {
      return (
          date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
      );
    },
    //切换我的和我的团队
    setMyTeam(e){
      if (this.isFreeMember && e){
        this.$bus.$emit('setFreeGuidedWords', "myTeam")
        this.setShowFreeMerber(true);
        return
      }
      this.isTeam = e;
      this.searchForm.type = e;
      if (!this.isTeam) {
        this.columns = this.columns.filter(col => col.title !== '访问人' )
      } else {
        this.setNickName();
        this.columns = this.copyColumns;
      }
      if (this.procurement == 1){
        this.columns = this.columns.filter(col =>  col.title !== '阶段' && col.title !== '行业');
      }
      this.getZtbSearch();
    },
    setNickName(){
      let temp = this.teamUserName.map(item=>{
        return {
          label: item.nickName,
          value: item.nickName,
        }
      })
      this.copyColumns[9].filters = temp;
    },
    //切换招采和拟在建
    changeRrocurement(item) {
      this.procurement = item;
      this.clearSearchValue();
      if (item == 1){
        this.columns = this.columns.filter(col =>  col.title !== '阶段' && col.title !== '行业');
      } else {
        this.columns = this.copyColumns;
      }
      if (!this.isTeam) {
        this.columns = this.columns.filter(col => col.title !== '访问人' )
      }
      this.getZtbSearch(1);
    },
    //分享
    handleShare(){
      if (this.isFreeMember){
        this.$bus.$emit('setFreeGuidedWords', "feature")
        this.setShowFreeMerber(true);
        return
      }
      if (this.selection.length <= 0) {
        this.$Message.info("请勾选您所需要分享的公告");
        return;
      }
      this.shareModal = true;
      this.message = "";
      this.shareUser = [];
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
          content.url = 'https://'+ item.webUrl;
          obj.content = JSON.stringify(content);
          let titleObj = setProjectType(item);
          obj.title = `【${titleObj.type}】 ${item.title}`;
          obj.infoId = item.id;
          obj.userIds = this.shareUser;
          return obj
        })
        console.log(params);
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
    //浏览增量
    viewIncrement(){
      this.$router.push({
        name: "accountRegulate",
        params: { isTeam: true },
      });
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
  .myteam {
    span{
      font-size: 16px;
      font-family: "Microsoft YaHei-Regular";
      width: 105px;
      text-align: center;
      display: inline-block;
      padding: 5px 15px;
      background: #F1F1F1;
      color: #999999;
      //margin-right: 10px;
      border-radius: 2px;
      border-bottom-left-radius: 0 0;
      border-bottom-right-radius: 0 0;
      cursor: pointer;
    }
    .active {
      border-top: 2px solid #83A1F8;
      background: white;
      color: #2F77FF;
    }
  }
  .browseCont {
    border-top-left-radius: 0 0;
    margin-right: 10px;
    min-height: calc(100vh - 190px);
    //height: 1000px;

    .search {
      display: flex;
      .search_main {
        font-size: 15px;
        //height: 362px;
        width: 100%;
        border: 1px solid #E8E8E8;
        border-radius: 4px;
        padding: 10px 0 15px 30px;
        h3 {
          font-size: 16px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #333333;
        }
        .columm_type {
          font-size: 14px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #999999;
          margin: 9px 0;
          line-height: 25px;
          width: 100%;
          //overflow: hidden;
          li {
            font-size: 14px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #333333;
            display: inline-block;
            margin-right: 10px;
            height: 25px;
            .input {
              width: 65px;
              /deep/ .ivu-input{
                height: 23px;
              }
            }
          }
          .prompt {
            width: 26px;
            vertical-align: middle;
          }
        }
        .formining {
          margin-bottom: 15px;
        }
        .building {
          margin-bottom: 10px;
          .columm_type {
            //height: 24px;
            margin: 6px 0;
          }
          .column_input {
            //height: 25px;
          }
        }
        .column_btn {
          margin-right: 20px;
        }
      }
    }
    .list {
      h3{
        margin-top: 20px;
        margin-bottom: 10px;
      }
      .list_btn {
        float: right;
        .right_btn {
          width: 100px;
          margin-left: 20px;
        }
      }
      .my-page {
        margin-top: 20px;
        margin-bottom: 30px;
        text-align: center;
      }
    }
  }
}


</style>