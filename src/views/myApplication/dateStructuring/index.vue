<template>
  <div class="dateStruct">
    <div class="top">
      <h1>招投标数据结构化服务</h1>
      <span class="text">通过具备覆盖性的客观数据感知和分析市场 / 捕捉更全面和前置的商机，支持销售 / 评估销售结果，发现和评估渠道</span>
      <div class="btn"><span class="icon-phone"></span>400-006-6655</div>
    </div>
    <div class="middle">
      <div class="title">
        <h3>结构化字段</h3>
        <div class="hen"></div>
        <span>STRUCTURED FIELD</span>
      </div>
      <div class="field">
        <div class="field_left">
          <h4>
            我们提供的结构化字段<br>可以满足你不同维度的分析需要！
          </h4>
          <p><span class="font_family" >&#xe670;</span>自然语言的标文无法直接支持统计和分析</p>
          <p><span class="font_family" >&#xe670;</span>人工提取关键字段信息，成本高，效率低！</p>
          <div class="circle" v-for="(item,index) in circleData" :key="index">
            {{item}}
          </div>
        </div>
        <div class="field_right"></div>
      </div>
    </div>
    <div class="content">
      <div class="title">
        <h3>行业覆盖</h3>
        <div class="hen"></div>
        <span>INDUSTRY COVERS</span>
      </div>
      <ul class="list">
        <li v-for="(item,index) in imgList" :key="index">
          <div class="img">
            <img :src="item.url" alt="">
          </div>
          <span class="list_title">{{item.title}}</span>
        </li>
      </ul>
    </div>
    <div class="foot">
      <div class="concat">
        <span class="text">立即联系我们获取定制化大数据解决方案与专属服务</span>
        <div class="phone"><span class="icon-phone"></span>400-006-6655</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data(){
    return {
      circleData: ["精准", "降本", "高效"],
      imgList: [
        { id: 1, url: 'img/myApp/icon_fict.png', title: '泛ICT' },
        { id: 2, url: 'img/myApp/icon_yl.png', title: '医疗' },
        { id: 3, url: 'img/myApp/icon_bx.png', title: '保险' },
        { id: 4, url: 'img/myApp/icon_yh.png', title: '银行' },
        { id: 5, url: 'img/myApp/icon_gc.png', title: '工程' },
        { id: 6, url: 'img/myApp/icon_zz.png', title: '制造' },
        { id: 7, url: 'img/myApp/icon_hj.png', title: '环境' },
        { id: 8, url: 'img/myApp/icon_zxfw.png', title: '咨询服务' },
      ]
    }
  },
  methods: {

  }
}
</script>

<style scoped lang="less">
ul,li{ padding:0;margin:0;list-style:none}
.dateStruct {
  .top {
    width: 100%;
    height: 400px;
    background: url("../../../assets/myApp/img_sjjgh_banner.png") no-repeat;
    background-size: 100% 100%;
    border-radius: 4px 4px 0px 0px;
    text-align: center;
    padding-top: 75px;
    h1 {
      font-size: 42px;
      font-family: Noto Sans SC-Bold, Noto Sans SC;
      font-weight: bold;
      color: #FFFFFF;
      line-height: 56px;
    }
    .text {
      margin-top: 20px;
      display: inline-block;
      font-size: 18px;
      font-family: Noto Sans SC-Regular, Noto Sans SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 21px;
    }
    .btn {
      margin: 42px auto;
      width: 213px;
      height: 49px;
      background: #FFB800;
      border-radius: 27px 27px 27px 27px;
      font-size: 20px;
      font-family: Noto Sans SC-Bold, Noto Sans SC;
      font-weight: bold;
      color: #FFFFFF;
      line-height: 49px;
    }
  }
  .middle {
    width: 100%;
    height: 502px;
    background: #FFFFFF;
    padding-top: 50px;
    .field {
      margin: 42px auto;
      width: 990px;
      height: 260px;
      display: flex;
      .field_left {
        width: 50%;
        h4 {
          font-size: 22px;
          font-family: Noto Sans SC-Regular, Noto Sans SC;
          font-weight: 400;
          color: #333333;
          line-height: 35px;
          letter-spacing: 3px;
          margin-bottom: 20px;
        }
        p {
          font-size: 14px;
          font-family: Noto Sans SC-Regular, Noto Sans SC;
          font-weight: 400;
          color: #999999;
          line-height: 25px;
          span {
            font-size: 16px;
            line-height: 25px;
            vertical-align: middle;
          }
        }
        .circle {
          margin-top: 40px;
          margin-right: 32px;
          color: #3F6EF5;
          display: inline-block;
          width: 64px;
          height: 64px;
          border: 3px solid rgba(63, 110, 245, .2);
          border-radius: 50%;
          text-align: center;
          line-height: 58px;
        }
      }
      .field_right {
        width: 436px;
        height: 260px;
        margin-left: 50px;
        background: url("../../../assets/myApp/img_sjjgh_jghzd.png");
        background-size: 100% 100%;
      }
    }
  }
  .content {
    width: 100%;
    height: 640px;
    background: url("../../../assets/myApp/img_sjjgh_bg2.png") no-repeat;
    background-size: 100% 100%;
    padding-top: 50px;
    .list {
      width: 1200px;
      margin: 0 auto;
      font-size: 0;
      margin-top: 8px;
      li {
        margin-top: 12px;
        display: inline-block;
        width: 300px;
        height: 205px;
        text-align: center;
        padding-top: 24px;
        .img {
          margin: 0 auto;
          width: 100px;
          height: 100px;
          background: #FFFFFF;
          box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.06);
          border-radius: 63px 63px 63px 63px;
          line-height: 146px;
        }
        .list_title {
          font-size: 20px;
          font-family: Noto Sans SC-Regular, Noto Sans SC;
          font-weight: 400;
          color: #333333;
          line-height: 23px;
          display: inline-block;
          margin-top: 20px;
        }
      }
    }
  }
  .foot {
    width: 100%;
    height: 80px;
    background: url("../../../assets/myApp/img_sjjgh_bg.png") no-repeat;
    background-size: 100% 100%;
    .concat {
      width: 1200px;
      margin: 0 auto;
      .text {
        font-size: 24px;
        font-family: Noto Sans SC-Regular, Noto Sans SC;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 80px;
      }
      .phone {
        margin-top: 22px;
        float: right;
        width: 188px;
        height: 42px;
        background: #FFB800;
        border-radius: 27px 27px 27px 27px;
        line-height: 42px;
        text-align: center;
        font-size: 18px;
        font-family: Noto Sans SC-Bold, Noto Sans SC;
        font-weight: bold;
        color: #FFFFFF;
      }
    }
  }
}

.icon-phone {
  display: inline-block;
  width: 24px;
  height: 24px;
  vertical-align: text-top;
  margin-right: 8px;
  background: url("../../../assets/myApp/icon_zuoj.png") no-repeat;
  background-size: 100% 100%;
}
.title {
  width: 140px;
  height: 92px;
  margin: 0 auto;
  h3 {
    font-size: 28px;
    font-family: Noto Sans SC-Bold, Noto Sans SC;
    font-weight: bold;
    color: #333333;
    text-align: center;
  }
  .hen {
    margin: 15px auto;
    margin-bottom: 12px;
    width: 60px;
    height: 3px;
    background: #3F6EF5;
  }
  span {
    font-size: 14px;
    font-family: Noto Sans SC-Bold, Noto Sans SC;
    font-weight: bold;
    color: #E7E7E7;
  }
}
</style>