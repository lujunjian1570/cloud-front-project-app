/**
 * @Author: Ljj
 * @Desctription: API接口配置文件
 * @Date: 2020-8-4 14:52:15
 */

module.exports = {
  getList: '/getList', // 获取app更新信息
  getTheme: '/getTheme', // 获取主题
  getAd: '/getAd', // 获取广告,
  getBannerList: '/getBannerList', // 获取广告

  checkVersion: '/admin-app-api/appVersion/checkVersion.do', // 检查版本更新
  getOpenedTheme: '/admin-app-api/theme/getOpenedTheme.do', // 获取皮肤
  getBanner: '/admin-app-api/banner/getBanner.do' // 获取轮播图

}
