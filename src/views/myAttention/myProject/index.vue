<template>
  <div class="project">
    <div class="myteam">
      <span>重要项目</span>
    </div>
    <Card class="card browseCont">
      <Tabs class="myTabs" v-model="procurement" @on-click="changeRrocurement">
        <TabPane label="项目跟进" name="1"></TabPane>
<!--        <TabPane label="项目联系人" name="2"></TabPane>-->
      </Tabs>
      <ul class="columm_type column_input ">
        搜索词：
        <li>
          <Input style="width: 400px" v-model="searchValue" placeholder="请输入关键词" />
        </li>
      </ul>
      <Button class="column_btn" type="primary" @click="getFollowList(1)">立即搜索</Button>
      <Button class="column_btn" @click="clearSearchValue" >清空搜索条件</Button>
      <Button class="column_right" @click="setImportFlag(0)" >移除跟进</Button>
      <div class="list">
        <div>
          <Table class="my-table" :columns="columns" :data="tableData" :loading="loadingFlag" @on-selection-change="handleSelectChange">
            <template slot-scope="{ row }" slot="title">
              <ReadTitle :url="row.webUrl" :title="row.projectName" :id="row.infoId"></ReadTitle>
            </template>
          </Table>
        </div>
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
import { ShareModal, ReadTitle } from "@/components/contentBox/index.js"
import { getArrayIds } from "@/utils/utils.js";
import { getProjectPerson} from "@/api/myAttention";

import { getFollowList, markImport} from "@/api_new/myAttention";

export default {
  name: "index",
  components: {
    ReadTitle
  },
  data(){
    return{
      loadingFlag: false,
      isTeam: false,
      procurement: '1',
      columns: [
        {
          type: 'selection',
          width: 80,
          align: 'left'
        },
        {
          title: "项目名称",
          align: "center",
          minWidth: 500,
          slot: "title",
        },
        {
          title: "地区",
          align: "center",
          minWidth: 80,
          sortable: true,
          key: 'areaName'
        },
        {
          title: "我跟进的次数",
          align: "center",
          minWidth: 80,
          sortable: true,
          key: 'followNum'
        },
        {
          title: "跟进时间",
          align: "center",
          minWidth: 120,
          sortable: true,
          key: 'lastFollowDate'
        },
      ],
      columns2: [
        {
          type: 'selection',
          width: 80,
          align: 'left'
        },
        {
          title: "联系人姓名",
          align: "center",
          minWidth: 120,
          key: "contactName",
        },
        {
          title: "公司名称",
          align: "center",
          minWidth: 120,
          key: "companyName",
        },
        {
          title: "职务",
          align: "center",
          minWidth: 90,
          key: "job",
        },
        {
          title: "关注时间",
          key: "createTime",
          align: "center",
          minWidth: 120,
        },
        {
          title: "涉及项目",
          key: "title",
          align: "center",
          minWidth: 400,
          render: (h, params)=>{
            return (
                <a target="_blank"
                   href={params.row.webUrl}
                   class="infoTitle"
                >{params.row.title}</a>
            )
          }
        }
      ],
      tableData: [],
      pageForm: {
        pageNumber: 1, // 当前页数
        pageTotal: 100,
        pageSize: 10,
      },
      searchValue: "",
      selection: [],
    }
  },
  created() {
    this.init();
  },
  methods: {
    init(){
      this.getFollowList();
    },
    //项目跟进
    async getFollowList(flag){
      if (flag == 1){
        this.pageForm.pageNumber = 1;
      }
      let params = {
        pageNumber: this.pageForm.pageNumber,
        pageSize: this.pageForm.pageSize,
        name: this.searchValue,
      }
      this.loadingFlag = true;
      this.tableData = [];
      let res = await getFollowList(params);
      const {success, result} = res;
      this.loadingFlag = false;
      if(success){
        this.tableData = result.content;
        this.pageForm.pageTotal = result.totalElements;
      }
    },
    clearSearchValue(){
      this.searchValue = "";
      this.getFollowList(1)
    },
    //移除跟进
    async setImportFlag(type){
      if (this.selection.length <= 0) {
        this.$Message.info("请选择需要移除的公告");
        return;
      }
      let params = {
        ids: getArrayIds("id", this.selection),
        type: type
      }
      let res = await markImport(params);
      const {success, result} = res;
      if(success){
        this.$Message.success('移除跟进成功');
        this.getFollowList(1);
      }
    },
    //项目联系人
    async getProjectPerson(flag){
      if (flag == 1){
        this.pageForm.pageNumber = 1;
      }
      let params = {
        pageNumber: this.pageForm.pageNumber,
        pageSize: this.pageForm.pageSize,
      }
      this.loadingFlag = true;
      this.tableData = [];
      let res = await getProjectPerson(params);
      const {success, result} = res;
      this.loadingFlag = false;
      if(success && result){
        this.tableData = result.content;
        this.pageForm.pageTotal = result.totalElements;
      }
    },
    changeRrocurement(item) {
      this.procurement = item;
      if(item == 1){
        this.getFollowList(1);
      } else {
        this.getProjectPerson(1);
      }
    },
    pageChange(){
      if(this.procurement == 1){
        this.getFollowList();
      } else {
        this.getProjectPerson();
      }
    },
    handleSelectChange(selection) {
      this.selection = selection;
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
.project {
  .myteam {
    span{
      display: inline-block;
      padding: 5px 15px;
      background: white;
      margin-right: 10px;
      border-radius: 3px;
      border-bottom-left-radius: 0 0;
      border-bottom-right-radius: 0 0;
      cursor: pointer;
      color: #3F6EF5;
    }
  }
  .browseCont {
    border-top-left-radius: 0 0;
    margin-right: 10px;
    //height: 1000px;
    height: calc(100vh - 190px);
    .list {
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
        }
      }
    }
    .my-page {
      margin-top: 20px;
      margin-bottom: 30px;
      text-align: center;
    }
  }
  .columm_type {
    font-size: 14px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #999999;
    margin: 9px 0 20px 0;
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
  .column_btn {
    margin-right: 20px;
  }
  .column_right {
    float: right;
  }
}
</style>