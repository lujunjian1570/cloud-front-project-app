<template>
  <view>
    <my-navbar title="列表组件" />
    <mescroll-body
      @init="mescrollInit"
      @down="downCallback"
      @up="upCallback"
    >
      <view class="uni-list">
        <block
          v-for="(value, index) in dataList"
          :key="index"
        >
          <view
            class="uni-list-cell"
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
    </mescroll-body>
  </view>
</template>

<script>
// 引入mescroll-mixins.js
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js'

export default {
  mixins: [MescrollMixin], // 使用mixin
  data() {
    return {
      dataList: [], // 列表数据
      lastId: ''
    }
  },
  methods: {
    /* 下拉刷新的回调*/
    downCallback() {
      this.lastId = ''
      // 直接mescroll.resetUpScroll()即可
      this.mescroll.resetUpScroll() // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
    },
    /* 上拉加载的回调*/
    upCallback(page) {
      const data = {
        column: 'id,post_id,title,author_name,cover,published_at'
      }
      data.minId = this.lastId
      data.time = new Date().getTime() + ''
      data.pageSize = 10

      uni.request({
        url: 'https://unidemo.dcloud.net.cn/api/news',
        data: data,
        success: data => {
          if (data.statusCode == 200) {
            // 接口返回的当前页数据列表 (数组)
            const curPageData = data.data
            // 接口返回的当前页数据长度
            const curPageLen = curPageData.length
            // 接口返回的是否有下一页 (true/false)
            let hasNext = false
            if (curPageLen > 0) {
              hasNext = !!curPageData[curPageData.length - 1].id
              this.lastId = curPageData[curPageData.length - 1].id
            }
            // 设置列表数据
            if (page.num == 1) this.dataList = [] // 如果是第一页需手动置空列表
            this.dataList = this.dataList.concat(curPageData) // 追加新数据

            this.mescroll.endSuccess(curPageLen, hasNext)
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
    }
  }
}
</script>

<style scoped>
  /* #ifndef APP-PLUS-NVUE */
  @import "@/pages/demo/list/css/uni.css";
  /* #endif */
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
