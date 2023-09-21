<!--
 * @Author: 付柏磊
 * @Date: 2022-09-01 16:10:44
 * @LastEditors: 付柏磊
 * @LastEditTime: 2022-09-01 17:00:53
 * @Description: 商机项目查询页面
 -->
<template>
  <div class="browse">
    <div class="myteam">
      <span>我的</span>
    </div>
    <Card class="card browseCont">
      <Tabs class="myTabs" v-model="procurement" @on-click="changeRrocurement">
        <TabPane label="招标与采购" name="1"></TabPane>
        <TabPane label="拟在建项目" name="2"></TabPane>
      </Tabs>
      <div class="search">
        <div class="search_group">
          <div class="group_title">
            <h3>搜索条件</h3>
            <span @click="addGroup"><Icon type="md-add" />添加</span>
          </div>
          <div class="group_btn">
            <ul>
              <li v-for="(item,index) in groupList" :key="index">
                <Tooltip
                    class="group_tip"
                    transfer
                    placement="left-end"
                    max-width="200"
                    :content="item.name"
                >
                  <Button class="btn_text" @click="setGourp(item, index)" :type="groupFlag == item.id ? 'primary' : ''"
                          long>{{ item.name }}
                  </Button>
                </Tooltip>
                <Button type="primary" class="btn_del" @click="removeGroup(index, item)">—</Button>
              </li>
            </ul>
          </div>
          <Page
              class="group_page"
              :current.sync="groupData.pageNumber"
              :total="groupData.pageTotal"
              size="default"
              simple
              :page-size="5"
              @on-change="getGroup"
          />
        </div>
        <div class="search_main">
          <div class="formining" v-show="procurement==1">
            <h3>筛选条件：</h3>
            <ul class="columm_type">
<!--              <RadioGroup v-model="searchForm.table">-->
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
              <CheckboxGroup style="display: inline" v-model="searchForm.table" @on-change="checkAllGroupChange">
                <li v-for="(item,index) in columnType" :key="index"><Checkbox :label="item.value">{{ item.label }}</Checkbox></li>
              </CheckboxGroup>
            </ul>
            <ul class="columm_type">
              <RadioGroup v-model="searchForm.searchRange">
                <span>搜索范围：</span>
                <li v-for="(item,index) in searchScope" :key="index">
                  <Radio :label="item.id">{{ item.name }}</Radio>
                </li>
              </RadioGroup>
            </ul>
            <ul class="columm_type" style="margin-bottom: -8px">
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
                    @select="change"
                    @deselect="deselect"
                />
              </li>
            </ul>
            <ul class="columm_type">
              <RadioGroup v-model="searchForm.range" @on-change="changeRange">
                <span>时间范围：</span>
                <li v-for="(item,index) in timeRange" :key="index">
                  <Radio :label="item.value">{{ item.label }}</Radio>
                </li>
              </RadioGroup>
              <DatePicker
                  class="datePicker"
                  v-show="searchForm.range == -1"
                  type="daterange"
                  :options="dateOption"
                  transfer
                  placement="bottom-end"
                  placeholder="选择日期"
                  @on-change="pickDate"
                  v-model="dateArr"
              ></DatePicker>
            </ul>
            <ul class="columm_type">
              <RadioGroup v-model="searchForm.keywordLogic">
                <span>查询逻辑：</span>
                <li v-for="(item,index) in withOr" :key="index">
                  <Radio :label="item.id">{{ item.name }}</Radio>
                </li>
              </RadioGroup>
            </ul>
            <ul class="columm_type column_input">
              搜索词：
              <Tooltip :content="searchForm.keywordLogic == 1?toolTipTxt.yuText:toolTipTxt.huoText" placement="right" :max-width="350">
                <img class="prompt" src="img/prompt.png" alt="">
              </Tooltip>
              <li v-for="(item,index) in searchForm.keyword" :key="index">
                <Input v-model="searchForm.keyword[index]" class="input"></Input> <span v-if="index !=9">{{searchForm.keywordLogic == 1?'与':'或'}}</span>
              </li>
            </ul>
            <ul class="columm_type ">
              排除词：
              <Tooltip :content="toolTipTxt.feiText" placement="right" :max-width="350">
                <img class="prompt" src="img/prompt.png" alt="">
              </Tooltip>
              <li v-for="(item,index) in searchForm.excludKeyword" :key="index">
                <Input v-model="searchForm.excludKeyword[index]" class="input" :disabled="isFreeMember"></Input> <span v-if="index !=2">与</span>
              </li>
              <span class="" v-if="isFreeMember">该功能属于付费客户权限，请尽快联系专属客户开通权限。</span>
            </ul>
          </div>
          <div class="building" v-show="procurement==2">
            <h3>筛选条件：</h3>
            <ul class="columm_type">
<!--              <RadioGroup v-model="searchForm.table">-->
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
              <CheckboxGroup style="display: inline" v-model="searchForm.table" @on-change="checkAllGroupChange">
                <li v-for="(item,index) in columnType2" :key="index"><Checkbox :label="item.value">{{ item.label }}</Checkbox></li>
              </CheckboxGroup>
            </ul>
            <ul class="columm_type">
              <RadioGroup v-model="searchForm.type">
                <span>搜索范围：</span>
                <li v-for="(item,index) in searchScope" :key="index">
                  <Radio :label="item.id">{{ item.name }}</Radio>
                </li>
              </RadioGroup>
            </ul>
            <ul class="columm_type">
              <RadioGroup v-model="searchForm.category1">
                <span>行业类型：</span>
                <li v-for="(item,index) in industryType" :key="index">
                  <Radio :label="item.value">{{ item.label }}</Radio>
                </li>
              </RadioGroup>
            </ul>
            <ul class="columm_type">
              <RadioGroup v-model="searchForm.stage">
                <span style="">进展阶段：</span>
                <li v-for="(item,index) in developmentPhase" :key="index">
                  <Radio :label="item.value">{{ item.label }}</Radio>
                </li>
              </RadioGroup>
            </ul>
            <ul class="columm_type">
              <RadioGroup v-model="searchForm.area">
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
              </RadioGroup>
            </ul>
            <ul class="columm_type">
              <RadioGroup v-model="searchForm.range" @on-change="changeRange">
                <span style="">时间范围：</span>
                <li v-for="(item,index) in timeRange" :key="index">
                  <Radio :label="item.value">{{ item.label }}</Radio>
                </li>
              </RadioGroup>
              <DatePicker
                  class="datePicker"
                  v-show="searchForm.range == -1"
                  type="daterange"
                  :options="dateOption"
                  transfer
                  placement="bottom-end"
                  placeholder="选择日期"
                  @on-change="pickDate"
                  v-model="dateArr"
              ></DatePicker>
            </ul>
            <ul class="columm_type">
              <RadioGroup v-model="searchForm.keywordLogic">
                <span style="">查询逻辑：</span>
                <li v-for="(item,index) in withOr" :key="index">
                  <Radio :label="item.id">{{ item.name }}</Radio>
                </li>
              </RadioGroup>
            </ul>
            <ul class="columm_type column_input ">
              搜索词：
              <Tooltip :content="searchForm.keywordLogic == 1?toolTipTxt.yuText:toolTipTxt.huoText" placement="right" :max-width="350">
                <img class="prompt" src="img/prompt.png" alt="">
              </Tooltip>
              <li v-for="(item,index) in searchForm.keyword" :key="index">
                <Input v-model="searchForm.keyword[index]" class="input"></Input> <span v-if="index !=9">{{searchForm.keywordLogic == 1?'与':'或'}}</span>
              </li>
            </ul>
            <ul class="columm_type column_input">
              排除词：
              <Tooltip :content="toolTipTxt.feiText" placement="right" :max-width="350">
                <img class="prompt" src="img/prompt.png" alt="">
              </Tooltip>
              <li v-for="(item,index) in searchForm.excludKeyword" :key="index">
                <Input v-model="searchForm.excludKeyword[index]" class="input" :disabled="isFreeMember"></Input> <span v-if="index !=2">与</span>
              </li>
              <span class="" v-if="isFreeMember">该功能属于付费客户权限，请尽快联系专属客户开通权限。</span>
            </ul>
          </div>
          <Button class="column_btn" type="primary" @click="searchVal">立即搜索</Button>
          <Button class="column_btn" @click="clearSearchValue">清空搜索条件</Button>
          <Button class="column_btn" @click="saveSearchData">保存搜索条件</Button>
        </div>
      </div>
      <div class="list">
        <h3>搜索结果</h3>
        <span class="listAll">共 {{pageForm.pageTotal}} 条</span>
        <Button v-if="!isAdmin" style="margin-left: 30px; width: 100px" type="primary" @click="viewIncrement">浏览增量</Button>
        <div class="list_btn">
          <Button class="right_btn" @click="exportDetail"><Icon style="font-size: 18px;margin-right: 5px" type="ios-download-outline" />导出</Button>
          <Button class="right_btn" @click="handleShare"><Icon style="font-size: 18px;margin-right: 5px" type="ios-share-alt-outline" />分享</Button>
          <Button class="right_btn" @click="handleCollect"><Icon style="font-size: 18px;margin-right: 5px" type="ios-star-outline" />收藏</Button>
          <Button class="right_btn" @click="handleRemoveCollect">取消收藏</Button>
        </div>
        <div style="clear: both"></div>
        <Table class="my-table" :columns="columns" :data="tableData" :loading="loadingFlag" @on-selection-change="handleSelectChange">
          <template slot-scope="{ row }" slot="title">
            <ReadTitle :url="row.url" :title="row.title" :id="row.id" :isFreeMember="isFreeMember"></ReadTitle>
          </template>
        </Table>
        <Page
            v-if="tableData.length"
            class="my-page"
            :current.sync="pageForm.pageNumber"
            :total="pageForm.pageTotal"
            :page-size="pageForm.pageSize"
            show-elevator
            show-sizer
            :page-size-opts="[10, 20, 30, 40, 50]"
            @on-change="pageChange"
            @on-page-size-change="handleSizeChange"
        />
      </div>
    </Card>
    <ShareModal v-if="shareModal" :message.sync="message" :shareUser.sync="shareUser" @handleOk="handleOk" @handleClose="handleClose"></ShareModal>
  </div>
</template>

<script>
import {

} from "@/api/myAttention";
import { deepClone, setProjectType, filterDict, dateFormat } from "@/utils/utils.js";
import { columnType, informationType, timeRange, projectPhase, areaData, category1Data, regionData} from "@/utils/const/attention";
import {mapGetters, mapMutations, mapState} from "vuex";
import { ShareModal, ReadTitle } from "@/components/contentBox/index.js"

import {
  getMemberSearch,
  getZtbSearch,
  getNzjSearch,
  saveMemberSearch,
  removeMemberSearch,
  saveCollection,
  removeCollection,
  collectMailSub,
  removeCollect,
  exportAnnouncement,
  setShare,
  downAnnouncement,
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
      isTeam: false,
      procurement: '1',
      groupFlag: "",
      dateOption: {
        disabledDate(date) {
          return date.valueOf() > Date.now() || date.valueOf() < Date.now() - 31536000000;
        },
      },
      dateArr: ["", ""],
      groupList: [],
      groupData: {
        pageSize: 5,
        pageNumber: 1,
        pageTotal: 0,
        userId: "",
      },
      columnType: columnType,
      indeterminate: false,
      checkAll: true,
      columnType2: informationType,
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
          minWidth: 600,
          slot: "title",
        },
        {
          title: "信息类型",
          align: "center",
          minWidth: 80,
          sortable: true,
          render: (h, params)=>{
            let obj = setProjectType(params.row)
            return (<span class="area" >{obj.type}</span>)
          }
        },
        {
          title: "收藏",
          align: "center",
          key: "is_collected",
          sortable: true,
          width: 90,
          render: (h,params)=>{
            let temp;
            if (params.row.is_collected != '0') {
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
          key: "numa",
          minWidth: 80,
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
          title: "阶段",
          align: "center",
          key: "classb_id",
          minWidth: 80,
          render: (h,params)=>{
            let classb_id = filterDict(params.row.classb_id, projectPhase, {labelKey: 'label', valueKey: 'value'});
            return (
                <div>{classb_id?classb_id:''}</div>
            )
          }
        },
        {
          title: "地区",
          align: "center",
          minWidth: 90,
          key: "area_id",
          sortable: true,
          render: (h,params)=>{
            let area = filterDict(params.row.area_id, areaData, {labelKey: 'title', valueKey: 'value'});
            return (
                <div>{area?area:'其他'}</div>
            )
          }
        },
        {
          title: "发布时间",
          key: "publish_date",
          align: "center",
          minWidth: 90,
          sortable: true,
          render: (h,params)=>{
            let date = dateFormat(new Date(parseInt(params.row.publish_date)), "yyyy-MM-dd")
            return (
                <div>{date}</div>
            )
          }
        },
      ],
      tableData: [],
      copyColumns: [],
      pageForm: {
        pageNumber: 1, // 当前页数
        pageTotal: 0,
        pageSize: 10,
      },
      searchForm: {
        table: ['1', '2', '3', '6', '7', '5', '4'],
        searchRange: 0,
        area: [],
        range: 1,
        keywordLogic: 1, //查询逻辑
        keyword: ["","","","","","","","","",""], //搜索词
        excludKeyword: ["","",""], //排除词
      },
      selection: [], //勾选
      toolTipTxt: {
        yuText: "您所查询的公告将包含您的全部搜索词（与）",
        huoText: "您所查询的公告将包含您的任意一个搜索词（或）",
        feiText: "您所查询的公告将不包含您填写的全部排除词",
      },
      shareModal: false,
      shareUser: [],
      message: "",
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
    ...mapGetters(["teamUserOther"]),
  },
  created() {
    this.copyColumns = deepClone(this.columns);
    this.columns = this.columns.filter(col => col.title !== '行业' && col.title !== '阶段');
    this.groupData.userId = JSON.parse(this.getStore("userInfo")).id;
    this.init();
  },
  methods: {
    ...mapMutations(["setShowFreeMerber"]),
    init(){
      if (this.$route.params.type){
        let params = this.$route.params;
        this.procurement = params.type;
        this.clearSearchValue();
        if (params.data){
          this.setMessageInfo(params.data);
          return
        }
      }
      this.getGroup();
      // this.getZtbSearch();
    },
    // 招标与采购查询
    async getZtbSearch(flag){
      if (flag == 1){
        this.pageForm.pageNumber = 1;
      }
      let params = {
        ...this.searchForm,
        page: this.pageForm.pageNumber,
        rows: this.pageForm.pageSize,
      }
      params.keyword = this.setJoinValue(params.keyword);
      params.excludKeyword = this.setJoinValue(params.excludKeyword);
      params.area = this.getAreaIds();

      //免费会员非提示付费 时间（近1月）超1月时间提示付费
      if (this.isFreeMember){
        if (params.excludKeyword || ![0,1,2,3].includes(params.range)){
          this.$bus.$emit('setFreeGuidedWords', "feature")
          this.setShowFreeMerber(true);
          return
        }
      }
      this.loadingFlag = true;
      let res = await getZtbSearch(params);
      const {status, result} = res;
      this.loadingFlag = false;
      if(status == "OK" && result){
        this.tableData = [];
        this.tableData = result.items.map(item=>{
          let keyword = params.keyword;
          item.titleCopy = item.title;
          if (item.title.indexOf(keyword) > -1) {
            item.title = item.title.replace(
                keyword,
                `<span style="color:red;">` +
                keyword +
                `</span>`
            );
          }
          if (item.title.indexOf(`color:red`) == -1) {
            item.title =
                item.title +
                `(<span style="color:red;">` +
                keyword +
                `</span>在正文中)`;
          }
          return {
            ...item
          }
        })
        this.pageForm.pageTotal = result.total;
      } else {
        this.$Message.error('查询失败，请稍后再试')
      }
    },
    // 拟在建查询
    async getNzjSearch(flag){
      if (flag == 1){
        this.pageForm.pageNumber = 1;
      }
      let params = {
        ...this.searchForm,
        page: this.pageForm.pageNumber,
        rows: this.pageForm.pageSize,
      }
      params.keyword = this.setJoinValue(params.keyword);
      params.excludKeyword = this.setJoinValue(params.excludKeyword);
      params.area = this.getAreaIds();

      //免费会员非提示付费 时间（近1月）超1月时间提示付费
      if (this.isFreeMember){
        if (params.excludKeyword || ![0,1,2,3].includes(params.range)){
          this.$bus.$emit('setFreeGuidedWords', "feature")
          this.setShowFreeMerber(true);
          return
        }
      }

      this.loadingFlag = true;
      let res = await getNzjSearch(params);
      const {status, result} = res;
      this.loadingFlag = false;
      if(status == "OK" && result){
        this.tableData = [];
        this.tableData = result.items.map(item=>{
          let keyword = params.keyword;
          item.titleCopy = item.title;
          if (item.title.indexOf(keyword) > -1) {
            item.title = item.title.replace(
                keyword,
                `<span style="color:red;">` +
                keyword +
                `</span>`
            );
          }
          if (item.title.indexOf(`color:red`) == -1) {
            item.title =
                item.title +
                `(<span style="color:red;">` +
                keyword +
                `</span>在正文中)`;
          }
          return {
            ...item
          }
        })
        this.pageForm.pageTotal = result.total;
      } else {
        this.$Message.error('查询失败，请稍后再试')
      }
    },
    searchVal(){ //立即搜索按钮
      if (this.procurement == 1){
        this.getZtbSearch(1);
      } else {
        this.getNzjSearch(1);
      }
    },
    //收藏与取消收藏
    changeShare(params) {
      console.log(params);
      let obj = setProjectType(params.row);
      // 收藏
      if (params.row.is_collected =="0") {
        saveCollection({
          infoId: params.row.id,
          name: params.row.titleCopy,
          url: params.row.url,
          type: obj.num,
        }).then(res => {
          if (res.success) {
            this.$set(this.tableData[params.index], 'is_collected', res.result.id)
            this.$Message.success("收藏成功")
          }
        })
      } else {
        removeCollection({
          // id: params.row.id,
          id: params.row.is_collected
        }).then(res => {
          if (res.success) {
            this.tableData[params.index].is_collected = "0";
            this.$Message.success("取消收藏成功")
          }
        })
      }

    },
    handleSelectChange(selection){
      this.selection = selection;
    },
    //导出功能
    async exportDetail(){
      if (this.isFreeMember){
        this.$bus.$emit('setFreeGuidedWords', "feature")
        this.setShowFreeMerber(true);
        return
      }
      if (this.selection.length <= 0) {
        this.$Message.info("请勾选所需要导出的公告");
        return;
      }
      // if (this.selection.length <= 0) {
      //   this.$Message.info("您勾选的信息由于超出月导出量限额"+1+"条，建议重新勾选");
      //   return;
      // }
      let ids = "";
      this.selection.forEach((item,index)=>{
        ids = !index? item.id : ids + ',' + item.id;
      })
      let params = {
        // ids: "2209186137"
        ids: ids
      }
      let res = await exportAnnouncement(params);
      const {success, result} = res;
      if(success){
        let title = result;
        downAnnouncement({
          path: result
        }, title)
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
          infoId: item.id,
          name: item.titleCopy,
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
          if (this.procurement == 1){
            this.getZtbSearch();
          } else {
            this.getNzjSearch();
          }
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
        if (item.is_collected !== '0') ids.push(item.is_collected);
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
          if (this.procurement == 1){
            this.getZtbSearch();
          } else {
            this.getNzjSearch();
          }
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
    //保存搜索条件
    saveSearchData(){
      if (this.procurement == 1){
        if (this.groupData.pageTotal >= 10 && !this.groupFlag) {
          this.$Message.warning("最多只能添加10个分组");
          return
        }
        this.saveBiddingData();
      } else {
        if (this.groupData.pageTotal >= 5 && !this.groupFlag) {
          this.$Message.warning("最多只能添加5个分组");
          return
        }
        this.saveBuildingData();
      }
    },
    //保存招标与采购搜索条件
    saveBiddingData(){
      let params = {}
      params.keyword = this.setJoinValue(this.searchForm.keyword);
      if (params.keyword == "" || params.keyword.trim().length == 0) {
        this.$Message.warning("订阅词不能为空，请您输入产品词进行订阅。");
        return;
      }
      if (params.keyword.length > "100") {
        this.$Message.warning(
            "输入订阅词（包含空格）过多，导致查询结果偏差过大，请酌情删减。"
        );
        return;
      }
      if (this.searchForm.range == -1 && !this.dateArr[0] && !this.dateArr[1]) {
        this.$Message.warning("请选择时间范围");
        return;
      }
      params.infoType = this.searchForm.table;
      params.searchRange = this.searchForm.searchRange;
      params.area = this.getAreaIds();
      params.dateRange = this.searchForm.range;
      if (this.searchForm.range == -1) {
        params.startTime = this.searchForm.startTime;
        params.endTime = this.searchForm.endTime;
      }
      params.keywordLogic = this.searchForm.keywordLogic;
      params.excludKeyword = this.setJoinValue(this.searchForm.excludKeyword);
      params.total = this.pageForm.pageTotal;
      // 采购与招标默认为零
      params.type = 0;
      let area = "全部地区"
      if (params.area){
        let temp = params.area.split(",");
        let areaList = [];
        areaData.forEach(item=>{
          if (temp.includes((item.value+''))) {
            areaList.push(item.title)
          }
        })
        area = areaList.join(",")
      }
      let infoTypeName = "";
      for (let i in columnType) {
        if(params.infoType.includes(columnType[i].value)){
          infoTypeName = !infoTypeName?columnType[i].label:infoTypeName+' '+columnType[i].label;
        }
      }
      params.name =
          params.keyword +
          " + " +
          infoTypeName +
          " + " +
          (params.keywordLogic == 1?'与查询':'或查询') +
          " + " +
          filterDict(params.searchRange, this.searchScope, {labelKey: 'name', valueKey: 'id'}) +
          " + " +
          area +
          " + " +
          filterDict(params.dateRange,timeRange);
      params.id = this.groupFlag;
      saveMemberSearch(params).then(res=>{
        if (res.success) {
          this.$Message.success('保存搜索条件成功')
          this.getGroup();
        }
      })
    },
    saveBuildingData(){
      let params = {}
      params.keyword = this.setJoinValue(this.searchForm.keyword);
      if (params.keyword == "" || params.keyword.trim().length == 0) {
        this.$Message.warning("订阅词不能为空，请您输入产品词进行订阅。");
        return;
      }
      if (params.keyword.length > "100") {
        this.$Message.warning(
            "输入订阅词（包含空格）过多，导致查询结果偏差过大，请酌情删减。"
        );
        return;
      }
      if (this.searchForm.range == -1 && !this.dateArr[0] && !this.dateArr[1]) {
        this.$Message.warning("请选择时间范围");
        return;
      }
      params.infoType = this.searchForm.table;
      params.searchRange = this.searchForm.type;
      params.primaryIndustry = this.searchForm.category1;
      params.secondaryIndustry = -1;
      params.stage = this.searchForm.stage;
      params.area = this.getAreaIds();
      params.dateRange = this.searchForm.range;
      if (this.searchForm.range == -1) {
        params.startTime = this.searchForm.startTime;
        params.endTime = this.searchForm.endTime;
      }
      params.keywordLogic = this.searchForm.keywordLogic;
      params.excludKeyword = this.setJoinValue(this.searchForm.excludKeyword);
      params.total = this.pageForm.pageTotal;
      // 采购与招标默认为零
      params.type = 1;
      let area = "全部地区"
      if (params.area){
        let temp = params.area.split(",");
        let areaList = [];
        areaData.forEach(item=>{
          if (temp.includes((item.value+''))) {
            areaList.push(item.title)
          }
        })
        area = areaList.join(",")
      }
      let infoTypeName = "";
      for (let i in informationType) {
        if(params.infoType.includes(informationType[i].value)){
          infoTypeName = !infoTypeName?informationType[i].label:infoTypeName+' '+informationType[i].label;
        }
      }
      params.name =
          params.keyword +
          " + " +
          infoTypeName +
          " + " +
          filterDict(params.stage, projectPhase) +
          " + " +
          filterDict(params.primaryIndustry, category1Data) +
          " + " +
          (params.keywordLogic == 1?'与查询':'或查询') +
          " + " +
          filterDict(params.searchRange, this.searchScope, {labelKey: 'name', valueKey: 'id'}) +
          " + " +
          area +
          " + " +
          filterDict(params.dateRange,timeRange);
      params.id = this.groupFlag;
      saveMemberSearch(params).then((res) => {
        if (res.success) {
          this.$Message.success('保存搜索条件成功')
          this.getGroup();
        }
      });
    },
    //获取搜索条件列表
    getGroup(flag) {
      if (flag == 1){
        this.groupData.pageNumber = 1;
      }
      let params = {
        pageNumber: this.groupData.pageNumber,
        pageSize: this.groupData.pageSize,
        infoType: this.procurement == 1?'1000':'2000',
        sort: "lastModify"
      }
      getMemberSearch(params).then(res=>{
        if (res.success){
          this.groupList = res.result.content;
          this.groupData.pageTotal = res.result.totalElements;
          if (this.groupList.length){
            this.setGourp(this.groupList[0])
          } else {
            if (this.procurement == 1) return this.getZtbSearch(1);
            this.getNzjSearch(1)
          }
        }
      })
    },
    //搜索条件按钮点击
    setGourp(item, index){
      this.clearSearchValue();
      if (this.procurement == 1){
        this.groupFlag = item.id;
        if (item.infoType) this.searchForm.table = item.infoType.split(",");
        if (this.searchForm.table.length == 7){
          this.indeterminate = false;
          this.checkAll = true;
        } else if (this.searchForm.table.length > 0) {
          this.indeterminate = true;
          this.checkAll = false;
        } else {
          this.indeterminate = false;
          this.checkAll = false;
        }
        this.searchForm.searchRange = item.searchRange;
        this.searchForm.area = item.area?item.area.split(","):[];
        this.searchForm.range = item.dateRange;
        if (this.searchForm.range == -1) {
          this.searchForm.startTime = this.formatDate(new Date(item.startTime));
          this.searchForm.endTime = this.formatDate(new Date(item.endTime));
          this.dateArr = [item.startTime, item.endTime];
        }
        this.searchForm.keywordLogic = item.keywordLogic;
        let tempWord = item.keyword.split(" ");
        tempWord.forEach((val,i)=>{
          this.searchForm.keyword[i] = val;
        })
        if (item.excludKeyword){
          let tempWord2 = item.excludKeyword.split(" ");
          tempWord2.forEach((val,i)=>{
            this.searchForm.excludKeyword[i] = val;
          })
        }
        this.getZtbSearch(1);
      } else {
        this.groupFlag = item.id;
        if (item.infoType) this.searchForm.table = item.infoType.split(",");
        if (this.searchForm.table.length == 4){
          this.indeterminate = false;
          this.checkAll = true;
        } else if (this.searchForm.table.length > 0) {
          this.indeterminate = true;
          this.checkAll = false;
        } else {
          this.indeterminate = false;
          this.checkAll = false;
        }
        this.searchForm.type = item.searchRange;
        this.searchForm.category1 = item.primaryIndustry || "-1";
        this.searchForm.stage = item.stage || "0";
        this.searchForm.area = item.area?item.area.split(","):[];
        this.searchForm.range = item.dateRange;
        if (this.searchForm.range == -1) {
          this.searchForm.startTime = this.formatDate(new Date(item.startTime));
          this.searchForm.endTime = this.formatDate(new Date(item.endTime));
          this.dateArr = [item.startTime, item.endTime];
        }
        this.searchForm.keywordLogic = item.keywordLogic;
        let tempWord = item.keyword.split(" ");
        tempWord.forEach((val,i)=>{
          this.searchForm.keyword[i] = val;
        })
        if (item.excludKeyword){
          let tempWord2 = item.excludKeyword.split(" ");
          tempWord2.forEach((val,i)=>{
            this.searchForm.excludKeyword[i] = val;
          })
        }
        this.getNzjSearch(1);
      }

    },
    //删除搜索条件
    removeGroup(index, item) {
      this.$Modal.confirm({
        title: "提醒",
        content:
            "确认是否删除？",
        onOk: () => {
          removeMemberSearch({
            ids: [item.id],
          }).then((res) => {
            if (res.success) {
              this.$Message.success('删除搜索条件成功')
              this.getGroup(1);
            }
          });
        },
      });
    },
    //添加搜索条件
    addGroup(){
      //免费会员只能保存5个
      if (this.isFreeMember){
        if (this.groupData.pageTotal >= 5) {
          this.$bus.$emit('setFreeGuidedWords', "browse")
          this.setShowFreeMerber(true);
          return
        }
      }
      this.groupFlag = "";
      this.clearSearchValue();
    },
    //切换招标与采购和拟在建
    changeRrocurement(item) {
      this.procurement = item;
      this.clearSearchValue();
      if (item == 1){
        this.columns = this.columns.filter(col => col.title !== '行业' && col.title !== '阶段');
      } else {
        this.columns = this.copyColumns;
      }
      this.getGroup(1);
    },
    //表格切换分页
    pageChange(){
      if(this.procurement == 1){
        this.getZtbSearch();
      } else {
        this.getNzjSearch();
      }
    },
    //选择每页有多少列
    handleSizeChange(val){
      this.pageForm.pageSize = val;
      if(this.procurement == 1){
        this.getZtbSearch(1);
      } else {
        this.getNzjSearch(1);
      }
    },
    //处理关键词
    setJoinValue(arr){
      let temp = "";
      arr.forEach((item, index)=>{
        if (item){
          if (!index) {
            temp = item;
          } else {
            temp = temp + " " + item;
          }
        }
      })
      return temp;
    },
    //初始化搜索条件searchForm
    clearSearchValue(){
      this.indeterminate = false;
      this.checkAll = true;
      this.dateArr = ["",""];
      if(this.procurement == 1){
        let searchForm = {
          table: ['1', '2', '3', '6', '7', '5', '4'],
          searchRange: 0,
          area: [],
          range: 1,
          keywordLogic: 1, //查询逻辑
          keyword: ["","","","","","","","","",""], //搜索词
          excludKeyword: ["","",""], //排除词
        }
        this.searchForm = searchForm;
      } else {
        let searchForm = {
          table: ['3030', '3020', '3110', '3120', '3050'],
          type: 0,
          category1: "-1",
          stage: "0",
          area: [],
          range: 1,
          keywordLogic: 1, //查询逻辑
          keyword: ["","","","","","","","","",""], //搜索词
          excludKeyword: ["","",""], //排除词
        }
        this.searchForm = searchForm;
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
      if (this.searchForm.area.length){
        if (this.searchForm.area[0] == -1) return ""
        // {
        //   for (let key in regionObj){
        //     ids = ids + ',' + regionObj[key]
        //   }
        //   return ids.slice(1);
        // }
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
    //分享功能
    handleShare(){
      //免费会员只能保存5个
      if (this.isFreeMember){
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
      console.log(this.selection);
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
          obj.title = `【${titleObj.type}】 ${item.titleCopy}`;
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
    //消息订阅
    setMessageInfo(item) {
      let params = {
        pageNumber: this.groupData.pageNumber,
        pageSize: this.groupData.pageSize,
        infoType: this.procurement == 1 ? '1000' : '2000',
        sort: "lastModify"
      }
      getMemberSearch(params).then(res=>{
        if (res.success){
          this.groupList = res.result.content;
          this.groupData.pageTotal = res.result.totalElements;
          let tempWord = item.keyword.split(" ");
          tempWord.forEach((val,i)=>{
            this.searchForm.keyword[i] = val;
          })
          if (item.excludKeyword){
            let tempWord2 = item.excludKeyword.split(" ");
            tempWord2.forEach((val,i)=>{
              this.searchForm.excludKeyword[i] = val;
            })
          }
          if(this.procurement == 1){
            let searchForm = {
              table: item.infoType || "",
              searchRange: item.searchRange,
              area: item.area,
              range: 1,
              keywordLogic: item.keywordLogic,
              keyword: this.searchForm.keyword,
              excludKeyword: this.searchForm.excludKeyword
            }
            this.searchForm = searchForm;
            this.getZtbSearch(1);
          } else {
            let searchForm = {
              table: item.infoType || "",
              type: item.searchRange,
              category1: item.primaryIndustry,
              stage: item.stage,
              area: item.area,
              range: 1,
              keywordLogic: item.keywordLogic,
              keyword: this.searchForm.keyword,
              excludKeyword: this.searchForm.excludKeyword
            }
            this.searchForm = searchForm;
            this.getNzjSearch(1)
          }
        }
      })
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
        this.searchForm.table = this.procurement == 1?['1', '2', '3', '6', '7', '5', '4']:['3030', '3020', '3110', '3120', '3050'];
      } else {
        this.searchForm.table = [];
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
      width: 105px;
      text-align: center;
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
    .active {
      background: #74BCFF;
      color: white;
    }
  }
  .browseCont {
    border-top-left-radius: 0 0;
    margin-right: 10px;
    //height: 1000px;
    min-height: calc(100vh - 190px);

    .search {
      display: flex;
      .search_group {
        //height: 362px;
        border: 1px solid #E8E8E8;
        border-radius: 4px;
        width: 23%;
        margin-right: 15px;
        padding: 10px 16px;
        .group_title {
          display: flex;
          align-items: center;
          h3 {
            width: 90%;
            font-size: 16px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #333333;
          }
          span {
            display: inline-block;
            width: 48px;
            cursor: pointer;
            font-size: 13px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #3F6EF5;
          }
        }
        .group_btn {
          //height: 168px;
          li {
            display: flex;
            margin: 15px 0;
            /deep/ .ivu-btn {
              height: 36px;
            }
            .group_tip {
              width: 83%;
              /deep/ .ivu-tooltip-rel{
                width: 100%;
              }
              .btn_text {
                width: 100%;
                padding-right: 5px;
                /deep/ span {
                  display: inline-block;
                  width: 100%;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  line-height: 34px;
                }
              }
            }
            .btn_del {
              margin-left: 10px;
              width: 12%;
              padding: 0;
            }
          }
        }
        .group_page {
          text-align: center;
          margin-top: 20px;
        }
      }
      .search_main {
        font-size: 15px;
        margin-left: 15px;
        min-height: 362px;
        width: 77%;
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
          margin: 9px 0;
          line-height: 25px;
          width: 100%;
          //overflow: hidden;
          font-size: 14px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #999999;
          li {
            font-size: 14px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #333333;
            display: inline-block;
            margin-right: 10px;
            line-height: 19px;
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
            line-height: 24px;
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
        font-size: 16px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #333333;
      }
      .listAll {
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
.tree {
  /deep/ .ivu-form-item-content {
    line-height: inherit;
  }
}
</style>