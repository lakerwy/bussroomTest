<!--
 * @Author: 付柏磊
 * @Date: 2022-09-01 08:48:12
 * @LastEditors: 付柏磊
 * @LastEditTime: 2022-09-01 11:01:28
 * @Description: 我的订阅编辑订阅
 -->
<template>
  <div class="editsub">
    <Card class="card">
      <div>
        <Tabs class="myTabs" v-model="procurement" @on-click="changeRrocurement">
          <TabPane label="招标与采购" name="1"></TabPane>
          <TabPane label="拟在建项目" name="2"></TabPane>
        </Tabs>
      </div>
      <h3>订阅信息列表</h3>
      <div class="btns">
        <Button class="" type="primary" @click="toAddSub">新增订阅器<span>（还可新增{{ total }}个）</span>
        </Button>
        <Button class="right_btn" @click="batchShare"><Icon style="font-size: 18px;margin-right: 5px" type="ios-share-alt-outline" />批量分享</Button>
        <Button class="right_btn" @click="batchDelSub"><Icon style="font-size: 18px;margin-right: 5px" type="ios-trash-outline" />批量删除</Button>
      </div>
      <Table class="my-table" :columns="columns" :data="tableData" @on-selection-change="handleSelectChange" :loading="loadingFlag">
      </Table>
    </Card>

    <editComModal v-if="editModal" ref="editModal" @handleClose="handleClose" @handleOk="handleOk" :flag="procurement" :editParams="editParams"></editComModal>
    <ShareModal v-if="shareModal" shareTitle="订阅方案分享" :message.sync="message" :shareUser.sync="shareUser" @handleOk="handleShareOk" @handleClose="handleShareClose"></ShareModal>
  </div>
</template>

<script>
import {setShare} from "@/api/myAttention";
import editComModal from "./components/editComModal";
import {setColumn} from "./js/columns";
import {getMySubscribe} from "@/api/mySubscript";
import {infoTypeList, areaData} from "@/utils/const/attention";
import {filterDictList, getArrayIds, deepClone} from "@/utils/utils";
import { removeGroup } from "@/api/index.js";
import { ShareModal, ReadTitle } from "@/components/contentBox/index.js"
import {mapMutations} from "vuex";

export default {
  name: "editSub",
  components: {
    editComModal,
    ShareModal
  },
  data(){
    return{
      loadingFlag: false,
      procurement: "1",
      editModal: false,
      editParams: {},
      selection: [],
      columns: setColumn(this, "1"),
      tableData: [],
      total: 0,
      shareModal: false,
      message: "",
      shareUser: [],
      shareSubData: [],
    }
  },
  activated(){
    this.init();
  },
  created() {
    this.init();
  },
  computed: {
    isFreeMember(){
      let temp = false;
      if (JSON.parse(this.getStore("userInfo")).memberType == "免费会员") temp = true;
      return temp;
    }
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
      this.loadingFlag = true;
      let res = await getMySubscribe(params);
      const {success, result} = res;
      this.loadingFlag = false;
      if (success){
        this.tableData = result.content.map(item=>{
          let temp = "全部类型";
          if (item.infoType) temp = filterDictList(item.infoType, infoTypeList);
          let area = "全部地区";
          if (item.area) area = filterDictList(item.area, areaData, {labelKey: 'title', valueKey: 'value'})
          item.infoTypeDeal = temp;
          item.areaDeal = area;
          return {
            ...item
          }
        })
        if (this.isFreeMember) {
          this.total = this.procurement == "1" ? 5 - result.totalElements : 5 - result.totalElements;
        } else {
          this.total = this.procurement == "1" ? 10 - result.totalElements : 5 - result.totalElements;
        }
      }
    },
    //删除订阅器
    delSub(params){
      this.$Modal.confirm({
        title: "提醒",
        content:
            "确认是否删除？",
        onOk: () => {
          removeGroup({
            ids: [params.row.id],
          }).then((res) => {
            if (res.success) {
              this.getMySubscribe();
            }
          });
        },
      });
    },
    //批量删除订阅器
    batchDelSub(){
      if (this.selection.length <= 0) {
        this.$Message.info("请选择需要删除的订阅器");
        return;
      }
      let ids = getArrayIds("id", this.selection);
      this.$Modal.confirm({
        title: "提醒",
        content:
            "确认是否删除？",
        onOk: () => {
          removeGroup({
            ids: ids.split(','),
          }).then((res) => {
            if (res.success) {
              this.getMySubscribe();
              this.selection = [];
            }
          });
        },
      });
    },
    //分享订阅器
    shareSub(params){
      // if (this.selection.length <= 0) {
      //   this.$Message.info("请勾选您所需要分享的订阅器");
      //   return;
      // }
      this.message = "";
      this.shareUser = [];
      this.shareModal = true;
      this.shareSubData = [];
      this.shareSubData.push(params.row);
    },
    //批量分享订阅器
    batchShare(){
      if (this.selection.length <= 0) {
        this.$Message.info("请勾选您所需要分享的订阅器");
        return;
      }
      this.message = "";
      this.shareUser = [];
      this.shareModal = true;
      this.shareSubData = [];
      this.shareSubData = deepClone(this.selection);
    },
    handleShareOk(){
      if (this.shareUser.length == 0) {
        this.$Message.warning("请先选择分享人");
        return
      }
      let params = this.shareSubData.map(item=>{
        let obj = {
          createSend: false,
          delFlag: 0,
          range: 1,
          type: "订阅方案",
        };
        let content = {
          message: this.message,
          searchData: {
            name: item.name,
            keyword: item.keyword,
            excludeKeyword: item.excludeKeyword,
            table: item.infoType,
            searchRange: item.searchRange,
            area: item.area,
            keywordLogic: item.keywordLogic,
            stage: item.stage,
            primaryIndustry: item.primaryIndustry,
            secondaryIndustry: item.secondaryIndustry
          },
          type: this.procurement == '1'? 0: 1
        }
        console.log(content);
        content.url = item.url;
        obj.content = JSON.stringify(content);
        obj.title = "搜索/订阅方案分享"
        obj.infoId = item.id;
        obj.userIds = this.shareUser;
        return obj
      })
      setShare(params).then(res=>{
        if (res.success){
          this.shareModal = false;
          this.$Message.success("订阅方案分享成功");
        }
      })
    },
    handleShareClose(){
      this.shareModal = false;
    },
    //修改
    editSub(params){
      this.editModal = true;
      this.editParams = params.row;
    },
    handleClose(){
      this.editModal = false;
    },
    handleOk(){
      this.editModal = false;
      this.getMySubscribe();
    },
    //勾选
    handleSelectChange(selection) {
      this.selection = selection;
      console.log(this.selection)
    },
    //切换招采和拟在建
    changeRrocurement(e){
      if (this.isFreeMember){
        if (e == 2){
          this.$bus.$emit('setFreeGuidedWords', "subscrip")
          this.setShowFreeMerber(true);
          setTimeout(()=>{
            this.procurement = '1';
          })
          return
        }
      } else {
        this.procurement = e;
        this.columns = setColumn(this, this.procurement);
        this.getMySubscribe();
      }
    },
    //render订阅开关
    renderSwitch(key){
      return(
        <div class={key?'hasopen':'notopen'}>
          <span class="point"></span>{key?'已开启':'未开启'}
        </div>
      )
    },
    toAddSub(){
      this.$router.push({
        name: "addSub",
        params: { procurement: this.procurement },
      });
    }
  }
}
</script>

<style scoped lang="less">
.editsub {
  .btns {
    margin-top: 15px;
    .right_btn{
      float: right;
      margin-left: 10px;
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
/deep/ .hasopen {
  .HasOpen()
}
/deep/ .notopen {
  .HasOpen(#999999)
}
.HasOpen(@pColor: #1CBD75) {
  font-size: 14px;
  font-family: Microsoft YaHei-Regular, Microsoft YaHei;
  font-weight: 400;
  color: @pColor;
  .point{
    vertical-align: middle;
    margin-right: 5px;
    display: inline-block;
    width: 8px;
    height: 8px;
    background: @pColor;
    border-radius: 4px;
  }
}
</style>