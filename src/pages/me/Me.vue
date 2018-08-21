<template>
  <div @click="scanCode">添加图书</div>
</template>
<script>
import { post, showSuccess, showModal } from "@/utils";
// 腾讯云增强sdk，可以用来客户端与服务端通信，获取用户信息等
import qcloud from "wafer2-client-sdk";
import config from "@/config";
export default {
  methods: {
    async addBook(isbn) {
      const res = await post("/weapp/addbook", {
        isbn
      });
      console.log("addbook", res);
      showModal("添加成功", `${res.title}`);
    },
    scanCode() {
      wx.scanCode({
        success: res => {
          if (res.result) {
            console.log(res.result);
            this.addBook(res.result);
          }
        }
      });
    }
  }
};
</script>
<style>
</style>
