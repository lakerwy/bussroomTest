<template>
  <div class="business">
    <div class="head">
      <div class="head-cont">
        <div class="title">
          <h1>元博商机学院</h1>
          <div class="text">带你玩转<span>招投标</span></div>
        </div>
        <div class="img"></div>
      </div>
      <Input class="search" search enter-button="搜索" placeholder="请输入关键词" />
    </div>
    <div class="content">
      <h3><span class="star"></span>发现商机<span class="star"></span></h3>
      <p>找到价值信息，抓住商机，促进企业发展</p>
      <div class="list-con">
        <div class="list-item" v-for="(item, index) in lists" :key="index">
          <img :src="item.img" alt="">
          <h4>
            {{item.title}}
          </h4>
          <div class="label">
            <div class="left">视频</div>
            <div class="right">303人观看</div>
          </div>
        </div>
      </div>
    </div>
    <div class="foot"></div>
  </div>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
      lists: [
        {id: 1, img:"img/business/img_1.png", title: "【大美小课堂】手把手教你创建订阅器", video:"", num:""},
        {id: 2, img:"img/business/img_9.png", title: "【大美小课堂】手把手教你创建智能订阅器", video:"", num:""},
        {id: 3, img:"img/business/img_3.png", title: "【大美小课堂】手把手教你使用企业商情分析", video:"", num:""},
        {id: 4, img:"img/business/img_4.png", title: "【大美小课堂】手把手教你使用标签收藏", video:"", num:""},
        {id: 5, img:"img/business/img_5.png", title: "创建招标采购-本公司订阅器，接收业务相关商机", video:"", num:""},
        {id: 6, img:"img/business/img_6.png", title: "创建招标采购-甲方公司订阅器，获取分包业务", video:"", num:""},
        {id: 7, img:"img/business/img_7.png", title: "如何在电脑官网查询订阅信息", video:"", num:""},
        {id: 8, img:"img/business/img_8.png", title: "如何通过邮件查看订阅信息", video:"", num:""},
        {id: 9, img:"img/business/img_9.png", title: "不同行业/产品的搜索案例演示", video:"", num:""},
        {id: 10, img:"img/business/img_10.png", title: "如何搜索多个相似业务/产品", video:"", num:""},
      ]
    }
  }
}
</script>

<style scoped lang="less">
.business {
  .head{
    width: 100%;
    height: 300px;
    background: #4B73FF;
    padding-top: 1px;
    position: relative;
    .head-cont{
      width: 972px;
      margin: 38px auto 0 auto;
      .title {
        width: 522px;
        height: 194px;
        display: inline-block;
        vertical-align: top;
        h1 {
          margin-top: 10px;
          font-size: 80px;
          font-family: Noto Sans SC-Bold, Noto Sans SC;
          font-weight: bold;
          color: #FFFFFF;
          line-height: 94px;
        }
        .text {
          margin-top: 15px;
          width: 320px;
          height: 66px;
          border-radius: 49px 49px 49px 49px;
          border: 1px solid rgba(255,255,255,0.2);
          font-size: 40px;
          font-family: Noto Sans SC-Medium, Noto Sans SC;
          font-weight: 500;
          color: #FFFFFF;
          line-height: 60px;
          text-align: center;
          span{
            color: #FFB800;
          }
        }
      }
      .img {
        margin-left: 100px;
        vertical-align: top;
        display: inline-block;
        width: 270px;
        height: 208px;
        background: url("../../assets/business/banner_img.png");
      }
    }

    .search {
      position: absolute;
      bottom: -38px;
      left: 50%;
      transform: translateX(-50%);
      width: 780px;
      height: 60px;
      /deep/ .ivu-input {
        height: 60px;
        font-size: 20px;
      }
      /deep/ .ivu-input-search {
        width: 120px;
        background: #FFB800 !important;
        border-color: #FFB800 !important;
        font-size: 24px;
      }
    }
  }
  .content {
    width: 100%;
    height: 766px;
    background: #FFFFFF;
    padding-top: 92px;
    text-align: center;
    h3{
      font-size: 28px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #333333;
      .star{
        display: inline-block;
        vertical-align: middle;
        width: 14px;
        height: 14px;
        background: url("../../assets/business/img_xingx.png");
        margin-bottom: 10px;
        margin-left: 12px;
        margin-right: 12px;
      }
    }
    p{
      margin-top: 8px;
      font-size: 18px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #333333;
      line-height: 21px;
    }
    .list-con{
      width: 1230px;
      height: 522px;
      margin: 32px auto 0 auto;
      //display: grid;
      //grid-template-columns: repeat(5, 230px);
      //column-gap: 20px;
      //row-gap: 24px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .list-item{
        width: 230px;
        margin-right: 20px;
        margin-bottom: 24px;
        height: 249px;
        background: #FFFFFF;
        box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.1);
        border-radius: 4px 4px 4px 4px;
        &:nth-child(5n){
          margin-right: 0;
        }
        h4{
          margin: 12px 15px;
          font-size: 16px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #333333;
          line-height: 24px;
          text-align: left;
          height: 48px;
        }
        .label{
          margin: 0 15px;
          font-size: 13px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #999999;
          height: 21px;
          position: relative;
          .left{
            width: 38px;
            height: 21px;
            background: #E8E8E8;
            line-height: 21px;
          }
          .right{
            position: absolute;
            right: 0;
            top: 0;
          }
        }
      }
    }
  }
  .foot {
    width: 100%;
    height: 80px;
    background: url("../../assets/business/img_sjxy_bg.png");
    background-size: cover;
    background-position: 43% 50%;
  }
}
</style>