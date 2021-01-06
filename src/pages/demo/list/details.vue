<template>
  <view>
    <nav-bar
      :title="title"
      left-icon="back"
    />
    <view class="banner">
      <image
        class="banner-img"
        :src="banner.cover"
      />
      <view class="banner-title">
        {{ banner.title }}
      </view>
    </view>
    <view class="article-meta">
      <text class="article-author">
        {{ banner.author_name }}
      </text>
      <text class="article-text">
        发表于
      </text>
      <text class="article-time">
        {{ banner.published_at }}
      </text>
    </view>
    <view class="article-content">
      <rich-text :nodes="htmlNodes" />
    </view>
  </view>
</template>

<script>
import htmlParser from './js/html-parser.js'
export default {
  data() {
    return {
      title: '',
      banner: {},
      htmlNodes: []
    }
  },
  onLoad(event) {
    // TODO 后面把参数名替换成 payload
    const payload = event.detailDate || event.payload
    // 目前在某些平台参数会被主动 decode，暂时这样处理。
    try {
      this.banner = JSON.parse(decodeURIComponent(payload))
    } catch (error) {
      this.banner = JSON.parse(payload)
    }
    /* uni.setNavigationBarTitle({
				title: this.banner.title
			}); */
    this.title = this.banner.title
    this.getDetail()
  },
  methods: {
    getDetail() {
      uni.request({
        url: 'https://unidemo.dcloud.net.cn/api/news/36kr/' + this.banner.post_id,
        success: (data) => {
          if (data.statusCode == 200) {
            let htmlString = data.data.content.replace(/\\/g, '').replace(/<img/g, '<img style="display:none;"')
            this.htmlNodes = htmlParser(htmlString) // 将 HTML String转化为 nodes 数组
          }
        },
        fail: () => {
          console.log('fail')
        }
      })
    }
  }
}
</script>

<style>
  .banner{
    height: 360rpx;
    overflow: hidden;
    position: relative;
    background-color: #ccc;
  }
  .banner-img{
    width: 100%;
  }
  .banner-title{
    max-height: 84rpx;
    overflow: hidden;
    position: absolute;
    left: 30rpx;
    bottom: 30rpx;
    width: 90%;
    font-size: 32rpx;
    font-weight: 400;
    line-height: 42rpx;
    color: white;
    z-index: 11;
  }
  .article-meta{
    padding: 20rpx 40rpx;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    color: gray;
  }
  .article-text{
    font-size: 26rpx;
    line-height: 50rpx;
    margin: 0 20rpx;
  }
  .article-author,
  .article-time{
    font-size: 30rpx;
  }
  .article-content{
    padding: 0 30rpx;
    overflow: hidden;
    font-size: 30rpx;
    margin-bottom: 30rpx;
  }
</style>
