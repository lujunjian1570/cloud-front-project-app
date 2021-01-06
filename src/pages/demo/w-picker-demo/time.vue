<template>
  <view>
    <view
      class="item"
      @tap="timeVisible=true"
    >
      选择时间
    </view>
    <view class="result">
      选择结果：{{ result.result }}
    </view>
    <w-picker
      ref="time"
      :visible.sync="timeVisible"
      mode="time"
      value="18:08:05"
      :current="true"
      :second="false"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </view>
</template>

<script>
export default {
  data() {
    return {
      timeVisible: false,
      result: {
        result: ''
      }
    }
  },
  methods: {
    onConfirm(res) {
      this.result = res
      console.log(res)
    },
    onCancel() {

    }
  }
}
</script>
