<template>
  <view />
</template>

<script>
export default {
  onLoad() {
    // plus.navigator.closeSplashscreen()
    this.$utils.appUpdate(true)

    // #ifdef APP-PLUS
    /* const launchFlag = uni.getStorageSync('launchFlag');
			if (launchFlag) {
				uni.switchTab({
					url: '/pages/tabbar/index/index',
					success: () => {
						//跳转完页面后再关闭启动页
						plus.navigator.closeSplashscreen();
					}
				});
			} else {
				uni.reLaunch({
					url: '/pages/guide/guide',
					success: () => {
						//跳转完页面后再关闭启动页
						plus.navigator.closeSplashscreen();
					}
				});
			} */
    // #endif
  }
}
</script>
