<template>
  <view class="w-picker-view">
    <picker-view class="d-picker-view" :indicator-style="itemHeight" :value="pickVal" @change="handlerChange">
      <picker-view-column>
        <view v-for="(item,index) in range.hours" :key="index" class="w-picker-item">{{ item }}时</view>
      </picker-view-column>
      <picker-view-column>
        <view v-for="(item,index) in range.minutes" :key="index" class="w-picker-item">{{ item }}分</view>
      </picker-view-column>
      <picker-view-column v-if="second">
        <view v-for="(item,index) in range.seconds" :key="index" class="w-picker-item">{{ item }}秒</view>
      </picker-view-column>
    </picker-view>
  </view>
</template>

<script>
export default {
  props: {
    itemHeight: {
      type: String,
      default: '44px'
    },
    value: {
      type: [String, Array, Number],
      default: ''
    },
    current: { // 是否默认选中当前日期
      type: Boolean,
      default: false
    },
    second: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      pickVal: [],
      range: {},
      checkObj: {}
    }
  },
  watch: {
    value(val) {
      this.initData()
    }
  },
  created() {
    this.initData()
  },
  methods: {
    formatNum(n) {
      return (Number(n) < 10 ? '0' + Number(n) : Number(n) + '')
    },
    checkValue(value) {
      const strReg = /^\d{2}:\d{2}:\d{2}$/; const example = '18:00:05'
      if (!strReg.test(value)) {
        console.log(new Error('请传入与mode、fields匹配的value值，例value=' + example + ''))
      }
      return strReg.test(value)
    },
    resetData(year, month, day, hour, minute) {
      const curDate = this.getCurrenDate()
      const curFlag = this.current
      const curHour = curDate.curHour
      const curMinute = curDate.curMinute
      const curSecond = curDate.curSecond
      for (let hour = 0; hour < 24; hour++) {
        hours.push(this.formatNum(hour))
      }
      for (let minute = 0; minute < 60; minute++) {
        minutes.push(this.formatNum(minute))
      }
      for (let second = 0; second < 60; second++) {
        seconds.push(this.formatNum(second))
      }
      return {
        hours,
        minutes,
        seconds
      }
    },
    getData(curDate) {
      // 用来处理初始化数据
      const hours = []; const minutes = []; const seconds = []
      const curFlag = this.current
      const disabledAfter = this.disabledAfter
      const fields = this.fields
      const curHour = curDate.curHour
      const curMinute = curDate.curMinute
      const curSecond = curDate.curSecond
      for (let hour = 0; hour < 24; hour++) {
        hours.push(this.formatNum(hour))
      }
      for (let minute = 0; minute < 60; minute++) {
        minutes.push(this.formatNum(minute))
      }
      for (let second = 0; second < 60; second++) {
        seconds.push(this.formatNum(second))
      }
      return this.second ? {
        hours,
        minutes,
        seconds
      } : {
        hours,
        minutes
      }
    },
    getCurrenDate() {
      const curDate = new Date()
      const curHour = curDate.getHours()
      const curMinute = curDate.getMinutes()
      const curSecond = curDate.getSeconds()
      return this.second ? {
        curHour,
        curMinute,
        curSecond
      } : {
        curHour,
        curMinute
      }
    },
    getDval() {
      const value = this.value
      const fields = this.fields
      let dVal = null
      const aDate = new Date()
      const hour = this.formatNum(aDate.getHours())
      const minute = this.formatNum(aDate.getMinutes())
      const second = this.formatNum(aDate.getSeconds())
      if (value) {
        const flag = this.checkValue(value)
        if (!flag) {
          dVal = [hour, minute, second]
        } else {
          dVal = value ? value.split(':') : []
        }
      } else {
        dVal = this.second ? [hour, minute, second] : [hour, minute]
      }
      return dVal
    },
    initData() {
      const curDate = this.getCurrenDate()
      const dateData = this.getData(curDate)
      let pickVal = []; const obj = {}; let full = ''; let result = ''; let hour = ''; let minute = ''; let second = ''
      const dVal = this.getDval()
      const curFlag = this.current
      const disabledAfter = this.disabledAfter
      const hours = dateData.hours
      const minutes = dateData.minutes
      const seconds = dateData.seconds
      const defaultArr = this.second ? [
        dVal[0] && hours.indexOf(dVal[0]) != -1 ? hours.indexOf(dVal[0]) : 0,
        dVal[1] && minutes.indexOf(dVal[1]) != -1 ? minutes.indexOf(dVal[1]) : 0,
        dVal[2] && seconds.indexOf(dVal[2]) != -1 ? seconds.indexOf(dVal[2]) : 0
      ] : [
        dVal[0] && hours.indexOf(dVal[0]) != -1 ? hours.indexOf(dVal[0]) : 0,
        dVal[1] && minutes.indexOf(dVal[1]) != -1 ? minutes.indexOf(dVal[1]) : 0
      ]
      pickVal = disabledAfter ? defaultArr : (curFlag ? (this.second ? [
        hours.indexOf(this.formatNum(curDate.curHour)),
        minutes.indexOf(this.formatNum(curDate.curMinute)),
        seconds.indexOf(this.formatNum(curDate.curSecond))
      ] : [
        hours.indexOf(this.formatNum(curDate.curHour)),
        minutes.indexOf(this.formatNum(curDate.curMinute))
      ]) : defaultArr)
      this.range = dateData
      this.checkObj = obj
      hour = dVal[0] ? dVal[0] : hours[0]
      minute = dVal[1] ? dVal[1] : minutes[0]
      if (this.second)second = dVal[2] ? dVal[0] : seconds[0]
      result = this.second ? `${hour + ':' + minute + ':' + second}` : `${hour + ':' + minute}`
      full = this.second ? `${hour + ':' + minute + ':' + second}` : `${hour + ':' + minute + ':00'}`
      this.$nextTick(() => {
        this.pickVal = pickVal
      })
      this.$emit('change', {
        result: result,
        value: full,
        obj: obj
      })
    },
    handlerChange(e) {
      const arr = [...e.detail.value]
      const data = this.range
      let hour = ''; let minute = ''; let second = ''; let result = ''; let full = ''; let obj = {}
      hour = (arr[0] || arr[0] == 0) ? data.hours[arr[0]] || data.hours[data.hours.length - 1] : ''
      minute = (arr[1] || arr[1] == 0) ? data.minutes[arr[1]] || data.minutes[data.minutes.length - 1] : ''
      if (this.second)second = (arr[2] || arr[2] == 0) ? data.seconds[arr[2]] || data.seconds[data.seconds.length - 1] : ''
      obj = this.second ? {
        hour,
        minute,
        second
      } : {
        hour,
        minute
      }
      this.checkObj = obj
      result = this.second ? `${hour + ':' + minute + ':' + second}` : `${hour + ':' + minute}`
      full = this.second ? `${hour + ':' + minute + ':' + second}` : `${hour + ':' + minute + ':00'}`
      this.$emit('change', {
        result: result,
        value: full,
        obj: obj
      })
    }
  }
}
</script>

<style lang="scss">
  @import "./w-picker.css";
</style>

