<template>
  <div class="tender">
    <section class="left">
      <div class="topBg">
        <div class="purpose">
          <div class="purpose-title">
            <h3>我们的<br>服务宗旨</h3>
            <div class="hen"></div>
          </div>
          <ul class="purpose-list">
            <li v-for="item in purposeList" :key="item.id">
              <img :src="item.url" alt="">
              <h4>{{ item.title }}</h4>
            </li>
          </ul>
        </div>
      </div>
      <ul class="ghost">
        <li v-for="item in ghostList" :key="item.id">
          <img class="img" :src="item.img" alt="">
          <div class="ghost-content">
            <h3>{{ item.title }}</h3>
            <p v-for="itm in item.pArr">
              <span class="duigou"></span>{{itm}}
            </p>
            <div class="ghost-btn" @click="viewNow">立即查看</div>
          </div>
        </li>
      </ul>
      <div class="writeBidding">
        <div class="title">
          <h3>标书代写</h3>
          <div class="hen"></div>
        </div>
        <ul class="bidding-list">
          <li v-for="(item,index) in setBiddingList" :key="index" :class="activeIndex == index?'active':''">
            <template v-if="activeIndex == index">
              <h4>{{ item[activeIndex2].title }}</h4>
              <p v-for="(temp,j) in item[activeIndex2].bidArr">{{ temp }}</p>
              <div class="more-btn" @click="viewMore">更多></div>
              <span class="font_family activeIcon" v-html="item[activeIndex2].icon"></span>
            </template>
            <template v-else>
              <div class="item-li" v-for="(itm,i) in item" @mouseover="setActiveBidding(index,i)">
                <h4>{{ itm.title }}</h4>
                <span class="font_family item-icon" v-html="itm.icon"></span>
              </div>
            </template>
          </li>
        </ul>
      </div>
      <div class="project">
        <div class="title">
          <h3>工程造价</h3>
          <div class="hen"></div>
        </div>
        <div class="project-tabs">
          <div v-for="(item,index) in tabList" :key="index" class="item-tab" :class="activeTab==index?'activeTab':''" @click="activeTab=index">
            {{item}}
          </div>
        </div>
        <div v-if="activeTab == 0" class="industry">
          <div v-for="(item,index) in industryList" :key="index" class="industry-item">
            {{item}}
          </div>
        </div>
        <div v-if="activeTab == 1" class="software">
          <div v-for="(item,index) in softwareList" :key="index" class="software-item">
            <img :src="item.img" alt="">
          </div>
        </div>
        <div v-if="activeTab == 2" class="successcase">
          <div v-for="(item, index) in successCaseList" class="case-item">
            <template v-if="index == 1">
              <div class="case-cont">
                <div class="cont-flex">
                  <p style="width: 168px"><span>建筑规模：</span>{{ item.pProject }}</p>
                  <p><span>项目造价：</span>{{ item.pPrice }}</p>
                </div>
                <div class="cont-flex">
                  <p style="width: 168px"><span>委托单位：</span>{{ item.pUnit }}</p>
                  <p><span>咨询项目：</span>{{item.pAdvice}}</p>
                </div>
                <p><span>项目简介：</span>{{item.pInfo}}</p>
              </div>
              <div class="case-img">
                <img :src="item.img" alt="">
                <div class="img-title" style="top: 0">{{ item.title }}</div>
              </div>
            </template>
            <template v-else>
              <div class="case-img">
                <img :src="item.img" alt="">
                <div class="img-title">{{ item.title }}</div>
              </div>
              <div class="case-cont">
                <p><span>工程规模：</span>{{ item.pProject }}</p>
                <p><span>项目造价：</span>{{ item.pPrice }}</p>
                <p><span>咨询项目：</span>{{ item.pAdvice }}</p>
                <p><span>项目简介：</span>{{ item.pInfo }}</p>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="customer">
        <div class="title">
          <h3 style="color: #fff">来自20万+客户的信任与选择</h3>
          <div style="background: #fff" class="hen"></div>
        </div>
        <div class="banner">
          <ul class="banner-nav">
            <li v-for="(item,index) in bannerList" :key="index" :class="activeBanner == index?'activeBanner':''" @click="activeBanner = index">
              <span class="nav-icon"><Icon type="ios-chatbubbles" /></span>
              {{item.title}}
              <div v-if="activeBanner == index" class="shu"></div>
              <Icon v-if="activeBanner == index" style="font-size: 28px" type="ios-arrow-dropright" />
            </li>
          </ul>
          <div class="banner-img">
            <img :src="bannerList[activeBanner].img" alt="">
          </div>
        </div>
      </div>
      <div class="process">
        <div class="title">
          <h3>服务流程</h3>
          <div class="hen"></div>
        </div>
        <ul class="process-list">
          <li v-for="(item,index) in processList" :key="index">
            <img :src="item.icon" alt="">
            <h4>{{item.title}}</h4>
            <p v-html="item.text"></p>
            <Icon v-if="index != 5" class="next" type="ios-arrow-forward" />
          </li>
        </ul>
      </div>
    </section>

    <section class="right">
      <Card class="card userInfo">
        <UserInfo
            :userInfo="userInfo"
        ></UserInfo>
      </Card>
      <Card class="card activity">
        <div class="verticalBar"><span></span>活动专区</div>
        <div class="imgBox">
          <img src="img/myApp/hd_img5.png" alt="">
        </div>
      </Card>
      <Card class="card teacher">
        <div class="verticalBar"><span></span>优秀标书老师</div>
        <ul class="teacherList">
          <vue-seamless-scroll
              :data="teacherList"
              class="seamless-warp"
              :class-option="classOption"
          >
            <li v-for="(item,index) in teacherList" :key="index">
              <span class="underline">{{ item.teacherName }}</span>
              <p><span>从业经验：</span>{{ item.years }}</p>
              <p><span>擅长项目：</span>{{item.project}}</p>
              <p><span>参与项目额：</span>{{ item.price }}</p>
              <p><span>中标标书：</span>{{ item.num }}</p>
            </li>
          </vue-seamless-scroll>
        </ul>
        <Button class="consult" type="primary" @click="consultline">在线咨询</Button>
      </Card>
      <Card class="card certificate">
        <div class="verticalBar"><span></span>合作中标项目</div>
        <ul>
          <li v-for="(item,index) in 10" :key="index">
            **省**市森林火灾应急能力建设项目目...
          </li>
        </ul>
      </Card>
    </section>
  </div>
</template>

<script>
import UserInfo from "../../homepage/components/userInfo"
import vueSeamlessScroll from "vue-seamless-scroll";

export default {
  name: "index",
  components: {
    UserInfo,
    vueSeamlessScroll
  },
  data(){
    return{
      userInfo: {
        avatar: "",
        username: '用户名',
        userType: '管理员',
        members: 'VIP会员',
        dueDate: '2023-5-19',
        customer: '周小鑫',
        contactPhone: '13255687359'
      },
      userInfoDetail:null,
      purposeList: [
        {id: 1, url: "img/myApp/icon_banner_ji.png", title: "全天候可接急单"},
        {id: 2, url: "img/myApp/icon_banner_gai.png", title: "不限修改次数到您满意为止"},
        {id: 3, url: "img/myApp/icon_banner_tui.png", title: "承诺废标全额退款"},
      ],
      ghostList: [
        {id: 1, img: "img/myApp/img_cont_bsdx.png", title: "标书代写服务", filed: "", pArr: ["实体标书团队","全行业覆盖","数万成功案例","一站式服务"], },
        {id: 2, img: "img/myApp/img_cont_gczj.png", title: "工程造价服务", filed: "", pArr: ["投标报价","图形算量","招标控制价","概算/结算/决算"], },
        {id: 3, img: "img/myApp/img_cont_dzbd.png", title: "电子标代写服务", filed: "", pArr: ["采招平台注册","投标项目报名","电子标制作","远程支持"], },
        {id: 4, img: "img/myApp/img_cont_bssh.png", title: "标书审核服务", filed: "", pArr: ["逐一核验","大纲审查","内容审查","偏离梳理"], },
        {id: 5, img: "img/myApp/img_cont_ztbf.png", title: "招投标范本库", filed: "", pArr: ["全行业模板","日更新100+","适用性强","可直接套用"], },
        {id: 6, img: "img/myApp/zbwj.png", title: "招标文件编制服务", filed: "", pArr: ["采需策划","评分标准编制","资格要求编制","文件审核"], },
      ],
      biddingList: [
        {id: 1, title: "机械设备", icon: "&#xe68c;", field: "", bidArr: ["人工智能", "清废设备", "空调设备", "环保监测设备", "电动阀门", "灌溉机电"]},
        {id: 2, title: "系统软件", icon: "&#xe67b;", field: "", bidArr: ["公园标牌", "地铁标识", "旅游保障", "电力广告", "银行灯箱", "医疗导视"]},
        {id: 3, title: "广告标识", icon: "", field: "", bidArr: ["公园标牌", "地铁标识", "旅游保障", "电力广告", "银行灯箱", "医疗导视"]},
        {id: 4, title: "市政房建", icon: "&#xe67c;", field: "", bidArr: ["公园标牌", "地铁标识", "旅游保障", "电力广告", "银行灯箱", "医疗导视"]},
        {id: 5, title: "装修改造", icon: "&#xe685;", field: "", bidArr: ["公园标牌", "地铁标识", "旅游保障", "电力广告", "银行灯箱", "医疗导视"]},
        {id: 6, title: "道路交通", icon: "&#xe67a;", field: "", bidArr: ["公园标牌", "地铁标识", "旅游保障", "电力广告", "银行灯箱", "医疗导视"]},
        {id: 7, title: "劳务外包", icon: "&#xe681;", field: "", bidArr: ["公园标牌", "地铁标识", "旅游保障", "电力广告", "银行灯箱", "医疗导视"]},
        {id: 8, title: "咨询服务", icon: "&#xe68b;", field: "", bidArr: ["公园标牌", "地铁标识", "旅游保障", "电力广告", "银行灯箱", "医疗导视"]},
        {id: 9, title: "驾驶运输", icon: "&#xe68d;", field: "", bidArr: ["公园标牌", "地铁标识", "旅游保障", "电力广告", "银行灯箱", "医疗导视"]},

        {id: 10, title: "建筑材料", icon: "&#xe686;", field: "", bidArr: ["公园标牌", "地铁标识", "旅游保障", "电力广告", "银行灯箱", "医疗导视"]},
        {id: 11, title: "物资采购", icon: "&#xe689;", field: "", bidArr: ["公园标牌", "地铁标识", "旅游保障", "电力广告", "银行灯箱", "医疗导视"]},
        {id: 12, title: "化学试剂", icon: "", field: "", bidArr: ["公园标牌", "地铁标识", "旅游保障", "电力广告", "银行灯箱", "医疗导视"]},
        {id: 13, title: "能源电力", icon: "&#xe682;", field: "", bidArr: ["公园标牌", "地铁标识", "旅游保障", "电力广告", "银行灯箱", "医疗导视"]},
        {id: 14, title: "工程监理", icon: "&#xe67f;", field: "", bidArr: ["公园标牌", "地铁标识", "旅游保障", "电力广告", "银行灯箱", "医疗导视"]},
        {id: 15, title: "弱电工程", icon: "&#xe67e;", field: "", bidArr: ["公园标牌", "地铁标识", "旅游保障", "电力广告", "银行灯箱", "医疗导视"]},
        {id: 16, title: "维修维保", icon: "&#xe688;", field: "", bidArr: ["公园标牌", "地铁标识", "旅游保障", "电力广告", "银行灯箱", "医疗导视"]},
        {id: 17, title: "物业服务", icon: "&#xe684;", field: "", bidArr: ["公园标牌", "地铁标识", "旅游保障", "电力广告", "银行灯箱", "医疗导视"]},
        {id: 18, title: "食材采购", icon: "&#xe68a;", field: "", bidArr: ["公园标牌", "地铁标识", "旅游保障", "电力广告", "银行灯箱", "医疗导视"]},
      ],
      tabList: ["覆盖行业", "支持软件", "成功案例"],
      industryList: ["交通运输", "石油化工", "市政基建", "环保绿化", "水利工程", "冶金矿产", "弱电安防", "电力工程", "工程建筑", "农林牧渔"],
      softwareList: [
        {id: 1, img: "img/myApp/img_rj1.png"},
        {id: 2, img: "img/myApp/img_rj2.png"},
        {id: 3, img: "img/myApp/img_rj3.png"},
        {id: 4, img: "img/myApp/img_rj4.png"},
        {id: 5, img: "img/myApp/img_rj5.png"},
        {id: 6, img: "img/myApp/img_rj6.png"},
        {id: 7, img: "img/myApp/img_rj7.png"},
        {id: 8, img: "img/myApp/img_rj8.png"},
      ],
      successCaseList: [
        {
          id: 1,
          img: "img/myApp/img_cgal1.png",
          title: "北京***赛事场馆项目",
          pProject: "***三个场馆总建筑面积24.75万平方米",
          pPrice: "20亿余元",
          pAdvice: "初步设计概算",
          pInfo: "本项目包括冬季两项中心建筑面积9万余平方米；**跳台滑雪中心建筑面积3万余平方米；越野滑雪中心建筑面积11万余平方米。"
        },
        {
          id: 2,
          img: "img/myApp/img_cgal2.png",
          title: "***办公用房工程",
          pProject: "1万多平方米",
          pPrice: "1.8亿余元",
          pUnit: "****管理局",
          pAdvice: "全过程跟踪审计",
          pInfo: "项目位于北京市****大街，本工为整体加固改造项目，包括办公楼、职工食堂、变配电室、门卫用房、机械停车楼等项目包括结构加固、楼内外整体装饰改造、室外庭院铺装等。"
        },
        {
          id: 3,
          img: "img/myApp/img_cgal3.png",
          title: "**水库**公园建设二期工程",
          pProject: "总建设面积**公顷，其中湿地面积**公顷",
          pPrice: "2亿余元",
          pAdvice: "投资评审",
          pInfo: "工程位于**省怀来**水库，湿地公园占地**公顷。项目包括湿地公园的园路及绿化工程、行车路、停车场、接驳站、湿地户外科普基地、污水处理等项目。"
        },
      ],
      bannerList: [
        {id: 1, title: "能源电力", icon: "", img: "img/myApp/img_cont_nydl.png"},
        {id: 2, title: "机械设备", icon: "", img: "img/myApp/img_cont_jxsb.png"},
        {id: 3, title: "劳务外包", icon: "", img: "img/myApp/img_cont_lwwb.png"},
        {id: 4, title: "咨询服务", icon: "", img: "img/myApp/img_cont_zxfw.png"},
      ],
      processList: [
        {id:1, icon: "img/myApp/icon_xd.png", title: "下单", text: "根据招标文件内容<br>提供标书报价和交付时间"},
        {id:2, icon: "img/myApp/icon_zlqd.png", title: "资料清单", text: "根据招标文件的评分要求整<br>理资料清单"},
        {id:3, icon: "img/myApp/icon_bznr.png", title: "编制内容", text: "根据招标评分标准<br>编制技术标、商务标"},
        {id:4, icon: "img/myApp/icon_nrsh.png", title: "内容审核", text: "严格按照评分要求<br>对商务和技术部分逐项审核"},
        {id:5, icon: "img/myApp/icon_jfwd.png", title: "交付文档", text: "严格质量，终稿交付前<br>将会进行二次审核"},
        {id:6, icon: "img/myApp/icon_shbz.png", title: "售后保障", text: "开标前<br>免费提供开标指导"},
      ],
      teacherList: [
        {id: 1, teacherName: "蔡老师", years: "9年", project: "采购类、服务类", price: "15亿", num: "1467例" },
        {id: 2, teacherName: "汪老师", years: "9年", project: "采购类、服务类", price: "15亿", num: "1467例" },
        {id: 3, teacherName: "张老师", years: "9年", project: "采购类、服务类", price: "15亿", num: "1467例" },
        {id: 4, teacherName: "李老师", years: "9年", project: "采购类、服务类", price: "15亿", num: "1467例" },
      ],
      activeIndex: 0,
      activeIndex2: 0,
      activeTab: 0,
      activeBanner: 0,
    }
  },
  computed: {
    setBiddingList(){
      let arr = [];
      for (let i = 0; i < 9; i++) {
        let temp = [];
        temp.push(this.biddingList[i]);
        temp.push(this.biddingList[i+9]);
        arr.push(temp)
      }
      return arr;
    },
    classOption() {
      return {
        step: 0.5, // 数值越大速度滚动越快
        limitMoveNum: 4, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        // openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0 // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
      };
    }
  },
  created() {
    this.userInfoDetail = JSON.parse(this.getStore("userInfo"));
    this.userInfo.username = this.userInfoDetail.nickname;
    this.userInfo.userType = this.userInfoDetail.type == 1?'管理员':'普通用户';
    this.userInfo.members = this.userInfoDetail.memberType;
    this.userInfo.dueDate = this.userInfoDetail.expireTime;
    this.userInfo.customer = this.userInfoDetail.contact;
    this.userInfo.contactPhone = this.userInfoDetail.contactPhone;
    this.userInfo.avatar = this.userInfoDetail.avatar;
    console.log(this.setBiddingList)
  },
  methods: {
    setActiveBidding(index,i){
      this.activeIndex = index;
      this.activeIndex2 = i;
    },
    viewNow(){
      window.open("https://www.chinabidding.cn/public/yuanbo/html/products.html?ptype=0")
    },
    viewMore(){
      window.open("https://www.chinabidding.cn/public/yuanbo/html/products.html?ptype=6")
    },
    consultline(){
      let url = "https://www14.53kf.com/webCompany.php?arg=10711971&kf_sign=jAwODMTY3NE5MzI0ODIzMTQ4NTQwMjcyNzExOTcx&style=1"
      window.open(
          url,
          "",
          "height=625,width=750,top=195,left=585,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=yes, status=no"
      );
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
.card {
  height: 100%;
  margin-bottom: 20px;
  //box-shadow: 5px 5px 3px #88888873;
  box-shadow: none;
  border: none;
  /deep/ .ivu-card-body {
    padding: 16px 16 / @vw;
  }
}
.card:hover {
  //box-shadow: 5px 5px 3px #88888873;
  box-shadow: none;
}
.tender {
  display: flex;
  .left {
    width: 79%;
    min-width: 780px;
    .topBg {
      margin-top: 1px;
      width: 100%;
      height: 384px;
      background: url("../../../assets/myApp/icon_top_banner.png") no-repeat center;
      background-size: 100% 100%;
      position: relative;
      .purpose {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 120px;
        background: rgba(0,0,0,.5);
        .purpose-title {
          position: absolute;
          left: 40px;
          width: 169px;
          height: 120px;
          background: #2D63FF;
          h3 {
            margin: 16px 0 0 32px;
            font-size: 20px;
            font-family: Noto Sans SC-Regular, Noto Sans SC;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 29px;
          }
          .hen {
            margin: 20px 0 0 32px;
            width: 39px;
            height: 2px;
            background: #FFFFFF;
          }
        }
        .purpose-list {
          position: absolute;
          left: 262px;
          top: 16px;
          width: calc(100% - 355px);
          height: 88px;
          display: flex;
          li {
            width: 33%;
            text-align: center;
            h4 {
              margin-top: 10px;
              font-size: 20px;
              font-family: Microsoft YaHei UI-Regular, Microsoft YaHei UI;
              font-weight: 400;
              color: #FFFFFF;
              line-height: 23px;
            }
          }
        }
      }
    }
    .ghost {
      width: 100%;
      height: 461px;
      background: linear-gradient(180deg, #FFFFFF 0%, #F7FAFF 100%);
      padding: 40px 30px;
      display: flex;
      li {
        width: 16.6%;
        height: 100%;
        margin: 0 8px;
        background: #FFFFFF;
        border: 1px solid #E8E8E8;
        .img {
          width: 100%;
          height: 130px;
        }
        .ghost-content {
          width: 100%;
          padding-left: 17px;
          h3 {
            margin-top: 20px;
            margin-bottom: 18px;
            font-size: 18px;
            font-family: Microsoft YaHei UI-Regular, Microsoft YaHei UI;
            font-weight: 400;
            color: #333333;
            line-height: 21px;
          }
          p {
            margin-top: 14px;
            font-size: 14px;
            font-family: Microsoft YaHei UI-Regular, Microsoft YaHei UI;
            font-weight: 400;
            color: #666666;
            line-height: 16px;
            .duigou {
              display: inline-block;
              vertical-align: top;
              width: 16px;
              height: 16px;
              background: url("../../../assets/myApp/icon_gou.png");
              background-size: 100% 100%;
              margin-right: 6px;
            }
          }
          .ghost-btn {
            margin-top: 24px;
            width: calc(100% - 34px);
            height: 34px;
            border: 1px solid #2D63FF;
            text-align: center;
            line-height: 34px;
            cursor: pointer;
            font-size: 14px;
            font-family: Microsoft YaHei UI-Regular, Microsoft YaHei UI;
            font-weight: 400;
            color: #2D63FF;
          }
        }
      }
    }
    .writeBidding {
      padding-top: 1px;
      width: 100%;
      height: 480px;
      background: #FFFFFF;
      .bidding-list {
        margin: 30px 40px 0 40px;
        width: calc(100% - 80px);
        height: 312px;
        display: flex;
        //box-shadow: 5px 5px 3px #88888873;
        box-shadow: 0px -5px 10px 0px #E8E8E8,
                    -6px 0px 6px 0px #E8E8E8,
                    6px 0px 6px 0px #E8E8E8,
                    0px 5px 19px 0px #E8E8E8;
        li {
          width: 10.4%;
          height: 100%;
          //border: 1px solid #E8E8E8;
          //margin-left: -1px;
          .item-li {
            width: 100%;
            height: 156px;
            border: 1px solid #E8E8E8;
            //margin-top: -1px;
            //margin-right: -1px;
            cursor: pointer;
            border-right: none;
            border-bottom: none;
            h4 {
              margin-top: 24px;
              margin-left: 20px;
              font-size: 18px;
              font-family: Microsoft YaHei UI-Regular, Microsoft YaHei UI;
              font-weight: 400;
              color: #333333;
              line-height: 21px;
            }
            .item-icon {
              margin-top: 64px;
              margin-left: 20px;
              display: inline-block;
              font-size: 20px;
            }
          }
          .item-li:nth-child(2){
            border-bottom: 1px solid #E8E8E8;
          }
        }
        li:nth-child(9){
          .item-li {
            border-right: 1px solid #E8E8E8;
          }
        }
        .active {
          width: 16.8%;
          height: 312px;
          background: #2D63FF;
          border: 1px solid #2D63FF;
          //margin-top: -1px;
          padding-top: 24px;
          padding-left: 32px;
          position: relative;
          overflow: hidden;
          h4 {
            font-size: 18px;
            font-family: Microsoft YaHei UI-Regular, Microsoft YaHei UI;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 21px;
            margin-bottom: 20px;
          }
          p {
            font-size: 16px;
            font-family: Microsoft YaHei UI-Regular, Microsoft YaHei UI;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 19px;
            margin-bottom: 10px;
          }
          .more-btn {
            position: absolute;
            font-size: 12px;
            font-family: Noto Sans SC-Regular, Noto Sans SC;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 14px;
            bottom: 23px;
            right: 32px;
            cursor: pointer;
          }
          .activeIcon {
            position: absolute;
            color: #3E6FFF;
            top: 50px;
            right: -162px;
            font-size: 122px;
          }
        }
      }
    }
    .project {
      width: 100%;
      min-height: 462px;
      background: #F4F7FC;
      .project-tabs {
        margin-top: 30px;
        margin-left: 12px;
        width: calc(100% - 52px);
        height: 64px;
        display: flex;
        .item-tab {
          width: 33.3%;
          height: 100%;
          margin-left: 28px;
          background: #F0F0F0;
          font-size: 18px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #333333;
          line-height: 64px;
          text-align: center;
          cursor: pointer;
        }
        .activeTab {
          background: #2D63FF;
          color: #FFFFFF;
          position: relative;
        }
        .activeTab::after {
          position: absolute;
          content: "";
          width: 0;
          height: 0;
          border: 17px solid transparent;
          border-top-color: #2D63FF;
          bottom: -28px;
          left: 50%;
          transform: translateX(-50%);
        }
      }
      .industry {
        padding: 16px 0;
        margin: 42px 77px 0 77px;
        width: calc(100% - 154px);
        height: 166px;
        //display: grid;
        //grid-template-columns: repeat(5, 13.33%);
        //column-gap: 8.33%;
        //row-gap: 40px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .industry-item {
          width: 13.33%;
          margin-right: 8.33%;
          margin-bottom: 40px;
          background: #FFFFFF;
          border-radius: 4px 4px 4px 4px;
          border: 1px solid #E8E8E8;
          height: 47px;
          font-size: 16px;
          font-family: Noto Sans SC-Regular, Noto Sans SC;
          font-weight: 400;
          color: #333333;
          line-height: 45px;
          text-align: center;
        }
        .industry-item:nth-child(5n){
          margin-right: 0;
        }
      }
      .software {
        margin: 42px 49px 0 49px;
        width: calc(100% - 98px);
        height: 188px;
        //display: grid;
        //grid-template-columns: repeat(4, 22.62%);
        //column-gap: 3.17%;
        //row-gap: 28px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .software-item {
          width: 22.62%;
          margin-right: 3.17%;
          margin-bottom: 28px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .software-item:nth-child(4n){
          margin-right: 0;
        }
      }
      .successcase {
        margin: 42px 40px 40px 40px;
        width: calc(100% - 80px);
        height: 452px;
        display: flex;
        background: #FFFFFF;
        .case-item {
          width: 33.3%;
          height: 100%;
          .case-img {
            position: relative;
            img {
              width: 100%;
              height: 226px;
              display: block;
            }
            .img-title {
              left: 0;
              bottom: 0;
              position: absolute;
              padding: 0 16px;
              height: 36px;
              background: #2D8EFF;
              font-size: 16px;
              font-family: Microsoft YaHei-Regular, Microsoft YaHei;
              font-weight: 400;
              color: #FFFFFF;
              line-height: 36px;
            }
          }
          .case-cont {
            width: 100%;
            height: 226px;
            padding: 32px 24 / @vw;
            p {
              margin-bottom: 10px;
              font-size: 14px;
              font-family: Microsoft YaHei-Regular, Microsoft YaHei;
              font-weight: 400;
              color: #333333;
              line-height: 21px;
              span {
                color: #666666;
              }
            }
          }
          .cont-flex {
            display: flex;
          }
        }
      }
    }
    .customer {
      padding-top: 1px;
      width: 100%;
      height: 546px;
      background: url("../../../assets/myApp/img_cont_bg2.png") no-repeat;
      background-size: 100% 100%;
      .banner  {
        margin: 32px 39px 0 39px;
        min-height: 368px;
        width: calc(100% - 78px);
        display: flex;
      }
      .banner-nav {
        width: 220px;
        //height: 100%;
        li {
          //width: 220px;
          width: 220px;
          min-width: 190px;
          height: 74px;
          background: #FFFFFF;
          border: 1px solid #E8E8E8;
          border-left: 4px solid #D9D9D9;
          margin-bottom: 24px;
          font-size: 18px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #333333;
          line-height: 74px;
          padding-left: 50 / @vw;
          cursor: pointer;
          .nav-icon {
            display: inline-block;
            margin-right: 12px;
            width: 28px;
            height: 28px;
            color: #2D63FF;
            font-size: 22px;
          }
        }
        .activeBanner {
          width: 310px;
          min-width: 275px;
          height: 74px;
          background: #2D63FF;
          border: 1px solid #2D63FF;
          border-left: 4px solid #72D5FF;
          position: relative;
          color: #fff;
          .nav-icon {
            color: #fff;
          }
          .shu {
            margin: 0 43px;
            display: inline-block;
            height: 36px;
            width: 0px;
            opacity: 0.2;
            border: 1px solid #FFFFFF;
            vertical-align: middle;
          }
        }
      }
      .banner-img {
        margin-left: 24px;
        width: calc(100% - 244px);
        height: 368px;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .process {
      padding-top: 1px;
      width: 100%;
      height: 413px;
      background: #ffffff;
      .process-list {
        margin: 32px 40px 0 40px;
        width: calc(100% - 80px);
        height: 229px;
        display: flex;
        li {
          width: 16.66%;
          height: 100%;
          margin-right: 28px;
          text-align: center;
          position: relative;
          h4 {
            margin-top: 18px;
            font-size: 18px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #333333;
          }
          p {
            margin-top: 16px;
            font-size: 14px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #666666;
            line-height: 22px;
          }
          .next {
            position: absolute;
            top: 52px;
            right: -24px;
            color: #2D63FF;
            font-size: 24px;
          }
        }
        li:nth-child(6){
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
      height: 420px;
    }
    .activity {
      width: 100%;
      height: 343px;
      .imgBox {
        margin-top: 20px;
        width: 100%;
        height: 261px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .teacher {
      height: 810px;
      .teacherList {
        margin-top: 10px;
        width: 100%;
        height: 692px;
        overflow-y: hidden;
        li {
          margin: 20px 0;
          width: 100%;
          height: 202px;
          background: #F6F6F6;
          padding: 24px 0 0 25px;
          .underline {
            font-size: 18px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #333333;
            position: relative;
            display: inline-block;
            margin-bottom: 29px;
          }
          .underline::after {
            left: 0;
            bottom: 0;
            content: "";
            position: absolute;
            width: 100%;
            height: 6px;
            background: #3F6EF5;
            opacity: 0.5;
          }
          p {
            font-size: 14px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #333333;
            line-height: 16px;
            margin-bottom: 8px;
            span {
              display: inline-block;
              width: 84px;
              color: #999999;
            }
          }
        }
      }
      .consult {
        width: 100%;
        height: 34px;
        margin-top: 15px;
      }
    }
    .certificate {
      width: 100%;
      height: 575px;
      ul {
        margin-top: 12px;
      }
      li {
        width: 100%;
        height: 50px;
        border-bottom: 1px dotted #E8E8E8;
        line-height: 50px;
        font-size: 15px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #333333;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
      }
    }
  }

  .title {
    margin: 42px auto 0 auto;
    min-width: 112px;
    height: 52px;
    text-align: center;
    h3 {
      font-size: 28px;
      font-family: Noto Sans SC-Regular, Noto Sans SC;
      font-weight: 400;
      color: #333333;
      line-height: 33px;
    }
    .hen {
      margin: 14px auto 0 auto;
      width: 44px;
      height: 3px;
      background: #2D63FF;
    }
  }
  .verticalBar {
    width: 100%;
    height: 20px;
    font-size: 20px;
    font-family: Microsoft YaHei-Bold, Microsoft YaHei;
    font-weight: bold;
    color: #333333;
    line-height: 19px;
    span {
      margin-right: 10px;
      display: inline-block;
      width: 4px;
      height: 20px;
      background: #3F6EF5;
      vertical-align: top;
    }
    p {
      float: right;
      font-size: 16px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #999999;
      line-height: 19px;
    }
  }
}
</style>