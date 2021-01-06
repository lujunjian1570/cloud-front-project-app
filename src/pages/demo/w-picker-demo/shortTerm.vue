<template>
  <view>
    <view
      class="item"
      @tap="shortTermVisible=true"
    >
      短期日期时间
    </view>
    <view class="result">
      选择结果：{{ result.result }}
    </view>

    <w-picker
      ref="shortTerm"
      :visible.sync="shortTermVisible"
      mode="shortTerm"
      value="2020-04-08 13:18:00"
      :current="true"
      expand="60"
      @confirm="onConfirm($event,'shortTerm')"
      @cancel="onCancel"
    />
  </view>
</template>

<script>
export default {
  data() {
    return {
      shortTermVisible: false,
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
