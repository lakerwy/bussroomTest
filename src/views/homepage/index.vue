<template>
  <div>
    <div class="home" v-if="isAdmin">
      <div class="myteam">
        <span :class="!isTeam?'active':''" @click="setMyTeam(0)">我的</span>
        <span :class="isTeam?'active':''" @click="setMyTeam(1)">我的团队</span>
      </div>
      <div class="myCont" v-if="!isFreeMember">
        <section class="left">

          <Card v-show="isTeam"  class="card teamView">
            <div class="teamViewDetail">
              <TeamViewsBox class="details" v-for="(item,index) in teamViewData" :key="index" :teamViewsData="item"
                            @viewDetail="()=>viewDetailGroup(item.routerName)"></TeamViewsBox>
            </div>
          </Card>
          <Card v-show="!isTeam" class="card winning">
            <div class="award">
              <ContentBox class="contBox" v-for="(item,index) in awardData"
                          :key="index" :numData="item" @viewDetail="()=>viewDetail(item.routerName)">
              </ContentBox>
              <QuantityBox class="contBox"
                           :numData="quantityData[0]" @viewDetail="()=>viewDetail(quantityData[0].routerName)">
              </QuantityBox>
            </div>
            <div class="quantity">
              <QuantityBox class="contQuan" v-for="(item,index) in quantityData.filter((col,i)=>i>0)" :key="index"
                           :numData="item" @viewDetail="()=>viewDetail(item.routerName)">
              </QuantityBox>
            </div>
          </Card>

          <Card class="card myApp">
            <div class="mine">我的应用</div>
            <ul>
              <li v-for="(item,index) in myAppData" :key="index">
                <span class="imgBox">
                  <img :src="item.imgUrl" alt="" @click="viewDetail(item.path)">
                </span>
                {{ item.text }}
              </li>
            </ul>
          </Card>
          <Card class="card platform">
            <h3>管理平台</h3>
            <div class="management">
              <PlatformBox :platTitle="'成员管理'" :platTableTitle="platTableTitle" :platAllNumber="platAllNumber"
                           :tableData="platTableData" @travelNow="()=>travelNow(1)">
              </PlatformBox>
              <PlatformBox :platTitle="'待审核'" :platTableTitle="platTableTitle2" :platAllNumber="platAllNumber2"
                           :tableData="platTableData2" @travelNow="()=>travelNow(3)" @dealAudit="()=>travelNow(3)">
              </PlatformBox>
<!--              <AuditBox :platTitle="'待审核'" >-->
<!--              </AuditBox>-->
            </div>
          </Card>
        </section>
        <section class="right">
          <Card class="card userInfo">
            <UserInfo
                :userInfo="userInfo"
            ></UserInfo>
          </Card>
          <Card class="card" style="height: 210px">
            <h3 class="h3-title">活动专区</h3>
            <div class="activityFree">
              暂 无 活 动 <br>
              敬 请 期 待
            </div>
          </Card>
<!--          //优惠券-->
          <AmountBox></AmountBox>
        </section>
      </div>
<!--  -------------------------------免费用户页面    -->
      <div class="myCont" v-if="isFreeMember">
        <section class="left">
          <Card class="card stratorList freeCard">
            <BrowselistBox
                class="browse freeBrowse"
                v-for="(item,index) in freeListData"
                :key="index"
                :title="item.title"
                :titleDate="item.titleDate"
                :titleNum="item.titleNum"
                :list="item.list"
                :isSlider="item.isSlider"
                @viewDetail="()=>viewDetail(item.routerName, item.title)"
            >
            </BrowselistBox>
            <div class="award">
              <ContentBox class="contBox" :numData="awardData[0]" @viewDetail="()=>viewDetail(awardData[0].routerName)">
              </ContentBox>
              <QuantityBox class="contBox"
                           :numData="quantityData[2]" @viewDetail="()=>viewDetail(quantityData[2].routerName)">
              </QuantityBox>
              <QuantityBox class="contBox"
                           :numData="quantityData[0]" @viewDetail="()=>viewDetail(quantityData[0].routerName)">
              </QuantityBox>
            </div>
          </Card>
          <Card class="card myApp">
            <div class="mine">新产品体验</div>
            <ul>
              <li v-for="(item,index) in myAppData2" :key="index">
                <span class="imgBox">
                  <img :src="item.imgUrl" alt="" @click="viewDetail(item.path)">
                </span>
                {{ item.text }}
              </li>
            </ul>
          </Card>
        </section>
        <section class="right">
          <Card class="card userInfo">
            <UserInfo
                :userInfo="userInfo"
            ></UserInfo>
          </Card>
          <Card class="card" style="height: 193px">
            <h3 class="h3-title">活动专区</h3>
            <div class="activityFree">
              暂 无 活 动 <br>
              敬 请 期 待
            </div>
          </Card>
          <!--          //优惠券-->
          <AmountBox></AmountBox>
        </section>
      </div>
    </div>
<!--   非管理员页面   -->
    <div class="home" v-if="!isAdmin">
      <div class="myteam">
        <span class="active">我的</span>
      </div>
      <div class="myCont">
        <section class="left">
          <Card class="card stratorList">
            <div class="stratTitle">
              浏览今日余量<span class="ml-1">  {{balanceForm.visitRemianNum}}</span>条
              导出本月余量<span class="ml-1">{{balanceForm.exportRemianNum}}</span>条
              短信余量<span class="ml-1"> {{balanceForm.smsRemianNum}}</span>条
<!--              <Button type="primary" class="floatBtn">增量购买</Button>-->
            </div>
            <BrowselistBox
                class="browse"
                v-for="(item,index) in browseListData"
                :key="index"
                :title="item.title"
                :titleDate="item.titleDate"
                :titleNum="item.titleNum"
                :list="item.list"
                @viewDetail="()=>viewDetail(item.routerName)"
            >
            </BrowselistBox>
          </Card>
          <Card class="card myApp">
            <div class="mine">新产品体验</div>
            <ul>
              <li v-for="(item,index) in myAppData" :key="index">
                <span class="imgBox">
                  <img :src="item.imgUrl" alt="" @click="viewDetail(item.path)">
                </span>
                {{ item.text }}
              </li>
            </ul>
          </Card>
        </section>
        <section class="right">
          <Card class="card userInfo">
            <UserInfo
                :userInfo="userInfo"
            ></UserInfo>
          </Card>
          <Card class="card" style="height: 210px">
            <h3 class="h3-title">活动专区</h3>
            <div class="activityFree">
              暂 无 活 动 <br>
              敬 请 期 待
            </div>
          </Card>
          <!--          //优惠券-->
          <AmountBox></AmountBox>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { ContentBox, QuantityBox, BrowselistBox, TeamViewsBox } from "../../components/contentBox/index.js"
import PlatformBox from "./components/platformBox"
import UserInfo from "./components/userInfo"
import ActiveBox from "./components/activeBox"
// import {getAccountUsage, getApplyList, getProjectData, getProjectStatus, getTeamProjectData} from "@/api/homepage";
import {mapMutations} from "vuex";
import { setFreeMask, dateFormat } from "@/utils/utils.js";
import AmountBox from "./components/amountBox"

import {
  getProjectStatus,
  getProjectData,
  getAccountUsage,
  getApplyList,
  getTeamProjectData,
  getRecommendBidding,
  getMaindata,
  getPvInfo,
  getAccountBalance,
  getMyCollect,
  getMyExport,
  getMyShare,
} from "@/api_new/index";
import { getMyVisit } from "@/api_new/myAttention";
import { getMySub} from "@/api_new/mySubscript";

export default {
  components: {
    ContentBox,
    QuantityBox,
    BrowselistBox,
    PlatformBox,
    UserInfo,
    ActiveBox,
    TeamViewsBox,
    AmountBox
  },
  data(){
    return{
      isTeam: 0,
      awardBgColor: ['#EDF2FF','#FFE6E6','#EAFFF5'],
      awardData: [
        // {
        //   id: 1,
        //   title: "中标情况（近一月）",
        //   numTitle: "数量",
        //   // priceTitle: "金额(万)",
        //   num: 0,
        //   // price: 0,
        //   rateTitle: "月同比",
        //   rate: 0,
        //   // priceRate: 0,
        //   routerName: "myBidding"
        // },
        {
          id: 2,
          title: "订阅情况",
          titleDate: "（近一周）",
          numTitle: "已发量",
          priceTitle: "未读量",
          num: 0,
          price: 0,
          rateTitle: "周同比",
          rate: 0,
          priceRate: 0,
          routerName: "subscripInfo"
        },
        {
          id: 3,
          title: "重要项目情况",
          titleDate: "（近一月）",
          numTitle: "新增量",
          priceTitle: "未读量",
          num: 0,
          price: 0,
          rateTitle: "月同比",
          rate: 0,
          priceRate: 0,
          routerName: "myProject"
        }
      ],
      quantityData: [
        {
          id: 1,
          title: "浏览量",
          numTitle: "近一周",
          priceTitle: "今日",
          num: 0,
          price: 0,
          rateTitle: "今日浏览量余额",
          rate: "0",
          routerName: "myBrowse"
        },
        {
          id: 1,
          title: "导出量",
          numTitle: "近一月",
          priceTitle: "今日",
          num: 0,
          price: 0,
          rateTitle: "今日导出量余额",
          rate: "0",
          routerName: "myExport"
        },
        {
          id: 1,
          title: "收藏量",
          numTitle: "近一周",
          priceTitle: "今日",
          num: 0,
          price: 0,
          routerName: "myCollection"
        },
        {
          id: 1,
          title: "分享量",
          numTitle: "近一周",
          priceTitle: "今日",
          num: 0,
          price: 0,
          routerName: "myShare"
        },
      ],
      myAppData: [
        {id: 1, imgUrl: "img/icon_dzxwbg.png", text: "定制行为报告", path: "behaviorReports"},
        {id: 2, imgUrl: "img/icon_xypj.png", text: "元博征信", path: "creditRating"},
        {id: 3, imgUrl: "img/icon_tbn.png", text: "拓犇牛标书", path: "benCattleTender"},
        {id: 4, imgUrl: "img/icon_zjk.png", text: "评标专家", path: "bidExpert"},
        // {id: 5, imgUrl: "img/app_5.png", text: "配载增量包", path: ""},
      ],
      myAppData2: [
        {id: 1, imgUrl: "img/icon_dzxwbg.png", text: "定制行为报告", path: "behaviorReports"},
        {id: 2, imgUrl: "img/icon_xypj.png", text: "元博征信", path: "creditRating"},
        {id: 3, imgUrl: "img/icon_tbn.png", text: "拓犇牛标书", path: "benCattleTender"},
        {id: 4, imgUrl: "img/icon_zjk.png", text: "评标专家", path: "bidExpert"},
      ],
      browseListData: [
        {id: 1, title: '我的浏览', routerName: "myBrowse", titleDate: '（近一周', titleNum: 0, list: []},
        {id: 2, title: '我的收藏', routerName: "myCollection", titleDate: '（近一周', titleNum: 0, list: []},
        {id: 3, title: '我的订阅', routerName: "subscripInfo", titleDate: '（近一周', titleNum: 0, list: []},
        {id: 4, title: '我的分享',  routerName: "myShare",titleDate: '（近一周', titleNum: 0, list: []},
        {id: 5, title: '我的导出',  routerName: "myExport",titleDate: '（近一周', titleNum: 0, list: []},
        {id: 6, title: '我的重要项目', routerName: "myProject", titleDate: '（本月', titleNum: 0, list: []},
      ],
      teamViewData: [
        {
          id: 1,
          title: '浏览量',
          nearWeek: '近一周',
          nearWeekNum: 0,
          today: '今日',
          todayNum: 0,
          allowance: '今日浏览量余额',
          allowanceNum: 0,
          showMoreBuy: true,
          routerName: "myBrowse"
        },
        {
          id: 2,
          title: '导出量',
          nearWeek: '近一月',
          nearWeekNum: 0,
          today: '今日',
          todayNum: 0,
          allowance: '本月导出量余额',
          allowanceNum: 0,
          showMoreBuy: true,
          routerName: "myExport"
        },
        {
          id: 3,
          title: '订阅量',
          nearWeek: '近一周已发送',
          nearWeekNum: 0,
          today: '近一周已读量',
          todayNum: 0,
          allowance: '订阅短信余额',
          allowanceNum: 0,
          showMoreBuy: true,
          routerName: "subscripInfo"
        },
        {
          id: 4,
          title: '收藏量',
          nearWeek: '近一周',
          nearWeekNum: 0,
          today: '今日',
          todayNum: 0,
          allowance: '周同比',
          allowanceNum: 0,
          showMoreBuy: false,
          routerName: "myCollection"
        },
        {
          id: 5,
          title: '重要项目',
          nearWeek: '近一月',
          nearWeekNum: 0,
          today: '今日',
          todayNum: 0,
          allowance: '月同比',
          allowanceNum: 0,
          showMoreBuy: false,
          routerName: "myProject"
        },
      ],
      platTableTitle: [
        { title: '账号', field: 'name', width: "20%" },
        { title: '浏览量', field: 'visitNum', width: "20%" },
        { title: '余量', field: 'visitRemianNum', width: "20%" },
        { title: '导出量', field: 'exportNum', width: "20%" },
        { title: '余量', field: 'exportRemianNum', width: "20%" },
        // { title: '短信发送量', field: 'smsNum', width: "22%" },
        // { title: '余量', field: 'smsRemianNum', width: "13%" },
      ],
      platAllNumber: 0,
      platTableData: [],
      platTableTitle2: [
        { title: '序号', field: 'index', width: "15%" },
        { title: '申请人', field: 'nickName', width: "20%" },
        { title: '申请时间', field: 'createTime', width: "20%" },
        { title: '申请项目', field: 'projectType', width: "20%" },
        { title: '操作', field: 'edit', width: "25%" },
      ],
      platAllNumber2: 0,
      platTableData2: [],
      userInfo: {
        avatar: "img/userlogo.png",
        username: '用户名',
        userType: '管理员',
        members: 'VIP会员',
        dueDate: '2023-5-19',
        customer: '周小鑫',
        contactPhone: '13255687359'
      },
      balanceForm: {
        "visitRemianNum": 0,
        "exportRemianNum": 0,
        "smsRemianNum": 0
      },
      userInfoDetail: null,
      timer: null,
      freeListData: [
        {id: 1, title: '招标公告推荐', routerName: "myBrowse", titleDate: '', titleNum: 0, list: []},
        {id: 2, title: '免费信息推荐', routerName: "findProject", titleDate: '', titleNum: 0, list: []},
        {id: 3, title: '热门推荐', routerName: "findProject", titleDate: '', titleNum: 0, isSlider: true, list: []},
        {id: 4, title: '项目推荐',  routerName: "findProject",titleDate: '', titleNum: 0, list: []},
      ],
      couponAmount: 0, //消费券金额
      couponExpire: '', //有效期
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
    this.userInfoDetail = JSON.parse(this.getStore("userInfo"));
    this.init();
  },
  mounted() {
    this.timer = setInterval(()=>{
      this.getProjectData()
    }, 1000*60*5);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  methods: {
    ...mapMutations(["setShowFreeMerber"]),
    init(){
      this.getUserInfo();
      if (this.isAdmin){
        if (this.isFreeMember) { //免费会员
          this.getProjectStatus();
          this.getProjectData();
          this.getRecommendBidding();
          this.getMaindata();
          this.getPvInfo();
        } else {
          this.getProjectStatus();
          this.getProjectData();
          this.getAccountUsage();
          this.getApplyList();
          this.getTeamProjectData();
        }
      } else {
        this.getAccountBalance();
        this.getMyVisit();
        this.getMyCollect();
        this.getMySub();
        this.getMyShare();
        this.getMyExport();
        this.getMyCollect(1);
      }
    },
    //获取用户信息
    getUserInfo(){
      this.userInfo.username = this.userInfoDetail.nickname;
      this.userInfo.userType = this.userInfoDetail.type == 1?'管理员':'普通用户';
      this.userInfo.members = this.userInfoDetail.memberType;
      this.userInfo.dueDate = this.userInfoDetail.expireTime;
      this.userInfo.customer = this.userInfoDetail.contact;
      this.userInfo.contactPhone = this.userInfoDetail.contactPhone;
      this.userInfo.avatar = this.userInfoDetail.avatar;
      this.couponAmount = this.userInfoDetail.couponAmount;
      this.couponExpire = this.userInfoDetail.couponExpire;
    },
    async getProjectStatus(){
      let res = await getProjectStatus();
      const {success, result} = res;
      if(success){
        // this.awardData[0].num = result.bidWinning.bidnum;
        // this.awardData[0].price = result.bidWinning.amount;
        // this.awardData[0].rate = result.bidWinning.bidnumMonthRatio || 0;
        // this.awardData[0].priceRate = result.bidWinning.amountMonthRatio || 0;

        this.awardData[0].num = result.subStatus.sendNum;
        this.awardData[0].price = result.subStatus.unReadNum;
        this.awardData[0].rate = result.subStatus.sendRatio;
        this.awardData[0].priceRate = result.subStatus.unReadRatio;

        this.awardData[1].num = result.keyProject.keyProjectNum;
        this.awardData[1].price = result.keyProject.unReadNum;
        this.awardData[1].rate = result.keyProject.keyProjectRatio;
        this.awardData[1].priceRate = result.keyProject.unReadRatio;
      }
    },
    async getProjectData(){
      let res = await getProjectData();
      const {success, result} = res;
      if(success){
        this.quantityData[0].price = result.visitData.todayVisitNum;
        this.quantityData[0].num = result.visitData.weekVisitNum;
        this.quantityData[0].rate = result.visitData.remainVisitNum;

        this.quantityData[1].price = result.exportData.todayExportNum;
        this.quantityData[1].num = result.exportData.monthExportNum;
        this.quantityData[1].rate = result.exportData.remainExportNum;

        this.quantityData[2].price = result.collectData.todayCollectNum;
        this.quantityData[2].num = result.collectData.weekCollectNum;

        this.quantityData[3].price = result.shareData.todayShareNum;
        this.quantityData[3].num = result.shareData.weekShareNum;
      }
    },
    //免费用户--获取招标公告推荐
    async getRecommendBidding(){
      let res = await getRecommendBidding();
      if (res.status == "OK") {
        // this.freeListData[0].list =
        let items = res.result.items.length > 5 ? res.result.items.slice(0,5): res.result.items;
        this.freeListData[0].list = items.map(item => {
          return {
            id: item.id,
            title: item.title,
            url: item.url,
            date: dateFormat(new Date(Number(item.publish_date)), "yyyy-MM-dd")
          }
        })
      }
    },
    // 免费用户--免费信息推荐和项目推荐
    async getMaindata (){
      let res = await getMaindata();
      if (res.success){
        let c_recommand = res.result.c_recommand.length > 5 ? res.result.c_recommand.slice(0,5): res.result.c_recommand;
        let c_zbxx = res.result.c_zbxx.length > 5 ? res.result.c_zbxx.slice(0,5): res.result.c_zbxx;
        this.freeListData[1].list = c_recommand.map(item => {
          return {
            id: item.id,
            title: item.title,
            url: item.url,
            date: item.rank,
          }
        })
        this.freeListData[3].list = c_zbxx.map(item => {
          return {
            id: item.id,
            title: item.title,
            url: item.url,
            date: item.date
          }
        })
      }
    },
    // 免费用户--热门推荐
    async getPvInfo(){
      let res = await getPvInfo();
      if (res.success) {
        let result = res.result.length > 10 ? res.result.slice(0,10): res.result;
        this.freeListData[2].list = result.map(item => {
          return {
            id: item.id,
            title: item.title,
            url: item.webUrl,
            date: item.publishDate.slice(0,10)
          }
        })
      }
    },
    //管理平台-成员管理列表
    async getAccountUsage(){
      let params = {
        // createBy: this.userInfoDetail.id,
        pageSize: 4,
        pageNumber: 1,
      }
      let res = await getAccountUsage(params);
      const {success, result} = res;
      if(success){
        this.platTableData = result.content;
        this.platAllNumber = result.totalElements;
      }
    },
    //管理平台-待审核列表
    async getApplyList(){
      let params = {
        memberId: this.userInfoDetail.companyId,
        pageSize: 4,
        pageNumber: 1,
        userId: '',
        createBy: '',
      }
      let res = await getApplyList(params);
      const {success, result} = res;
      if(success){
        this.platTableData2 = result.content.map(item=>{
          item.createTime = item.createTime ? item.createTime.split(" ")[0] : "";
          return {
            ...item
          }
        });
        this.platAllNumber2 = result.totalElements;
      }
    },
    //获取团队项目数据统计
    async getTeamProjectData(){
      let res = await getTeamProjectData();
      const {success, result} = res;
      if(success){
        this.teamViewData[0].todayNum = result.visitData.todayVisitNum;
        this.teamViewData[0].nearWeekNum = result.visitData.weekVisitNum;
        this.teamViewData[0].allowanceNum = result.visitData.remainVisitNum;

        this.teamViewData[1].todayNum = result.exportData.todayExportNum;
        this.teamViewData[1].nearWeekNum = result.exportData.monthExportNum;
        this.teamViewData[1].allowanceNum = result.exportData.remainExportNum;

        this.teamViewData[2].todayNum = result.subData.readNum;
        this.teamViewData[2].nearWeekNum = result.subData.sendNum;
        this.teamViewData[2].allowanceNum = result.subData.smsTotalRemain;

        this.teamViewData[3].todayNum = result.collectData.todayCollectNum;
        this.teamViewData[3].nearWeekNum = result.collectData.weekCollectNum;
        this.teamViewData[3].allowanceNum = result.collectData.collecRatio;

        this.teamViewData[4].todayNum = result.keyProjectData.todayKeyProjectNum;
        this.teamViewData[4].nearWeekNum = result.keyProjectData.monthKeyProjectNum;
        this.teamViewData[4].allowanceNum = result.keyProjectData.KeyProjectRatio;
      }
    },
    /*非管理员部分接口*/
    async getAccountBalance(){
      let res =await getAccountBalance();
      const {success, result} = res;
      if (success){
        this.balanceForm = Object.assign({},result)
      }
    },
    //获取我的浏览
    async getMyVisit(){
      let params = {
        pageNumber: 1,
        pageSize: 5,
        createBy: this.userInfoDetail.id,
        dateRange: 1,
        type: 0,
        infoType: '',
        searchType: '',
        area: '',
        title: ''
      }
      let res = await getMyVisit(params);
      const {success, result} = res;
      if(success){
        this.browseListData[0].titleNum = result.totalElements;
        this.browseListData[0].list = result.content&&result.content.length>5?result.content.slice(0,5):result.content;
      }
    },
    //获取我的收藏0一般 1重要
    async getMyCollect(flag = 0){
      let params = {
        createBy: this.userInfoDetail.id,
        pageSize: 5,
        pageNumber: 1,
        dateRange: flag ? 3 : 1,
        type: 0,
        signFlag: '',
      }
      if (flag) params.signFlag = flag;
      let res = await getMyCollect(params);
      const {success, result} = res;
      if(success){
        if(!flag){
          this.browseListData[1].titleNum = result.totalElements;
          this.browseListData[1].list = result.content.map(item=>{
            let temp = {
              ...item,
              title: item.name
            }
            return temp
          })
        } else {
          this.browseListData[5].titleNum = result.totalElements;
          this.browseListData[5].list = result.content.map(item=>{
            let temp = {
              ...item,
              title: item.name
            }
            return temp
          })
        }
      }
    },
    //获取我的订阅
    async getMySub(){
      let params = {
        createBy: this.userInfoDetail.id,
        pageSize: 5,
        dateRange: 1,
        type: 0,
        pageNumber: '',
        infoType: '',
        area: '',
        searchType: '',
        title: '',
        dingyueId: ''
      }
      let res = await getMySub(params);
      const {success, result} = res;
      if(success){
        this.browseListData[2].titleNum = result.totalElements;
        this.browseListData[2].list = result.content&&result.content.length>5?result.content.slice(0,5):result.content;
      }
    },
    //获取我的分享
    async getMyShare(){
      let params = {
        createBy: this.userInfoDetail.id,
        pageSize: 5,
        dateRange: 1,
        type: 0,
      }
      let res = await getMyShare(params);
      const {success, result} = res;
      if(success){
        this.browseListData[3].titleNum = result.totalElements;
        this.browseListData[3].list = result.content;
      }
    },
    //获取我的导出
    async getMyExport(){
      let params = {
        createBy: this.userInfoDetail.id,
        pageSize: 5,
        dateRange: 1,
        type: 0,
      }
      let res = await getMyExport(params);
      const {success, result} = res;
      if(success){
        this.browseListData[4].titleNum = result.totalElements;
        this.browseListData[4].list = result.content;
      }
    },
    //查看更多按鈕
    viewDetail(name, title){
      // if (this.isFreeMember){
      //   setFreeMask('feature');
      //   return
      // }
      if (title && title == "项目推荐") {
        this.$router.push({
          name,
          params: {
            type: "2",
          },
        });
      } else {
        this.$router.push({
          name,
          // params: {}, 参数不带在url上
          // query: {}  参数带在url上
        });
      }
    },
    viewDetailGroup(name){
      this.$router.push({
        name,
        params: {
          isTeam: 1,
        },
      });
    },
    travelNow(type){
      if (this.isFreeMember){
        setFreeMask('feature');
        // this.setShowFreeMerber(true);
        return
      }
      this.$router.push({
        name: 'accountRegulate',
        params: {
          type,
          isTeam: 1,
        },
      });
    },
    //切换我的和我的团队
    setMyTeam(e){
      if (this.isFreeMember && e){
        // this.$bus.$emit('setFreeGuidedWords', "myTeam")
        // this.setShowFreeMerber(true);
        setFreeMask();
        return
      }
      this.isTeam = e;
    }
  }
}
</script>

<style scoped lang="less">
@vw: 19.2vw;
@vh: 10.8vh;
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.home {
  width: 100%;
  .card {
    //height: 100%;
    margin-bottom: 20px;
    box-shadow: 5px 5px 3px #88888873;
    border: none;
    /deep/ .ivu-card-body {
      padding: 16px 16 / @vw;
    }
  }
  .card:hover {
    box-shadow: 5px 5px 3px #88888873;
  }
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
  .myCont {
    display: flex;
  }
  .left {
    width: 79%;
    min-width: 780px;
    .winning {
      height: 420px;
      border-top-left-radius: 0 0;
    }
    .award {
      margin-top: 5px;
      //display: -webkit-box;
      display: flex;
      justify-content: center;
      .contBox {
        width: 33%;
        height: 176px;
      }
      .contBox:nth-child(2){
        margin: 0 20px;
      }
    }
    .quantity {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      .contQuan {
        width: 33%;
        height: 178px;
      }
      .contQuan:nth-child(2){
        margin: 0 20px;
      }
      //.contQuan:nth-child(3){
      //  margin-right: 20 / @vw;
      //}
    }
    .myApp {
      height: 204px;
      width: 100%;
      /deep/ .ivu-card-body {
        padding: 20px;
      }
      .mine{
        width: 146px;
        font-size: 20px;
        font-family: Microsoft YaHei-Bold, Microsoft YaHei;
        font-weight: bold;
        color: #333333;
      }
      ul {
        display: flex;
        li {
          width: 20%;
          height: 136px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #333333;
          .imgBox {
            display: inline-block;
            width: 78px;
            height: 78px;
            background: #EEF2FF;
            border-radius: 4px 4px 4px 4px;
            text-align: center;
            padding-top: 10px;
            margin-bottom: 10px;
          }
          img {
            display: inline-block;
            width: 63px;
            height: 59px;
            cursor: pointer;
          }
        }
      }

    }
    .platform {
      height: 415px;
      //padding-left: 15px;
      h3 {
        font-size: 20px;
        font-family: Microsoft YaHei-Bold, Microsoft YaHei;
        font-weight: bold;
        color: #333333;
      }
      .management {
        margin-top: 20px;
        display: flex;
        .contentBox {
          width: 50%;
          height: 325px;
        }
        .contentBox:nth-child(1){
          margin-right: 20px;
        }
      }
    }

    //非管理员部分
    .stratorList {
      border-top-left-radius: 0 0;
      height: 948px;
      .stratTitle {
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #999999;
        height: 32px;
        line-height: 32px;
        width: 100%;
        text-align: left;
        padding-left: 16px;
        .floatBtn {
          float: right;
          margin-right: 15px;
        }
        .ml-1 {
          color: #3F6EF5;
          display: inline-block;
          //margin: 0 10px;
          margin-left: 5px;
        }

      }
      .browse {
        width: 47%;
        height: 278px;
        margin: 10px 0;
        margin-left: 15px;
        display: inline-block;
        vertical-align: middle;
      }
      .browse:nth-child(odd){
        margin-left: 40 / @vw;
      }
      .freeBrowse {
        width: calc(50% - 7px);
        margin-left: 0;
      }
      .freeBrowse:nth-child(odd){
        margin-left: 0;
        margin-right: 14px;
      }
    }

    //免费会员部分
    .freeCard {
      height: 807px;
    }

    //我的团队部分
    .teamView {
      height: 363px;
      .teamViewDetail{
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        .details {
          height: 318px;
          width: 20%;
          margin: 0 10 / @vw;
        }
        .details:first-child{
          margin-left: 0;
        }
        .details:last-child {
          margin-right: 0;
        }
      }
    }

  }

  .right {
    margin: 0 0 20px 20px;
    width: 19%;
    min-width: 250px;
    .userInfo {
      width: 100%;
      //width: 312px;
      height: 420px;
    }
    .activity(@pHeight: 638px, @sHeight: 185px){
      width: 100%;
      //width: 312px;
      height: @pHeight;
      .activeBox {
        margin-top: 10px;
        width: 100%;
        height: @sHeight;
      }
      .online {
        width: 100%;
        height: @sHeight;
      }
      .offline {
        width: 100%;
        height: @sHeight;
      }
      .forward {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 13px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #999999;
      }
    }
    .activity {
      .activity()
    }
    .teamActive {
      .activity(582px, 160px)
    }
    .average {
      .activity(732px, 227px)
    }

    .myApply {
      height: 136px;
      h3 {
        border-bottom: 1px solid;
        margin-bottom: 10px;
      }
      ul {
        display: flex;
        text-align: center;
        li {
          width: 27%;
        }
        li:nth-child(1){
          width: 15%;
        }
      }
    }

    .activityFree {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 13px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #999999;
      margin-top: 45px;
    }
    .consume {
      width: 100%;
      min-height: 43px;
      background: #F4F7FF;
      font-size: 16px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #000000;
      line-height: 43px;
      padding: 0 15px;
      margin: 15px 0;
    }
    p {
      font-size: 13px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #999999;
      line-height: 26px;
    }
  }

}

</style>