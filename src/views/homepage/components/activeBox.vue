<template>
  <div class="contentBox">
    <section class="title">
      <h3>{{ title }}</h3>
    </section>
    <section class="content">
      <slot></slot>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  data(){
    return{

    }
  },
  methods: {

  }
}
</script>

<style scoped lang="less">
.contentBox {
  width: 100%;
  height: 100%;
  //border: 2px solid #BDDFFF;
  .title {
    width: 100%;
    height: 43px;
    background: #F4F7FF;
    display: flex;
    align-items: center;
    h3 {
      padding-left: 15px;
      font-size: 16px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #000000;
    }
  }
  .content {
    margin: 0 20px;
    height: calc(100% - 33px);
  }
}

</style>