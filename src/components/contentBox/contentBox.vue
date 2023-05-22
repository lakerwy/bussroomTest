<template>
<div class="contentBox">
  <section class="title">
    <h3>{{numData.title}}<span style="font-size: 15px;font-weight: normal">{{numData.titleDate}}</span></h3>
    <span title="查看详情" @click="viewDetail"><Icon type="ios-arrow-dropright" /></span>
  </section>
  <section class="content">
    <div class="middle">
      <div class="statis"><div class="statis_title">{{ numData.numTitle }}</div> <span>{{numData.num}}</span></div>
      <div class="statis"><div class="statis_title">{{ numData.priceTitle }}</div> <span>{{ numData.price }}</span></div>
    </div>
    <div class="bottom">
      <div>{{numData.rateTitle}}  <span><i :class="numData.rate>=0?'upIcon':'downIcon'"></i>{{ Math.abs(numData.rate) }}%</span></div>
      <div v-if="numData.priceRate">
        {{numData.rateTitle}}
        <span>
          <i :class="numData.priceRate>=0?'upIcon':'downIcon'"></i>{{ Math.abs(numData.priceRate) }}%
        </span>
      </div>
    </div>
  </section>
</div>
</template>

<script>
export default {
  name: "index",
  props: {
    numData: {
      type: Object,
      default: () => ({
        title: "中标情况（近一月）",
        numTitle: "数量",
        priceTitle: "金额",
        num: 0,
        price: 0,
        rateTitle: "月同比",
        rate: "12",
        priceRate: 0,
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
  width: 100%;
  height: 100%;
  background: #EEF2FF;
  .title {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    h3 {
      font-size: 16px;
      font-weight: bold;
      font-family: "Microsoft YaHei-Bold";
      width: calc(100% - 40px);
      padding-left: 20 / @vw;
      overflow: hidden;
      span {
        color: #666666;
      }
    }
    >span {
      display: block;
      text-align: right;
      padding-right: 20px;
      font-size: 20px;
      cursor: pointer;
    }
  }
  .title:hover {
    h3 {
      color: #3F6EF5;
      span {
        color: #3F6EF5;
      }
    }
    >span {
      color: #3F6EF5;
    }
  }
  .content {
    margin: 0 20 / @vw;
    .middle {
      height: 70px;
      width: 100%;
      display: flex;
      align-items: center;
      .statis:nth-child(2){
        margin-left: 20px;
      }
      .statis {
        flex: 1;
        text-align: left;
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        color: #666666;
        .statis_title {
          margin-top: 10px;
        }
        span {
          font-size: 40px;
          font-family: DIN-Medium, DIN;
          font-weight: 500;
          color: #333333;
        }
      }
    }
    .bottom {
      font-size: 13px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #999999;
      display: flex;
      height: 50px;
      align-items: center;
      >div {
        flex: 1;
        text-align: left;
        &:nth-child(2){
          margin-left: 20px;
        }
        span {
          color: #333333;
          display: inline-block;
          //margin-left: 10px;
        }
      }
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