<template>
  <div class="browse">
    <div class="myteam">
      <span class="active">我的</span>
    </div>
    <Card class="card browseCont">
      <Tabs class="myTabs" v-model="procurement" @on-click="changeRrocurement">
        <TabPane label="招标与采购" name="1"></TabPane>
      </Tabs>
      <div class="list">
        <div class="searchBox">
          <ul class="columm_type">
            <RadioGroup v-model="searchData.searchRange">
              <span class="column_title">搜索范围：</span>
              <li v-for="(item,index) in contentRange" :key="index">
                <Radio :label="item.value">{{ item.label }}</Radio>
              </li>
            </RadioGroup>
          </ul>
          <ul class="columm_type">
            <span style="display: inline-block; vertical-align: top; line-height: 34px">地区范围：</span>
            <li>
              <treeselect
                  style="width: 412px"
                  v-model="searchData.area"
                  :multiple="true"
                  :options="options"
                  :default-expand-level="2"
                  :isDefaultExpanded="true"
                  placeholder="全部地区"
              />
            </li>
          </ul>
          <ul class="columm_type">
            <RadioGroup v-model="searchData.range">
              <span class="column_title">时间范围：</span>
              <li v-for="(item,index) in timeRange" :key="index">
                <Radio :label="item.value">{{ item.label }}</Radio>
              </li>
            </RadioGroup>
            <DatePicker
                class="datePicker"
                v-show="searchData.range == -1"
                type="daterange"
                :options="dateOption"
                transfer
                placement="bottom-end"
                placeholder="选择日期"
                @on-change="pickDate"
                v-model="dateArr"
            ></DatePicker>
          </ul>
          <div class="search">
            <Input v-model="searchData.keyword" placeholder="请输入关键词" />
            <Button type="primary" @click="getBidSearch(1)">立即搜索</Button>
            <Button style="margin-left: 20px;" @click="clearSearchValue">清空搜索条件</Button>
          </div>
        </div>

        <span class="total">共 {{pageForm.pageTotal}} 条</span>
<!--        <Button style="margin-left: 20px;"  type="primary">导出增量</Button>-->
        <div class="list_btn">
          <Button class="right_btn" @click="exportDetail" ><Icon style="font-size: 18px;margin-right: 5px" type="ios-download-outline" />导出</Button>
          <Button class="right_btn" @click="handleShare"><Icon style="font-size: 18px;margin-right: 5px" type="ios-share-alt-outline" />分享</Button>
        </div>
        <div style="clear: both"></div>
        <Table class="my-table" :columns="columns" :data="tableData" :loading="loadingFlag" @on-selection-change="handleSelectChange">
          <template slot-scope="{ row }" slot="title">
            <ReadTitle :url="row.url" :title="row.title" :id="row.id"></ReadTitle>
          </template>
        </Table>
        <Page
            v-if="tableData.length"
            class="my-page"
            :current.sync="pageForm.pageNumber"
            :total="pageForm.pageTotal"
            :page-size="pageForm.pageSize"
            show-elevator
            @on-change="getBidSearch"
        />
      </div>
    </Card>

    <ShareModal v-if="shareModal" :message.sync="message" :shareUser.sync="shareUser" @handleOk="handleOk" @handleClose="handleClose"></ShareModal>
  </div>
</template>

<script>
import { deepClone, filterDict, getArrayIds, setProjectType } from "@/utils/utils.js";
import {downAnnouncement, exportAnnouncement, getBidSearch, setShare } from "@/api/myAttention";
import { timeRange, contentRange, regionData} from "@/utils/const/attention";
import {setColumn} from "./js/columns";
import {ShareModal, ReadTitle} from "@/components/contentBox/index.js"

export default {
  name: "index",
  components: {
    ShareModal,
    ReadTitle
  },
  data(){
    return{
      loadingFlag: false,
      isTeam: 0,
      procurement: '1',
      searchValue: "",
      contentRange: contentRange,
      timeRange: timeRange,
      columns: setColumn(this, 0, 1),
      tableData: [],
      selection: [], //勾选选项
      pageForm: {
        pageNumber: 1, // 当前页数
        pageTotal: 0,
        pageSize: 10,
      },
      searchData: {
        searchRange: 0,
        area: [],
        range: 1,
        keyword: "",
      },
      options: regionData, //地区
      dateOption: {
        disabledDate(date) {
          return date.valueOf() > Date.now() || date.valueOf() < Date.now() - 31536000000;
        },
      },
      dateArr: ["", ""],
      shareModal: false,
      message: "",
      shareUser: [],
    }
  },
  created() {
    this.init();
  },
  methods: {
    init(){
      this.getBidSearch();
    },
    //我的中标列表
    async getBidSearch(flag){
      if (flag == 1){
        this.pageForm.pageNumber = 1;
      }
      let params = {
        ...this.searchData,
        page: this.pageForm.pageNumber,
        rows: this.pageForm.pageSize,
      }
      params.area = this.getAreaIds();
      this.loadingFlag = true;
      this.tableData = [];
      let res = await getBidSearch(params);
      this.loadingFlag = false;
      if(res.status == "OK"){
        this.tableData = res.result.items;
        this.pageForm.pageTotal = res.result.total;
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
      let temp = "";
      let ids = "";
      if (this.searchData.area.length){
        if (this.searchData.area[0] == -1) return ""
        this.searchData.area.forEach((item,index)=>{
          if (item > 0) {
            ids = !index? item : ids + ',' + item;
          } else {
            ids = !index? regionObj[item] : ids + ',' + regionObj[item];
          }
        })
      }
      return ids
    },
    //批量导出
    async exportDetail(){
      if (this.selection.length <= 0) {
        this.$Message.info("请选择需要导出的公告");
        return;
      }
      let params = {
        ids: getArrayIds("id", this.selection)
      }
      let res = await exportAnnouncement(params);
      const {success, result} = res;
      if(success){
        let title = "招标与采购导出.xlsx"
        downAnnouncement({
          path: result
        }, title).then(()=>{
          this.$Message.success("导出成功");
        })
      }
    },
    //分享功能
    handleShare(){
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
          content.url = item.url;
          obj.content = JSON.stringify(content);
          let titleObj = setProjectType(item);
          obj.title = `【${titleObj.type}】 ${item.title}`;
          obj.infoId = item.id;
          obj.userIds = this.shareUser;
          return obj
        })
        console.log(params);
        setShare(params).then(res=>{
          if (res.success){
            this.shareModal = false;
            this.$Message.success("分享成功");
          }
        })
      }
    },
    pickDate(arr) {
      this.searchData.startTime = this.formatDate(new Date(arr[0]));
      this.searchData.endTime = this.formatDate(new Date(arr[1]));
      console.log(this.searchData)
    },
    formatDate(date) {
      return (
          date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
      );
    },
    //勾选
    handleSelectChange(selection) {
      this.selection = selection;
    },
    //清空搜索条件
    clearSearchValue(){
      this.dateArr = ["",""];
      this.searchData = {
        searchRange: 0,
        area: [],
        range: 1,
        keyword: "",
      }
      this.getBidSearch();
    },
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
    min-height: calc(100vh - 190px);
    //height: 1000px;
    .list {
      .searchBox {
        //height: 183px;
        width: 100%;
        border-radius: 4px;
        border: 1px solid #E8E8E8;
        padding: 20px;
        margin-bottom: 15px;
        .columm_type {
          line-height: 27px;
          width: 100%;
          margin-bottom: 10px;
          .column_title {
            font-size: 14px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #999999;
            vertical-align: middle;
            display: inline-block;
            line-height: 27px;
          }
          li {
            vertical-align: middle;
            display: inline-block;
            margin-right: 10px;
            line-height: 27px;
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
        .search {
          margin-bottom: 10px;
          .ivu-input-wrapper {
            width: 300px;
          }
          .ivu-btn {
            //width: 100px;
            margin-left: 20px;
          }
        }
      }

      .total {
        display: inline-block;
        height: 34px;
        line-height: 32px;
        font-size: 12px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #999999;
      }
      .list_btn {
        float: right;
        .right_btn {
          width: 100px;
          margin-left: 20px;
          padding: 0;
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