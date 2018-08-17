<script>
import { get } from "./utils";
//腾讯云增强sdk，可以用来客户端与服务端通信，获取用户信息等
import qcloud from "wafer2-client-sdk";
import config from "./config";
export default {
  async created() {
    //接口调整，不可再弹窗授权，只能通过按钮主动授权
    // qcloud.setLoginUrl(config.loginUrl);
    // qcloud.login({
    //   success: userInfo => {
    //     console.log("登录成功", userInfo);
    //   },
    //   fail: err => {
    //     console.log("登录失败", err);
    //   }
    // });
    // const res = await get("/weapp/demo");
    // console.log(res);
    // wx.request({
    //   url: config.host + "/weapp/demo",
    //   success: res => {
    //     console.log(res);
    //   }
    // });
    console.log("小程序启动了");
  }
};
</script>

<style>
</style>
