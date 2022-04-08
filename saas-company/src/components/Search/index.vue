<template>
    <div class="filter-view">
        <el-select v-model="query.name" placeholder="请选择设备" style="width:200px;margin-right:20px">
            <el-option
            v-for="item in equipment"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <el-select v-model="query.search" placeholder="请选择查询参数" style="width:200px;margin-right:20px">
            <el-option
            v-for="item in queryType"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <el-date-picker
            style="width:400px;margin-right:20px"
            v-model="query.date"
            type="datetimerange"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd HH:mm"
            format="yyyy-MM-dd HH:mm"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
        </el-date-picker>
        <el-button type="primary" icon="el-icon-search" @click="searchResult">搜索</el-button>
    </div>
</template>

<script>
export default {
    name: 'Search',
    data () {
        return {
            query: {
                name: '',
                search: '',
                date: ''
            },
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }]
            },
            equipment: [
                {
                    no: '1234',
                    label: '234234234',
                    value: '234234344'
                },
                {
                    no: '1334',
                    label: '56456454',
                    value: '56456454'
                }
            ],
            queryType: [
                {
                    label: '温度',
                    value: '1'
                },
                {
                    label: '湿度',
                    value: '2'
                },
                {
                    label: '风力',
                    value: '3'
                }
            ],
        }
    },
    methods: {
        searchResult() {
            this.$emit('getQueryValue', this.query)
        }
    }
}
</script>

<style lang='scss' scoped>
.filter-view {
    display: flex;
    margin-bottom: 20px;
}
</style>
