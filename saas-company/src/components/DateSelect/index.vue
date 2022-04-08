<template>
  <div class="data-head">
    <div class="component-day-list">
      <span class="day-item right-border" :class="{'select-day': dayIndex === 1}" @click="selectDay(1)">今天</span>
      <i class="item-line" :class="{'select-line': dayIndex === 1 || dayIndex === 2}" />
      <span class="day-item both-border" :class="{'select-day': dayIndex === 2}" @click="selectDay(2)">昨天</span>
      <i class="item-line" :class="{'select-line': dayIndex === 2 || dayIndex === 3}" />
      <span class="day-item both-border" :class="{'select-day': dayIndex === 3}" @click="selectDay(3)">7天</span>
      <i class="item-line" :class="{'select-line': dayIndex === 3 || dayIndex === 4}" />
      <span class="day-item left-border" :class="{'select-day': dayIndex === 4}" @click="selectDay(4)">近30天</span>
    </div>
    <div class="date-view">
        <el-date-picker
          v-model="dateValue"
          :clearable="false"
          size="small"
          style="width: 260px;margin-right:10px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      <!-- <el-date-picker
        v-model="startDate"
        style="width:150px"
        prefix-icon="el-icon-date"
        value-format="yyyy-MM-dd"
        type="date"
        placeholder="开始日期"
      />
      <span style="margin: 0 10px">至</span>
      <el-date-picker
        v-model="endDate"
        style="width:150px"
        prefix-icon="el-icon-date"
        value-format="yyyy-MM-dd"
        type="date"
        placeholder="结束日期"
      /> -->
      <el-button type="primary" icon="el-icon-search" size="mini" @click="searchResult">搜索</el-button>
      <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DateSelect',
  data() {
    return {
      dateValue: '',
      dayIndex: 4
    }
  },
  created() {
    const date = new Date()
    this.dateValue = [this.getDateRange(date, 30)[0], this.getDateRange(date, 30)[1]]
  },
  methods: {
    selectDay(val) {
      const that = this
      const date = new Date()
      let dateList = []
      this.dayIndex = val
      switch (val) {
        case 1:
          dateList = that.getDateRange(date, 0)
          this.dateValue = [dateList[0], dateList[1]]
          break
        case 2:
          dateList = that.getDateRange(date, 1)
          this.dateValue = [dateList[0], dateList[0]]
          break
        case 3:
          dateList = that.getDateRange(date, 6)
          this.dateValue = [dateList[0], dateList[1]]
          break
        case 4:
          dateList = that.getDateRange(date, 30)
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
      let day = time.getDate()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      return year + '-' + month + '-' + day
    },
    // 筛选
    searchResult() {
      const prams = {
        startDate: this.dateValue[0],
        endDate: this.dateValue[1]
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
