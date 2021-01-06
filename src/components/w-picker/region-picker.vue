<template>
  <view class="w-picker-view">
    <picker-view class="d-picker-view" :indicator-style="itemHeight" :value="pickVal" @change="handlerChange">
      <picker-view-column>
        <view v-for="(item,index) in range.provinces" :key="index" class="w-picker-item">{{ item.label }}</view>
      </picker-view-column>
      <picker-view-column>
        <view v-for="(item,index) in range.citys" :key="index" class="w-picker-item">{{ item.label }}</view>
      </picker-view-column>
      <picker-view-column v-if="!hideArea">
        <view v-for="(item,index) in range.areas" :key="index" class="w-picker-item">{{ item.label }}</view>
      </picker-view-column>
    </picker-view>
  </view>
</template>

<script>
import areaData from './areadata/areadata.js'
export default {
  props: {
    itemHeight: {
      type: String,
      default: '44px'
    },
    value: {
      type: [Array, String],
      default: ''
    },
    defaultType: {
      type: String,
      default: 'label'
    },
    hideArea: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pickVal: [],
      range: {
        provinces: [],
        citys: [],
        areas: []
      },
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
    getData() {
      // 用来处理初始化数据
      const provinces = areaData
      let dVal = []
      const value = this.value
      const a1 = value[0]// 默认值省
      const a2 = value[1]// 默认值市
      const a3 = value[2]// 默认值区、县
      let province, city, area
      let provinceIndex = provinces.findIndex((v) => {
        return v[this.defaultType] == a1
      })
      provinceIndex = value ? (provinceIndex != -1 ? provinceIndex : 0) : 0
      const citys = provinces[provinceIndex].children
      let cityIndex = citys.findIndex((v) => {
        return v[this.defaultType] == a2
      })
      cityIndex = value ? (cityIndex != -1 ? cityIndex : 0) : 0
      const areas = citys[cityIndex].children
      let areaIndex = areas.findIndex((v) => {
        return v[this.defaultType] == a3
      })
      areaIndex = value ? (areaIndex != -1 ? areaIndex : 0) : 0
      dVal = this.hideArea ? [provinceIndex, cityIndex] : [provinceIndex, cityIndex, areaIndex]
      province = provinces[provinceIndex]
      city = citys[cityIndex]
      area = areas[areaIndex]
      const obj = this.hideArea ? {
        province,
        city
      } : {
        province,
        city,
        area
      }
      return this.hideArea ? {
        provinces,
        citys,
        dVal,
        obj
      } : {
        provinces,
        citys,
        areas,
        dVal,
        obj
      }
    },
    initData() {
      const dataData = this.getData()
      const provinces = dataData.provinces
      const citys = dataData.citys
      const areas = this.hideArea ? [] : dataData.areas
      const obj = dataData.obj
      const province = obj.province; const city = obj.city; const area = this.hideArea ? {} : obj.area
      const value = this.hideArea ? [province.value, city.value] : [province.value, city.value, area.value]
      const result = this.hideArea ? `${province.label + city.label}` : `${province.label + city.label + area.label}`
      this.range = this.hideArea ? {
        provinces,
        citys
      } : {
        provinces,
        citys,
        areas
      }
      this.checkObj = obj
      this.$nextTick(() => {
        this.pickVal = dataData.dVal
      })
      this.$emit('change', {
        result: result,
        value: value,
        obj: obj
      })
    },
    handlerChange(e) {
      const arr = [...e.detail.value]
      const provinceIndex = arr[0]; const cityIndex = arr[1]; const areaIndex = this.hideArea ? 0 : arr[2]
      const provinces = areaData
      const citys = (provinces[provinceIndex] && provinces[provinceIndex].children) || provinces[provinces.length - 1].children || []
      const areas = this.hideArea ? [] : ((citys[cityIndex] && citys[cityIndex].children) || citys[citys.length - 1].children || [])
      const province = provinces[provinceIndex] || provinces[provinces.length - 1]
      const city = citys[cityIndex] || [citys.length - 1]
      const area = this.hideArea ? {} : (areas[areaIndex] || [areas.length - 1])
      const obj = this.hideArea ? {
        province,
        city
      } : {
        province,
        city,
        area
      }
      if (this.checkObj.province.label != province.label) {
        // 当省更新的时候需要刷新市、区县的数据;
        this.range.citys = citys
        if (!this.hideArea) {
          this.range.areas = areas
        }
      }
      if (this.checkObj.city.label != city.label) {
        // 当市更新的时候需要刷新区县的数据;
        if (!this.hideArea) {
          this.range.areas = areas
        }
      }
      this.checkObj = obj
      this.$nextTick(() => {
        this.pickVal = arr
      })
      const result = this.hideArea ? `${province.label + city.label}` : `${province.label + city.label + area.label}`
      const value = this.hideArea ? [province.value, city.value] : [province.value, city.value, area.value]
      this.$emit('change', {
        result: result,
        value: value,
        obj: obj
      })
    }
  }
}
</script>

<style lang="scss">
  @import "./w-picker.css";
</style>

