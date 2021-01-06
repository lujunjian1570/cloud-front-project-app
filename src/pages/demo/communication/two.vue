<template>
  <view class="">
    <nav-bar
      title="vue页面"
      left-icon="back"
    />
    <view class="container">
      <text>接收到数据：{{ arr }}</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      arr: ''
    }
  },
  onLoad() {
    // 监听事件
    uni.$on('test', (e) => {
      this.arr = e.arr
    })
    uni.$emit('need')
  },
  onUnload() {
    // 移除监听事件
    uni.$off('need')
    uni.$off('test')
  },
  methods: {

  }
}
</script>

<style>
  .container{
    padding: 20px;
    font-size: 14px;
    line-height: 24px;
  }
</style>
