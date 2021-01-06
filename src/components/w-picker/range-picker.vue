<template>
  <view class="w-picker-view">
    <picker-view class="d-picker-view" :indicator-style="itemHeight" :value="pickVal" @change="handlerChange">
      <picker-view-column class="w-picker-flex2">
        <view v-for="(item,index) in range.fyears" :key="index" class="w-picker-item">{{ item }}年</view>
      </picker-view-column>
      <picker-view-column class="w-picker-flex2">
        <view v-for="(item,index) in range.fmonths" :key="index" class="w-picker-item">{{ item }}月</view>
      </picker-view-column>
      <picker-view-column class="w-picker-flex2">
        <view v-for="(item,index) in range.fdays" :key="index" class="w-picker-item">{{ item }}日</view>
      </picker-view-column>
      <picker-view-column class="w-picker-flex1">
        <view class="w-picker-item">-</view>
      </picker-view-column>
      <picker-view-column class="w-picker-flex2">
        <view v-for="(item,index) in range.tyears" :key="index" class="w-picker-item">{{ item }}年</view>
      </picker-view-column>
      <picker-view-column class="w-picker-flex2">
        <view v-for="(item,index) in range.tmonths" :key="index" class="w-picker-item">{{ item }}月</view>
      </picker-view-column>
      <picker-view-column class="w-picker-flex2">
        <view v-for="(item,index) in range.tdays" :key="index" class="w-picker-item">{{ item }}日</view>
      </picker-view-column>
    </picker-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      pickVal: [],
      range: {},
      checkObj: {}
    }
  },
  props: {
    itemHeight: {
      type: String,
      default: '44px'
    },
    value: {
      type: [String, Array],
      default() {
        return []
      }
    },
    current: { // 是否默认选中当前日期
      type: Boolean,
      default: false
    },
    startYear: {
      type: [String, Number],
      default: 1970
    },
    endYear: {
      type: [String, Number],
      default: new Date().getFullYear()
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
      const strReg = /^\d{4}-\d{2}-\d{2}$/; const example = '2020-04-03'
      if (!strReg.test(value[0]) || !strReg.test(value[1])) {
        console.log(new Error('请传入与mode匹配的value值，例[' + example + ',' + example + ']'))
      }
      return strReg.test(value[0]) && strReg.test(value[1])
    },
    resetToData(fmonth, fday, tyear, tmonth) {
      const range = this.range
      const tmonths = []; const tdays = []
      const yearFlag = tyear != range.tyears[0]
      const monthFlag = tyear != range.tyears[0] || tmonth != range.tmonths[0]
      const ttotal = new Date(tyear, tmonth, 0).getDate()
      for (let i = yearFlag ? 1 : fmonth * 1; i <= 12; i++) {
        tmonths.push(this.formatNum(i))
      }
      for (let i = monthFlag ? 1 : fday * 1; i <= ttotal; i++) {
        tdays.push(this.formatNum(i))
      }
      return {
        tmonths,
        tdays
      }
    },
    resetData(fyear, fmonth, fday, tyear, tmonth) {
      const fyears = []; const fmonths = []; const fdays = []; const tyears = []; const tmonths = []; const tdays = []
      const startYear = this.startYear
      const endYear = this.endYear
      const ftotal = new Date(fyear, fmonth, 0).getDate()
      const ttotal = new Date(tyear, tmonth, 0).getDate()
      for (let i = startYear * 1; i <= endYear; i++) {
        fyears.push(this.formatNum(i))
      }
      for (let i = 1; i <= 12; i++) {
        fmonths.push(this.formatNum(i))
      }
      for (let i = 1; i <= ftotal; i++) {
        fdays.push(this.formatNum(i))
      }
      for (let i = fyear * 1; i <= endYear; i++) {
        tyears.push(this.formatNum(i))
      }
      for (let i = fmonth * 1; i <= 12; i++) {
        tmonths.push(this.formatNum(i))
      }
      for (let i = fday * 1; i <= ttotal; i++) {
        tdays.push(this.formatNum(i))
      }
      return {
        fyears,
        fmonths,
        fdays,
        tyears,
        tmonths,
        tdays
      }
    },
    getData(dVal) {
      const start = this.startYear * 1
      const end = this.endYear * 1
      const value = dVal
      const flag = this.current
      const aToday = new Date()
      let tYear; let tMonth; let tDay; let tHours; let tMinutes; let tSeconds; let pickVal = []
      let initstartDate = new Date(start.toString())
      let endDate = new Date(end.toString())
      if (start > end) {
        initstartDate = new Date(end.toString())
        endDate = new Date(start.toString())
      }
      const startYear = initstartDate.getFullYear()
      const startMonth = initstartDate.getMonth() + 1
      const endYear = endDate.getFullYear()
      const fyears = []; const fmonths = []; const fdays = []; const tyears = []; const tmonths = []; const tdays = []; const returnArr = []; const startDVal = []; const endDVal = []
      const curMonth = flag ? value[1] * 1 : (startDVal[1] * 1 + 1)
      const curMonth1 = flag ? value[5][1] * 1 : (value[5] * 1 + 1)
      const totalDays = new Date(value[0], value[1], 0).getDate()
      const totalDays1 = new Date(value[4], value[5], 0).getDate()
      for (let s = startYear; s <= endYear; s++) {
        fyears.push(this.formatNum(s))
      }
      for (let m = 1; m <= 12; m++) {
        fmonths.push(this.formatNum(m))
      }
      for (let d = 1; d <= totalDays; d++) {
        fdays.push(this.formatNum(d))
      }
      for (let s = value[0] * 1; s <= endYear; s++) {
        tyears.push(this.formatNum(s))
      }

      if (value[4] * 1 > value[0] * 1) {
        for (let m = 1; m <= 12; m++) {
          tmonths.push(this.formatNum(m))
        }
        for (let d = 1; d <= totalDays1; d++) {
          tdays.push(this.formatNum(d))
        }
      } else {
        for (let m = value[1] * 1; m <= 12; m++) {
          tmonths.push(this.formatNum(m))
        }
        for (let d = value[2] * 1; d <= totalDays1; d++) {
          tdays.push(this.formatNum(d))
        }
      }

      pickVal = [
        fyears.indexOf(value[0]) == -1 ? 0 : fyears.indexOf(value[0]),
        fmonths.indexOf(value[1]) == -1 ? 0 : fmonths.indexOf(value[1]),
        fdays.indexOf(value[2]) == -1 ? 0 : fdays.indexOf(value[2]),
        0,
        tyears.indexOf(value[4]) == -1 ? 0 : tyears.indexOf(value[4]),
        tmonths.indexOf(value[5]) == -1 ? 0 : tmonths.indexOf(value[5]),
        tdays.indexOf(value[6]) == -1 ? 0 : tdays.indexOf(value[6])
      ]
      return {
        fyears,
        fmonths,
        fdays,
        tyears,
        tmonths,
        tdays,
        pickVal
      }
    },
    getDval() {
      const value = this.value
      const fields = this.fields
      let dVal = null
      const aDate = new Date()
      const fyear = this.formatNum(aDate.getFullYear())
      const fmonth = this.formatNum(aDate.getMonth() + 1)
      const fday = this.formatNum(aDate.getDate())
      const tyear = this.formatNum(aDate.getFullYear())
      const tmonth = this.formatNum(aDate.getMonth() + 1)
      const tday = this.formatNum(aDate.getDate())
      if (value && value.length > 0) {
        const flag = this.checkValue(value)
        if (!flag) {
          dVal = [fyear, fmonth, fday, '-', tyear, tmonth, tday]
        } else {
          dVal = [...value[0].split('-'), '-', ...value[1].split('-')]
        }
      } else {
        dVal = [fyear, fmonth, fday, '-', tyear, tmonth, tday]
      }
      return dVal
    },
    initData() {
      let range = []; let pickVal = []
      let result = ''; const full = ''; let obj = {}
      const dVal = this.getDval()
      const dateData = this.getData(dVal)
      let fyears = []; let fmonths = []; let fdays = []; let tyears = []; let tmonths = []; let tdays = []
      let fyear, fmonth, fday, tyear, tmonth, tday
      pickVal = dateData.pickVal
      fyears = dateData.fyears
      fmonths = dateData.fmonths
      fdays = dateData.fdays
      tyears = dateData.tyears
      tmonths = dateData.tmonths
      tdays = dateData.tdays
      range = {
        fyears,
        fmonths,
        fdays,
        tyears,
        tmonths,
        tdays
      }
      fyear = range.fyears[pickVal[0]]
      fmonth = range.fmonths[pickVal[1]]
      fday = range.fdays[pickVal[2]]
      tyear = range.tyears[pickVal[4]]
      tmonth = range.tmonths[pickVal[5]]
      tday = range.tdays[pickVal[6]]
      obj = {
        fyear,
        fmonth,
        fday,
        tyear,
        tmonth,
        tday
      }
      result = `${fyear + '-' + fmonth + '-' + fday + '至' + tyear + '-' + tmonth + '-' + tday}`
      this.range = range
      this.checkObj = obj
      this.$nextTick(() => {
        this.pickVal = pickVal
      })
      this.$emit('change', {
        result: result,
        value: result.split('至'),
        obj: obj
      })
    },
    handlerChange(e) {
      const arr = [...e.detail.value]
      let result = ''; const full = ''; let obj = {}
      const year = ''; const month = ''; const day = ''; const hour = ''; const minute = ''; const second = ''; const note = []; let province; let city; let area
      const checkObj = this.checkObj
      const days = []; const months = []; const endYears = []; const endMonths = []; const endDays = []; const startDays = []
      const mode = this.mode
      let col1, col2, col3, d, a, h, m
      const xDate = new Date().getTime()
      const range = this.range
      const fyear = range.fyears[arr[0]] || range.fyears[range.fyears.length - 1]
      const fmonth = range.fmonths[arr[1]] || range.fmonths[range.fmonths.length - 1]
      const fday = range.fdays[arr[2]] || range.fdays[range.fdays.length - 1]
      let tyear = range.tyears[arr[4]] || range.tyears[range.tyears.length - 1]
      let tmonth = range.tmonths[arr[5]] || range.tmonths[range.tmonths.length - 1]
      let tday = range.tdays[arr[6]] || range.tdays[range.tdays.length - 1]
      const resetData = this.resetData(fyear, fmonth, fday, tyear, tmonth)
      if (fyear != checkObj.fyear || fmonth != checkObj.fmonth || fday != checkObj.fday) {
        arr[4] = 0
        arr[5] = 0
        arr[6] = 0
        range.tyears = resetData.tyears
        range.tmonths = resetData.tmonths
        range.tdays = resetData.tdays
        tyear = range.tyears[0]
        checkObj.tyears = range.tyears[0]
        tmonth = range.tmonths[0]
        checkObj.tmonths = range.tmonths[0]
        tday = range.tdays[0]
        checkObj.tdays = range.tdays[0]
      }
      if (fyear != checkObj.fyear || fmonth != checkObj.fmonth) {
        range.fdays = resetData.fdays
      }
      if (tyear != checkObj.tyear) {
        arr[5] = 0
        arr[6] = 0
        const toData = this.resetToData(fmonth, fday, tyear, tmonth)
        range.tmonths = toData.tmonths
        range.tdays = toData.tdays
        tmonth = range.tmonths[0]
        checkObj.tmonths = range.tmonths[0]
        tday = range.tdays[0]
        checkObj.tdays = range.tdays[0]
      }
      if (tmonth != checkObj.tmonth) {
        arr[6] = 0
        const toData = this.resetToData(fmonth, fday, tyear, tmonth)
        range.tdays = toData.tdays
        tday = range.tdays[0]
        checkObj.tdays = range.tdays[0]
      }
      result = `${fyear + '-' + fmonth + '-' + fday + '至' + tyear + '-' + tmonth + '-' + tday}`
      obj = {
        fyear, fmonth, fday, tyear, tmonth, tday
      }
      this.checkObj = obj
      this.$nextTick(() => {
        this.pickVal = arr
      })
      this.$emit('change', {
        result: result,
        value: result.split('至'),
        obj: obj
      })
    }
  }
}
</script>

<style lang="scss">
  @import "./w-picker.css";
</style>
