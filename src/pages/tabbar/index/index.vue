<template>
  <view>
    <!-- #ifndef MP-WEIXIN -->
    <my-navbar
      :is-back="false"
      title="首页"
    />
    <!-- #endif -->

    <view
      v-if="bannerInfo.bannerPicList.length>0"
      class="wrap"
    >
      <my-swiper
        name="imgPathUrl"
        :list="bannerInfo.bannerPicList"
        :height="300"
        :mode="bannerInfo.indicatorMode"
        :interval="bannerInfo.bannerInterval"
        :indicator-pos="bannerInfo.indicatorPos"
        :autoplay="bannerInfo.hasAutoplay"
      />
    </view>
    <view class="wrap-fontIcon">
      <view
        v-for="(item, index) in iconList"
        :key="index"
        class="wrap-iconList"
      >
        <text
          class="icon iconfont "
          :class="item.fontIcon"
        />
        <text class="con-title">
          {{ item.title }}
        </text>
      </view>
    </view>
    <view class="scroll-wrap">
      <scroll-view
        class="floor-list"
        scroll-x
      >
        <view class="scoll-wrapper">
          <view
            v-for="(item, index) in goodsList"
            :key="index"
            class="floor-item"
            @click="navToDetailPage(item)"
          >
            <image
              :src="item.image"
              mode="aspectFill"
            />
            <text class="title clamp2">
              {{ item.title }}
            </text>
            <text class="price">
              ￥{{ item.price }}
            </text>
          </view>
        </view>
      </scroll-view>
    </view>

    <view class="guess-section">
      <view
        v-for="(item, index) in goodsList"
        :key="index"
        class="guess-item"
        @click="navToDetailPage(item)"
      >
        <view class="image-wrapper">
          <image :src="item.image" />
        </view>
        <view class="inner-guess">
          <text class="title clamp">
            {{ item.title }}
          </text>
          <text class="price">
            ￥{{ item.price }}
          </text>
        </view>
      </view>
    </view>
    <my-tabbar />
  </view>
</template>

<script>
export default {
  data() {
    return {
      bannerInfo: { bannerPicList: [] },
      iconList: [{
        'title': '衣服',
        'fontIcon': 'icon-yifu'
      },
      {
        'title': '裤子',
        'fontIcon': 'icon-kuzi'
      }, {
        'title': '鞋子',
        'fontIcon': 'icon-xiezi'
      }, {
        'title': '帽子',
        'fontIcon': 'icon-maozi'
      }, {
        'title': '知识库',
        'fontIcon': 'icon-zhishiku'
      }, {
        'title': '学校',
        'fontIcon': 'icon-xuexiao'
      }, {
        'title': '服务',
        'fontIcon': 'icon-fuwu'
      }, {
        'title': '优惠券',
        'fontIcon': 'icon-quan'
      }
      ],
      goodsList: [{
        image: 'http://www.txsofts.com/cardMall/static/net/pro1.jpg',
        title: '吉米老师造型设 计-10次卡（价值500元）',
        price: 219.00,
        sales: 61
      },
      {
        image: 'http://www.txsofts.com/cardMall/static/net/pro2.jpg',
        title: '多芬去油洗发 液600ml 一瓶',
        price: 52.90,
        sales: 61
      },
      {
        image: 'http://www.txsofts.com/cardMall/static/net/pro3.jpg',
        title: '吉米美发单次洗 剪-体验券',
        price: 58.00,
        sales: 61
      },
      {
        image: 'http://www.txsofts.com/cardMall/static/net/pro4.jpg',
        title: '男士锡纸烫发 单次套餐',
        price: 798.00,
        sales: 61
      },
      {
        image: 'http://www.txsofts.com/cardMall/static/net/pro5.jpg',
        title: '染焗烫套餐一次 （价值200元）',
        price: 200.00,
        sales: 61
      },
      {
        image: 'http://www.txsofts.com/cardMall/static/net/pro6.jpg',
        title: '多芬护肤素精华 600ml一瓶',
        price: 89.00,
        sales: 61
      },
      {
        image: 'http://www.txsofts.com/cardMall/static/net/pro7.jpg',
        title: '发艺总监主理发 型设计一次',
        price: 128.00,
        sales: 61
      },
      {
        image: 'http://www.txsofts.com/cardMall/static/net/pro8.jpg',
        title: '多芬去油洗发 液600ml 一瓶',
        price: 58.00,
        sales: 61
      }
      ]
    }
  },
  onLoad() {
    this.getBanner()
  },
  methods: {
    // 获取轮播图
    getBanner() {
      this.$http.post(this.$api.getBanner, {
        bannerLocation: 'bl_home_page'
      }, 'hideLoading').then(res => {
        console.log(res)
        this.bannerInfo = res || { bannerPicList: [] }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrap,
  .wrap-fontIcon{
    padding: $u-spacing-base;
  }
  .wrap-fontIcon{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    text-align: center;
    .wrap-iconList{
      flex: 0 0 25%;
      display: flex;
      flex-direction: column;
    }
    .icon{
      font-size: 80upx;
      height: 100upx;
      color: $u-type-warning;
    }
    .con-title{
      color: $u-main-color;
      font-size: $u-font-size-base;
      margin-bottom: $u-spacing-base;
    }
  }
  .scroll-wrap{
    padding: 0 $u-spacing-base;
  }
  .scoll-wrapper{
    display: flex;
    align-items: flex-start;
    .floor-item{
      position: relative;
      width: 176rpx;
      display: flex;
      flex-direction: column;
      margin-right: 20rpx;
      line-height: 1.8;
      color: $u-content-color;
      image{
        width: 176rpx;
        height: 176rpx;
        border-radius: 6rpx;
        margin-bottom: 10rpx;
      }
      .title{
        padding: 14rpx 0 0 0;
        line-height: 38rpx;
        height: 94rpx;
        font-size: $u-font-size-sm;
      }
      .price{
        font-weight: 500;
        color: $u-type-error;
        font-size: $uni-font-size-lg;
      }
    }
  }
  .guess-section{
    display: flex;
    flex-wrap: wrap;
    padding: $u-spacing-lg $u-spacing-base;
    .guess-item{
      display: flex;
      flex-direction: column;
      width: 340rpx;
      margin-bottom: $u-spacing-lg;
      border-radius: $u-border-radius-lg;
      background: #fff;
      &:nth-child(2n+1){
        margin-right: $u-spacing-lg;
      }
    }
    .image-wrapper{
      width: 340rpx;
      height: 340rpx;
      border-radius: $u-spacing-base;
      overflow: hidden;
      background: #fff;
      image{
        width: 340rpx;
        height: 340rpx;
        opacity: 1;
        border-radius: $u-spacing-base;
      }
    }
    .inner-guess{
      padding: $u-spacing-base;
    }
    .title{
      padding: 14upx 0 0 0;
      font-size: $u-font-size-sm;
      color: $u-content-color;
      line-height: 38rpx;
      height: 60rpx;
    }
    .price{
      font-weight: 500;
      padding-top: $u-spacing-sm;
      font-size: $u-font-size-lg;
      color: $u-type-error;
      line-height: 1;
    }
  }
  .icon-size{
    font-size: 36rpx;
  }
</style>
