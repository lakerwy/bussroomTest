<template>
  <div class="freeModal">
    <Modal
        v-model="showFreeMerber"
        :title="freeTitle"
        width="400"
        @on-cancel="cancel"
    >
      <span>{{ guideText }}</span>
      <div slot="footer">
        <Button type="text" @click="cancel">取消</Button>
        <Button type="primary" @click="handleOk">确认</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import {getIsRead} from "@/api_new/index";

export default {
  name: "freeMemberTips",
  props: {
    freeTitle: {
      type: String,
      default: "付费提示",
    }
  },
  data(){
    return{
      guideText: "尊敬的客户，你所查看的内容属于付费客户专享，开通付费功能，请垂询400-006-6655。",
      guideWords: {
        default: "尊敬的客户，你所查看的内容属于付费客户专享，开通付费功能，请垂询400-006-6655。",
        feature: "尊敬的客户，你所查看的功能属于付费客户专享，开通付费功能，请垂询400-006-6655。",
        browse: "搜索条件越多，商机捕捉越多，开通付费会员，您能获得更多项目，拨打400-006-6655即刻拥有，坐拥千万商机体验！",
        subscrip: "订我所找，阅我所需，招标助力小帮手，随时随地”阅“不停，更多订阅神器，请拨打400-006-6655",
        myTeam: "该功能属于付费客户权限，请尽快联系专属客户开通权限。"
      },
      isReadTitle: false,
      readObj: {}
    }
  },
  computed: {
    ...mapState(["showFreeMerber"]),
  },
  created() {

  },
  mounted() {
    this.$bus.$on("setFreeGuidedWords", (message) => {
      this.guideText = this.guideWords[message];
    })
    this.$bus.$on("setTitleRead",(obj)=>{
      this.isReadTitle = obj.isReadTitle;
      this.readObj = {
        ...obj
      }
    })
  },
  methods: {
    ...mapMutations(["setShowFreeMerber"]),
    cancel(){
      this.setShowFreeMerber(false);
      setTimeout(()=>{
        this.guideText = this.guideWords.default;
        this.isReadTitle = false;
      },500)
      // this.$emit("handleFreeClose", false);
    },
    handleOk(){
      this.cancel();
      if (this.isReadTitle){
        getIsRead({
          ids: this.readObj.id
        })
        window.open(this.readObj.url)
      }
      // this.setShowFreeMerber(false);
      // this.$emit("handleFreeClose", false);
    }
  }
}
</script>

<style scoped>

</style>