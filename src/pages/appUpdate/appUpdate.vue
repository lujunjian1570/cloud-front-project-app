<template>
  <!-- <view class="mask">
		<view class="content">
			<view class="title-div">
				提示
			</view>
			<view class="text-div">
				{{updateFile.text}}
			</view>
			<view class="prg-div" v-if="prg>0">
				<u-line-progress :percent="prg" :round="false" :striped="true" :striped-active="true"></u-line-progress>
			</view>
			<view class="bottom-div" v-if="updateFile.hasForceUpdate">
				<view class="btn btn1" @click.stop="onClick">确定</view>
			</view>
			<view class="bottom-div" v-else>
				<view class="btn" @click="close">取消</view>
				<view class="btn" @click.stop="onClick">确定</view>
			</view>
		</view>
	</view> -->
  <view>
    <u-modal
      ref="uModal"
      v-model="isShow"
      title="版本更新"
      :mask-close-able="false"
      :show-cancel-button="showCancelButton"
      :async-close="true"
      @confirm="onClick"
      @cancel="close"
    >
      <view style="padding: 30rpx;">
        <text>
          {{ updateFile.remark.replace(/↵/g,'\n') }}
        </text>

        <view v-if="prg>0">
          <u-line-progress
            :percent="prg"
            :round="true"
            :striped="true"
            :striped-active="true"
          />
        </view>
      </view>
    </u-modal>
  </view>
</template>

<script>
let isClickClose = false // 判断是安卓物理返回还是点击取消的标识
export default {
  data() {
    return {
      updateFile: '',
      prg: 0,
      isShow: true,
      showCancelButton: false
    }
  },
  onLoad(option) {
    const updateFile = JSON.parse(decodeURIComponent(option.item))
    this.updateFile = updateFile
    this.showCancelButton = !updateFile.hasForceUpdate
  },
  onBackPress() {
    if (!isClickClose) {
      return true // 阻止默认返回事件
    }
  },
  methods: {
    onClick() {
      // 如果不想关闭，而单是清除loading状态，需要通过ref手动调用方法
      this.$refs.uModal.clearLoading()
      const updateFile = this.updateFile
      if (updateFile.upgradeType == 2) { // 热更新
        const downloadTask = uni.downloadFile({
          url: updateFile.downloadUrl,
          success: (downloadResult) => {
            if (downloadResult.statusCode === 200) {
              plus.runtime.install(downloadResult.tempFilePath, {
                force: false
              }, () => {
                console.log('install success...')
                plus.runtime.restart()
              }, (e) => {
                console.log('install fail...' + e)
              })
            } else {
              console.log('install fail...')
            }
          }
        })
        downloadTask.onProgressUpdate((res) => {
          this.prg = res.progress
        })
      } else { // 整包更新
        const phoneOS = uni.getSystemInfoSync().platform // android 或者 ios
        if (phoneOS == 'ios') {
          // 跳转到下载页面
          plus.runtime.openURL(updateFile.downloadUrl)
        } else {
          const downloadTask = uni.downloadFile({
            url: updateFile.downloadUrl,
            success: (downloadResult) => {
              if (downloadResult.statusCode === 200) {
                plus.runtime.openFile(downloadResult.tempFilePath)
              } else {
                console.log('install fail...')
              }
            }
          })
          downloadTask.onProgressUpdate((res) => {
            this.prg = res.progress
          })
        }
      }
    },
    close() {
      isClickClose = true
      uni.navigateBack()
    }
  }
}
</script>

<style>
  .slot-content{
    font-size: 28rpx;
    color: $u-content-color;
    padding: 30rpx;
  }
  .mask{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    justify-content: center;
    align-items: center;
  }
  .content{
    width: 500rpx;
    padding: 28rpx;
    background-color: #fff;
    border-radius: 20rpx;
  }
  .title-div{
    font-weight: bold;
    text-align: center;
  }
  .text-div{
    padding: 40rpx 0;
  }
  .bottom-div{
    display: flex;
    flex-direction: row;
  }
  .prg-div{
    margin: 0 0 30rpx 0;
  }
  .btn{
    width: 50%;
    text-align: center;
  }
  .btn1{
    width: 100%;
  }
</style>
