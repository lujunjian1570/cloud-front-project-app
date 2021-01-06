<template>
  <view class="pb98">
    <!-- navBar区域 -->
    <nav-bar title="自定义navbar跟tabbar" />
    <!-- 中间内容区域 -->
    <view class="container">
      <view class="bottom-div">
        <view>
          vue页面测试iconfont矢量图：（支持两种方式使用）
        </view>
        <text class="iconfont icon-home" />
        <text class="iconfont">
          &#xe613;
        </text>
      </view>
      测试滑动到底布局显示
    </view>
    <!-- tabBar区域 -->
    <tab-bar
      :page-path="'/pages/demo/customize/customize'"
      @currentItemClick="currentItemClick"
    />
  </view>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    currentItemClick() {

    }
  }
}
</script>

<style>
  .bottom-div{
    height: 2000rpx;
    padding-top: 10rpx;
    font-size: 36rpx;
  }
</style>
