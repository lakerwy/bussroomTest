<template>
  <div class="contentBox">
    <section class="title">
      <h3>{{ platTitle }} <span class="tspan"  :class="platTitle=='待审核'?'tred':''">{{ platAllNumber }}</span></h3>
      <Button class="btn" @click="travelNow">立即前往</Button>
    </section>
    <section class="content">
      <div class="platformHead">
        <ul>
          <li v-for="(item, index) in platTableTitle" :key="index" :style="{width: item.width}">{{ item.title }}</li>
        </ul>
      </div>
      <div class="tableContent">
        <ul
            v-for="(item, index) in tableData"
            :key="index"
        >
          <li v-for="(key, i) in platTableTitle" :key="i" :style="{width: key.width}"  :class="!item.id?'statist':''">
            {{ item[key.field] }}
            <template v-if="key.field == 'edit'">
              <div class="btn">
                <span @click="dealAudit">处理</span>
                <span @click="dealAudit">驳回</span>
              </div>
            </template>
            <template v-if="key.field == 'index'">
              {{index+1}}
            </template>
            <template v-if="key.field == 'projectType'">
              {{ item['type'] == 1 ? '浏览增量' : item['type'] == 2 ? '导出增量' : item['type'] == 3 ? '短信增量' : '配置模式' }}
            </template>
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
    },
    platAllNumber: {
      type: Number,
      default: 5
    },
    platTableTitle: {
      type: Array,
      default: ()=>[]
    },
    tableData: {
      type: Array,
      default: ()=>[]
    },
  },
  data(){
    return{

    }
  },
  methods: {
    travelNow(){
      this.$emit('travelNow','')
    },
    dealAudit(){
      this.$emit('dealAudit','')
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
.contentBox {
  width: 100%;
  height: 100%;
  border: 1px solid #E8E8E8;
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
      width: calc(100% - 108px);
      padding-left: 20px;
      overflow: hidden;
      .tspan {
        display: inline-block;
        width: 32px;
        height: 18px;
        background: #E3EBFF;
        border-radius: 20px 20px 20px 20px;
        vertical-align: inherit;
        text-align: center;
        line-height: 18px;
        font-size: 15px;
        color: #3F6EF5;
      }
      .tred {
        background: #FFD0D0;
        color: #FF0000;
      }
    }
    .btn {
      margin-right: 20px;
      color: #999999;
    }
  }

  .content {
    margin: 0 20px;
    li {
      display: inline-block;
      text-align: center;
      padding: 10px 0;
      font-size: 14px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #333333;
      width: 13%;
      vertical-align: middle;
    }
    li:nth-child(6) {
      width: 22%;
      min-width: 70px;
    }
    .platformHead {
      ul {
        height: 34px;
        line-height: 34px;
        border-bottom: 1px solid #E8E8E8;
        //border-top: 1px solid #D0D0D0;
        background: #F4F7FF;
        color: #777777;
        li {
          padding: 0;
          border: none;
          font-size: 14px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #666666;
        }
      }
    }
    .tableContent {
      //height: 146px;
      ul {
        border-bottom: 1px solid #E8E8E8;
        li:nth-child(1){
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .btn {
        color: #3F6EF5;
        span {
          cursor: pointer;
        }
        span:nth-child(1){
          display: inline-block;
          margin-right: 10px;
        }
      }
    }
    .statist {
      font-size: 14px;
      font-family: Microsoft YaHei-Bold, Microsoft YaHei;
      font-weight: bold;
      color: #333333;
    }
  }
}

</style>