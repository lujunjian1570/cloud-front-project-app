/**
 * @Author: Ljj
 * @Desctription: 公共方法
 * @Date: 2020-8-4 14:47:17
 */

import Vue from 'vue'
const _this = Vue.prototype
const utilsSelf = module.exports = {
  // toast提示
  showToast: (title, duration = 1500, mask = false, icon = 'none') => {
    if (Boolean(title) === false) {
      return
    }
    uni.showToast({
      title,
      duration,
      mask,
      icon
    })
  },
  // 检测App版本更新
  appUpdate: (fromHome) => { // fromHome	0:进入app时的更新
    // #ifdef APP-PLUS
    plus.runtime.getProperty(plus.runtime.appid, (appInfo) => {
      // const appid = appInfo.appid
      const currentVersion = appInfo.version
      const platform = uni.getSystemInfoSync().platform // android 或者 ios

      /* 参数名称：
			upgradeType更新类型（0：不更新，1：整包，2：wgt包）
			hasForceUpdate  强制更新（true：是，false：否）
			downloadUrl  更新资源地址
			remark	更新内容
			 */

      _this.$http.post(_this.$api.checkVersion, {
        version: currentVersion,
        terminalType: platform === 'android' ? '02' : '01'
      }, 'hideLoading').then(res => {
        const updateFile = res
        if (updateFile.upgradeType !== 0) { // 0：不更新，1：整包，2：wgt包
          if (fromHome === 0 && updateFile.upgradeType === 2) { // 进入app时如果是热更新直接更新
            uni.downloadFile({
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
          } else {
            uni.navigateTo({
              url: '/pages/appUpdate/appUpdate?item=' + encodeURIComponent(JSON.stringify(updateFile)),
              success: () => {
                // 跳转完页面后再关闭启动页
                plus.navigator.closeSplashscreen()
              }
            })
          }
        } else {
          if (fromHome == 0) {
            const launchFlag = uni.getStorageSync('launchFlag')
            if (launchFlag) { // 非首次进入app不显示引导页
              /* if (process.env.NODE_ENV !== "development") { //非开发环境加载广告页面
								_this.$http.get(_this.$api.getAd, '', 'hideLoading').then(res => {
									let param = res.data,
										isOpen = param.isOpen //是否开启广告（true：开启）
									if (isOpen) {
										// 跳转到广告页面
										uni.reLaunch({
											url: '/pages/ad/ad?param=' + encodeURIComponent(JSON.stringify(param)),
											success: () => {
												//跳转完页面后再关闭启动页
												plus.navigator.closeSplashscreen()
											}
										})
									} else {
										// 关闭启动页
										plus.navigator.closeSplashscreen()
									}
								}).catch(error => {
									console.log(error)
								})
							} else {
								// 关闭启动页
								plus.navigator.closeSplashscreen()
							} */
              plus.navigator.closeSplashscreen()
            } else { // 首次进入app显示引导页
              // 跳转到引导页
              uni.reLaunch({
                url: '/pages/guide/guide',
                success: () => {
                  // 跳转完页面后再关闭启动页
                  plus.navigator.closeSplashscreen()
                }
              })
            }
          } else {
            utilsSelf.showToast('已是最新版本')
          }
        }
      }).catch(error => {
        console.log(error)
      })
    })
    // #endif
  },
  // 获取皮肤
  getTheme: () => {
    _this.$http.post(_this.$api.getOpenedTheme, '', 'hideLoading').then(res => {
      _this.$store.dispatch('theme/changeTheme', res)
    })
  },
  /*
	 * 版本号比较方法
	 * 传入两个字符串，当前版本号：curV；比较版本号：reqV
	 * 调用方法举例：compare("1.1","1.2")，将返回false
	 */
  compareVersion: (curV, reqV) => {
    if (curV && reqV) {
      // 将两个版本号拆成数字
      const arr1 = curV.split('.')
      const arr2 = reqV.split('.')
      const minLength = Math.min(arr1.length, arr2.length)
      let position = 0
      let diff = 0
      // 依次比较版本号每一位大小，当对比得出结果后跳出循环
      while (position < minLength && ((diff = parseInt(arr1[position]) - parseInt(arr2[position])) == 0)) {
        position++
      }
      diff = (diff != 0) ? diff : (arr1.length - arr2.length)
      // 若curV大于reqV，则返回true
      return diff > 0
    } else {
      // 输入为空
      console.log('版本号不能为空')
      return false
    }
  }
}
