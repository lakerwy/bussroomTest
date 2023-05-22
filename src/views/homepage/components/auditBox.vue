<template>
  <div class="contentBox">
    <section class="title">
      <h3>{{ platTitle }} <span class="tspan">5</span></h3>
      <Button class="btn" >立即前往</Button>
    </section>
    <section class="content">
      <div class="platformHead">
        <ul>
          <li>序号</li>
          <li>申请人</li>
          <li>申请时间</li>
          <li>申请项目</li>
          <li>操作</li>
        </ul>
      </div>
      <div class="tableContent">
        <ul
            v-for="(item, index) in tableData"
            :key="index"
        >
          <li>{{ item.name }}</li>
          <li>{{ item.views }}</li>
          <li>{{ item.viewsAllowance }}</li>
          <li>{{ item.export }}</li>
          <li class="btn">
            <span>处理</span>
            <span>驳回</span>
          </li>
        </ul>
      </div>

    </section>
  </div>
</template>

<script>
export default {
  name: "index",
  props: {
    platTitle: {
      type: String,
      default: ""
    }
  },
  data(){
    return{
      tableData: [
        {id: 1, name: '王石', views: 72, viewsAllowance: 2, export: 6, exportAllowance: 20, push: 50, pushAllowance: 860},
        {id: 1, name: '王石', views: 72, viewsAllowance: 2, export: 6, exportAllowance: 20, push: 50, pushAllowance: 860}
      ]
    }
  },
  methods: {

  }
}
</script>

<style scoped lang="less">
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.contentBox {
  width: 531px;
  height: 325px;
  border: 1px solid #c5c8ce;
  border-radius: 4px;
  .title {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    h3 {
      font-size: 16px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #333333;
      width: 80%;
      padding-left: 20px;
      overflow: hidden;
      .tspan {
        display: inline-block;
        width: 32px;
        height: 18px;
        background: #FFD0D0;
        border-radius: 20px 20px 20px 20px;
        vertical-align: inherit;
        text-align: center;
        line-height: 18px;
        font-size: 15px;
        color: #FF0000;
      }
    }
    .btn {
      margin-right: 20px;
    }
  }

  .content {
    margin: 0 20px;
    li {
      display: inline-block;
      font-size: 15px;
      text-align: center;
      width: 20%;
      padding: 5px 0;
      border-bottom: 1px solid #E5E5E5;
    }
    li:nth-child(1) {
      width: 15%;
    }
    .platformHead {
      ul {
        height: 34px;
        border-bottom: 1px solid;
        border-top: 1px solid;
        background: #F6F6F6;
        color: #777777;
        li {
          font-weight: bold;
          //padding: 10px 0;
          border: none;
        }
      }
    }
    .tableContent {
      height: 146px;
      .btn {
        color: #9CCAF5;
        span:nth-child(1){
          display: inline-block;
          margin-right: 10px;
        }
      }
    }
  }
}

</style>