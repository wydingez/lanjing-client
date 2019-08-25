<template>
  <v-chart :options="options" class="home-echarts-container-content" autoresize/>
</template>

<script>
  import ECharts from 'vue-echarts'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/graphic'
  import { queryDailyTrade } from '@/api/trade'

  // https://www.echartsjs.com/examples/editor.html?c=mix-line-bar 参考例子
  // 右边纵坐标 转赠量  左边纵坐标价格 / 一个竖条 时间为一天 / 默认显示15天的一个走势 / 柱形就保留一个参数的柱形  在上面加一个折线    柱形表示转赠量  折线表示价格

  export default {
    name: 'HomeCharts',
    components: {
      'v-chart': ECharts
    },
    data () {
      return {
        latestTradePrice: '',
        totalTradeQuantities: '',
        xLabel: Array(24).fill(':00').map((i, idx) => `${idx < 10 ? '0' + idx : idx}${i}`),
        avgList: Array(24).fill(0),
        totalList: Array(24).fill(0)
      }
    },
    computed: {
      options () {
        let small = this.$root.smallScreen
        return {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          grid: {
            left: small ? '15%' : '5%',
            right: small ? '15%' : '5%'
          },
          toolbox: {
            feature: {
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          legend: {
            data:['转赠量（千个）','转赠价（JG）']
          },
          graphic: [
            {
              type: 'group',
              left: small ? '15%' : '5%',
              top: small ? '20%' : '15%',
              children: [
                {
                  type: 'rect',
                  z: 100,
                  left: 'center',
                  top: 'middle',
                  shape: {
                    width: small ? 120 : 190,
                    height: small ? 50 : 90
                  },
                  style: {
                    fill: '#fff',
                    stroke: '#555',
                    lineWidth: 2,
                    shadowBlur: 8,
                    shadowOffsetX: 3,
                    shadowOffsetY: 3,
                    shadowColor: 'rgba(0,0,0,0.3)'
                  }
                },
                {
                  type: 'text',
                  z: 100,
                  left: 'center',
                  top: 'middle',
                  style: {
                    fill: 'black',
                    text: [
                      '最新转赠数据',
                      `今日成交量：${this.totalTradeQuantities}千个`,
                      `当前转赠价：${this.latestTradePrice}JG`
                    ].join('\n'),
                    font: `${small ? 12 : 14}px Microsoft YaHei`
                  }
                }
              ]
            }
          ],
          xAxis: [
            {
              type: 'category',
              data: this.xLabel,
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '转赠量（千个）',
              min: 0,
              interval: 50,
              axisLabel: {
                formatter: '{value}'
              }
            },
            {
              type: 'value',
              name: '转赠价（JG）',
              min: 0,
              interval: 5,
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series: [
            {
              name: '转赠量（千个）',
              type: 'bar',
              data: this.totalList
            },
            {
              name: '转赠价（JG）',
              type: 'line',
              yAxisIndex: 1,
              data: this.avgList
            }
          ]
        }
      }
    },
    mounted () {
      this.initData()
    },
    methods: {
      initData () {
        queryDailyTrade().then((res) => {
          if (res.success) {
            this.latestTradePrice = res.data.latestTradePrice
            this.totalTradeQuantities = res.data.totalTradeQuantities
            res.data.periodByHour.forEach((item) => {
              let index = Number(item.periodHour)
              this.$set(this.avgList, index, item.avgTradePrice)
              this.$set(this.totalList, index, item.totalTradeQuantities)
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
