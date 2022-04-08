<template>
  <div class="data-head">
    <div class="component-day-list">
      <span class="day-item right-border" :class="{'select-day': dayIndex === 1}" @click="selectMonth(1)">三个月</span>
      <i class="item-line" :class="{'select-line': dayIndex === 1 || dayIndex === 2}" />
      <span class="day-item left-border" :class="{'select-day': dayIndex === 2}" @click="selectMonth(2)">六个月</span>
    </div>
    <div class="date-view">
        <el-date-picker
          v-model="dateValue"
          :clearable="false"
          size="small"
          style="width: 260px;margin-right:10px"
          value-format="yyyy-MM"
          type="monthrange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="getDateValue"
        ></el-date-picker>
      <el-button type="primary" icon="el-icon-search" size="mini" @click="searchResult">搜索</el-button>
      <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MonthSelect',
  data() {
    return {
      dateValue: '',
      dayIndex: 1
    }
  },
  created() {
    const date = new Date()
    this.dateValue = [this.getDateRange(date, 90)[0], this.getDateRange(date, 90)[1]]
  },
  methods: {
    selectMonth(val) {
      const that = this
      const date = new Date()
      let dateList = []
      this.dayIndex = val
      switch (val) {
        case 1:
          dateList = that.getDateRange(date, 90)
          this.dateValue = [dateList[0], dateList[1]]
          break
        case 2:
          dateList = that.getDateRange(date, 180)
          this.dateValue = [dateList[0], dateList[1]]
          break
      }
    },
    getDateRange(dateNow, intervalDays) {
      const oneDayTime = 24 * 60 * 60 * 1000
      const list = []
      let lastDay
      lastDay = new Date(dateNow.getTime() - intervalDays * oneDayTime)
      list.push(this.formateDate(lastDay))
      list.push(this.formateDate(dateNow))
      return list
    },
    formateDate(time) {
      const year = time.getFullYear()
      let month = time.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      return year + '-' + month
    },
    // 筛选
    searchResult() {
      const prams = {
        startDate: this.dateValue[0] + '-01 00:00:00',
        endDate: this.dateValue[1] + '-31 23:59:59'
      }
      this.$emit('filterData', prams)
    },
    resetQuery() {
        this.dateValue = ['', '']
        const prams = {
            startDate: '',
            endDate: ''
        }
        this.$emit('filterData', prams)
    },
    getDateValue(data) {
        this.dateValue = data
    }
  }
}
</script>

<style scoped>
.data-head {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 15px;
}
.component-day-list {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: 30px;
}
.day-item {
  width: 80px;
  height: 30px;
  border: 1px solid #cfcfcf;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 28px;
  text-align: center;
  color: #4c4b4b;
  cursor: pointer;
}
.left-border {
  border-left: none;
}
.right-border {
  border-right: none;
}
.both-border {
  border-left: none;
  border-right: none;
}
.select-day {
  border-color: #2a75ed;
  color: #2a75ed;
}
.item-line {
  width: 1px;
  height: 30px;
  background: #cfcfcf;
}
.select-line {
  background: #2a75ed;
}
.date-view {
  font-size: 14px;
  color: #4c4b4b;
}
.date-span {
  margin-right: 10px;
}
</style>
