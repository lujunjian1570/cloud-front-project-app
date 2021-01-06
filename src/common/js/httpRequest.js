/**
 * @Author: Ljj
 * @Desctription: 统一请求封装
 * @Date: 2020-8-4 14:52:47
 */
import Vue from 'vue'
const _this = Vue.prototype

const baseUrl = process.uniEnv.BASE_API

module.exports = {
  post: function(url, data, hideLoading) {
    const $that = this
    if (!hideLoading) uni.showLoading({ title: '加载中' })
    // 获取网络类型
    uni.getNetworkType({
      success: function(res) {
        if (res.networkType === 'none') {
          /* wifi	wifi 网络
					2g	2g 网络
					3g	3g 网络
					4g	4g 网络
					ethernet	有线网络	App
					unknown	Android 下不常见的网络类型
					none	无网络 */
          _this.$utils.showToast('当前无网络')
          plus.navigator.closeSplashscreen()
          return false
        }
      }
    })
    return new Promise((succ, error) => {
      uni.request({
        url: baseUrl + url,
        data: Object.assign({}, data, {
          appId: 1
        }),
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
          token: uni.getStorageSync('token')
        },
        sslVerify: false,
        success: function(result) {
          if (!hideLoading) uni.hideLoading()
          $that.parseData(succ, error, result)
        },
        fail: function(e) {
          if (!hideLoading) uni.hideLoading()
          error(e)
        }
      })
    })
  },
  get: function(url, data, hideLoading) {
    const $that = this
    if (!hideLoading) uni.showLoading({ title: '加载中' })
    return new Promise((succ, error) => {
      uni.request({
        url: baseUrl + url,
        data: Object.assign({}, data, {
          appId: 1
        }),
        method: 'GET',
        header: {
          'Content-Type': 'application/json',
          token: uni.getStorageSync('token')
        },
        sslVerify: false,
        success: function(result) {
          if (!hideLoading) uni.hideLoading()
          $that.parseData(succ, error, result)
        },
        fail: function(e) {
          if (!hideLoading) uni.hideLoading()
          error(e)
        }
      })
    })
  },
  parseData: function(succ, error, result) {
    if (result.statusCode === 200) {
      if (result.data.msgCode === '10000') {
        succ(result.data.result)
      } else {
        _this.$utils.showToast(result.data.msgInfo)
        error(result.data)
      }
    } else {
      error(result)
    }
  }
}
