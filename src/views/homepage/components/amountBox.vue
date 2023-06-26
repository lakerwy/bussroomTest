<!--
 * @Author: 付柏磊
 * @Date: 2023-03-15 10:12:46
 * @LastEditors: 付柏磊
 * @LastEditTime: 2023-03-15 10:12:46
 * @Description: 优惠券模块组件
-->
<template>
  <Card class="card couponAmount" v-if="memberType != '免费会员' || yhqList.length">
    <h3 class="h3-title" style="margin-bottom: 15px">优惠券专区</h3>
    <div v-if="yhqList.length" @mouseenter="enterYhq" @mouseleave="leaveYhq">
      <transition name="imgs">
        <div v-for="(item,index) in yhqList" :key="index" v-if="index==value2">
          <div class="yhqBg" :style="{backgroundImage: 'url('+item.img+')', backgroundSize: '100% 100%'}">
            <div class="price">
              <span>¥</span>{{ item.price }}
              <div class="shu"></div>
            </div>
            <div class="title">
              <h2>{{ item.title }}</h2>
              <h3>有效期：{{item.date}}</h3>
              <img v-if="item.status == '1'" class="yhq-used" :src="item.price!=0?'img/img-ygq.png':'img/img-ysy.png'" alt="">
            </div>
          </div>
          <div class="description">
            <p>使用说明：</p>
            <p>1、本优惠券需在使用截止日期前消费使用；</p>
            <p>2、本优惠券不予兑换现金；</p>
            <p>3、{{item.title=="代写标书券"?"本优惠券可以购买标书制作产品；":"本优惠券可购买产品需咨询您的专属客服，查询获得/消耗记录；"}}</p>
            <p>4、该优惠券最终解释权归采购与招标网所有。</p>
          </div>
        </div>
      </transition>
      <ul class="yhqView">
        <li v-for='(item,index) in yhqList.length' @mouseover='select(index)' :class='{con:index==value2}'><button type="button" class=""></button></li>
      </ul>
    </div>
    <div class="noYhq" v-else>
      <div class="wyhq">
        <img src="img/img_wyhq.png" alt="">
        <h2>您目前暂无可使用优惠券！</h2>
        <h3>具体获得形式可咨询您的专属客服！</h3>
      </div>
      <div class="description">
        <p>使用说明：</p>
        <p>1、本优惠券需在使用截止日期前消费使用；</p>
        <p>2、本优惠券不予兑换现金；</p>
        <p>3、本优惠券可购买产品需咨询您的专属客服，查询获得/消耗记录；</p>
        <p>4、该优惠券最终解释权归采购与招标网所有。</p>
      </div>
    </div>
  </Card>
</template>

<script>
// import {getSwsuserInfo as userInfo} from "@/api/account";
import {getSwsuserInfo as userInfo} from "@/api_new/index"

export default {
  name: "amountBox",
  data(){
    return{
      value2: 0,
      yhqList: [
        // {id: 1, title: "代写标书券", img: "img/img_sws2.0_dxbsq1.png", price: 1000, date: "2023.03.22"},
        // {id: 2, title: "代金券", img: "img/img_sws2.0_djq2.png", price: 500, date: "2023.03.22"},
        // {id: 3, title: "消费券", img: "img/img_sws2.0_yhq3.png", price: 5000, date: "2023.03.22"},
        // {id: 4, title: "代写标书券", img: "img/img_sws2.0_zh1.png", price: 0, date: "2023.03.22"},
        // {id: 5, title: "代金券", img: "img/img_sws2.0_dxbsq1.png", price: 500, date: "2023.03.22"},
      ],
      memberType: "",
    }
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    // 获取用户信息
    async getUserInfo() {
      // userInfo().then((res) => {
      //   if (res.success) {
      //     let endDate = new Date(
      //         new Date().getTime() + 24 * 60 * 60 * 1000 - 1
      //     );
      //     // 避免超过大小限制
      //     delete res.result.permissions;
      //     Cookies.set("userInfo", JSON.stringify(res.result), {
      //       expires: endDate,
      //     });
      //     let userInfo = res.result;
      //     this.memberType = userInfo.memberType;
      //     // flag 优惠券类型  1代金券 2消费券 3代写标书券  status 状态 0上线 1失效 2下线
      //     if (userInfo.voucherUsers.length){
      //       this.yhqList = userInfo.voucherUsers.map(item => {
      //         let yhqTitle, yhqImg;
      //         if (item.flag == "1"){
      //           yhqTitle = "代金券";
      //           yhqImg = "img/img_sws2.0_djq2.png";
      //         } else if (item.flag == "2"){
      //           yhqTitle = "消费券";
      //           yhqImg = "img/img_sws2.0_yhq3.png";
      //         } else {
      //           yhqTitle = "代写标书券";
      //           yhqImg = "img/img_sws2.0_dxbsq1.png";
      //         }
      //         if (item.status == "1"){
      //           yhqImg = item.amount?"img/img_sws2.0_zh1.png":"img/img_sws2.0_zh2.png";
      //         }
      //         return {
      //           id: item.id,
      //           title: yhqTitle,
      //           img: yhqImg,
      //           price: item.amount,
      //           date: item.endDate,
      //           status: item.status
      //         }
      //       })
      //       this.timer=setInterval(()=>{
      //         this.nextBg()
      //       },8000)
      //     }
      //   }
      // });
      let res = await userInfo();
      if (res.success) {
        let endDate = new Date(
            new Date().getTime() + 24 * 60 * 60 * 1000 - 1
        );
        // 避免超过大小限制
        delete res.result.permissions;
        Cookies.set("userInfo", JSON.stringify(res.result), {
          expires: endDate,
        });
        let userInfo = res.result;
        this.memberType = userInfo.memberType;
        // flag 优惠券类型  1代金券 2消费券 3代写标书券  status 状态 0上线 1失效 2下线
        if (userInfo.voucherUsers.length){
          this.yhqList = userInfo.voucherUsers.map(item => {
            let yhqTitle, yhqImg;
            if (item.flag == "1"){
              yhqTitle = "代金券";
              yhqImg = "img/img_sws2.0_djq2.png";
            } else if (item.flag == "2"){
              yhqTitle = "消费券";
              yhqImg = "img/img_sws2.0_yhq3.png";
            } else {
              yhqTitle = "代写标书券";
              yhqImg = "img/img_sws2.0_dxbsq1.png";
            }
            if (item.status == "1"){
              yhqImg = item.amount?"img/img_sws2.0_zh1.png":"img/img_sws2.0_zh2.png";
            }
            return {
              id: item.id,
              title: yhqTitle,
              img: yhqImg,
              price: item.amount,
              date: item.endDate,
              status: item.status
            }
          })
          this.timer=setInterval(()=>{
            this.nextBg()
          },8000)
        }
      }
    },
    //优惠券逻辑
    nextBg:function(){
      if(this.value2==this.yhqList.length-1){
        this.value2=0;
      }else{
        this.value2++;
      }
    },
    enterYhq(){
      clearInterval(this.timer);
    },
    leaveYhq(){
      this.timer=setInterval(()=>{
        this.nextBg()
      },8000)
    },
    select(index){
      this.value2=index;
    },
  }
}
</script>

<style scoped lang="less">
.couponAmount {
  /deep/ .ivu-card-body {
    padding-bottom: 5px;
    position: relative;
  }
  min-height: 340px;
  .yhqView{
    bottom: 0px;
    z-index: 10;
    position: relative;
    list-style: none;
    text-align: center;
    padding: 0;
    width: 100%;
    height: 17px;
    display: block;
    margin-top: 3px;
    .con{
      button {
        opacity: 1;
        width: 24px;
      }
    }
  }
  .yhqView li{
    position: relative;
    display: inline-block;
    vertical-align: top;
    text-align: center;
    margin: 0 2px;
    padding: 7px 0;
    cursor: pointer;
    button {
      border: 0;
      cursor: pointer;
      background: #8391a5;
      opacity: .3;
      display: block;
      width: 16px;
      height: 3px;
      border-radius: 1px;
      outline: 0;
      font-size: 0;
      color: rgba(0,0,0,0);
      transition: all .5s;
    }
  }
  .yhqBg {
    max-width: 504.3px;
    margin-bottom: 15px;
    height: 89px;
    display: flex;
    //width: 483px;
    width: 100%;
    background-size: 100% 100%;
    .price {
      height: 89px;
      width: 44.27%;
      font-size: 40 / @vw;
      font-family: DIN-Bold, DIN;
      font-weight: bold;
      color: #FFFFFF;
      line-height: 89px;
      text-align: center;
      span {
        font-size: 24 / @vw;
      }
      position: relative;
      .shu {
        position: absolute;
        width: 1px;
        height: 72px;
        right: 0px;
        top: 11px;
        background-image: linear-gradient(to bottom, #fff 0%, #fff 50%, transparent 50%);
        background-size: 1px 9px;
        background-repeat: repeat-y;
      }
    }
    .title {
      height: 89px;
      width: 55.5%;
      text-align: center;
      position: relative;
      .yhq-used {
        width: 56px;
        height: 43px;
        position: absolute;
        top: 8px;
        right: 3%;
      }
      h2 {
        margin: 0 auto;
        width: 68%;
        font-size: 16px;
        font-family: Noto Sans SC-Medium, Noto Sans SC;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 37px;
        text-align: center;
        border-bottom: 1px solid #FFFFFF;
        margin-top: 12px;
      }
      h3 {
        text-align: center;
        font-size: 12px;
        font-family: Noto Sans SC-Medium, Noto Sans SC;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 26px;
      }
    }
  }
  .description {
    min-height: 146px;
    background: #F8F8F8;
    widht: 100%;
    padding: 15px;
    font-size:12px;
    line-height: 24px;
    p {
      font-size: 12px;
      font-family: Microsoft YaHei UI-Regular, Microsoft YaHei UI;
      font-weight: 400;
      color: #999999;
    }
  }
  .noYhq {
    padding-bottom: 14px;
    .wyhq {
      text-align: center;
      img {
        vertical-align: top;
      }
      h2 {
        font-size: 16px;
        font-family: Microsoft YaHei UI-Bold;
        font-weight: bold;
        color: #666666;
        line-height: 36px;
      }
      h3 {
        font-size: 14px;
        font-family: Microsoft YaHei UI-Regular;
        color: #999999;
        font-weight: normal;
        margin-bottom: 20px;
      }
    }
  }
}

@media (max-width: 1071px) {
  .couponAmount {
    .yhqBg {
      .price {
        font-size: 28px;
        span {
          font-size: 13px;
        }
      }
    }
  }
}

.imgs-enter-active, .slide-leave-active {
  transition: all 1s;
}
.imgs-enter {
  opacity: 0;
}

.imgs-leave-active {
  opacity: 0;
}
</style>