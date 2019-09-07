import {getAmountLimit, getPriceLimit, getTradeRate} from '@/api/sys-params'

export default {
  mounted () {
    // this.initLimit()
  },
  computed: {
    amountLimitDesc () {
      return `${this.amountLimit[0]} - ${this.amountLimit[1]}`
    },
    priceLimitDesc () {
      return `${this.priceLimit[0]} - ${this.priceLimit[1]}`
    },
    tradeRateHtml () {
      return `<span class="red--text font-weight-bold">${Number(this.tradeRate) * 100}</span> %`
    }
  },
  data () {
    return {
      amountLimit: [],
      priceLimit: [],
      tradeRate: 0,
    }
  },
  methods: {
    initLimit () {
      getAmountLimit().then(res => {
        if (res.success) {
          this.amountLimit = [res.data.minValue, res.data.maxValue]
        }
      })
      getPriceLimit().then(res => {
        if (res.success) {
          this.priceLimit = [res.data.minUnitPrice, res.data.maxUnitPrice]
        }
      })
      getTradeRate().then(res => {
        if (res.success) {
          this.tradeRate = res.data.rate
        }
      })
    }
  }
}