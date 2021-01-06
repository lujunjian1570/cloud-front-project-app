<template>
  <view>
    <!-- #ifndef MP-WEIXIN -->
    <my-navbar
      :is-back="false"
      title="我的"
    ><view
        slot="right"
        @click="funcNavBarRight"
      >
        设置
      </view>
    </my-navbar>
    <!-- #endif -->
      
    <view class="content">
      <view class="avatar-info">
        <img-cropping
          ref="avatar"
          sel-width="300rpx"
          sel-height="300rpx"
          :avatar-src="headImg"
          inner="true"
          avatar-style="width: 240rpx; height: 240rpx; border:1px solid #ddd;"
          @upload="imgUpload"
        />
        <text class="nickName">
          Andy2u
        </text>
      </view>
      <view class="list-wrap">
        <u-cell-group>
          <u-cell-item
            v-for="(item,index) in cellList"
            :key="index"
            :title="item.title"
            @click="openPage(item)"
          >
            <text
              slot="icon"
              class="u-cell-icon iconfont"
              :class="item.fontIcon"
            />
          </u-cell-item>
        </u-cell-group>
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
      headImg: 'https://test.ygzykj.com:6789/cms/xyfc06.png?dw=155&dh=155',
      cellList: [{
        'title': '地址管理',
        'fontIcon': 'icon-dizhi',
        'pathUrl': ''
      },
      {
        'title': '订单管理',
        'fontIcon': 'icon-order',
        'pathUrl': ''
      }, {
        'title': '退款管理',
        'fontIcon': 'icon-tuikuan',
        'pathUrl': ''
      }, {
        'title': '订单评价',
        'fontIcon': 'icon-pingjia',
        'pathUrl': ''
      }, {
        'title': '阳光客服',
        'fontIcon': 'icon-kefu',
        'pathUrl': ''
      }, {
        'title': '公示公告',
        'fontIcon': 'icon-gongshi',
        'pathUrl': ''
      }
      ]

    }
  },

  /* onLoad() {
			// #ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, (appInfo) => {
				//name属性
				var wgtStr = "name:" + appInfo.name;
				//appid属性
				wgtStr += " appid:" + appInfo.appid;
				//version属性
				wgtStr += " version:" + appInfo.version;
				this.wgtStr = wgtStr;

			});
			// #endif
		}, */
  methods: {
    // 点击跳转相关页面
    openPage(item) {
      if (item.pathUrl) {
        uni.navigateTo({
          url: item.pathUrl
        })
      } else {
        this.$utils.showToast('跳转' + item.title)
      }
    },
    funcNavBarRight() {
      uni.navigateTo({
        url: '/pages/demo/set/set'
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
      console.log('rsp:', rsp)
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
    }

  }
}
</script>

<style lang="scss" scoped>
  .avatar-info{
    text-align: center;
    padding: $u-spacing-lg;
    .nickName{
      padding: $u-spacing-base 0;
      color: $u-type-primary;
    }
  }
  .u-cell-icon{
    font-size: 40rpx;
    color: $u-type-primary;
    margin-right: $u-spacing-base;
  }
</style>
