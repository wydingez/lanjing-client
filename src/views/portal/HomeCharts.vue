<template>
  <v-chart :options="options" class="home-echarts-container-content" autoresize/>
</template>

<script>
  import ECharts from 'vue-echarts'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/component/tooltip'

  // https://www.echartsjs.com/examples/editor.html?c=mix-line-bar 参考例子
  // 右边纵坐标 交易量  左边纵坐标价格 / 一个竖条 时间为一天 / 默认显示15天的一个走势 / 柱形就保留一个参数的柱形  在上面加一个折线    柱形表示交易量  折线表示价格

  export default {
    name: 'HomeCharts',
    components: {
      'v-chart': ECharts
    },
    watch: {
      '$root.smallScreen': {
        handler (small) {
          this.$set(this.options, 'grid', small ? { left: '15%', right: '15%'} : { left: '5%', right: '5%' })
        },
        immediate: true
      }
    },
    data: () => ({
      options: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        grid: {},
        toolbox: {
          feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        legend: {
          data:['交易量（千个）','成交价格（元）']
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '交易量（千个）',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: '成交价格（元）',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name:'交易量（千个）',
            type:'bar',
            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
          },
          {
            name:'成交价格（元）',
            type:'line',
            yAxisIndex: 1,
            data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
          }
        ]
      }
    })
  }
</script>

<style lang="scss" scoped>

</style>
