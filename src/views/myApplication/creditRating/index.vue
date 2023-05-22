<template>
  <div>
    <div class="home">
      <div class="myteam">
        <span class="active">我的征信情况</span>
      </div>
      <div class="myCont">
        <section class="left">
          <Card class="card stratorList">
            <div class="company">
              <img style="width: 128px; height: 128px" src="img/myApp/qytx_img.png" alt="">
              <div class="company_right">
                <h3>公司名称： <span style="color: #333333">北京国信创新科技股份有限公司</span></h3>
                <h3>信用星级：</h3>
                <Input class="search" v-model="searchValue" placeholder="输入公司名称查自己、查竞对，缩短中标差距">
                  <span slot="prepend">查征信</span>
                  <Button slot="append" @click="search">立即查询</Button>
                </Input>
              </div>
            </div>
            <!--    未办理资质和已办理资质        -->
            <div v-if="!isFreeMember">
              <div v-if="!isFreeMember" class="manage">
                <CertificationBox class="cer_not" ></CertificationBox>
                <CertificationBox class="cer_has" title="已办理资质"></CertificationBox>
              </div>
              <div v-if="!isFreeMember" class="moreBtn" @click="knowMore">我想了解更多 ></div>
            </div>
            <!--    证书示例        -->
            <div v-if="isFreeMember">
              <div class="hint">
                <h3>
                  <Icon type="ios-information-circle"/>
                  您公司 <span class="red">未办理</span> 任何 <span class="red">资信证明</span> ，会影响您的评标得分，建议您及时办理！
                </h3>
                <Button class="btn" type="warning" @click="btnClick">我要预评</Button>
              </div>
              <div style="width: 100%; height: 20px; background: #F3F7FA; margin: 40px 0 31px 0"></div>
              <div class="comTitle">
                <div>
                  <span class="left1"></span>
                  <span class="left2"></span>
                </div>
                <h2>证书示例</h2>
                <div>
                  <span class="right1"></span>
                  <span class="right2"></span>
                </div>
              </div>
              <vue-seamless-scroll
                  :data="listData"
                  :class-option="classOption"
                  class="warp"
              >
                <ul class="cateImgList">
                  <li v-for="(item,index) in 5" :key="item" class="sample">
                    <div class="sample-title">重质量守信用</div>
                    <img class="sample-img" src="img/myApp/cxjysfdw.png" alt="">
                    <div class="sample-info">
                      <h4>证书介绍</h4>
                      <p style="text-align: left">
                        质量、服务、诚信是企业发展的三大要素，是企业成功的重要标志。有助于提升企业的竞争力、增强企业的品牌价值、提高企业品牌的知名度及其影响力，是企业长期、健康发展的有力保障
                      </p>
                      <h4>适用范围</h4>
                      <p>
                        招商加盟、品牌形象宣传
                      </p>
                    </div>
                  </li>
                </ul>
              </vue-seamless-scroll>
            </div>
            <div class="year">
              <ul>
                <li v-for="(item,index) in yearList" :key="index">
                  <h2>{{item.num}}<span>{{ item.unit }}</span></h2>
                  <span>{{item.text}}</span>
                </li>
              </ul>
            </div>
            <div class="comTitle">
              <div>
                <span class="left1"></span>
                <span class="left2"></span>
              </div>
              <h2>AAA办理流程</h2>
              <div>
                <span class="right1"></span>
                <span class="right2"></span>
              </div>
            </div>
            <div class="process">
              <div class="list-item" v-for="(item,index) in processList" :key="index">
                <img :src="item.url" alt="">
                <h3>{{ item.title }}</h3>
                <p>{{item.content}}</p>
                <img v-if="index !== processList.length -1" class="nextImg" src="img/myApp/lc_img6.png" alt="">
              </div>
            </div>
            <div class="moreBtn" @click="knowMore">我想了解更多 ></div>
          </Card>
        </section>
        <section class="right">
          <Card class="card userInfo">
            <UserInfo
                :userInfo="userInfo"
            ></UserInfo>
          </Card>
          <Card class="card activity">
            <div class="shu"><span></span>活动专区</div>
            <Carousel class="shuffling" autoplay v-model="carouselValue" loop arrow="never" dots="outside">
              <CarouselItem v-for="(item,index) in 3" :key="index">
                <div class="demo-carousel"></div>
              </CarouselItem>
            </Carousel>
          </Card>
          <Card class="card certificate">
            <div class="shu"><span></span>证书公示 <p>更多></p></div>
            <ul>
              <li v-for="(item,index) in 8" :key="index">
                四川中字合泰工程咨询工程咨询有限公...
              </li>
            </ul>
          </Card>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import UserInfo from "../../homepage/components/userInfo"
import CertificationBox from "./components/certificationBox"
import vueSeamlessScroll from "vue-seamless-scroll";

export default {
  components: {
    UserInfo,
    CertificationBox,
    vueSeamlessScroll
  },
  data() {
    return {
      userInfo: {
        avatar: "",
        username: '用户名',
        userType: '管理员',
        members: 'VIP会员',
        dueDate: '2023-5-19',
        customer: '周小鑫',
        contactPhone: '13255687359'
      },
      userInfoDetail: {},
      searchValue: "",
      yearList: [
        {id: 1, num: 20, unit: "年", text: "专业招投标服务商"},
        {id: 1, num: 0, unit: "元", text: "免费预评"},
        {id: 1, num: 24, unit: "h", text: "一对一服务"},
        {id: 1, num: 72, unit: "h", text: "高效办理"},
      ],
      processList: [
        {id: 1, url: "img/myApp/lc_img1.png", title: "线上咨询", content: "专业、耐心、细致 的服务"},
        {id: 2, url: "img/myApp/lc_img2.png", title: "专业顾问", content: "专业顾问一对一对接 为您精确分析企业情况"},
        {id: 3, url: "img/myApp/lc_img3.png", title: "签订合同", content: "确定AAA办理相关事项 提供办理方案"},
        {id: 4, url: "img/myApp/lc_img4.png", title: "材料准备", content: "企业提供资料及情况 准备全部办理材料"},
        {id: 5, url: "img/myApp/lc_img5.png", title: "证书下发", content: "证书闪电上报，跟踪审核结果，第一时间邮寄"},
      ],
      carouselValue: 0,
      cateList: [
        {id:1, title: "四川中字合泰工程咨询有限公司"},
        {id:2, title: "四川中字合泰工程咨询工程咨询有限公..."},
        {id:3, title: "四川中字合泰工程咨询有限公司"},
        {id:4, title: "四川中字合泰工程咨询有限公司"},
        {id:5, title: "四川中字合泰有限公司"},
        {id:6, title: "四川中字合泰工程咨询工程咨询有限公..."},
        {id:7, title: "四川中字合泰工程咨询工程咨询有限公..."},
        {id:8, title: "四川中字合泰工程咨询工程咨询有限公..."},
      ],
      listData: [{},{},{},{},{}]
    }
  },
  computed: {
    isFreeMember(){
      let temp = false;
      if (JSON.parse(this.getStore("userInfo")).memberType == "免费会员") temp = true;
      return temp;
    },
    classOption() {
      return {
        step: 0.5, // 数值越大速度滚动越快
        limitMoveNum: 4, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 2, // 0向下 1向上 2向左 3向右
        // openWatch: true, // 开启数据实时监控刷新dom
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
  },
  methods: {
    search(){
      window.open("https://www.ybcredit.com.cn/search/creditlist.html",)
    },
    knowMore(){
      window.open("https://www.ybcredit.com.cn",)
    },
    btnClick(){
      let url = "https://www14.53kf.com/webCompany.php?arg=10711951&kf_sign=jI1MDMTY3NM1MDE1MjU1NTk4MjYzMDAzNzI3MTE5NTE%253D&style=1"
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

.home {
  width: 100%;
  margin-bottom: 10px;
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
  .myteam {
    span{
      font-size: 16px;
      font-family: "Microsoft YaHei-Regular";
      width: 135px;
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
    /deep/ .ivu-card-body {
      padding: 16px 0;
    }
    //非管理员部分
    .stratorList {
      width: 100%;
      border-top-left-radius: 0 0;
      .company {
        width: 80%;
        height: 128px;
        margin-top: 16px;
        margin-left: 40px;
        display: flex;
        .company_right{
          margin-left: 25px;
          height: 100%;
          width: 80%;
          h3 {
            font-size: 18px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #666666;
            line-height: 21px;
            margin-bottom: 19px;
          }
          .search {
            //width: 624px;
            height: 48px;
            font-size: 16px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            /deep/ .ivu-input {
              height: 48px;
              border-color: #3F6EF5;
              background: #FBFBFB;
            }
            /deep/ .ivu-input-group-prepend {
              background: #F4F7FF;
              border-color: #3F6EF5;
              padding: 0 15px;
            }
            /deep/ .ivu-input-group-append {
              width: 128px;
              border-color: #3F6EF5;
              background: #3F6EF5;
              .ivu-btn {
                font-size: 18px;
                font-family: Microsoft YaHei-Regular, Microsoft YaHei;
                font-weight: 400;
                color: #FFFFFF;
              }

            }
          }
        }
      }
      .manage {
        margin: 30px 40px 30px 40px;
        height: 407px;
        display: flex;
        .cer_not {
          flex: 1;
          height: 100%;
          margin-right: 17px;
        }
        .cer_has {
          flex: 1;
          height: 100%;
          margin-left: 17px;
        }
      }
      .year {
        margin: 35px 0  40px 0;
        width: 100%;
        height: 136px;
        border: 1px solid;
        background: url("../../../assets/myApp/credit_bg2.png");
        background-size: 100% 100%;
        ul {
          width: 90%;
          margin: 0 auto;
          display: flex;
          li {
            width: 25%;
            text-align: center;
            h2 {
              margin-top: 12px;
              font-size: 48px;
              font-family: Microsoft YaHei-Regular, Microsoft YaHei;
              font-weight: 400;
              color: #FFFFFF;
            }
            span {
              font-size: 16px;
              font-family: Microsoft YaHei-Regular, Microsoft YaHei;
              font-weight: 400;
              color: #FFFFFF;
              line-height: 19px;
            }
          }
        }
      }
      .process {
        margin: 40px auto 32px auto;
        width: 90%;
        height: 228px;
        //display: grid;
        //grid-template-columns: repeat(5, 154px);
        //column-gap: calc(21% - 154px);
        display: flex;
      }
      .list-item {
        margin-right: calc(21% - 154px);
        width: 154px;
        height: 222px;
        text-align: center;
        position: relative;
        h3 {
          font-size: 18px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #333333;
          line-height: 21px;
          margin: 10px 0;
        }
        p {
          font-size: 14px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #999999;
          line-height: 16px;
          margin: 0 6px;
        }
        .nextImg {
          position: absolute;
          top: 0;
          right: -68 / @vw;
        }
      }

      .hint {
        height: 79px;
        border: 1px solid #FFB800;
        margin: 30px 40px 0 40px;
        background: #FFFBF2 url("../../../assets/myApp/credit_bg1.png");
        background-size: 100% 100%;
        position: relative;
        h3 {
          margin-left: 20px;
          font-size: 26px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #333333;
          line-height: 77px;
          .ivu-icon {
            color: #FFB800;
          }
          .red {
            color: #FF3E3E;
          }
        }
        .btn {
          position: absolute;
          right: 22px;
          top: 24px;
          background-color: #F8B407;
          border-color: #F8B407;
          font-size: 16px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #FFFFFF;
        }
      }
      .cateImgList {
        padding: 0;
        margin: 0 auto;
        display: flex;
        .sample {
          margin-right: 20px;
          //display: inline-block;
          width: 320px;
          height: 275px;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          .sample-title {
            width: 100%;
            height: 50px;
            background: #F6F6F6;
            text-align: center;
            font-size: 18px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #333333;
            line-height: 50px;
          }
          .sample-info {
            position: absolute;
            top: 275px;
            width: 100%;
            height: 225px;
            background: #3F6EF5;
            text-align: center;
            padding: 5px 29px 0 29px;
            transition: .5s;
            h4 {
              margin-top: 12px;
              font-size: 14px;
              font-family: Microsoft YaHei-Bold, Microsoft YaHei;
              font-weight: bold;
              color: #FFFFFF;
              line-height: 16px;
            }
            p {
              margin-top: 10px;
              font-size: 13px;
              font-family: Microsoft YaHei-Regular, Microsoft YaHei;
              font-weight: 400;
              color: #FFFFFF;
              line-height: 20px;
            }
          }
          &:hover .sample-info {
            top: 50px;
            transition: .5s;
          }
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
    .activity {
      width: 100%;
      //width: 312px;
      height: 364px;
      padding-top: 5px;
      .shuffling {
        margin-top: 20px;
        /deep/ .ivu-carousel-dots-outside {
          margin-top: 10px;
        }
      }
      .demo-carousel {
        width: 100%;
        height: 255px;
        background: url("../../../assets/myApp/img_huodong.png") no-repeat;
        background-size: 100% 100%;
      }
    }
    .certificate {
      width: 100%;
      //width: 312px;
      height: 475px;
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

}

.moreBtn {
  margin: 0 auto;
  width: 171px;
  height: 50px;
  background: #F8B407;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  font-size: 18px;
  font-family: Noto Sans SC-Bold, Noto Sans SC;
  font-weight: bold;
  color: #FFFFFF;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
}

.comTitle {
  margin: 0 auto;
  width: 295px;
  height: 48px;
  h2 {
    vertical-align: middle;
    display: inline-block;
    font-size: 28px;
    font-family: Noto Sans SC-Bold, Noto Sans SC;
    font-weight: bold;
    color: #333333;
    line-height: 48px;
    margin: 0 22px;
  }
  >div {
    vertical-align: middle;
    display: inline-block;
    width: 36px;
    height: 16px;
    position: relative;
    span {
      display: inline-block;
      position: absolute;
      height: 4px;
      background: #3F6EF5;
      border-radius: 27px 27px 27px 27px;
      opacity: 0.1;
    }
    .left1 {
      width: 24px;
      right: 0;
      top: 0;
    }
    .left2 {
      width: 36px;
      right: 0;
      bottom: 0;
    }
    .right1 {
      width: 36px;
      top: 0;
      left: 0;
    }
    .right2 {
      width: 24px;
      bottom: 0;
      left: 0;
    }
  }
}

.shu {
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

.warp {
  width: calc(100% - 80px);
  margin: 35px 40px 40px 40px;
  overflow: hidden;
  height: 275px;
}
</style>