<template>
  <div class="contentBox">
    <section class="title">
      <h3>{{numData.title}}</h3>
      <span title="查看详情" @click="viewDetail"><Icon type="ios-arrow-dropright" /></span>
    </section>
    <section class="content">
      <div class="middle" :class="numData.rateTitle?'':'mid_active'">
        <div class="statis"><div class="statis_title">{{ numData.priceTitle }}</div> <span>{{ numData.price }}</span></div>
        <div class="statis"><div class="statis_title">{{ numData.numTitle }}</div> <span>{{numData.num}}</span></div>
      </div>
      <div class="bottom" v-if="numData.rateTitle">
        <div>{{numData.rateTitle}}</div><span>{{ numData.rate }}</span>
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
  width: 265px;
  height: 178px;
  background: #F4F7FF;
  .title {
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    h3 {
      width: 60%;
      padding-left: 20 / @vw;
      overflow: hidden;
      font-size: 16px;
      font-family: Microsoft YaHei-Bold, Microsoft YaHei;
      font-weight: bold;
      color: #333333;
    }
    span {
      display: block;
      width: 40%;
      text-align: right;
      padding-right: 20px;
      font-size: 20px;
      cursor: pointer;
    }
  }
  .title:hover {
    h3 {
      color: #3F6EF5;
    }
    >span {
      color: #3F6EF5;
    }
  }
  .content {
    margin: 0 20 / @vw;
    .middle {
      height: 80px;
      width: 100%;
      display: flex;
      align-items: center;
      .statis:nth-child(2){
        margin-left: 20px;
      }
      .statis {
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #666666;
        flex: 1;
        text-align: left;
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
    .mid_active {
      border-bottom: none;
    }
    .bottom {
      display: flex;
      height: 50px;
      align-items: center;
      font-size: 13px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #999999;
      //justify-content: center;
      >div {
        font-size: 14px;
        margin-right: 5px;
      }
      span {
        color: #333333;
      }
    }
  }
}

</style>