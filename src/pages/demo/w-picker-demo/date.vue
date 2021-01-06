<template>
  <view class="">
    <nav-bar
      title="日期组件"
      left-icon="back"
    />
    <view class="container">
      <view
        class="item"
        @click="visible1=true"
      >
        日期：{{ dateTime }}
      </view>
      <view
        class="item"
        @click="visible2=true"
      >
        日期区间：{{ rangeVal[0] + " 至 " + rangeVal[1] }}
      </view>
      <w-picker
        ref="date1"
        :visible.sync="visible1"
        mode="date"
        start-year="2017"
        end-year="2029"
        :value="dateTime"
        :current="false"
        fields="second"
        :disabled-after="false"
        @confirm="onConfirm1($event,'date1')"
        @cancel="onCancel"
      />
      <w-picker
        ref="range"
        :visible.sync="visible2"
        mode="range"
        start-year="2017"
        end-year="2030"
        :value="rangeVal"
        :current="false"
        @confirm="onConfirm2($event,'range')"
        @cancel="onCancel"
      />
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      dateTime: '2020-08-06 09:25:45',
      rangeVal: ['2018-12-12', '2020-04-02'],
      visible1: false,
      visible2: false
    }
  },
  methods: {
    onConfirm1(res, type) {
      console.log(type)
      this.dateTime = res.value
    },
    onConfirm2(res, type) {
      console.log(res + type)
      this.rangeVal = res.value
    },
    onCancel() {

    }
  }
}
</script>

<style lang="scss">
  .container{
    .item{
      display: flex;
      flex-direction: row;
      margin: 40rpx 0;
    }
  }
</style>
