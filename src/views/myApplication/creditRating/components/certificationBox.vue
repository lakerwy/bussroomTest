<template>
  <div class="cert">
    <div class="head" :class="title=='已办理资质'?'hasHead':''">{{ title }}</div>
    <div class="cont">
      <ul class="ul1">
        <li v-for="(item,index) in list" :key="index">
          <Poptip trigger="hover" placement="bottom-start" width="353">
            {{ item.title }}
            <div slot="content" class="popCont">
              <h3><span class="point"></span>证书介绍</h3>
              <p>质量、服务、诚信是企业发展的三大要素，是企业成功的重要标志。有助于提升企业的竞争力、增强企业的品牌价值、提高企业品牌的知名度及其影响力，是企业长期、健康发展的有力保障</p>
              <h3><span class="point"></span>适用范围</h3>
              <p>企业签约、投标入围</p>
            </div>
          </Poptip>
        </li>
      </ul>
      <ul class="ul2">
        <li v-for="(item,index) in list2" :key="index">
          <Poptip trigger="hover" placement="bottom-start" width="353">
            {{ item.title }}
            <div slot="content" class="popCont">
              <h3><span class="point"></span>证书介绍</h3>
              <p>质量、服务、诚信是企业发展的三大要素，是企业成功的重要标志。有助于提升企业的竞争力、增强企业的品牌价值、提高企业品牌的知名度及其影响力，是企业长期、健康发展的有力保障</p>
              <h3><span class="point"></span>适用范围</h3>
              <p>企业签约、投标入围</p>
            </div>
          </Poptip>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "certificationBox",
  props: {
    title: {
      type: String,
      default: "未办理资质"
    }
  },
  data(){
    return{
      list: [
        {id: 1, title: "诚信经营示范单位", content: ""},
        {id: 2, title: "重合同守信用", content: ""},
        {id: 3, title: "优秀供应商", content: ""},
        {id: 4, title: "质量服务信誉", content: ""},
        {id: 5, title: "优秀经理人", content: ""},
        {id: 6, title: "优秀经理人", content: ""},
        {id: 7, title: "优秀经理人", content: ""},
      ],
      list2: [
        {id: 1, title: "重质量守信用企业", content: ""},
        {id: 2, title: "重服务守信用企业", content: ""},
        {id: 3, title: "优秀法人代表", content: ""},
        {id: 4, title: "诚信供应商", content: ""},
        {id: 5, title: "诚信供应商", content: ""},
        {id: 6, title: "诚信供应商", content: ""},
        {id: 7, title: "诚信供应商", content: ""},
      ]
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
.cert {
  border: 1px solid #E8E8E8;
  .head {
    height: 60px;
    background: #FFFBF2;
    font-size: 24px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #FFB800;
    line-height: 58px;
    text-align: center;
    border-bottom: 1px solid #E8E8E8;
  }
  .hasHead {
    background: #F4F7FF;
    color: #3F6EF5;
  }
  .cont {
    display: flex;
    justify-content: center;
    .ul1 {
      margin-right: 100 / @vw;
    }
    li {
      font-size: 16px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #333333;
      margin-top: 22px;
      cursor: pointer;
    }
    /deep/ .ivu-poptip-inner {
      white-space: inherit;
    }
    /deep/ .ivu-poptip-body {
      padding-left: 46px;
      padding-bottom: 15px;
    }
    /deep/ .ivu-poptip-body-content {
      overflow: visible;
    }
    .popCont {
      h3 {
        margin-top: 10px;
        font-size: 14px;
        font-family: Microsoft YaHei-Bold, Microsoft YaHei;
        font-weight: bold;
        color: #3F6EF5;
        line-height: 16px;
        position: relative;
        margin-bottom: 8px;
        .point {
          display: inline-block;
          position: absolute;
          width: 4px;
          height: 4px;
          background: #3F6EF5;
          border-radius: 2px;
          left: -16px;
          top: 5px;
        }
      }
    }
  }


}
</style>