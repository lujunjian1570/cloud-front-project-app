<template>
  <view class="pb98">
    <view class="wrap">
      <view class="banner">
        <swiper
          class="swiper"
          :indicator-dots="indicatorDots"
          :autoplay="autoplay"
          :interval="interval"
          :duration="duration"
          :circular="circular"
        >
          <block
            v-for="(value, index) in banner"
            :key="index"
          >
            <swiper-item @click="goDetail(value)">
              <image
                class="banner-img"
                :src="value.cover"
              />
              <!-- <view class="banner-title">{{ value.title }}</view> -->
            </swiper-item>
          </block>
        </swiper>
      </view>
      <view class="uni-list">
        <block
          v-for="(value, index) in listData"
          :key="index"
        >
          <view
            class="uni-list-cell"
            hover-class="uni-list-cell-hover"
            @click="goDetail(value)"
          >
            <view class="uni-media-list">
              <image
                class="uni-media-list-logo"
                :src="value.cover"
              />
              <view class="uni-media-list-body">
                <view class="uni-media-list-text-top">
                  {{ value.title }}
                </view>
                <view class="uni-media-list-text-bottom">
                  <text>{{ value.author_name }}</text>
                  <text>{{ value.published_at }}</text>
                </view>
              </view>
            </view>
          </view>
        </block>
      </view>
      <uni-load-more
        :status="status"
        :icon-size="16"
        :content-text="contentText"
      />
    </view>
    <tab-bar :page-path="'/pages/tabbar/index/index'" />
  </view>
</template>

<script>
export default {
  data() {
    return {
      banner: [],
      listData: [],
      lastId: '',
      reload: true,
      status: 'more',
      contentText: {
        contentdown: '上拉加载更多',
        contentrefresh: '加载中',
        contentnomore: '没有更多'
      },
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 500,
      circular: true
    }
  },
  onLoad() {
    // 检测更新
    // this.$utils.appUpdate(true)

    // this.getBanner();
    this.getList()
  },
  onPullDownRefresh() {
    this.reload = true
    this.lastId = ''
    // this.getBanner();
    this.getList()
  },
  onReachBottom() {
    this.status = 'more'
    this.getList()
  },
  methods: {
    getBanner() {
      const data = {
        column: 'id,post_id,title,author_name,cover,published_at' // 需要的字段名
      }
      uni.request({
        url: 'https://unidemo.dcloud.net.cn/api/banner/36kr',
        data: data,
        success: data => {
          uni.stopPullDownRefresh()
          if (data.statusCode == 200) {
            this.banner = data.data
          }
        },
        fail: (data, code) => {
          console.log('fail' + JSON.stringify(data) + code)
        }
      })
    },
    getList() {
      const data = {
        column: 'id,post_id,title,author_name,cover,published_at' // 需要的字段名
      }
      data.minId = this.lastId
      data.time = new Date().getTime() + ''
      data.pageSize = 10
      if (this.lastId) {
        // 说明已有数据，目前处于上拉加载
        this.status = 'loading'
      }
      uni.request({
        url: 'https://unidemo.dcloud.net.cn/api/news',
        data: data,
        success: data => {
          uni.stopPullDownRefresh()
          if (data.statusCode == 200) {
            const list = this.setTime(data.data)
            this.listData = this.reload ? list : this.listData.concat(list)
            this.lastId = list[list.length - 1].id
            if (this.reload) {
              this.banner = [list[0], list[1]]
            }
            this.reload = false
          }
        },
        fail: (data, code) => {
          console.log('fail' + JSON.stringify(data) + code)
        }
      })
    },
    goDetail: function(e) {
      /* eslint-disable */
      const detail = {
        author_name: e.author_name,
        cover: e.cover,
        id: e.id,
        post_id: e.post_id,
        published_at: e.published_at,
        title: e.title
      }
      /* eslint-disable */
      uni.navigateTo({
        url: "/pages/demo/list/details?detailDate=" + encodeURIComponent(JSON.stringify(detail))
      })
    },
    setTime: function(items) {
      let newItems = []
      items.forEach(e => {
        newItems.push({
          author_name: e.author_name,
          cover: e.cover,
          id: e.id,
          post_id: e.post_id,
          published_at: e.published_at,
          title: e.title
        })
      })
      return newItems
    }
  }
}
</script>

<style scoped>
  /* #ifndef APP-PLUS-NVUE */
  @import "@/pages/demo/list/css/uni.css";
  /* #endif */
  .swiper{
    height: 360rpx;
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
  .uni-media-list-logo{
    width: 180rpx;
    height: 140rpx;
  }
  .uni-media-list-body{
    height: auto;
    justify-content: space-around;
  }
  .uni-media-list-text-top{
    height: 74rpx;
    font-size: 28rpx;
    overflow: hidden;
  }
  .uni-media-list-text-bottom{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
