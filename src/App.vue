<script>
import './common/config/env.js'

export default {
  globalData: process.uniEnv,
  onLaunch: function() {
    // 检测版本更新
    this.$utils.appUpdate(0)
    // 获取皮肤
    this.$utils.getTheme()
  },
  onShow: function() {
    // console.log('App Show')
  },
  onHide: function() {
    // console.log('App Hide')
  }

}
</script>

<style lang="scss">
  /* 每个页面公共css */
  @import "./common/css/base.scss";
</style>
