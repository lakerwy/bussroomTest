<!--
 * @Author: 付柏磊
 * @Date: 2022-08-05 10:21:01
 * @LastEditors: 付柏磊
 * @LastEditTime: 2022-08-05 10:21:01
 * @Description: 公共的提示框
-->
<template>
  <div class="promptCont">
    <div class="arrow"></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "promptBox"
}
</script>

<style scoped lang="less">
.promptCont {
  position: absolute;
  width: 100%;
  background-color: #F6F6F6;
  border-radius: 2px;
  //box-shadow: 2px 2px 6px #D9D9D9;
  border: 1px solid #D9D9D9;
  padding: 5px 10px;
  z-index: 999;
}
.arrow {
  position: absolute;
  border: 8px solid transparent;
  top: 7px;
  left: -9px;
  border-width: 8px 8px 8px 0;
  border-right-color: #D9D9D9;
}
.arrow:after {
  display: block;
  width: 0;
  height: 0;
  position: absolute;
  border-color: transparent;
  border-style: solid;
  border-width: 7px;
  content: " ";
  left: 2px;
  top: -7px;
  border-left-width: 0;
  border-right-width: 7px;
  border-right-color: #F6F6F6;
}
</style>