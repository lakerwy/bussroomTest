<template>
  <div class="contentBox">
    <section class="title">
      <h3>{{teamViewsData.title}}</h3>
      <span title="查看详情" @click="viewDetail"><Icon type="ios-arrow-dropright" /></span>
    </section>
    <section class="content">
      <div class="cot-com">
        <div class="mt-20">{{ teamViewsData.today }}</div>
        <h3 class="number">{{ teamViewsData.todayNum }}</h3>
        <div class="allowance" v-if="teamViewsData.showMoreBuy">
          {{ teamViewsData.allowance }} <span>{{teamViewsData.allowanceNum}}</span>
        </div>
        <div class="allowance" v-if="!teamViewsData.showMoreBuy">
          {{ teamViewsData.allowance }}
          <span><i :class="teamViewsData.allowanceNum>=0?'upIcon':'downIcon'"></i> <span>{{ Math.abs(teamViewsData.allowanceNum) }}%</span></span>
        </div>
        <div>{{ teamViewsData.nearWeek }}</div>
        <h3 class="number">{{ teamViewsData.nearWeekNum }}</h3>
<!--        <Button class="buyMore" type="primary" v-if="teamViewsData.showMoreBuy">增量购买</Button>-->
      </div>
<!--      <div class="allowance" v-if="teamViewsData.showMoreBuy">-->
<!--        <div>{{ teamViewsData.allowance }}</div>-->
<!--        <h3 class="number">{{ teamViewsData.allowanceNum }}</h3>-->
<!--      </div>-->
<!--      <div class="allowance" v-if="!teamViewsData.showMoreBuy">-->
<!--        <div>同比情况</div>-->
<!--        <div class="rate">{{ teamViewsData.allowance }} <i class="up"></i> <span>{{ teamViewsData.allowanceNum }}%</span></div>-->
<!--      </div>-->
    </section>
  </div>
</template>

<script>
export default {
  name: "index",
  props: {
    teamViewsData: {
      type: Object,
      default: ()=>({
        title: '浏览量',
        nearWeek: '近一周',
        nearWeekNum: 0,
        today: '今日',
        todayNum: 0,
        allowance: '今日浏览量余额',
        allowanceNum: 0,
        showMoreBuy: true,
      })
    }
  },
  data(){
    return{

    }
  },
  methods: {
    viewDetail(){
      this.$emit('viewDetail','')
    }
  }
}
</script>

<style scoped lang="less">
@vw: 19.2vw;
@vh: 10.8vh;
.contentBox {
  height: 100%;
  width: 100%;
  background: #EEF2FF;
  .title {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    h3 {
      font-size: 16px;
      font-family: Microsoft YaHei-Bold, Microsoft YaHei;
      font-weight: bold;
      color: #333333;
      width: calc(100% - 40px);
      padding-left: 15 / @vw;
      overflow: hidden;
    }
    span {
      display: block;
      text-align: right;
      padding-right: 20px;
      font-size: 20px;
      cursor: pointer;
    }
  }
  .content {
    margin: 0 15 / @vw;
    margin-top: 5px;
    font-size: 14px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #666666;
    .cot-com {
      height: 176px;
      font-size: 14px;
      .mt-20 {
        //margin-top: 20px;
      }
    }
    .allowance {
      margin: 8px 0 13px 0;
      font-size: 13px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #999999;
      span {
        display: inline-block;
        font-weight: 400;
        color: #333333;
      }
    }
    .number {
      font-size: 40px;
      font-family: DIN-Medium, DIN;
      font-weight: 500;
      color: #333333;
    }
    .buyMore {
      margin-top: 10px;
      width: 90px;
    }
  }
}
.upIcon {
  margin-bottom: 3px;
  display: inline-block;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-bottom-color: #1CBD75;
}
.downIcon {
  margin-bottom: -3px;
  display: inline-block;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-top-color: #FF0000;
}
</style>