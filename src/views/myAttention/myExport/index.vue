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
        <TabPane label="导出记录" name="1"></TabPane>
        <TabPane label="导出明细" name="2"></TabPane>
      </Tabs>
      <div class="list" v-if="procurement==1">
        <div class="my-explain"><Icon class="icon" type="ios-information-circle-outline" />导出文件7日内可以重复下载，过期后将无法重复下载，需要重新选择公告导出</div>
        <div class="timeRange">
          <span>时间范围：</span>
          <RadioGroup v-model="timeRangeValue" @on-change="changeRange">
            <span class="mr-20" v-for="(item,index) in timeRange" :key="index">
              <Radio :label="item.value">{{item.label}}</Radio>
            </span>
          </RadioGroup>
          <DatePicker
              class="datePicker"
              v-show="timeRangeValue == -1"
              type="daterange"
              :options="dateOption"
              transfer
              placement="bottom-end"
              placeholder="选择日期"
              @on-change="pickDate"
              v-model="dateArr"
          ></DatePicker>
          <Button class="column_btn" type="primary" @click="getMyExport(1)">立即搜索</Button>
        </div>
        <div class="list_btn">
          <Button v-if="!isAdmin" @click="viewIncrement" class="right_btn" type="primary">导出增量</Button>
        </div>
        <div style="clear: both"></div>
        <Table class="my-table" :columns="columns" :data="tableData"></Table>
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
      <div class="subsidiary" v-if="procurement==2">
        <div class="sub-btn">
          <ButtonGroup>
            <Button :class="biddingConstruct==1?'active':''" @click="changeSubsidiary(1)">招标与采购</Button>
            <Button :class="biddingConstruct==2?'active':''" @click="changeSubsidiary(2)">拟在建项目</Button>
          </ButtonGroup>
          <div class="float-btn">
            <Button type="primary" @click="exportDetail"><Icon style="font-size: 18px;margin-right: 5px" type="ios-download-outline" />导出</Button>
            <Button @click="handleCollect"><Icon style="font-size: 18px;margin-right: 5px" type="md-heart-outline" />收藏</Button>
          </div>
        </div>
        <div style="clear: both"></div>
        <Table class="my-table" :columns="columns2" :data="tableData" :loading="loadingFlag" @on-selection-change="handleSelectChange">
        </Table>
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
  </div>
</template>

<script>
import { deepClone, filterDict, setProjectType } from "@/utils/utils.js";
import {infoTypeList, timeRange, category1Data} from "@/utils/const/attention";
import {mapMutations, mapState} from "vuex";
import {downAnnouncement} from "@/api/myAttention";

import {
  collectMailSub,
  exportAnnouncement,
  getMyExport,
  getMyExportDetail
} from "@/api_new/myAttention";

export default {
  name: "index",
  data(){
    return{
      loadingFlag: false,
      isTeam: 0,
      procurement: '1',
      biddingConstruct: 1,
      timeRangeValue: 1,
      timeRange: timeRange,
      dateArr: ["", ""],
      dateOption: {
        disabledDate(date) {
          return date.valueOf() > Date.now() || date.valueOf() < Date.now() - 31536000000;
        },
      },
      columns: [
        {
          title: "导出日期",
          align: "center",
          minWidth: 120,
          key: "createTime",
        },
        {
          title: "成功导出条数",
          align: "center",
          minWidth: 120,
          key: "count",
        },
        {
          title: "导出格式",
          align: "center",
          minWidth: 120,
          key: "path",
          render:(h,params) => {
            let path = params.row.path;
            return (
                <span>{path?path.slice(path.indexOf('.')+1):''}</span>
            )
          }
        },
        {
          title: "状态",
          key: "invalid",
          align: "center",
          minWidth: 120,
          render:(h,params) => {
            return(
                <span style={{color: params.row.invalid == 1 ? '#1CBD75' : '#FF0000'}}>
                  {params.row.invalid == 1?'成功':'失败'}
                </span>
            )
          }
        },
        {
          title: "导出人",
          key: "name",
          align: "center",
          minWidth: 120,
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
        {
          title: "导出内容说明",
          align: "center",
          minWidth: 300,
          key: "title"
        },
        {
          title: "操作",
          align: "center",
          minWidth: 120,
          render:(h,params) => {
            return(
                <div class="operaBtn">
                  <span onClick={()=>this.downloadInfo(params)}>下载</span>
                </div>
            )
          }
        },
      ],
      columns2: [
        {
          type: 'selection',
          width: 80,
          align: 'left'
        },
        {
          title: "标题",
          align: "center",
          minWidth: 400,
          key: "title",
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
          minWidth: 90,
          sortable: true,
          key: "infoType",
          render: (h, params) => {
            let value = filterDict(params.row.infoType, infoTypeList, {labelKey: 'label', valueKey: 'value'})
            return (
                <div>{value}</div>
            )
          }
        },
        {
          title: "行业",
          align: "center",
          minWidth: 120,
          key: "numa",
          render: (h,params)=>{
            let category = parseInt(params.row.numa) < 1 || parseInt(params.row.numa) > 18 ? '未知' : filterDict(parseInt(params.row.numa), category1Data, {
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
          minWidth: 90,
          key: "areaName",
          sortable: true,
        },
        {
          title: "发布时间",
          key: "publishDate",
          align: "center",
          minWidth: 120,
          sortable: true,
        },
        {
          title: "导出时间",
          key: "createTime",
          align: "center",
          minWidth: 120,
          sortable: true,
        },
        {
          title: "导出人",
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
          filterMethod: (value, row) => {
            return row.name == value
          }
        },
      ],
      copyColumns: [],
      copyColumns2: [],
      tableData: [],
      selection: [], //勾选选项
      pageForm: {
        pageNumber: 1, // 当前页数
        pageTotal: 100,
        pageSize: 10,
      },
      searchData: {
        infoType: 1000, //招标与采购1000，拟在建2000
        type: 0, //0个人，1团队
      },
      searchForm: {

      }
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
    this.copyColumns2 = deepClone(this.columns2);
    this.columns = this.columns.filter(col => col.key !== 'name' );
    this.columns2 = this.columns2.filter(col => col.key !== 'name' && col.title !== '行业' );
    this.init();
  },
  methods: {
    ...mapMutations(["setShowFreeMerber"]),
    init(){
      this.getMyExport();
    },
    //我的导出
    async getMyExport(flag){
      if (flag == 1){
        this.pageForm.pageNumber = 1;
      }
      let params = {
        pageNumber: this.pageForm.pageNumber,
        pageSize: this.pageForm.pageSize,
        dateRange: this.timeRangeValue,
        type: this.searchData.type,
        order: "desc",
        sort: "createTime",
        ...this.searchForm
      }
      this.loadingFlag = true;
      this.tableData = [];
      let res = await getMyExport(params);
      const {success, result} = res;
      this.loadingFlag = false;
      if(success && result){
        console.log(result)
        this.tableData = result.content;
        this.pageForm.pageTotal = result.totalElements;
      }
    },
    downloadInfo(params){
      if (this.isFreeMember){
        this.$bus.$emit('setFreeGuidedWords', "feature")
        this.setShowFreeMerber(true);
        return
      }
      // 7天604800000
      let createTime = new Date(params.row.createTime).getTime();
      if ((createTime + 604800000) < new Date().getTime()){
        this.$Message.warning("导出文件超过7日无法重复下载，需要重新选择公告导出");
        return
      }
      // let ids = params.row.ids.replace(/(\[|\])/g,"");
      // this.downloadCom(ids);
      let title = params.row.path;
      this.$Message.success("导出公告成功")
      // downAnnouncement({
      //   path: params.row.path
      // }, title)
    },
    //我的导出明细
    async getMyExportDetail(flag){
      if (flag == 1){
        this.pageForm.pageNumber = 1;
      }
      let params = {
        pageNumber: this.pageForm.pageNumber,
        pageSize: this.pageForm.pageSize,
      }
      this.loadingFlag = true;
      this.tableData = [];
      let res = await getMyExportDetail(Object.assign(params,this.searchData));
      const {success, result} = res;
      this.loadingFlag = false;
      if(success && result){
        console.log(result)
        this.tableData = result.content;
        this.pageForm.pageTotal = result.totalElements;
      }
    },
    //导出功能
    async exportDetail(){
      if (this.isFreeMember){
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
      this.downloadCom(ids);
    },
    async downloadCom(ids){
      let params = {
        // ids: "2209186137"
        ids: ids
      }
      let res = await exportAnnouncement(params);
      const {success, result} = res;
      if(success){
        // let title = "导出明细.xlsx"
        let title = result;
        this.$Message.success("导出公告成功")
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
          url: item.webUrl,
        };
        return collection;
      })
      collectMailSub({
        array: JSON.stringify(collectionList)
      }).then((res) => {
        if (res.success) {
          this.$Message.success("收藏成功");
          // this.selection = [];
        }
      });
    },
    handleSelectChange(selection) {
      this.selection = selection;
    },
    setMyTeam(e){
      this.isTeam = e;
      this.searchData.type = e;
      if(!e) {
        this.columns = this.columns.filter(col => col.key !== 'name' )
        this.columns2 = this.columns2.filter(col => col.key !== 'name' )
      } else {
        this.setNickName();
        this.columns = this.copyColumns;
        this.columns2 = this.copyColumns2;
      }
      if (this.biddingConstruct == 1){
        this.columns2 = this.columns2.filter(col => col.title !== '行业' )
      }
      if (this.procurement == 1){
        this.getMyExport(1)
      } else {
        this.getMyExportDetail(1);
      }
    },
    setNickName(){
      let temp = this.teamUserName.map(item=>{
        return {
          label: item.nickName,
          value: item.nickName,
        }
      })
      this.copyColumns[4].filters = temp;
      this.copyColumns2[7].filters = temp;
    },
    changeRrocurement(item) {
      this.procurement = item;
      if (this.procurement == 1){
        this.getMyExport(1)
      } else {
        this.getMyExportDetail(1);
      }
    },
    changeSubsidiary(e){
      this.biddingConstruct = e;
      if(e == 1){
        this.columns2 = this.columns2.filter(col => col.title !== '行业' );
      } else {
        this.columns2 = this.copyColumns2;
      }
      if(!this.isTeam){
        //我的
        this.columns2 = this.columns2.filter(col => col.key !== 'name' );
      }
      this.searchData.infoType = e == 1 ? 1000 : 2000;
      this.getMyExportDetail();
    },
    pickDate(arr) {
      this.searchForm.startTime = this.formatDate(new Date(arr[0]));
      this.searchForm.endTime = this.formatDate(new Date(arr[1]));
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
    pageChange(){
      if (this.procurement == 1){
        this.getMyExport();
      } else {
        this.getMyExportDetail();
      }
    },
    //导出增量
    viewIncrement(){
      this.$router.push({
        name: "accountRegulate",
        params: { isTeam: true },
      });
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
    //height: calc(100vh - 190px);
    //height: 1000px;

    .list {
      .timeRange {
        margin-top: 10px;
        display: inline-block;
        line-height: 34px;
        height: 34px;
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #999999;
        .mr-20 {
          display: inline-block;
          margin-right: 20px;
          font-size: 14px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #333333;
        }
      }
      .list_btn {
        margin-top: 10px;
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
    .subsidiary {
      .sub-btn {
        width: 100%;
        padding-bottom: 15px;
        .ivu-btn {

        }
      }
      .float-btn {
        //margin: 10px 0;
        float: right;
        .ivu-btn {
          width: 80px;
          margin-left: 20px;
        }
      }
      .my-table {
        /deep/ .ivu-table-header {
          th {
            height: 50px;
            background: #EDF2FF;
          }
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