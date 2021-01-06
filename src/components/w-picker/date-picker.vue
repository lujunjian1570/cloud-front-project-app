<template>
  <view class="w-picker-view">
    <picker-view v-if="fields=='year'" class="d-picker-view" :indicator-style="itemHeight" :value="pickVal" @change="handlerChange">
      <picker-view-column>
        <view v-for="(item,index) in range.years" :key="index" class="w-picker-item">{{ item }}年</view>
      </picker-view-column>
    </picker-view>
    <picker-view v-if="fields=='month'" class="d-picker-view" :indicator-style="itemHeight" :value="pickVal" @change="handlerChange">
      <picker-view-column>
        <view v-for="(item,index) in range.years" :key="index" class="w-picker-item">{{ item }}年</view>
      </picker-view-column>
      <picker-view-column>
        <view v-for="(item,index) in range.months" :key="index" class="w-picker-item">{{ item }}月</view>
      </picker-view-column>
    </picker-view>
    <picker-view v-if="fields=='day'" class="d-picker-view" :indicator-style="itemHeight" :value="pickVal" @change="handlerChange">
      <picker-view-column>
        <view v-for="(item,index) in range.years" :key="index" class="w-picker-item">{{ item }}年</view>
      </picker-view-column>
      <picker-view-column>
        <view v-for="(item,index) in range.months" :key="index" class="w-picker-item">{{ item }}月</view>
      </picker-view-column>
      <picker-view-column>
        <view v-for="(item,index) in range.days" :key="index" class="w-picker-item">{{ item }}日</view>
      </picker-view-column>
    </picker-view>
    <picker-view v-if="fields=='hour'" class="d-picker-view" :indicator-style="itemHeight" :value="pickVal" @change="handlerChange">
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
        <view v-for="(item,index) in range.hours" :key="index" class="w-picker-item">{{ item }}时</view>
      </picker-view-column>
    </picker-view>
    <picker-view v-if="fields=='minute'" class="d-picker-view" :indicator-style="itemHeight" :value="pickVal" @change="handlerChange">
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
        <view v-for="(item,index) in range.hours" :key="index" class="w-picker-item">{{ item }}时</view>
      </picker-view-column>
      <picker-view-column>
        <view v-for="(item,index) in range.minutes" :key="index" class="w-picker-item">{{ item }}分</view>
      </picker-view-column>
    </picker-view>
    <picker-view v-if="fields=='second'" class="d-picker-view" :indicator-style="itemHeight" :value="pickVal" @change="handlerChange">
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
        <view v-for="(item,index) in range.hours" :key="index" class="w-picker-item">{{ item }}时</view>
      </picker-view-column>
      <picker-view-column>
        <view v-for="(item,index) in range.minutes" :key="index" class="w-picker-item">{{ item }}分</view>
      </picker-view-column>
      <picker-view-column>
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
    startYear: {
      type: [String, Number],
      default: ''
    },
    endYear: {
      type: [String, Number],
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
    },
    fields: {
      type: String,
      default: 'day'
    }
  },
  data() {
    return {
      pickVal: [],
      range: {
        years: [],
        months: [],
        days: [],
        hours: [],
        minutes: [],
        seconds: []
      },
      checkObj: {}
    }
  },
  watch: {
    fields(val) {
      this.initData()
    },
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
      let strReg, example
      switch (this.fields) {
        case 'year':
          strReg = /^\d{4}$/
          example = '2019'
          break
        case 'month':
          strReg = /^\d{4}-\d{2}$/
          example = '2019-02'
          break
        case 'day':
          strReg = /^\d{4}-\d{2}-\d{2}$/
          example = '2019-02-01'
          break
        case 'hour':
          strReg = /^\d{4}-\d{2}-\d{2} \d{2}(:\d{2}){1,2}?$/
          example = '2019-02-01 18:00:00或2019-02-01 18'
          break
        case 'minute':
          strReg = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}(:\d{2}){0,1}?$/
          example = '2019-02-01 18:06:00或2019-02-01 18:06'
          break
        case 'second':
          strReg = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/
          example = '2019-02-01 18:06:01'
          break
      }
      if (!strReg.test(value)) {
        console.log(new Error('请传入与mode、fields匹配的value值，例value=' + example + ''))
      }
      return strReg.test(value)
    },
    resetData(year, month, day, hour, minute) {
      const curDate = this.getCurrenDate()
      const curFlag = this.current
      const curYear = curDate.curYear
      const curMonth = curDate.curMonth
      const curDay = curDate.curDay
      const curHour = curDate.curHour
      const curMinute = curDate.curMinute
      const curSecond = curDate.curSecond
      const months = []; const days = []; const hours = []; const minutes = []; const seconds = []
      const disabledAfter = this.disabledAfter
      const monthsLen = disabledAfter ? (year * 1 < curYear ? 12 : curMonth) : 12
      const totalDays = new Date(year, month, 0).getDate()// 计算当月有几天;
      const daysLen = disabledAfter ? ((year * 1 < curYear || month * 1 < curMonth) ? totalDays : curDay) : totalDays
      const hoursLen = disabledAfter ? ((year * 1 < curYear || month * 1 < curMonth || day * 1 < curDay) ? 24 : curHour + 1) : 24
      const minutesLen = disabledAfter ? ((year * 1 < curYear || month * 1 < curMonth || day * 1 < curDay || hour * 1 < curHour) ? 60 : curMinute + 1) : 60
      const secondsLen = disabledAfter ? ((year * 1 < curYear || month * 1 < curMonth || day * 1 < curDay || hour * 1 < curHour || minute * 1 < curMinute) ? 60 : curSecond + 1) : 60
      for (let month = 1; month <= monthsLen; month++) {
        months.push(this.formatNum(month))
      }
      for (let day = 1; day <= daysLen; day++) {
        days.push(this.formatNum(day))
      }
      for (let hour = 0; hour < hoursLen; hour++) {
        hours.push(this.formatNum(hour))
      }
      for (let minute = 0; minute < minutesLen; minute++) {
        minutes.push(this.formatNum(minute))
      }
      for (let second = 0; second < secondsLen; second++) {
        seconds.push(this.formatNum(second))
      }
      return {
        months,
        days,
        hours,
        minutes,
        seconds
      }
    },
    isLeapYear(Year) {
      if (((Year % 4) == 0) && ((Year % 100) != 0) || ((Year % 400) == 0)) {
        return true
      } else {
        return false
      }
    },
    getData(dVal) {
      // 用来处理初始化数据
      const curFlag = this.current
      const disabledAfter = this.disabledAfter
      const fields = this.fields
      const curDate = this.getCurrenDate()
      const curYear = curDate.curYear
      const curMonthdays = curDate.curMonthdays
      const curMonth = curDate.curMonth
      const curDay = curDate.curDay
      const curHour = curDate.curHour
      const curMinute = curDate.curMinute
      const curSecond = curDate.curSecond
      const defaultDate = this.getDefaultDate()
      const startYear = this.getStartDate().getFullYear()
      const endYear = this.getEndDate().getFullYear()
      // 颗粒度，禁用当前之后日期仅对year,month,day,hour生效;分钟秒禁用没有意义,
      const years = []; const months = []; const days = []; const hours = []; const minutes = []; const seconds = []
      const year = dVal[0] * 1
      const month = dVal[1] * 1
      const day = dVal[2] * 1
      const hour = dVal[3] * 1
      const minute = dVal[4] * 1
      const monthsLen = disabledAfter ? (year < curYear ? 12 : curDate.curMonth) : 12
      const daysLen = disabledAfter ? ((year < curYear || month < curMonth) ? defaultDate.defaultDays : curDay) : (curFlag ? curMonthdays : defaultDate.defaultDays)
      const hoursLen = disabledAfter ? ((year < curYear || month < curMonth || day < curDay) ? 24 : curHour + 1) : 24
      const minutesLen = disabledAfter ? ((year < curYear || month < curMonth || day < curDay || hour < curHour) ? 60 : curMinute + 1) : 60
      const secondsLen = disabledAfter ? ((year < curYear || month < curMonth || day < curDay || hour < curHour || minute < curMinute) ? 60 : curSecond + 1) : 60
      for (let year = startYear; year <= (disabledAfter ? curYear : endYear); year++) {
        years.push(year.toString())
      }
      for (let month = 1; month <= monthsLen; month++) {
        months.push(this.formatNum(month))
      }
      for (let day = 1; day <= daysLen; day++) {
        days.push(this.formatNum(day))
      }
      for (let hour = 0; hour < hoursLen; hour++) {
        hours.push(this.formatNum(hour))
      }
      for (let minute = 0; minute < minutesLen; minute++) {
        minutes.push(this.formatNum(minute))
      }
      // for(let second=0;second<(disabledAfter?curDate.curSecond+1:60);second++){
      // 	seconds.push(this.formatNum(second));
      // }
      for (let second = 0; second < 60; second++) {
        seconds.push(this.formatNum(second))
      }
      return {
        years,
        months,
        days,
        hours,
        minutes,
        seconds
      }
    },
    getCurrenDate() {
      const curDate = new Date()
      const curYear = curDate.getFullYear()
      const curMonth = curDate.getMonth() + 1
      const curMonthdays = new Date(curYear, curMonth, 0).getDate()
      const curDay = curDate.getDate()
      const curHour = curDate.getHours()
      const curMinute = curDate.getMinutes()
      const curSecond = curDate.getSeconds()
      return {
        curDate,
        curYear,
        curMonth,
        curMonthdays,
        curDay,
        curHour,
        curMinute,
        curSecond
      }
    },
    getDefaultDate() {
      const value = this.value
      const reg = /-/g
      const defaultDate = value ? new Date(value.replace(reg, '/')) : new Date()
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
        endDate = new Date(end + '/12/01')
      } else {
        endDate = new Date()
      }
      return endDate
    },
    getDval() {
      const value = this.value
      const fields = this.fields
      let dVal = null
      const aDate = new Date()
      const year = this.formatNum(aDate.getFullYear())
      const month = this.formatNum(aDate.getMonth() + 1)
      const day = this.formatNum(aDate.getDate())
      const hour = this.formatNum(aDate.getHours())
      const minute = this.formatNum(aDate.getMinutes())
      const second = this.formatNum(aDate.getSeconds())
      if (value) {
        const flag = this.checkValue(value)
        if (!flag) {
          dVal = [year, month, day, hour, minute, second]
        } else {
          switch (this.fields) {
            case 'year':
              dVal = value ? [value] : []
              break
            case 'month':
              dVal = value ? value.split('-') : []
              break
            case 'day':
              dVal = value ? value.split('-') : []
              break
            case 'hour':
              dVal = [...value.split(' ')[0].split('-'), ...value.split(' ')[1].split(':')]
              break
            case 'minute':
              dVal = value ? [...value.split(' ')[0].split('-'), ...value.split(' ')[1].split(':')] : []
              break
            case 'second':
              dVal = [...value.split(' ')[0].split('-'), ...value.split(' ')[1].split(':')]
              break
          }
        }
      } else {
        dVal = [year, month, day, hour, minute, second]
      }
      return dVal
    },
    initData() {
      let startDate, endDate, startYear, endYear, startMonth, endMonth, startDay, endDay
      let years = []; let months = []; let days = []; let hours = []; let minutes = []; let seconds = []
      let dVal = []; let pickVal = []
      const value = this.value
      const reg = /-/g
      let range = {}
      let result = ''; let full = ''; let year; let month; let day; let hour; let minute; let second; let obj = {}
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
      const curHour = curDate.curHour
      const curMinute = curDate.curMinute
      const curSecond = curDate.curSecond
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
      hours = dateData.hours
      minutes = dateData.minutes
      seconds = dateData.seconds
      switch (this.fields) {
        case 'year':
          pickVal = disabledAfter ? [
            dVal[0] && years.indexOf(dVal[0]) != -1 ? years.indexOf(dVal[0]) : 0
          ] : (curFlag ? [
            years.indexOf(curYear + '')
          ] : [
            dVal[0] && years.indexOf(dVal[0]) != -1 ? years.indexOf(dVal[0]) : 0
          ])
          range = { years }
          year = dVal[0] ? dVal[0] : years[0]
          result = full = `${year}`
          obj = {
            year
          }
          break
        case 'month':
          pickVal = disabledAfter ? [
            dVal[0] && years.indexOf(dVal[0]) != -1 ? years.indexOf(dVal[0]) : 0,
            dVal[1] && months.indexOf(dVal[1]) != -1 ? months.indexOf(dVal[1]) : 0
          ] : (curFlag ? [
            years.indexOf(curYear + ''),
            months.indexOf(this.formatNum(curMonth))
          ] : [
            dVal[0] && years.indexOf(dVal[0]) != -1 ? years.indexOf(dVal[0]) : 0,
            dVal[1] && months.indexOf(dVal[1]) != -1 ? months.indexOf(dVal[1]) : 0
          ])
          range = { years, months }
          year = dVal[0] ? dVal[0] : years[0]
          month = dVal[1] ? dVal[1] : months[0]
          result = full = `${year + '-' + month}`
          obj = {
            year,
            month
          }
          break
        case 'day':
          pickVal = disabledAfter ? [
            dVal[0] && years.indexOf(dVal[0]) != -1 ? years.indexOf(dVal[0]) : 0,
            dVal[1] && months.indexOf(dVal[1]) != -1 ? months.indexOf(dVal[1]) : 0,
            dVal[2] && days.indexOf(dVal[2]) != -1 ? days.indexOf(dVal[2]) : 0
          ] : (curFlag ? [
            years.indexOf(curYear + ''),
            months.indexOf(this.formatNum(curMonth)),
            days.indexOf(this.formatNum(curDay))
          ] : [
            dVal[0] && years.indexOf(dVal[0]) != -1 ? years.indexOf(dVal[0]) : 0,
            dVal[1] && months.indexOf(dVal[1]) != -1 ? months.indexOf(dVal[1]) : 0,
            dVal[2] && days.indexOf(dVal[2]) != -1 ? days.indexOf(dVal[2]) : 0
          ])
          range = { years, months, days }
          year = dVal[0] ? dVal[0] : years[0]
          month = dVal[1] ? dVal[1] : months[0]
          day = dVal[2] ? dVal[2] : days[0]
          result = full = `${year + '-' + month + '-' + day}`
          obj = {
            year,
            month,
            day
          }
          break
        case 'hour':
          pickVal = disabledAfter ? [
            dVal[0] && years.indexOf(dVal[0]) != -1 ? years.indexOf(dVal[0]) : 0,
            dVal[1] && months.indexOf(dVal[1]) != -1 ? months.indexOf(dVal[1]) : 0,
            dVal[2] && days.indexOf(dVal[2]) != -1 ? days.indexOf(dVal[2]) : 0,
            dVal[3] && hours.indexOf(dVal[3]) != -1 ? hours.indexOf(dVal[3]) : 0
          ] : (curFlag ? [
            years.indexOf(curYear + ''),
            months.indexOf(this.formatNum(curMonth)),
            days.indexOf(this.formatNum(curDay)),
            hours.indexOf(this.formatNum(curHour))
          ] : [
            dVal[0] && years.indexOf(dVal[0]) != -1 ? years.indexOf(dVal[0]) : 0,
            dVal[1] && months.indexOf(dVal[1]) != -1 ? months.indexOf(dVal[1]) : 0,
            dVal[2] && days.indexOf(dVal[2]) != -1 ? days.indexOf(dVal[2]) : 0,
            dVal[3] && hours.indexOf(dVal[3]) != -1 ? hours.indexOf(dVal[3]) : 0
          ])
          range = { years, months, days, hours }
          year = dVal[0] ? dVal[0] : years[0]
          month = dVal[1] ? dVal[1] : months[0]
          day = dVal[2] ? dVal[2] : days[0]
          hour = dVal[3] ? dVal[3] : hours[0]
          result = `${year + '-' + month + '-' + day + ' ' + hour}`
          full = `${year + '-' + month + '-' + day + ' ' + hour + ':00:00'}`
          obj = {
            year,
            month,
            day,
            hour
          }
          break
        case 'minute':
          pickVal = disabledAfter ? [
            dVal[0] && years.indexOf(dVal[0]) != -1 ? years.indexOf(dVal[0]) : 0,
            dVal[1] && months.indexOf(dVal[1]) != -1 ? months.indexOf(dVal[1]) : 0,
            dVal[2] && days.indexOf(dVal[2]) != -1 ? days.indexOf(dVal[2]) : 0,
            dVal[3] && hours.indexOf(dVal[3]) != -1 ? hours.indexOf(dVal[3]) : 0,
            dVal[4] && minutes.indexOf(dVal[4]) != -1 ? minutes.indexOf(dVal[4]) : 0
          ] : (curFlag ? [
            years.indexOf(curYear + ''),
            months.indexOf(this.formatNum(curMonth)),
            days.indexOf(this.formatNum(curDay)),
            hours.indexOf(this.formatNum(curHour)),
            minutes.indexOf(this.formatNum(curMinute))
          ] : [
            dVal[0] && years.indexOf(dVal[0]) != -1 ? years.indexOf(dVal[0]) : 0,
            dVal[1] && months.indexOf(dVal[1]) != -1 ? months.indexOf(dVal[1]) : 0,
            dVal[2] && days.indexOf(dVal[2]) != -1 ? days.indexOf(dVal[2]) : 0,
            dVal[3] && hours.indexOf(dVal[3]) != -1 ? hours.indexOf(dVal[3]) : 0,
            dVal[4] && minutes.indexOf(dVal[4]) != -1 ? minutes.indexOf(dVal[4]) : 0
          ])
          range = { years, months, days, hours, minutes }
          year = dVal[0] ? dVal[0] : years[0]
          month = dVal[1] ? dVal[1] : months[0]
          day = dVal[2] ? dVal[2] : days[0]
          hour = dVal[3] ? dVal[3] : hours[0]
          minute = dVal[4] ? dVal[4] : minutes[0]
          full = `${year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':00'}`
          result = `${year + '-' + month + '-' + day + ' ' + hour + ':' + minute}`
          obj = {
            year,
            month,
            day,
            hour,
            minute
          }
          break
        case 'second':
          pickVal = disabledAfter ? [
            dVal[0] && years.indexOf(dVal[0]) != -1 ? years.indexOf(dVal[0]) : 0,
            dVal[1] && months.indexOf(dVal[1]) != -1 ? months.indexOf(dVal[1]) : 0,
            dVal[2] && days.indexOf(dVal[2]) != -1 ? days.indexOf(dVal[2]) : 0,
            dVal[3] && hours.indexOf(dVal[3]) != -1 ? hours.indexOf(dVal[3]) : 0,
            dVal[4] && minutes.indexOf(dVal[4]) != -1 ? minutes.indexOf(dVal[4]) : 0,
            dVal[5] && seconds.indexOf(dVal[5]) != -1 ? seconds.indexOf(dVal[5]) : 0
          ] : (curFlag ? [
            years.indexOf(curYear + ''),
            months.indexOf(this.formatNum(curMonth)),
            days.indexOf(this.formatNum(curDay)),
            hours.indexOf(this.formatNum(curHour)),
            minutes.indexOf(this.formatNum(curMinute)),
            seconds.indexOf(this.formatNum(curSecond))
          ] : [
            dVal[0] && years.indexOf(dVal[0]) != -1 ? years.indexOf(dVal[0]) : 0,
            dVal[1] && months.indexOf(dVal[1]) != -1 ? months.indexOf(dVal[1]) : 0,
            dVal[2] && days.indexOf(dVal[2]) != -1 ? days.indexOf(dVal[2]) : 0,
            dVal[3] && hours.indexOf(dVal[3]) != -1 ? hours.indexOf(dVal[3]) : 0,
            dVal[4] && minutes.indexOf(dVal[4]) != -1 ? minutes.indexOf(dVal[4]) : 0,
            dVal[5] && seconds.indexOf(dVal[5]) != -1 ? seconds.indexOf(dVal[5]) : 0
          ])
          range = { years, months, days, hours, minutes, seconds }
          year = dVal[0] ? dVal[0] : years[0]
          month = dVal[1] ? dVal[1] : months[0]
          day = dVal[2] ? dVal[2] : days[0]
          hour = dVal[3] ? dVal[3] : hours[0]
          minute = dVal[4] ? dVal[4] : minutes[0]
          second = dVal[5] ? dVal[5] : seconds[0]
          result = full = `${year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second}`
          obj = {
            year,
            month,
            day,
            hour,
            minute,
            second
          }
          break
        default:
          range = { years, months, days }
          break
      }
      this.range = range
      this.checkObj = obj
      this.$emit('change', {
        result: result,
        value: full,
        obj: obj
      })
      this.$nextTick(() => {
        this.pickVal = pickVal
      })
    },
    handlerChange(e) {
      const arr = [...e.detail.value]
      const data = this.range
      let year = ''; let month = ''; let day = ''; let hour = ''; let minute = ''; let second = ''
      let result = ''; let full = ''; let obj = {}
      let months = null; let days = null; let hours = null; let minutes = null; const seconds = null
      const disabledAfter = this.disabledAfter
      let leapYear = false; let resetData = {}
      year = (arr[0] || arr[0] == 0) ? data.years[arr[0]] || data.years[data.years.length - 1] : ''
      month = (arr[1] || arr[1] == 0) ? data.months[arr[1]] || data.months[data.months.length - 1] : ''
      day = (arr[2] || arr[2] == 0) ? data.days[arr[2]] || data.days[data.days.length - 1] : ''
      hour = (arr[3] || arr[3] == 0) ? data.hours[arr[3]] || data.hours[data.hours.length - 1] : ''
      minute = (arr[4] || arr[4] == 0) ? data.minutes[arr[4]] || data.minutes[data.minutes.length - 1] : ''
      second = (arr[5] || arr[5] == 0) ? data.seconds[arr[5]] || data.seconds[data.seconds.length - 1] : ''
      resetData = this.resetData(year, month, day, hour, minute)// 重新拉取当前日期数据;
      leapYear = this.isLeapYear(year)// 判断是否为闰年;
      switch (this.fields) {
        case 'year':
          result = full = `${year}`
          obj = {
            year
          }
          break
        case 'month':
          result = full = `${year + '-' + month}`
          if (this.disabledAfter)months = resetData.months
          if (months) this.range.months = months
          obj = {
            year,
            month
          }
          break
        case 'day':
          result = full = `${year + '-' + month + '-' + day}`
          if (this.disabledAfter) {
            months = resetData.months
            days = resetData.days
          } else {
            if (leapYear || (month != this.checkObj.month) || month == 2) {
              days = resetData.days
            }
          }
          if (months) this.range.months = months
          if (days) this.range.days = days
          obj = {
            year,
            month,
            day
          }
          break
        case 'hour':
          result = `${year + '-' + month + '-' + day + ' ' + hour}`
          full = `${year + '-' + month + '-' + day + ' ' + hour + ':00:00'}`
          if (this.disabledAfter) {
            months = resetData.months
            days = resetData.days
            hours = resetData.hours
          } else {
            if (leapYear || (month != this.checkObj.month) || month == 2) {
              days = resetData.days
            }
          }
          if (months) this.range.months = months
          if (days) this.range.days = days
          if (hours) this.range.hours = hours
          obj = {
            year,
            month,
            day,
            hour
          }
          break
        case 'minute':
          full = `${year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':00'}`
          result = `${year + '-' + month + '-' + day + ' ' + hour + ':' + minute}`
          if (this.disabledAfter) {
            months = resetData.months
            days = resetData.days
            hours = resetData.hours
            minutes = resetData.minutes
          } else {
            if (leapYear || (month != this.checkObj.month) || month == 2) {
              days = resetData.days
            }
          }
          if (months) this.range.months = months
          if (days) this.range.days = days
          if (hours) this.range.hours = hours
          if (minutes) this.range.minutes = minutes
          obj = {
            year,
            month,
            day,
            hour,
            minute
          }
          break
        case 'second':
          result = full = `${year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second}`
          if (this.disabledAfter) {
            months = resetData.months
            days = resetData.days
            hours = resetData.hours
            minutes = resetData.minutes
            // seconds=resetData.seconds;
          } else {
            if (leapYear || (month != this.checkObj.month) || month == 2) {
              days = resetData.days
            }
          }
          if (months) this.range.months = months
          if (days) this.range.days = days
          if (hours) this.range.hours = hours
          if (minutes) this.range.minutes = minutes
          // if(seconds)this.range.seconds=seconds;
          obj = {
            year,
            month,
            day,
            hour,
            minute,
            second
          }
          break
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
