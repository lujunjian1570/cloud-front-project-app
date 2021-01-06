<template>
  <view class="u-wrap">
    <!-- #ifndef MP-WEIXIN -->
    <my-navbar
      :is-back="false"
      title="购物车"
    />
    <!-- #endif -->
    <!-- 空白页 -->
    <view
      v-if="empty===true"
      class="empty"
    >
      <image
        src="/static/img/emptyCart.jpg"
        mode="aspectFit"
      />
      <view
        v-if="hasLogin"
        class="empty-tips"
      >
        空空如也
        <navigator
          v-if="hasLogin"
          class="navigator"
          url="../index/index"
          open-type="switchTab"
        >
          随便逛逛>
        </navigator>
      </view>
      <view
        v-else
        class="empty-tips"
      >
        空空如也
        <!-- <view class="navigator" @click="navToLogin">去登陆></view> -->
      </view>
    </view>
    <view v-else>
      <!-- 列表 -->
      <view class="cart-list">
        <block
          v-for="(item, index) in cartList"
          :key="item.id"
        >
          <view
            class="cart-item"
            :class="{'b-b': index!==cartList.length-1}"
          >
            <view class="image-wrapper">
              <image
                :src="item.image"
                :class="[item.loaded]"
                mode="aspectFill"
                lazy-load
                @load="onImageLoad('cartList', index)"
                @error="onImageError('cartList', index)"
              />
              <view
                class="yticon icon-xuanzhong checkbox"
                :class="{checked: item.checked}"
                @click="check('item', index)"
              />
            </view>
            <view class="item-right">
              <text class="clamp title">
                {{ item.title }}
              </text>
              <text class="attr">
                {{ item.attrVal }}
              </text>
              <text class="price">
                ¥{{ item.price }}
              </text>
              <uni-number-box
                class="step"
                :min="1"
                :max="item.stock"
                :value="item.number>item.stock?item.stock:item.number"
                :is-max="item.number>=item.stock?true:false"
                :is-min="item.number===1"
                :index="index"
                @eventChange="numberChange"
              />
            </view>
            <text
              class="del-btn"
              @click="deleteCartItem(index)"
            >
              x
            </text>
          </view>
        </block>
      </view>
      <!-- 底部菜单栏 -->
      <view class="action-section">
        <view class="checkbox">
          <image
            :src="allChecked?'/static/img/selected.png':'/static/img/select.png'"
            mode="aspectFit"
            @click="check('all')"
          />
          <view
            class="clear-btn"
            :class="{show: allChecked}"
            @click="clearCart"
          >
            清空
          </view>
        </view>
        <view class="total-box">
          <text class="price red">
            ¥{{ total }}
          </text>
          <!-- <text class="coupon">
						已优惠
						<text>74.35</text>
						元
					</text> -->
        </view>
        <button
          type="primary"
          class="no-border confirm-btn"
          @click="createOrder"
        >
          去结算
        </button>
      </view>
    </view>
    <my-tabbar />
  </view>
</template>

<script>
import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue'
export default {
  components: {
    uniNumberBox
  },
  data() {
    return {
      total: 0, // 总价格
      allChecked: false, // 全选状态  true|false
      empty: false, // 空白页现实  true|false
      cartList: [{
        id: 1,
        image: 'http://www.txsofts.com/cardMall/static/net/pro2.jpg',
        attrVal: '330ml 白色',
        stock: 15,
        title: '多芬护发素 滋养修护润发',
        price: 39.80,
        number: 1
      }],
      hasLogin: false
    }
  },
  onLoad() {
    this.loadData()
  },
  watch: {
    // 显示空白页
    cartList(e) {
      const empty = e.length === 0
      if (this.empty !== empty) {
        this.empty = empty
      }
    }
  },
  methods: {
    // 请求数据
    async loadData() {
      // let list = await this.$api.json('cartList');
      const list = await this.cartList.map(item => {
        item.checked = true
        return item
      })
      this.cartList = list
      this.calcTotal() // 计算总价
    },
    // 监听image加载完成
    onImageLoad(key, index) {
      this.$set(this[key][index], 'loaded', 'loaded')
    },
    // 监听image加载失败
    onImageError(key, index) {
      this[key][index].image = '/static/errorImage.jpg'
    },
    // 选中状态处理
    check(type, index) {
      if (type === 'item') {
        this.cartList[index].checked = !this.cartList[index].checked
      } else {
        const checked = !this.allChecked
        const list = this.cartList
        list.forEach(item => {
          item.checked = checked
        })
        this.allChecked = checked
      }
      this.calcTotal(type)
    },
    // 数量
    numberChange(data) {
      this.cartList[data.index].number = data.number
      this.calcTotal()
    },
    // 删除
    deleteCartItem(index) {
      // const list = this.cartList
      // const row = list[index]
      // const id = row.id
      this.cartList.splice(index, 1)
      this.calcTotal()
      uni.hideLoading()
    },
    // 清空
    clearCart() {
      uni.showModal({
        content: '清空购物车？',
        success: (e) => {
          if (e.confirm) {
            this.cartList = []
          }
        }
      })
    },
    // 计算总价
    calcTotal() {
      const list = this.cartList
      if (list.length === 0) {
        this.empty = true
        return
      }
      let total = 0
      let checked = true
      list.forEach(item => {
        if (item.checked === true) {
          total += item.price * item.number
        } else if (checked === true) {
          checked = false
        }
      })
      this.allChecked = checked
      this.total = Number(total.toFixed(2))
    },
    // 创建订单
    createOrder() {
      const list = this.cartList
      const goodsData = []
      list.forEach(item => {
        if (item.checked) {
          goodsData.push({
            attrVal: item.attrVal,
            number: item.number
          })
        }
      })

      // uni.navigateTo({
      // 	url: `/pages/order/createOrder?data=${JSON.stringify({
      // 		goodsData: goodsData
      // 	})}`
      // })
      this.$utils.showToast('去结算')
    }
  }
}
</script>

<style lang="scss" scoped>
  /* 空白页 */
  .empty{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    padding-bottom: 100rpx;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background: #fff;
    image{
      width: 240rpx;
      height: 160rpx;
      margin-bottom: 30rpx;
    }
    .empty-tips{
      display: flex;
      font-size: $u-font-size-sm+2;
      color: $u-light-color;
      .navigator{
        color: $u-type-primary;
        margin-left: 16rpx;
      }
    }
  }
  /* 购物车列表项 */
  .cart-item{
    display: flex;
    position: relative;
    padding: 30rpx 40rpx;
    .image-wrapper{
      width: 230rpx;
      height: 230rpx;
      flex-shrink: 0;
      position: relative;
      image{
        width: 230rpx;
        height: 230rpx;
        border-radius: 8rpx;
      }
    }
    .checkbox{
      position: absolute;
      left: -16rpx;
      top: -16rpx;
      z-index: 8;
      font-size: 44rpx;
      line-height: 1;
      padding: 4rpx;
      color: $u-light-color;
      background: #fff;
      border-radius: 50px;
    }
    .icon-xuanzhong{
      width: 44rpx;
      height: 44rpx;
      background: url(../../../static/img/select.png) no-repeat;
      background-size: contain;
      &.checked{
        background: url(../../../static/img/selected.png) no-repeat;
        background-size: contain;
      }
    }
    .item-right{
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow: hidden;
      position: relative;
      padding-left: 30rpx;
      .title{
        font-size: $u-font-size-base;
        color: $u-main-color;
        line-height: 40rpx;
      }
      .attr{
        font-size: $u-font-size-sm + 2;
        color: $u-light-color;
        margin-top: 10rpx;
        /* height: 50rpx; */
        line-height: 40rpx;
        text{
          padding-right: 10rpx;
        }
      }
      .price{
        font-size: $u-font-size-base + 2;
        position: absolute;
        bottom: 0rpx;
        color: $u-type-primary;
        left: 30rpx;
        height: 50rpx;
        line-height: 50rpx;
      }
    }
    .del-btn{
      padding: 4rpx 10rpx;
      font-size: 34rpx;
      height: 50rpx;
      color: $u-light-color;
    }
  }
  /* 底部栏 */
  .action-section{
    position: fixed;
    left: 30rpx;
    bottom: 120rpx;
    z-index: 95;
    display: flex;
    align-items: center;
    width: 690rpx;
    height: 100rpx;
    padding: 0 30rpx;
    background: rgba(255, 255, 255, .9);
    box-shadow: 0 0 20rpx 0 rgba(0, 0, 0, .5);
    border-radius: 16rpx;
    .checkbox{
      height: 52rpx;
      position: relative;
      image{
        width: 52rpx;
        height: 100%;
        position: relative;
        z-index: 5;
      }
    }
    .clear-btn{
      position: absolute;
      left: 26rpx;
      top: 0;
      z-index: 4;
      width: 0;
      height: 52rpx;
      line-height: 52rpx;
      padding-left: 38rpx;
      font-size: $u-font-size-base;
      color: #fff;
      background: $u-light-color;
      border-radius: 0 50px 50px 0;
      opacity: 0;
      transition: .2s;
      &.show{
        opacity: 1;
        width: 120rpx;
      }
    }
    .total-box{
      flex: 1;
      display: flex;
      flex-direction: column;
      text-align: right;
      padding-right: 40rpx;
      .price{
        font-size: $u-font-size-lg;
        color: $u-type-error;
      }
      .coupon{
        font-size: $u-font-size-sm;
        color: $u-light-color;
        text{
          color: $u-main-color;
        }
      }
    }
    .confirm-btn{
      padding: 0 38rpx;
      margin: 0;
      border-radius: 100px;
      height: 76rpx;
      line-height: 76rpx;
      font-size: $u-font-size-base + 2;
      background: $u-type-primary;
    }
  }
  /* 复选框选中状态 */
  .action-section .checkbox.checked,
  .cart-item .checkbox.checked{
    color: $u-type-primary;
  }
</style>
