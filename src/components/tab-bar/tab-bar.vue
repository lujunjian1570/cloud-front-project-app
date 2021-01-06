<template>
  <view
    :style="{ 'background-color': backgroundColor }"
    class="uni-tabbar"
  >
    <view
      v-for="(item,index) in tabbar"
      :key="index"
      class="uni-tabbar__item"
      @tap="changeTab(item)"
    >
      <view
        v-if="true"
        :style="{ color: item.pagePath == pagePath ? selectColor : color }"
        class="icon iconfont"
        :class="[item.fontIcon]"
      />
      <!-- 上面使用的是字体图标，解决切换页面的时候图标会闪的效果，下面是图片方式 -->
      <view
        v-if="false"
        class="uni-tabbar__bd"
      >
        <view class="uni-tabbar__icon">
          <image
            v-if="item.pagePath == pagePath"
            class="uni-w-42 uni-h-42"
            mode="aspectFit"
            :src="item.selectedIconPath"
          />
          <image
            v-else
            class="uni-w-42 uni-h-42"
            mode="aspectFit"
            :src="item.iconPath"
          />
        </view>
      </view>
      <view
        :style="{ color: item.pagePath == pagePath ? selectColor : color }"
        class="uni-tabbar__label"
      >
        {{ item.text }}
      </view>
    </view>
  </view>
</template>

<script>
// import theme from "@/common/js/theme.js";
const theme = uni.getStorageSync('theme')

/**
	 * TabBar 自定义底部导航栏
	 * @description 导航栏组件，主要用于底部导航
	 * @property {String} pagePath 页面路径
	 * @property {String} color 图标和文字默认颜色
	 * @property {String} selectColor 图标和文字选中颜色
	 * @property {String} backgroundColor 导航栏背景颜色
	 * @event {Function} currentClick 当前tab点击事件
	 */
export default {
  props: {
    pagePath: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: theme.tabbarColor || '#999'
    },
    selectColor: {
      type: String,
      default: theme.tabbarSelectColor || '#1ca6ec'
    },
    backgroundColor: {
      type: String,
      default: theme.tabbarBackgroundColor || '#fff'
    }
  },
  data() {
    return {
      page: '',
      tabbar: [{
        'pagePath': '/pages/tabbar/index/index',
        'iconPath': '/static/home.png',
        'selectedIconPath': '/static/homeHL.png',
        'text': '首页',
        'fontIcon': 'icon-home'
      },
      {
        'pagePath': '/pages/tabbar/my/my',
        'iconPath': '/static/user.png',
        'selectedIconPath': '/static/userHL.png',
        'text': '我的',
        'fontIcon': 'icon-my'
      }
      ]
    }
  },
  mounted() {
    // 可以在这请求获取tabbar数据
    const num = 1
    if (num === 1) {
      this.tabbar.splice(1, 0, {
        'pagePath': '/pages/demo/customize/customize',
        'iconPath': '/static/home.png',
        'selectedIconPath': '/static/homeHL.png',
        'text': '测试',
        'fontIcon': 'icon-cart'
      })
    }
  },
  methods: {
    changeTab(item) {
      // 当前tab点击事件
      if (this.pagePath == item.pagePath) {
        this.$emit('current-click')
        return false
      }
      // 这里使用reLaunch关闭所有的页面，打开新的栏目页面
      uni.reLaunch({
        url: item.pagePath
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .uni-tabbar{
    position: fixed;
    bottom: 0;
    z-index: 999;
    width: 100%;
    display: flex;
    justify-content: space-around;
    height: 98rpx;
    padding: 16rpx 0;
    box-sizing: border-box;
    border-top: solid 1rpx #ccc;

    // box-shadow: 0px 0px 17rpx 1rpx rgba(206, 206, 206, 0.32);
    .uni-tabbar__item{
      display: block;
      line-height: 24rpx;
      font-size: 20rpx;
      text-align: center;
    }
    .uni-tabbar__icon{
      height: 42rpx;
      line-height: 42rpx;
      text-align: center;
    }
    .icon{
      display: inline-block;
      vertical-align: middle;
      padding: 2px 0 10px 0;
      font-size: 20px;
      color: #999;
    }
    .uni-tabbar__label{
      line-height: 24rpx;
      font-size: 24rpx;
      color: #999;
    }
    .color-active{
      color: #1ca6ec;
    }
  }
</style>
