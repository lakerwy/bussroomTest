<template>
  <div class="slider" @mouseover="over" @mouseout="out">
    <ul class="slider-main">
      <div class="slider-item">
        <li v-for="(item,index) in 5" :key="index" @mouseover="itemOver(index)" @mouseout="itemOut(index)">
          <h2>{{ index }}</h2>
        </li>
      </div>
      <div class="item-copy">
        <li v-for="(item,index) in 5" :key="index" @mouseover="copyOver(index)" @mouseout="copyOut(index)">
          <h2>{{ index }}</h2>
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return {
      total: 0,
      totalCopy: 1000,
      myTimer: null,
    }
  },
  mounted() {
    this.out();
  },
  methods: {
    over(){
      clearInterval(this.myTimer)
    },
    out(){
      let that = this;
      let sliderItem = document.getElementsByClassName("slider-item")[0];
      let sliderCopy = document.getElementsByClassName("item-copy")[0];
      this.myTimer = setInterval(()=>{
        that.total = that.total - 200;
        that.totalCopy = that.totalCopy - 200;
        sliderItem.style.transition = "1s";
        sliderCopy.style.transition = "1s";
        if (that.total < -1000){
          sliderItem.style.transition = "none";
          that.total = 800;
        }
        if (that.totalCopy < -1000){
          sliderCopy.style.transition = "none";
          that.totalCopy = 800;
        }
        sliderItem.style.left = that.total + 'px';
        sliderCopy.style.left = that.totalCopy + 'px';
      },1000)
    },
    itemOver(index){
      let sliderItem = document.getElementsByClassName("slider-item")[0];
      let aItemLi = sliderItem.getElementsByTagName("li")[index];
      aItemLi.style.width = "400px";
      aItemLi.style.borderColor = "green";
      sliderItem.style.zIndex = "999";
    },
    itemOut(index){
      let sliderItem = document.getElementsByClassName("slider-item")[0];
      let aItemLi = sliderItem.getElementsByTagName("li")[index];
      aItemLi.style.width = "200px";
      aItemLi.style.borderColor = "cyan";
      sliderItem.style.zIndex = "1";
    },
    copyOver(index){
      let sliderItem = document.getElementsByClassName("item-copy")[0];
      let aItemLi = sliderItem.getElementsByTagName("li")[index];
      aItemLi.style.width = "400px";
      aItemLi.style.borderColor = "red";
      sliderItem.style.zIndex = "999";
    },
    copyOut(index){
      let sliderItem = document.getElementsByClassName("item-copy")[0];
      let aItemLi = sliderItem.getElementsByTagName("li")[index];
      aItemLi.style.width = "200px";
      aItemLi.style.borderColor = "cyan";
      sliderItem.style.zIndex = "1";
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
.slider {
  width: 600px;
  height: 200px;
  margin: 0 auto;
  overflow: hidden;
  border: 1px solid;
  ul  {
    height: 100%;
    position: relative;
    width: 2000px;
    li {
      display: inline-block;
      width: 200px;
      height: 100%;
      border: 1px solid cyan;
      transition: .5s;
    }
    .slider-item {
      position: absolute;
      left: 0;
      height: 100%;
      transition: 1s;
    }
    .item-copy {
      position: absolute;
      left: 1000px;
      height: 100%;
      transition: 1s;
    }
  }
}
</style>