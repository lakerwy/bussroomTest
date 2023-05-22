<template>
  <div class="markDetail">
    <div class="head">
      <div class="left">
        <img src="img/img_sjcs_tu.png" alt="">
      </div>
      <div class="right">
        <h2>电梯 2019年_全国_中标数据</h2>
        <div class="right-price">
          <ul class="year">
            <span>数据年份: </span>
            <li>2019</li>
            <li>2018</li>
            <li>2017</li>
            <li>2016</li>
            <li>2015</li>
          </ul>
          <div class="forecast">
            <span>数据预估: </span>
            <div class="num">170614</div><span class="unit"> 条</span>
          </div>
          <div class="price">
            <span>价<span style="display: inline-block;width: 36px"></span>格: </span>
            <span class="council"><span style="font-size: 18px">¥</span> 电议</span>
            <span class="phone">400-099-9018</span>
          </div>
        </div>
        <Button class="btn" type="error">申请购买</Button>
      </div>
    </div>
    <div class="introduce">
      <h3><span class="shu"></span>数据介绍</h3>
      <p>2019年1月1日-2019年12月31日电梯全国中标结果数据，汇集全网所有信息！数据交付支持Excel、csv格式，导出的数据表头字段见下表，您可按需整年购买或多年批量购买，数量越多价格越划算。导出数据支持您对各地区进行分析，批量的中标供应商信息，可用于竞争对手分析，用于筛选中标供应商谈合作，无论是对新市场分析还是老业务的扩展都有帮助！</p>
    </div>
    <div class="export">
      <h3><span class="shu"></span>导出示例</h3>
      <p>下述为数据示例，精选数据字段包括：项目标题、招标编号、地区省、地区市、中标时间、产品类型、品牌、数量、中标金额、采购单位、采购联系人、联系电话以及中标单位、中标联系人、联系电话</p>
      <div class="example">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      hotWords: ["电梯","电梯","电梯","电梯","电梯","电梯","电梯",]
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
.markDetail {
  .head {
    width: 1200px;
    height: 300px;
    margin: 51px auto 0 auto;
    display: flex;
    .left {
      width: 455px;
      background: #007239;
    }
    .right {
      margin-left: 30px;
      width: 712px;
      h2 {
        font-size: 28px;
        font-family: Microsoft YaHei-Bold, Microsoft YaHei;
        font-weight: bold;
        color: #333333;
        line-height: 33px;
      }
      .right-price {
        margin-top: 20px;
        width: 100%;
        height: 180px;
        background: #F9F7F7;
        padding: 26px 33px;
        font-size: 18px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #999999;
        .year {
          li {
            margin-left: 16px;
            vertical-align: top;
            display: inline-block;
            width: 55px;
            height: 25px;
            border-radius: 2px 2px 2px 2px;
            border: 1px solid #D0D0D0;
            text-align: center;
            line-height: 23px;
            font-size: 13px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #333333;
          }
        }
        .forecast {
          margin-top: 24px;
          .num {
            display: inline-block;
            width: 70px;
            height: 25px;
            border-radius: 2px 2px 2px 2px;
            border: 1px solid #D0D0D0;
            font-size: 13px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #ED4242;
            line-height: 23px;
            text-align: center;
            margin-left: 16px;
          }
          .unit {
            font-size: 14px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #000000;
          }
        }
        .price {
          margin-top: 24px;
          .council {
            margin-left: 16px;
            display: inline-block;
            font-size: 20px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #ED4242;
          }
          .phone {
            margin-left: 30px;
            display: inline-block;
            font-size: 20px;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei;
            font-weight: 400;
            color: #ED4242;
          }
        }
      }
      .btn {
        margin-top: 20px;
        width: 136px;
        height: 42px;
        background: rgba(237,66,66,0.92);
        font-size: 20px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #FFFFFF;
      }
    }
  }
  .introduce {
    width: 1200px;
    height: 130px;
    margin: 51px auto 0 auto;
    //border: 1px solid;
  }
  .export {
    width: 1200px;
    height: 869px;
    margin: 20px auto 0 auto;
    .example {
      margin-top: 10px;
      width: 1199px;
      height: 750px;
      background: #D9D9D9;
    }
  }

  h3{
    font-size: 24px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #333333;
    line-height: 28px;
    .shu {
      margin-right: 16px;
      vertical-align: bottom;
      display: inline-block;
      width: 4px;
      height: 28px;
      background: #3F6EF5;
    }
  }
  p {
    margin-top: 20px;
    font-size: 14px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #333333;
    line-height: 28px;
  }

}
</style>