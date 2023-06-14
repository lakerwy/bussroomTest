<template>
  <div>
    <a
        v-if="!isFreeMember"
        target="_blank"
        :href="url"
        class="infoTitle"
        v-html="title"
        @click="getIsRead"
    ></a>
    <a
        v-if="isFreeMember"
        href="#"
        class="infoTitle"
        v-html="title"
        @click="getIsRead"
    ></a>
  </div>
</template>

<script>
import {getIsRead} from "@/api_new/index";
import {mapMutations} from "vuex";

export default {
  name: "readTitle",
  props: {
    // url: String,
    title: String,
    id: String,
  },
  data() {
    return {
      url: "https://chinabidding.bid5.cn/html/infoDetails.html",
    }
  },
  computed: {
    isFreeMember(){
      let temp = false;
      if (JSON.parse(this.getStore("userInfo")).memberType == "免费会员") temp = true;
      return temp;
    },
  },
  methods: {
    ...mapMutations(["setShowFreeMerber"]),
    async getIsRead() {
      if (this.isFreeMember) {
        this.$bus.$emit("setTitleRead", {
          isReadTitle: true,
          id: this.id,
          url: this.url
        });
        this.setShowFreeMerber(true);
        return
      }
      let res = await getIsRead({
        ids: this.id
      })
    }
  }
}
</script>

<style scoped>

</style>