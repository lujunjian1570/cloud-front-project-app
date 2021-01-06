<template>
  <view>
    <my-navbar title="设置" />
    <u-cell-group>
      <u-cell-item
        title="版本号"
        :value="version"
        @click="versionUpdate"
      />
    </u-cell-group>
  </view>
</template>

<script>
export default {
  data() {
    return {
      version: ''
    }
  },
  onLoad() {
    // #ifdef APP-PLUS
    plus.runtime.getProperty(plus.runtime.appid, (appInfo) => {
      this.version = appInfo.version
    })
    // #endif
  },
  methods: {
    versionUpdate() {
      this.$utils.appUpdate()
    }
  }
}
</script>
