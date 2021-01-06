<template>
  <view class="guide">
    <image
      mode="aspectFill"
      :style="{ width: screenWidth+ 'px', height: '100%' }"
      :src="imgSrc"
      @click="goUrl"
    />
    <view
      class="view-to-home"
      @click="launchApp"
    >
      <text class="view-to-home-text">
        跳过 {{ num }}
      </text>
    </view>
  </view>
</template>

<script>
const SystemInfo = uni.getSystemInfoSync()
let myInterval = null

export default {
  data() {
    return {
      screenWidth: SystemInfo.screenWidth,
      imgSrc: '', // 图片路径
      num: 3, // 倒计时时间
      aHref: '' // 广告地址
    }
  },
  onLoad(option) {
    const param = JSON.parse(decodeURIComponent(option.param))
    this.imgSrc = param.imgSrc
    this.num = param.num
    this.aHref = param.aHref
    myInterval = setInterval(() => {
      this.num--
      if (this.num === 0) {
        this.launchApp()
      }
    }, 1000)
  },
  methods: {
    launchApp() {
      clearInterval(myInterval)
      uni.reLaunch({
        url: '/pages/tabbar/index/index'
      })
    },
    // 跳转到广告地址
    goUrl() {
      plus.runtime.openURL(this.aHref)
    }
  }
}
</script>
<style scoped>
  .guide{
    display: flex;
    height: 100%;
  }
  .view-to-home{
    position: absolute;
    z-index: 999;
    right: 40rpx;
    /* #ifndef MP */
    top: 80rpx;
    /* #endif */
    /* #ifdef MP */
    top: 150rpx;
    /* #endif */
  }
  .view-to-home-text{
    color: #fff;
    text-align: center;
    background-color: rgba(0, 0, 0, .5);
    border-width: 1rpx;
    border-color: #fff;
    border-style: solid;
    border-radius: 30rpx;
    font-size: 28rpx;
    padding-top: 5rpx;
    padding-bottom: 5rpx;
    padding-left: 25rpx;
    padding-right: 25rpx;
  }
</style>
