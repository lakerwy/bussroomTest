<!--
 * @Author: 付柏磊
 * @Date: 2022-08-31 17:08:46
 * @LastEditors: 付柏磊
 * @LastEditTime: 2022-08-31 17:17:43
 * @Description: 新建订阅
 -->
<template>
  <div class="manage">
    <div class="manageHeader">
      <Tabs class="myTabs" v-model="procurement" @on-click="changeRrocurement">
        <TabPane label="招标与采购" name="1"></TabPane>
        <TabPane label="拟在建项目" name="2"></TabPane>
      </Tabs>
    </div>
    <div class="content" v-if="procurement==1">
      <addComSub flag="1"></addComSub>
    </div>
    <div v-if="procurement==2">
      <addComSub flag="2"></addComSub>
    </div>
  </div>
</template>
<script>
import { PromptBox } from "@/components/contentBox/index.js"
import {columnType, contentRange} from "@/utils/const/attention";
import addComSub from "./components/addComSub";
import {mapMutations} from "vuex";

export default {
  name: "addSub",
  components: {
    PromptBox,
    addComSub
  },
  data(){
    return{
      procurement: '1',

    }
  },
  created() {
  },
  computed: {
    isFreeMember(){
      let temp = false;
      if (JSON.parse(this.getStore("userInfo")).memberType == "免费会员") temp = true;
      return temp;
    }
  },
  methods: {
    ...mapMutations(["setShowFreeMerber"]),
    changeRrocurement(e){
      if (this.isFreeMember){
        if (e == 2){
          this.$bus.$emit('setFreeGuidedWords', "subscrip")
          this.setShowFreeMerber(true);
          setTimeout(()=>{
            this.procurement = '1';
          })
          return
        }
      } else {
        this.procurement = e;
      }
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
.manage{
  .manageHeader{
    padding: 10px 20px 0 20px;
    background: white;
    /deep/ .ivu-tabs-bar{
      margin-bottom: 0;
    }
  }
}
/deep/ .ivu-form{
  .ivu-form-item-label {
    font-size: 14px;
    font-family: Microsoft YaHei-Bold, Microsoft YaHei;
    font-weight: bold;
    color: #999999;
  }
  .ivu-input-wrapper{
    width: 36%;
  }
  .ivu-select {
    width: 200px;
  }
}

</style>