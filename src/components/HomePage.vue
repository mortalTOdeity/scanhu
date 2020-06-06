<template>
  <div class="home-page">
    <div class="page-content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <van-tabbar v-model="activeScanner" router>
      <van-tabbar-item icon="home-o" name="/barcode" replace to="barcode">条码扫描</van-tabbar-item>
      <van-tabbar-item icon="setting-o" name="/qrcode" replace to="qrcode">二维码扫描</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: 'HomePage',
  data () {
    return {
      activeScanner: '/barcode'
    }
  },
  mounted () {
    console.log(this.$route.path)
    this.activeScanner = this.$route.path
  }
}
</script>
<style scoped>
.home-page {
  height: 100%;
}
.page-content {
   height: calc(100% - 50px);
 }
</style>
