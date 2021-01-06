<template>
  <view>
    <my-navbar
      :is-back="false"
      title="我的"
    />
    <view class="container">
      <view style="text-align: center;">
        <img-cropping
          ref="avatar"
          sel-width="300rpx"
          sel-height="300rpx"
          :avatar-src="headImg"
          inner="true"
          avatar-style="width: 240rpx; height: 240rpx; border:1px solid #ddd;"
          @upload="imgUpload"
        />
      </view>
      <view
        class="mt20"
        style="word-break: break-all;"
      >
        BASE_API：{{ env }}
      </view>
      <view class="mt20">
        {{ wgtStr }}
      </view>
      <u-button type="primary">
        uView
      </u-button>
      <button
        type="default"
        class="mt20"
        @click="funcJump"
      >
        引导页
      </button>
      <navigator url="/pages/demo/list/list">
        <button
          type="primary"
          class="mt20"
        >
          列表组件
        </button>
      </navigator>
      <navigator
        url="/pages/demo/customize/customize"
        open-type="reLaunch"
      >
        <button
          type="primary"
          class="mt20"
        >
          自定义navbar跟tabbar
        </button>
      </navigator>
      <navigator url="/pages/demo/communication/one">
        <button
          type="primary"
          class="mt20"
        >
          nvue跟vue通讯
        </button>
      </navigator>
      <navigator url="/pages/demo/w-picker-demo/date">
        <button
          type="primary"
          class="mt20"
        >
          日期组件
        </button>
      </navigator>
      <button
        type="default"
        class="mt20"
        @click="removeStorage"
      >
        清除缓存
      </button>
      <button
        class="mt20"
        @click="versionUpdate"
      >
        版本更新
      </button>
      <!-- <button @click="showPopup" class="mt20">显示 弹出层</button> -->
      <view
        v-if="imgPath"
        class="mt20"
      >
        <image
          :src="imgPath"
          mode="widthFix"
          style="width: 400rpx;"
        />
      </view>
    </view>
    <my-tabbar />
  </view>
</template>

<script>
export default {
  data() {
    return {
      env: process.uniEnv.BASE_API,
      wgtStr: '',
      imgPath: '',
      headImg: 'https://test.ygzykj.com:6789/cms/xyfc06.png?dw=155&dh=155'
    }
  },
  onNavigationBarButtonTap(e) {
    const index = e.index
    if (index === 0) {
      this.$utils.showToast('点击事件')
    } else if (index === 1) {
      console.log(1)
    }
  },
  onLoad() {
    // #ifdef APP-PLUS
    plus.runtime.getProperty(plus.runtime.appid, (appInfo) => {
      // name属性
      let wgtStr = 'name:' + appInfo.name
      // appid属性
      wgtStr += ' appid:' + appInfo.appid
      // version属性
      wgtStr += ' version:' + appInfo.version
      this.wgtStr = wgtStr
    })
    // #endif
  },
  methods: {
    // 获取数据
    getData() {
      this.$http.get(this.$api.selectNoticeList, {
        id: 'eyJhbGciOiJIUzI1NiIsInR5c'
      }).then(res => {
        this.imgPath = res.obj.body.goodsImg
      }).catch((err) => {
        console.log(err)
      })
    },
    funcJump() {
      uni.navigateTo({
        url: '/pages/guide/guide'
      })
    },
    removeStorage() {
      uni.removeStorage({
        key: 'launchFlag',
        success: () => {
          this.$utils.showToast('清除缓存成功')
        }
      })
    },
    // 上传图片
    imgUpload(rsp) {
      console.log(rsp)
      this.headImg = rsp.path
      // rsp.avatar.imgSrc = rsp.path;

      /* uni.uploadFile({
        url: 'xxxx',
        filePath: rsp.path,
        name: 'avatar',
        formData: {
          'avatar': rsp.path
        },
        success: (uploadFileRes) => {
          console.log(uploadFileRes.data)
        },
        complete(res) {
          console.log(res)
        }
      }) */
    },
    showPopup() {
      uni.getSubNVueById('popup').show()
      /* uni.navigateTo({
					url: '/pages/appUpdate/appUpdate'
				}) */
    },
    versionUpdate() {
      this.$utils.appUpdate()
    },
    changeTheme() {
      uni.setNavigationBarColor({
        // 字体颜色 仅支持 #ffffff 和 #000000
        frontColor: '#000000',
        // 背景颜色值，有效值为十六进制颜色
        backgroundColor: '#007aff',
        // animation 结构
        animation: {
          // duration: 动画时间
          duration: 2000,
          // timingFunc:动画效果
          // linear    动画从头到尾的速度是相同的。
          // easeIn    动画以低速开始
          // easeOut    动画以低速结束。
          // easeInOut    动画以低速开始和结束
          timingFunc: 'easeIn'
        }
      })

      uni.setTabBarStyle({
        color: '#FF0000',
        selectedColor: '#00FF00',
        backgroundColor: '#0000FF',
        borderStyle: 'white'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .container{
    padding: 28rpx;
  }
  .head-img{
    width: 200rpx;
    height: 200rpx;
    border-radius: 50%;
    border: 1px solid #ddd;
  }
  .hf{
    background-color: $uni-color-success;
  }
</style>
