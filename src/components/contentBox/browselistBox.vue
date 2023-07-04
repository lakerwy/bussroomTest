<template>
  <div class="contentBox">
    <section class="title">
      <h3>{{ title }}<span>{{ titleDate }}{{ titleDate?(titleNum +"条）"):"" }}</span></h3>
      <span title="查看详情" @click="viewDetail"><Icon type="ios-arrow-dropright" /></span>
    </section>
    <section class="content">
      <ul v-if="!isSlider">
        <li v-for="(item,index) in list" :key="index">
          <i class="point"></i>
          <a :class="item.date?'freeTitle':''" :href="item.webUrl?item.webUrl:item.url" target="_blank" :title="item.title">{{
              item.title
            }}</a>
          <span class="date" v-if="item.date">
            {{item.date}}
          </span>
        </li>
      </ul>
      <ul v-if="isSlider" class="hotSlider">
        <vue-seamless-scroll
            :data="list"
            class="seamless-warp"
            :class-option="classOption"
        >
          <li v-for="(item,index) in list" :key="index">
            <i class="point"></i>
            <a :class="item.date?'freeTitle':''" :href="item.webUrl?item.webUrl:item.url" target="_blank" :title="item.title">{{
                item.title
              }}</a>
            <span class="date">
              {{item.date}}
            </span>
          </li>
        </vue-seamless-scroll>
      </ul>
    </section>
  </div>
</template>

<script>
import vueSeamlessScroll from "vue-seamless-scroll";

export default {
  name: "index",
  components: {
    vueSeamlessScroll
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    titleDate: {
      type: String,
      default: ""
    },
    titleNum: {
      type: Number,
      default: 0,
    },
    list: {
      type: Array,
      default: () => [],
    },
    isSlider: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classOption() {
      return {
        step: 0.5, // 数值越大速度滚动越快
        limitMoveNum: 6, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        // openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0 // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
      };
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


.contentBox {
  width: 366px;
  height: 200px;
  border: 1px solid #E4E4E4;
  .title {
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    //background: #F6F6F6;
    background: #F4F7FF;
    h3 {
      width: 85%;
      padding-left: 20px;
      overflow: hidden;
      font-size: 16px;
      font-family: "Microsoft YaHei-Bold, Microsoft YaHei";
      font-weight: bold;
      color: #333333;
      span {
        color: #666666;
        font-size: 15px;
        font-weight: 400;
      }
    }
    >span {
      display: block;
      width: 35%;
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
    margin: 0 20px 0 10px;

    .hotSlider {
      height: 200px;
      overflow-y: hidden;
      overflow-x:visible;
      width: 100%;
    }
    ul {
      margin-top: 20px;

      // 使用函数切换点颜色
      .theme(@pointColor: #CCCCCC){
        .point {
          display: inline-block;
          vertical-align: middle;
          width: 2px;
          height: 2px;
          background: @pointColor;
          border: 1px solid @pointColor;
          margin-right: 10px;
          position: relative;
        }
        .point::after {
          position: absolute;
          content: "";
          width: 6px;
          height: 6px;
          border: 1px solid @pointColor;
          left: -3px;
          top: -3px;
        }
      }
      li:hover {
        .theme(#3F6EF5);  //调用函数
        color: #3F6EF5;
        a {
          color: #3F6EF5;
        }
      }
      li {
        font-size: 14px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #333333;
        //text-indent: -5px;
        margin: 10px 0 10px 10px;
        list-style: none;
        //list-style: square;
        cursor: pointer;
        .theme();  //调用函数

        a {
          color: #333;
          display: inline-block;
          vertical-align: middle;
          width: calc(100% - 16px);
          height: 30px;
          line-height: 30px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
        }
        .date {
          font-size: 14px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #999999;
          display: inline-block;
          width: 95px;
          text-align: right;
        }
        .freeTitle {
          width: calc(100% - 110px);
        }
      }
    }
  }
}
</style>