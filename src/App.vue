<script>
import { get, showSuccess } from './utils'
// 腾讯云增强sdk，可以用来客户端与服务端通信，获取用户信息等
import qcloud from 'wafer2-client-sdk'
import config from './config'
export default {
  created () {
    // 接口调整，不可再弹窗授权，只能通过按钮主动授权
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
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: res => {
              // let user = wx.getStorageSync("userinfo");
              console.log(res.userinfo)
              showSuccess('登录成功！')
              wx.setStorageSync('userinfo', res.userinfo)
            },
            fail: err => {
              console.log(err)
            }
          })
        }
      }
    })
  }
}
</script>

<style>
</style>
