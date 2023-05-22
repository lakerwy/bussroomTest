<template>
  <div class="dataMark">
    <div class="searchBox">
      <h1>
        沉淀价值数据<br>助力企业预测未来招投标动向
      </h1>
      <div class="search">
        <Input class="searchInput" search enter-button="搜索" placeholder="请输入关键词，如：电梯" />
        <ul class="">
          <li><span class="hotIcon"></span>热搜：</li>
          <li v-for="(item,index) in hotWords" :key="index">{{item}}</li>
        </ul>
      </div>
    </div>
    <div class="hotWords">
      <div class="list">
        <h2>热搜数据 <span>/ 近期同行都在搜</span></h2>
        <ul>
          <li v-for="(item,index) in 6" :key="index">
            <div class="img"></div>
            <h3>电梯</h3>
            <div class="info">2015年-2019年_全国_中标数据</div>
            <div class="view" @click="viewDetail">立即查看 ——></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
      hotWords: ["电梯","电梯","电梯","电梯","电梯","电梯","电梯",]
    }
  },
  methods: {
    viewDetail(){
      this.$router.push({
        name: "markDetail",
      })
    }
  }
}
</script>

<style scoped lang="less">
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.dataMark {
  .searchBox {
    width: 100%;
    height: 400px;
    //border: 1px solid;
    //background: linear-gradient(180deg, #0066FF 0%, rgba(0,102,255,0.5) 100%);
    background: url("../../../assets/myApp/img_sjcs_banner.png");
    background-size: 100% 100%;
    border-radius: 4px 4px 0px 0px;
    text-align: center;
    h1 {
      display: inline-block;
      margin-top: 45px;
      font-size: 40px;
      font-family: Noto Sans SC-Bold, Noto Sans SC;
      font-weight: bold;
      color: #FFFFFF;
      line-height: 60px;
    }
   .search {
     width: 780px;
     height: 98px;
     margin: 45px auto;
     .searchInput {
       height: 68px;

       /deep/ .ivu-input {
         height: 68px;
         font-size: 20px;
       }
       /deep/ .ivu-input-search {
         width: 120px;
         background: #FFB800 !important;
         border-color: #FFB800 !important;
         font-size: 24px;
       }
     }
     ul {
       margin-top: 10px;
       text-align: left;
       li {
         font-size: 14px;
         display: inline-block;
         color: white;
         margin-right: 20px;
       }
       li:nth-child(1){
         margin-right: 10px;
       }
       .hotIcon {
         margin-right: 5px;
         vertical-align: top;
         display: inline-block;
         width: 18px;
         height: 18px;
         background: url("../../../assets/myApp/icon_rs.png") no-repeat;
       }
     }
    }
  }
  .hotWords {
    width: 100%;
    height: 832px;
    background: #fff;
    padding-top: 32px;
    .list {
      width: 1200px;
      height: 764px;
      margin: 0 auto;
      h2 {
        font-style:italic;
        font-size: 24px;
        font-family: YouSheBiaoTiHei-Regular, YouSheBiaoTiHei;
        font-weight: bold;
        color: #333333;
        span {
          font-style: normal;
          font-size: 16px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #999999;
          line-height: 19px;
        }
      }
      ul{
        li {
          margin-top: 20px;
          margin-right: 28px;
          width: 380px;
          height: 339px;
          background: #F9F9F9;
          display: inline-block;
          padding: 24px;
          .img {
            height: 160px;
            background: #D9D9D9;
          }
          h3 {
            margin-top: 20px;
            font-size: 24px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #333333;
            line-height: 28px;
          }
          .info {
            margin-top: 12px;
            font-size: 16px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #666666;
            line-height: 19px;
          }
          .view {
            margin-top: 28px;
            font-size: 14px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #3F6EF5;
            line-height: 16px;
            cursor: pointer;
          }
        }
        li:nth-child(3n+3){
          margin-right: 0;
        }
      }
    }
  }
}
</style>