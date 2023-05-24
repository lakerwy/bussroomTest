<template>
<div class="report">
  <div class="head">
<!--    <h1>采购与招标网使用报告</h1>-->
<!--    <div class="head-con">大数据，小趋势</div>-->
<!--    <span>解读招投标的细枝末节，知己知彼百战百胜方可百投百中！</span>-->
  </div>
  <div class="timeSelect">
    <span style="">时间范围：</span>
    <Select class="searchSelect" placeholder="时间" v-model="dateRange" style="width:400px">
      <Option v-for="item in timeRange" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    <Button style="margin-left: 30px;" type="primary" @click="produceReport">生成报告</Button>
    <Button style="margin-left: 30px;"  @click="downloadReport">下载报告</Button>
  </div>
  <div class="workLocus">
    <h2>工作轨迹</h2>
    <ul class="work-cont">
      <li class="infoView">
        <div class="info">

          <h3>信息浏览</h3>
          <p>近一年里，贵公司共查看了<span>2192</span>条信息。<br>
            其中，查看<span>中标信息</span>数量最多，共计<span>1223</span>条，占比为<span>55.79%</span>。<br>
            机遇就在这里，贵公司有的放矢，以始为终。</p>
        </div>
        <div id="workInfo" style="height: 100%"></div>
      </li>
      <li class="keyWords">
        <div>
          <div id="keyWords" style="width:252px; height: 100%"></div>
        </div>
        <div class="keyWords-info">
          <h3>关键词</h3>
          <p>
            近一年，贵公司输入关键词搜索信息共计<span>2882</span>次，涉及<span>57</span>个不重复关键词。<br>
            其中，搜索“<span>数据1</span>”这个关键词的次数最多，<br>
            11家企业也搜索了“<span>数据1</span>”这个关键词
          </p>
        </div>
      </li>
      <li class="target">
        <h3>目标客户</h3>
        <p>近一年，贵公司重点关注的企业信息发布总量&查看量分布图</p>
        <div id="target" style="width:100%; height: 158px"></div>
      </li>
      <li class="Precise">
        <h3>精准检索</h3>
        <p>
          近一年里，贵公司按照项目名称搜索共计<span>1</span>次，精准的需求为您匹配了更大的价值<br>
          近一年里，贵公司反复浏览了“<span>山东海事局日照船舶溢油应急工程设备（设计变更部分）采购项目招标公告</span>”，同时还有<span>21</span>家企业也查看了该项目<br>
          近一年里，贵公司浏览了很多热门项目，其中“<span>国网山东省电力公司2021年第三次物资招标采购中标人名单</span>”热度最高，有其他<span>172</span>家企业也浏览了该项目
        </p>
      </li>
    </ul>
  </div>
  <div class="workPerformance">
    <div class="performance">
      <h2>工作业绩</h2>
      <h3>近一年参与项目</h3>
      <p>
        烟台港西港区液化4#、5#、7#泊位工程6#、7#泊位溢油监测报警系统采购成交候选人公示<br>
        烟台港西港区液化4#、5#、7#泊位工程6#、7#泊位溢油监测报警系统采购成交结果公示<br>
        河北海事局秦皇岛海上溢油应急设备库改扩建工程溢油应急设备及指挥通信设备购置国内公开招标项目中标公告<br>
        中华人民共和国佛山海事局购置便捷式油品硫含量快递检测设备的中标、成交公告<br>
        广西北部湾港钦州30万吨级油码头工程溢油应急设备及集污池潜水泵采购中标候选人公示<br>
        深圳海事局船舶溢油应急设备库工程设备采购招标公告<br>
        深圳海事局船舶溢油应急设备库工程设备采购更正公告<br>
        ......
      </p>
    </div>
  </div>
  <div class="hardWork">
    <h2>辛勤耕耘</h2>
    <ul class="hard">
      <li class="time">
        <div class="time-text">
          <h3>奋斗时光</h3>
          <p>
            贵公司的员工更喜欢在<span>周二</span>使用采购与招标网查询信息，时间多集中在<span>下午14:00-15:00</span>。静谧的午后，采购与招标网带您叩响成功的大门<br>
            近一年里，有<span>5</span>个夜深人静的晚上，贵公司还在为找项目而努力 近一年里，最晚一次看信息的时间是<span>周二凌晨4:00</span>。在这个时间点，有<span>162</span>个小伙伴在陪贵公司一起奋斗！
          </p>
        </div>
        <div></div>
      </li>
      <li class="weekend">
        <div></div>
        <div class="overtime">
          <h3>周末加班</h3>
          <p>
            近一年里，贵公司的员工有<span>1</span>个周末也在加班找项目，战胜了<span>0</span>%的企业。<br>
            一份耕耘一分收获，付出与得到之间会有他们自己的因果关系
          </p>
        </div>
      </li>
      <li class="footprint">
        <div class="foot">
          <h3>工作足迹</h3>
          <p>
            近一年，贵公司共登录采购与招标网 <span>3854</span>次 ，常在<span>青岛</span>登录，<br>
            在 <span>3</span>个城市留下印记<br>
            最值得欣赏的风景，是自己奋斗过的足迹
          </p>
        </div>
        <div></div>
      </li>
    </ul>
  </div>
  <div class="bottom">
    <div class="bottomTxt">您的所需，我们提供，您的耕耘，我们记得，这份报告承载着我们的未来，不远敦促我们前行！</div>
    <div class="phone">400-006-6655</div>
  </div>
</div>
</template>

<script>
import {initEcharts} from "@/utils/chart";
import echartOption from "./echartOption";
import * as echarts from "echarts/core";  //引词云时需引入这个
import "echarts-wordcloud";

import {applyReport, downReport, getBehaviorReport} from "@/api_new/index";

export default {
  name: "index",
  data(){
    return{
      dateRange: 1,
      timeRange: [
        // {label: '半年', value: 0},
        {label: '近一年', value: 1},
      ],
      reportStatus: 0,
      isTodayApplay: false,
    }
  },
  computed: {
    isFreeMember(){
      let temp = false;
      if (JSON.parse(this.getStore("userInfo")).memberType == "免费会员") temp = true;
      return temp;
    },
  },
  created() {
    this.applyReport();
  },
  mounted() {
    initEcharts('workInfo', echartOption.workOption);
    let echart = echarts.init(document.getElementById("keyWords"));
    echart.setOption(echartOption.keyWordOption, true);
    initEcharts('target', echartOption.targetOption);
  },
  methods: {
    //是否可以申请报告
    async applyReport(){
      let res = await applyReport();
      if (res.code == 200){
        this.reportStatus = res.result.type;
        this.isTodayApplay = res.result.time;
      }
    },
    //生成报告按钮点击事件
    async produceReport(){
      if (this.isFreeMember){
        this.$Modal.info({
          title: "提示",
          content: "尊敬的客户，你所查看的功能属于付费客户专享，开通付费功能，请垂询400-006-6655。"
        });
        return
      }
      if (this.reportStatus == 0){
        let res = await getBehaviorReport({
          type: 1,
        })
        this.$Message.success("申请报告成功");
        this.applyReport();
      } else if (this.reportStatus == 1){ //生成中
        this.$Modal.info({
          title: "提示",
          content: "您的行为报告生成中，具体情况可以随时联系您的专属客服。"
        });
      } else if (this.reportStatus == 2) { // 已生成，可下载报告
        if (this.isTodayApplay){
          this.$Modal.confirm({
            title: "提示",
            content: "您的行为报告已经生成完毕，可点击下载报告获取。",
            onOk: async () => {
            },
          });
        } else {
          let res = await getBehaviorReport({
            type: 1,
          })
          this.$Message.success("申请报告成功");
          this.applyReport();
        }
      }
    },
    //下载报告
    async downloadReport(){
      if (this.isFreeMember){
        this.$Modal.info({
          title: "提示",
          content: "尊敬的客户，你所查看的功能属于付费客户专享，开通付费功能，请垂询400-006-6655。"
        });
        return
      }
      if (this.reportStatus == 0){
        this.$Modal.info({
          title: "提示",
          content: "请点击生成报告，系统将为您生成您的专属行为报告。"
        });
      } else if (this.reportStatus == 1){ //生成中
        this.$Modal.info({
          title: "提示",
          content: "您的行为报告生成中，目前无法下载，具体情况可以随时联系您的专属客服。"
        });
      } else if (this.reportStatus == 2) { // 已生成，可下载报告,调下载接口
        let res = await downReport();
        if (res.code == 200){
          let elA = document.createElement("a");
          elA.href = res.message;
          elA.download = res.message;
          elA.click()
        }
      }
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
.report {
  .head {
    width: 100%;
    height: 360px;
    background: url("../../../assets/myApp/img_dzxwbg_banner.png") no-repeat;
    background-size: 100% 100%;
    text-align: center;
    padding-top: 98px;
    h1 {
      font-size: 50px;
      font-family: Noto Sans SC-Bold, Noto Sans SC;
      font-weight: bold;
      color: #FFFFFF;
      line-height: 66px;
    }
    .head-con {
      width: 292px;
      height: 46px;
      background: linear-gradient(90deg, rgba(255,255,255,0) 0%, #FFFFFF 32%, #FFFFFF 67%, rgba(255,255,255,0) 100%);
      font-size: 24px;
      font-family: Noto Sans SC-Regular, Noto Sans SC;
      font-weight: 400;
      color: #3F6EF5;
      line-height: 46px;
      text-align: center;
      margin: 18px auto;
      margin-top: 24px;
    }
    span {
      font-size: 18px;
      font-family: Noto Sans SC-Regular, Noto Sans SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 21px;
    }
  }
  .timeSelect {
    width: 100%;
    height: 36px;
    margin: 27px 0;
    text-align: center;
    .searchSelect {
      position: relative;
      margin-left: 10px;
      text-align: left;
    }
  }
  .workLocus {
    width: 100%;
    height: 1128px;
    background: #FFFFFF;
    text-align: center;
    padding-top: 40px;
    .work-cont {
      width: 916px;
      height: 972px;
      //border: 1px solid;
      margin: 30px auto;
      .infoView {
        height: 186px;
        display: flex;
        text-align: left;
        >div {
          width: 50%;
        }
        .info {
          margin: 20px 0;
          p {
            margin-top: 16px;
            span {
              color: rgba(63, 110, 245, 1);
            }
          }
        }
      }
      .keyWords {
        margin-top: 48px;
        height: 190px;
        display: flex;
        text-align: left;
        //border: 1px solid red;
        >div {
          width: 50%;
        }
        .keyWords-info {
          margin-top: 6px;
          p {
            margin-top: 16px;
            span {
              color: rgba(63, 110, 245, 1);
            }
          }
        }
      }
      .target {
        margin-top: 48px;
        width: 100%;
        height: 262px;
        p {
          margin: 16px 0;
        }
      }
      .Precise {
        margin-top: 48px;
        p {
          margin-top: 16px;
          text-align: left;
          span {
            color: rgba(63, 110, 245, 1);
          }
        }
      }
    }
  }
  .workPerformance {
    width: 100%;
    height: 435px;
    background: rgba(235,235,235,0.3);
    text-align: center;
    padding: 40px 0;
    .performance {
      width: 916px;
      margin: 0 auto;
      h3 {
        margin: 30px 0 16px 0;
      }
      p {
        text-align: left;
      }
    }
  }
  .hardWork {
    text-align: center;
    width: 100%;
    height: 844px;
    background: #FFFFFF;
    padding: 40px 0;
    .hard {
      width: 916px;
      height: 688px;
      margin: 30px auto 0 auto;
      .time {
        width: 100%;
        height: 225px;
        display: flex;
        >div {
          width: 50%;
        }
        .time-text {
          text-align: left;
          padding-right: 13px;
          p {
            margin-top: 16px;
          }
        }
      }
      .weekend {
        margin-top: 48px;
        width: 100%;
        height: 181px;
        display: flex;
        >div {
          width: 50%;
        }
        .overtime {
          margin: 10px 0;
          text-align: left;
          p {
            margin-top: 16px;
          }
        }
      }
      .footprint {
        width: 100%;
        height: 186px;
        margin-top: 48px;
        >div {
          width: 50%;
        }
        .foot {
          margin: 20px 0;
          text-align: left;
          p {
            margin-top: 16px;
          }
        }
      }
    }
  }
  .bottom {
    width: 100%;
    height: 80px;
    background: RGBA(81, 108, 184, .8);
    text-align: center;
    .bottomTxt {
      display: inline-block;
      font-size: 24px;
      font-family: Noto Sans SC-Regular, Noto Sans SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 80px;
    }
    .phone {
      display: inline-block;
      width: 188px;
      height: 42px;
      background: #FFB800;
      border-radius: 27px 27px 27px 27px;
      font-size: 20px;
      font-family: Noto Sans SC-Bold, Noto Sans SC;
      font-weight: bold;
      color: #FFFFFF;
      line-height: 42px;
      text-align: center;
    }
  }

  h2 {
    font-size: 32px;
    font-family: Noto Sans SC-Bold, Noto Sans SC;
    font-weight: bold;
    color: #333333;
    line-height: 38px;
  }
  h3 {
    font-size: 24px;
    font-family: Noto Sans SC-Regular, Noto Sans SC;
    font-weight: 400;
    color: #333333;
    line-height: 43px;
  }
  p {
    font-size: 16px;
    font-family: Noto Sans SC-Regular, Noto Sans SC;
    font-weight: 400;
    color: #333333;
    line-height: 29px;
    span {
      color: rgba(63, 110, 245, 1);
    }
  }
}
</style>