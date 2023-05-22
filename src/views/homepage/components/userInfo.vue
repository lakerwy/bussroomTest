<template>
  <div class="user">
    <section class="userTop">
      <div class="img">
        <img  :src="userInfo.avatar" alt="">
      </div>
      <div class="details">
        <div class="userName">{{ userInfo.username }}</div>
        <div><span>身 份：</span>{{ userInfo.userType }}</div>
        <div><span>会员级别：</span>{{ userInfo.members }}
<!--          （2年）-->
        </div>
        <div><span>到期时间：</span>{{ userInfo.dueDate }}</div>

      </div>
    </section>
    <section class="userBottom">
      <div class="customer">
        <div class="service">专属客服：<span>{{ userInfo.customer }}</span></div>
        <div>服务热线：<span>{{userInfo.contactPhone}}</span></div>
      </div>
      <div class="chartImg">
        <img src="../../../assets/account/wechat.png" alt=""><br>
        <span>微信扫码查询</span>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    userInfo: {
      type: Object,
      default: ()=>({
        avatar: "img/userlogo.png",
        username: '用户名',
        userType: '管理员',
        members: 'VIP会员',
        dueDate: '2023-5-19',
        customer: '周小鑫',
        contactPhone: '13255687359'
      })
    },
  }
}
</script>

<style scoped lang="less">
.user {
  width: 100%;
  height: 100%;
  .userTop {
    text-align: center;
    margin: 5px 0;
    .img {
      img {
        width: 80px;
        border-radius: 40px;
        border: 1px solid;
        border-color: #E9E2E4;
      }
    }
    .details {
      color: #606060;
      font-size: 12px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      >div {
        margin: 3px 0;
      }
      .userName {
        margin: 5px 0 10px 0;
        font-size: 18px;
        color: #333333;
      }
      span {
        color: #999999;
      }
    }
  }
  .userBottom {
    height: 152px;
    background: #F6F6F6;
    margin-top: 30px;
    padding: 20px 20px 0 20px;
    display: flex;
    justify-content: center;
    .customer {
      width: 50%;
      font-size: 14px;
      color: #999999;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      text-align: left;
      .service {
        margin-top: 5px;
        margin-bottom: 15px;
        font-size: 13px;
      }
      span {
        color: #333333;
        display: block;
        margin-top: 5px;
      }
    }
    .chartImg {
      width: 50%;
      text-align: center;
      font-size: 12px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #999999;
      img {
        width: 99px;
      }
      span {
        display: inline-block;
        transform: translate(0, -5px) scale(0.9,0.9);
      }
    }
  }
}
</style>