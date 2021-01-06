<template>
  <view>
    <view
      class="item"
      @tap="halfVisible=true"
    >
      上下午
    </view>
    <view class="result">
      选择结果：{{ result.result }}
    </view>

    <w-picker
      ref="half"
      :visible.sync="halfVisible"
      mode="half"
      start-year="2017"
      end-year="2030"
      value="2018-02-11 下午"
      :current="true"
      :disabled-after="false"
      @confirm="onConfirm($event,'half')"
      @cancel="onCancel"
    />
  </view>
</template>

<script>
export default {
  data() {
    return {
      halfVisible: false,
      result: {
        result: ''
      }
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
