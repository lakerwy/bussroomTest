<style lang="less">
@import "./main.less";
.nav-search-text {
  color: #999999;
  span {
    display: inline-block;
    vertical-align: middle;
    margin: 0 5px;
    font-size: 12px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    cursor: pointer;
  }
}
</style>

<template>
  <div class="main" :class="{ 'main-hide-text': shrink }">
    <Modal
      v-model="busyFlag"
      :mask-closable="false"
      width="360"
      :closable="false"
    >
      <p slot="header" style="color: #f60; text-align: center">
        <Icon type="ios-information-circle"></Icon>
        <span>提醒</span>
      </p>
      <div style="text-align: center">
        <p>服务器繁忙,请稍后再操作</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long :loading="true"
          >{{ busyTimeout }}秒后重试</Button
        >
      </div>
    </Modal>
    <div
      class="sidebar-menu-con menu-bar"
      :style="{
        width: shrink ? '60px' : '230px',
        overflow: shrink ? 'visible' : 'auto',
      }"
    >
      <shrinkable-menu
        :shrink="shrink"
        @on-change="handleSubmenuChange"
        :theme="menuTheme"
        :before-push="beforePush"
        :open-names="openedSubmenuArr"
        :menu-list="menuList"
      >
        <div slot="top" class="logo-con">
          <!-- <img v-show="!shrink" src="../assets/logo.png" key="max-logo" />
          <img v-show="shrink" src="../assets/logo-min.png" key="min-logo" />-->
          <div v-show="!shrink" class="bigLogo">我的商务室</div>
          <div v-show="shrink" class="minLogo">商</div>
        </div>
      </shrinkable-menu>
    </div>
    <div
      class="main-header-con"
      :style="{ paddingLeft: shrink ? '60px' : '230px' }"
    >
      <div class="main-header">
        <div class="navicon-con">
          <Button
            :style="{
              transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)',
              height: '48px',
            }"
            type="text"
            @click="toggleClick"
          >
            <Icon type="md-menu" size="32"></Icon>
          </Button>
        </div>
        <div class="header-middle-con">
          <div class="main-breadcrumb" v-if="navType == 4">
            <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
          </div>
          <div v-if="showMyapp" class="nav-search" style="margin-top: 5px; display: flex">
            <div>
              <Input v-model="searchForm.keywords" search placeholder="请输入搜索内容">
                <Select v-model="searchForm.search_type" slot="prepend" style="width: 100px;">
                  <Option value="TITLE">标题</Option>
                  <Option value="CONTEXT">内容</Option>
                </Select>
                <Button slot="append" icon="ios-search" class="appendButton" @click="search"></Button>
              </Input>
            </div>
            <div style="line-height: 32px; margin-left: 12px" class="nav-search-text">
              <template v-for="(item,index) in tempKeyword">
                <span :key="index" @click="setKeyword(item)">{{ item }}</span>
                {{ index != tempKeyword.length - 1 ? "|" : "" }}
              </template>
            </div>
          </div>
          <div class="main-nav-menu" v-if="navType == 1 || navType == 2">
            <Menu v-if="false"
              mode="horizontal"
              :active-name="currNav"
              @on-select="selectNav"
            >
              <MenuItem
                v-for="(item, i) in navList.slice(0, sliceNum)"
                :key="i"
                :name="item.name"
              >
                <Icon :type="item.icon" v-if="navType == 1" />
                {{ item.title }}
              </MenuItem>
              <Submenu name="sub" v-if="navList.length > sliceNum">
                <template slot="title">更多</template>
                <MenuItem
                  v-for="(item, i) in navList.slice(sliceNum, navList.length)"
                  :key="i"
                  :name="item.name"
                >
                  <Icon :type="item.icon" v-if="navType == 1" />
                  {{ item.title }}
                </MenuItem>
              </Submenu>
            </Menu>
          </div>
          <div class="main-nav" v-if="navType == 3">
            <Dropdown transfer @on-click="selectNav">
              <div style="cursor: pointer">
                {{ currNavTitle }}
                <Icon type="ios-arrow-down"></Icon>
              </div>
              <DropdownMenu slot="list">
                <DropdownItem
                  v-for="(item, i) in navList"
                  :key="i"
                  :name="item.name"
                  :selected="currNav == item.name"
                >
                  <div class="nav-item">
                    <Icon
                      :type="item.icon"
                      :size="16"
                      style="margin: 0 10px 3px 0"
                    ></Icon>
                    {{ item.title }}
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div
          :class="{
            'header-avator-con': navType != 4,
            'header-avator-con nav4': navType == 4,
          }"
          style="padding-left: 50px"
        >
          <Dropdown @on-click="selectNav" class="options" v-if="navType == 4">
            <Icon type="ios-apps" :size="24" class="language"></Icon>
            <DropdownMenu slot="list">
              <DropdownItem
                v-for="(item, i) in navList"
                :key="i"
                :name="item.name"
                :selected="currNav == item.name"
              >
                <div>
                  <Icon
                    :type="item.icon"
                    :size="14"
                    style="margin: 0 10px 2px 0"
                  ></Icon>
                  {{ item.title }}
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <full-screen
              v-if="false"
            class="tool_icon"
            v-model="isFullScreen"
            @on-change="fullscreenChange"
          ></full-screen>
          <Icon class="tool_icon" style="font-size: 20px; display: inline-block; vertical-align: middle" type="md-call" />
          <!-- <Dropdown @on-click="handleLanDropdown" class="options">
            <Icon type="md-globe" :size="24" class="language"></Icon>
            <DropdownMenu slot="list">
              <DropdownItem name="zh-CN">中文</DropdownItem>
              <DropdownItem name="en-US">English</DropdownItem>
            </DropdownMenu>
          </Dropdown> -->
          <!-- <lock-screen class="tool_icon"></lock-screen> -->
          <message-tip class="tool_icon" v-model="mesCount"></message-tip>
          <div class="user-dropdown-menu-con">
            <Row
              type="flex"
              justify="end"
              align="middle"
              class="user-dropdown-innercon"
            >
              <Dropdown
                transfer
                trigger="hover"
                @on-click="handleClickUserDropdown"
              >
                <a>
                  <Avatar
                    :src="avatarPath"
                    style="background: #619fe7; margin-right: 10px"
                  ></Avatar>
                  <span class="main-user-name">{{
                    $store.state.user.nickname
                  }}</span>
                  <Icon style="color: #5A5A5A;" type="ios-arrow-down" />
<!--                  <Icon type="md-arrow-dropdown" />-->
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem name="ownSpace">{{
                    $t("userCenter")
                  }}</DropdownItem>
                  <DropdownItem name="changePass">{{
                    $t("changePass")
                  }}</DropdownItem>
                  <DropdownItem name="loginout" divided>{{
                    $t("logout")
                  }}</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Row>
          </div>
        </div>
      </div>
      <div class="tags-con">
        <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
      </div>
    </div>
    <div class="single-page-con" :style="{ left: shrink ? '60px' : '230px' }">
      <div class="single-page">
        <keep-alive :include="cachePage">
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
    <!-- 全局加载动画 -->
    <circleLoading class="loading-position" v-show="loading" />

    <FreeMemberTips></FreeMemberTips>
  </div>
</template>

<script>
import shrinkableMenu from "./main-components/shrinkable-menu/shrinkable-menu.vue";
import tagsPageOpened from "./main-components/tags-page-opened.vue";
import breadcrumbNav from "./main-components/breadcrumb-nav.vue";
import fullScreen from "./main-components/fullscreen.vue";
import lockScreen from "./main-components/lockscreen/lockscreen.vue";
import messageTip from "./main-components/message-tip.vue";
import circleLoading from "@/views/my-components/xboot/circle-loading.vue";
import Cookies from "js-cookie";
import util from "@/libs/util.js";
import {
  ws,
  getOtherSet,
  ticketLogout, // 退出登录
} from "@/api/index";
import SockJS from "sockjs-client";
import stompOld from "@/libs/stomp.js";

import axios from "axios";
// import {getTeamUserName} from "@/api/account";
import { mapMutations } from "vuex";
import { FreeMemberTips } from "@/components/contentBox/index.js"

import {getTeamUserName,getMessageSendData} from "@/api_new/index"

var Stomp = stompOld.Stomp;
var client;
export default {
  components: {
    shrinkableMenu,
    tagsPageOpened,
    breadcrumbNav,
    fullScreen,
    lockScreen,
    messageTip,
    circleLoading,
    FreeMemberTips
  },
  data() {
    return {
      sliceNum: 3,
      shrink: false,
      username: "",
      userId: "",
      isFullScreen: false,
      openedSubmenuArr: this.$store.state.app.openedSubmenuArr,
      firstThreeNav: [],
      lastNav: [],
      navType: 1,
      searchForm: {
        search_type: "CONTEXT",
        keywords: "",
      },
      tempKeyword: ['水塔', '风电', '电梯', '酒店'],
    };
  },
  computed: {
    busyFlag() {
      return this.$store.state.app.busyFlag;
    },
    busyTimeout() {
      return this.$store.state.app.busyTimeout;
    },
    loading() {
      return this.$store.state.app.loading;
    },
    navList() {
      return this.$store.state.app.navList;
    },
    currNav() {
      return this.$store.state.app.currNav;
    },
    currNavTitle() {
      return this.$store.state.app.currNavTitle;
    },
    menuList() {
      return this.$store.state.app.menuList;
    },
    pageTagsList() {
      return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
    },
    currentPath() {
      return this.$store.state.app.currentPath; // 当前面包屑数组
    },
    avatarPath() {
      return localStorage.avatorImgPath;
    },
    cachePage() {
      return this.$store.state.app.cachePage;
    },
    lang() {
      return this.$store.state.app.lang;
    },
    menuTheme() {
      return this.$store.state.app.menuTheme;
    },
    mesCount() {
      return this.$store.state.app.messageCount;
    },
    showMyapp() {
      let bol;
      if (this.$route.path && this.$route.path.includes('myApplication')){
        bol = false;
      } else {
        bol = true;
      }
      return bol;
    }
  },
  stompClient: {
    monitorIntervalTime: 100,
    stompReconnect: true,
    timeout(orgCmd) {},
  },
  methods: {
    ...mapMutations(["setTeamUserName"]),
    async init() {
      this.$store.commit("getNickName");
      // 菜单
      let pathArr = util.setCurrentPath(this, this.$route.name);
      // this.$store.commit("updateMenulist");
      if (pathArr.length >= 2) {
        this.$store.commit("addOpenSubmenu", pathArr[1].name);
      }
      let userInfo = JSON.parse(Cookies.get("userInfo"));
      this.username = this.$store.state.user.nickname;

      this.userId = userInfo.id;
      this.checkTag(this.$route.name);
      let currWidth = document.body.clientWidth;
      if (currWidth <= 1200) {
        this.sliceNum = 2;
      }
      // 读取未读消息数
      /*getMessageSendData({
        userId: userInfo.id,
        status: 0,
      }).then((res) => {
        if (res.success) {
          this.$store.commit("setMessageCount", res.result.totalElements);
        }
      });*/
      let res = getMessageSendData({
        userId: userInfo.id,
      });
      if (res.success) {
        this.$store.commit("setMessageCount", res.result.totalElements);
      }
      // 消息开关 websocket
      let messageOpen = this.getStore("messageOpen");
      console.log("messageOpen", messageOpen);
      if (messageOpen != "0") {
        this.connect();
      }
    },
    connect() {
      var headers = {};
      client = Stomp.over(new SockJS(ws));
      client.connect(headers, this.onConnected, this.onFailed);
    },
    onConnected(frame) {
      console.log("连接ws成功: " + frame);
      var topicSubscription = client.subscribe(
        "/topic/subscribe",
        this.responseCallback
      );
      var queueSubscription = client.subscribe(
        "/user/" + this.userId + "/queue/subscribe",
        this.responseCallback
      );
    },
    onFailed(frame) {
      console.log("连接ws失败： " + JSON.stringify(frame));
    },
    responseCallback(frame) {
      console.log("收到消息：" + frame.body);
      this.$store.commit("setMessageCount", this.mesCount + 1);
    },
    selectNav(name) {
      this.$store.commit("setCurrNav", name);
      this.setStore("currNav", name);
      // 清空所有已打开标签
      // this.$store.commit("clearAllTags");
      if (this.$route.name != "home_index") {
        this.$router.push({
          name: "home_index",
        });
      }
      util.initRouter(this);
    },
    toggleClick() {
      this.shrink = !this.shrink;
    },
    handleLanDropdown(name) {
      this.$i18n.locale = name;
      this.$store.commit("switchLang", name);
    },
    handleClickUserDropdown(name) {
      if (name == "ownSpace") {
        util.openNewPage(this, "ownspace_index");
        this.$router.push({
          name: "ownspace_index",
        });
      } else if (name == "changePass") {
        util.openNewPage(this, "change_pass");
        this.$router.push({
          name: "change_pass",
        });
      } else if (name == "loginout") {
        // 退出登录
        // let sessionId = localStorage.getItem("sessionId");
        // this.$store.commit("setLoading", true);
        // getOtherSet().then((res) => {
        //   this.$store.commit("setLoading", false);
        //   if (res.result) {
        //     let domain = res.result.ssoDomain;
        //     Cookies.set("accessToken", "", {
        //       domain: domain,
        //       expires: 7,
        //     });
        //   }
        //   this.$store.commit("logout", this);
        //   this.$store.commit("clearOpenedSubmenu");
        //   this.setStore("accessToken", "");
        //   // 强制刷新页面 重新加载router
        //   location.reload();
        // });
        this.setStore("accessToken", "");
        localStorage.clear();
        location.href = "https://chinabidding.bid5.cn/";
      }
    },
    checkTag(name) {
      let openpageHasTag = this.pageTagsList.some((item) => {
        if (item.name == name) {
          return true;
        }
      });
      if (!openpageHasTag) {
        //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
        util.openNewPage(
          this,
          name,
          this.$route.params || {},
          this.$route.query || {}
        );
      }
    },
    handleSubmenuChange(val) {
      // console.log(val)
    },
    beforePush(name) {
      // console.log(name)
      return true;
    },
    fullscreenChange(isFullScreen) {
      // console.log(isFullScreen);
    },
    resize() {
      let currWidth = document.body.clientWidth;
      if (currWidth <= 1200 && currWidth > 900) {
        this.sliceNum = 2;
        this.shrink = true;
      } else if (currWidth <= 900) {
        this.sliceNum = 1;
        this.shrink = true;
      } else {
        this.sliceNum = 3;
        this.shrink = false;
      }
    },
    search(){
      let url = `https://www.chinabidding.cn/search/searchgj/zbcg?keywords=${this.searchForm.keywords}`
      if (this.searchForm.search_type == 'TITLE'){
        url = `https://www.chinabidding.cn/search/searchgj/zbcg?keywords=${this.searchForm.keywords}&search_type=TITLE`
      }
      window.open(url)
    },
    setKeyword(item){
      this.searchForm.keywords = item
    },
    //获取团队用户昵称
    async getTeamUserName(){
      // if (!JSON.parse(this.getStore("userInfo")).type) return
      let res = await getTeamUserName();
      const {success, result} = res;
      if (success){
        this.setTeamUserName(result);
      }
    },
  },
  watch: {
    $route(to) {
      document.getElementsByClassName("single-page-con")[0].scrollTo(0,0);
      this.$store.commit("setCurrentPageName", to.name);
      let pathArr = util.setCurrentPath(this, to.name);
      if (pathArr.length > 2) {
        this.$store.commit("addOpenSubmenu", pathArr[1].name);
      }
      this.checkTag(to.name);
      localStorage.currentPageName = to.name;
    },
    lang() {
      util.setCurrentPath(this, this.$route.name); // 在切换语言时用于刷新面包屑
    },
  },
  mounted() {
    this.getTeamUserName();
    this.init();
    let that = this;
    this.resize();
    window.addEventListener("resize", function () {
      that.resize();
    });
  },
  created() {
    // 显示打开的页面的列表
    this.$store.commit("setOpenedList");
  },
};
</script>

<style lang="less" scoped>
.appendButton {
  background: #406EF5;
  border-top-left-radius: 0 0;
  border-bottom-left-radius: 0 0;
  color: white;
}
</style>