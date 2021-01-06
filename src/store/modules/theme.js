const state = {
  theme: {
    'navbarColor': '#333', // 顶部navbar字体颜色	#FFFFFF
    'navbarBackgroundColor': '#fff', // 顶部navbar背景颜色	#0fAEFF
    'tabbarColor': '#7a7e83', // 底部tabbar默认字体颜色
    'tabbarSelectColor': '#0fAEFF', // 底部tabbar选中字体颜色
    'tabbarBackgroundColor': '#fff', // 底部tabbar背景颜色
    'platformThemeIconList': [{
      iconPathUrl: '/static/img/tabbar/home.png',
      selectedIconPathUrl: '/static/img/tabbar/homeHL.png',
      iconText: '首页',
      pagePath: '/pages/tabbar/index/index'
    },
    {
      iconPathUrl: '/static/img/tabbar/cate.png',
      selectedIconPathUrl: '/static/img/tabbar/cateHL.png',
      iconText: '分类',
      pagePath: '/pages/tabbar/category/category'
    },
    {
      iconPathUrl: '/static/img/tabbar/cart.png',
      selectedIconPathUrl: '/static/img/tabbar/cartHL.png',
      iconText: '购物车',
      pagePath: '/pages/tabbar/cart/cart'
    },
    {
      iconPathUrl: '/static/img/tabbar/user.png',
      selectedIconPathUrl: '/static/img/tabbar/userHL.png',
      iconText: '我的',
      pagePath: '/pages/tabbar/my/my'
    }
    ]
  }
}
const mutations = {
  CHANGE_THEME: (state, theme) => {
    state.theme = theme
  }
}
const actions = {
  changeTheme({
    commit
  }, theme) {
    commit('CHANGE_THEME', theme)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
