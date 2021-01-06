<template>
  <view class="w-picker-view">
    <picker-view class="d-picker-view" :indicator-style="itemHeight" :value="pickVal" @change="handlerChange">
      <picker-view-column>
        <view v-for="(item,index) in range.years" :key="index" class="w-picker-item">{{ item }}年</view>
      </picker-view-column>
      <picker-view-column>
        <view v-for="(item,index) in range.months" :key="index" class="w-picker-item">{{ item }}月</view>
      </picker-view-column>
      <picker-view-column>
        <view v-for="(item,index) in range.days" :key="index" class="w-picker-item">{{ item }}日</view>
      </picker-view-column>
      <picker-view-column>
        <view v-for="(item,index) in range.sections" :key="index" class="w-picker-item">{{ item }}</view>
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
    startYear: {
      type: String,
      default: ''
    },
    endYear: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Array, Number],
      default: ''
    },
    current: { // 是否默认选中当前日期
      type: Boolean,
      default: false
    },
    disabledAfter: { // 是否禁用当前之后的日期
      type: Boolean,
      default: false
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
      const strReg = /^\d{4}-\d{2}-\d{2} [\u4e00-\u9fa5]{2}$/; let example
      if (!strReg.test(value)) {
        console.log(new Error('请传入与mode、fields匹配的value值，例value=' + example + ''))
      }
      return strReg.test(value)
    },
    resetData(year, month, day) {
      const curDate = this.getCurrenDate()
      const curFlag = this.current
      const curYear = curDate.curYear
      const curMonth = curDate.curMonth
      const curDay = curDate.curDay
      const curHour = curDate.curHour
      const months = []; const days = []; let sections = []
      const disabledAfter = this.disabledAfter
      const monthsLen = disabledAfter ? (year * 1 < curYear ? 12 : curMonth) : 12
      const totalDays = new Date(year, month, 0).getDate()// 计算当月有几天;
      const daysLen = disabledAfter ? ((year * 1 < curYear || month * 1 < curMonth) ? totalDays : curDay) : totalDays
      const sectionFlag = disabledAfter ? ((year * 1 < curYear || month * 1 < curMonth || day * 1 < curDay) != true) : (curHour > 12 == true)
      sections = ['上午', '下午']
      for (let month = 1; month <= monthsLen; month++) {
        months.push(this.formatNum(month))
      }
      for (let day = 1; day <= daysLen; day++) {
        days.push(this.formatNum(day))
      }
      if (sectionFlag) {
        sections = ['上午']
      }
      return {
        months,
        days,
        sections
      }
    },
    getData(dVal) {
      // 用来处理初始化数据
      const curFlag = this.current
      const disabledAfter = this.disabledAfter
      const curDate = this.getCurrenDate()
      const curYear = curDate.curYear
      const curMonthdays = curDate.curMonthdays
      const curMonth = curDate.curMonth
      const curDay = curDate.curDay
      const curHour = curDate.curHour
      const defaultDate = this.getDefaultDate()
      const startYear = this.getStartDate().getFullYear()
      const endYear = this.getEndDate().getFullYear()
      const years = []; const months = []; const days = []; let sections = []
      const year = dVal[0] * 1
      const month = dVal[1] * 1
      const day = dVal[2] * 1
      const monthsLen = disabledAfter ? (year < curYear ? 12 : curDate.curMonth) : 12
      const daysLen = disabledAfter ? ((year < curYear || month < curMonth) ? defaultDate.defaultDays : curDay) : (curFlag ? curMonthdays : defaultDate.defaultDays)
      const sectionFlag = disabledAfter ? ((year * 1 < curYear || month * 1 < curMonth || day * 1 < curDay) != true) : (curHour > 12 == true)
      for (let year = startYear; year <= (disabledAfter ? curYear : endYear); year++) {
        years.push(year.toString())
      }
      for (let month = 1; month <= monthsLen; month++) {
        months.push(this.formatNum(month))
      }
      for (let day = 1; day <= daysLen; day++) {
        days.push(this.formatNum(day))
      }
      if (sectionFlag) {
        sections = ['下午']
      } else {
        sections = ['上午', '下午']
      }
      return {
        years,
        months,
        days,
        sections
      }
    },
    getCurrenDate() {
      const curDate = new Date()
      const curYear = curDate.getFullYear()
      const curMonth = curDate.getMonth() + 1
      const curMonthdays = new Date(curYear, curMonth, 0).getDate()
      const curDay = curDate.getDate()
      const curHour = curDate.getHours()
      let curSection = '上午'
      if (curHour >= 12) {
        curSection = '下午'
      }
      return {
        curDate,
        curYear,
        curMonth,
        curMonthdays,
        curDay,
        curHour,
        curSection
      }
    },
    getDefaultDate() {
      const value = this.value
      const reg = /-/g
      const defaultDate = value ? new Date(value.split(' ')[0].replace(reg, '/')) : new Date()
      const defaultYear = defaultDate.getFullYear()
      const defaultMonth = defaultDate.getMonth() + 1
      const defaultDay = defaultDate.getDate()
      const defaultDays = new Date(defaultYear, defaultMonth, 0).getDate() * 1
      return {
        defaultDate,
        defaultYear,
        defaultMonth,
        defaultDay,
        defaultDays
      }
    },
    getStartDate() {
      const start = this.startYear
      let startDate = ''
      const reg = /-/g
      if (start) {
        startDate = new Date(start + '/01/01')
      } else {
        startDate = new Date('1970/01/01')
      }
      return startDate
    },
    getEndDate() {
      const end = this.endYear
      const reg = /-/g
      let endDate = ''
      if (end) {
        endDate = new Date(end + '/12/31')
      } else {
        endDate = new Date()
      }
      return endDate
    },
    getDval() {
      const value = this.value
      let dVal = null
      const aDate = new Date()
      const year = this.formatNum(aDate.getFullYear())
      const month = this.formatNum(aDate.getMonth() + 1)
      const day = this.formatNum(aDate.getDate())
      const hour = aDate.getHours()
      let section = '上午'
      if (hour >= 12)section = '下午'
      if (value) {
        const flag = this.checkValue(value)
        if (!flag) {
          dVal = [year, month, day, section]
        } else {
          const v = value.split(' ')
          dVal = [...v[0].split('-'), v[1]]
        }
      } else {
        dVal = [year, month, day, section]
      }
      return dVal
    },
    initData() {
      let startDate, endDate, startYear, endYear, startMonth, endMonth, startDay, endDay
      let years = []; let months = []; let days = []; let sections = []
      let dVal = []; let pickVal = []
      const value = this.value
      const reg = /-/g
      let range = {}
      let result = ''; let full = ''; let year; let month; let day; let section; let obj = {}
      const defaultDate = this.getDefaultDate()
      const defaultYear = defaultDate.defaultYear
      const defaultMonth = defaultDate.defaultMonth
      const defaultDay = defaultDate.defaultDay
      const defaultDays = defaultDate.defaultDays
      const curFlag = this.current
      const disabledAfter = this.disabledAfter
      const curDate = this.getCurrenDate()
      const curYear = curDate.curYear
      const curMonth = curDate.curMonth
      const curMonthdays = curDate.curMonthdays
      const curDay = curDate.curDay
      const curSection = curDate.curSection
      let dateData = []
      dVal = this.getDval()
      startDate = this.getStartDate()
      endDate = this.getEndDate()
      startYear = startDate.getFullYear()
      startMonth = startDate.getMonth()
      startDay = startDate.getDate()
      endYear = endDate.getFullYear()
      endMonth = endDate.getMonth()
      endDay = endDate.getDate()
      dateData = this.getData(dVal)
      years = dateData.years
      months = dateData.months
      days = dateData.days
      sections = dateData.sections
      pickVal = disabledAfter ? [
        dVal[0] && years.indexOf(dVal[0]) != -1 ? years.indexOf(dVal[0]) : 0,
        dVal[1] && months.indexOf(dVal[1]) != -1 ? months.indexOf(dVal[1]) : 0,
        dVal[2] && days.indexOf(dVal[2]) != -1 ? days.indexOf(dVal[2]) : 0,
        dVal[3] && sections.indexOf(dVal[3]) != -1 ? sections.indexOf(dVal[3]) : 0
      ] : (curFlag ? [
        years.indexOf(curYear + ''),
        months.indexOf(this.formatNum(curMonth)),
        days.indexOf(this.formatNum(curDay)),
        sections.indexOf(curSection)
      ] : [
        dVal[0] && years.indexOf(dVal[0]) != -1 ? years.indexOf(dVal[0]) : 0,
        dVal[1] && months.indexOf(dVal[1]) != -1 ? months.indexOf(dVal[1]) : 0,
        dVal[2] && days.indexOf(dVal[2]) != -1 ? days.indexOf(dVal[2]) : 0,
        dVal[3] && sections.indexOf(dVal[3]) != -1 ? sections.indexOf(dVal[3]) : 0
      ])
      range = { years, months, days, sections }
      year = dVal[0] ? dVal[0] : years[0]
      month = dVal[1] ? dVal[1] : months[0]
      day = dVal[2] ? dVal[2] : days[0]
      section = dVal[3] ? dVal[3] : sections[0]
      result = full = `${year + '-' + month + '-' + day + ' ' + section}`
      obj = {
        year,
        month,
        day,
        section
      }
      this.range = range
      this.checkObj = obj
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
      let year = ''; let month = ''; let day = ''; let section = ''
      let result = ''; let full = ''; let obj = {}
      let months = null; let days = null; let sections = null
      const disabledAfter = this.disabledAfter
      year = (arr[0] || arr[0] == 0) ? data.years[arr[0]] || data.years[data.years.length - 1] : ''
      month = (arr[1] || arr[1] == 0) ? data.months[arr[1]] || data.months[data.months.length - 1] : ''
      day = (arr[2] || arr[2] == 0) ? data.days[arr[2]] || data.days[data.days.length - 1] : ''
      section = (arr[3] || arr[3] == 0) ? data.sections[arr[3]] || data.sections[data.sections.length - 1] : ''
      result = full = `${year + '-' + month + '-' + day + ' ' + section}`
      const resetData = this.resetData(year, month, day)
      if (this.disabledAfter) {
        months = resetData.months
        days = resetData.days
        sections = resetData.sections
      } else {
        if (year % 4 == 0 || (month != this.checkObj.month)) {
          days = resetData.days
        }
      }
      if (months) this.range.months = months
      if (days) this.range.days = days
      if (sections) this.range.sections = sections
      obj = {
        year,
        month,
        day,
        section
      }
      this.checkObj = obj
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
