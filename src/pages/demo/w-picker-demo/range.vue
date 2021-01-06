<template>
  <view>
    <view
      class="item"
      @tap="rangeVisible=true"
    >
      日期区间
    </view>
    <view class="result">
      选择结果：{{ result.result }}
    </view>

    <w-picker
      ref="range"
      :visible.sync="rangeVisible"
      mode="range"
      start-year="2017"
      end-year="2030"
      :value="rangeVal"
      :current="true"
      @confirm="onConfirm($event,'range')"
      @cancel="onCancel"
    />
  </view>
</template>

<script>
export default {
  data() {
    return {
      rangeVisible: false,
      result: {
        result: ''
      },
      rangeVal: ['2018-12-12', '2020-04-02']
    }
  },
  methods: {
    onConfirm(res, type) {
      this.result = res
      console.log(res + type)
    },
    onCancel() {

    }
  }
}
</script>
