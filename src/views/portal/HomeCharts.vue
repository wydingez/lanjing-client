<template>
  <v-chart :options="options" class="home-echarts-container-content" autoresize/>
</template>

<script>
  import ECharts from 'vue-echarts'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/graphic'

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
          this.$set(this.options.graphic[0].children[0], 'shape', small ? { width: 120, height: 60 } : { width: 190, height: 90 })
          this.$set(this.options.graphic[0], 'shape', small ? { width: 120, height: 60 } : { width: 190, height: 90 })
        },
        immediate: true
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
            data:['交易量（千个）','成交价格（元）']
          },
          graphic: [
            {
              type: 'group',
              left: small ? '18%' : '8%',
              top: small ? '24%' : '20%',
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
                    fill: '#333',
                    text: [
                      '最新交易数据',
                      '今日成交数量：50k',
                      '当前成交价格：0.45'
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
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
