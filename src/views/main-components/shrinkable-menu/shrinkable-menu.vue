<style lang="less">
@import "./styles/menu.less";
</style>

<template>
  <div id="shangwushi-menu">
    <slot name="top"></slot>
    <sidebar-menu
      v-show="!shrink"
      :menu-list="menuList"
      :open-names="openNames"
      :iconSize="21"
      @on-change="handleChange"
    ></sidebar-menu>
    <sidebar-menu-shrink
      v-show="shrink"
      :menu-list="menuList"
      :icon-color="shrinkIconColor"
      @on-change="handleChange"
    ></sidebar-menu-shrink>
  </div>
</template>

<script>
import sidebarMenu from "./components/sidebarMenu.vue";
import sidebarMenuShrink from "./components/sidebarMenuShrink.vue";
import util from "@/libs/util";
export default {
  name: "shrinkableMenu",
  components: {
    sidebarMenu,
    sidebarMenuShrink,
  },
  props: {
    shrink: {
      type: Boolean,
      default: false,
    },
    menuList: {
      type: Array,
      required: true,
    },
    theme: {
      type: String,
      default: "dark",
      validator(val) {
        return util.oneOf(val, ["dark", "light"]);
      },
    },
    beforePush: {
      type: Function,
    },
    openNames: {
      type: Array,
    },
  },
  computed: {
    bgColor() {
      return this.theme == "dark" ? "#515a6e" : "#fff";
    },
    shrinkIconColor() {
      return this.theme == "dark" ? "#fff" : "#515a6e";
    },
  },
  methods: {
    handleChange(name) {
      console.log(name)
      let memberType = JSON.parse(this.getStore('userInfo')).memberType
      if (name === "creditRate" && memberType === '免费会员') {
        var url =
          "https://tb.53kf.com/code/client/0ae6bb374440bbf180f02e04d57fb6962/10";
        window.open(
          url,
          "",
          "height=625,width=750,top=195,left=585,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=yes, status=no"
        );
        return;
      }
      if (name === "renewals") {
        window.open("https://www.chinabidding.cn/caidou/Renewals/index");
        return;
      }
      let willpush = true;
      if (this.beforePush !== undefined) {
        if (!this.beforePush(name)) {
          willpush = false;
        }
      }
      if (willpush) {
        this.$router.push({
          name: name,
        });
      }
      this.$emit("on-change", name);
    },
  },
};
</script>