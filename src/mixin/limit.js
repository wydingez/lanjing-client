import {getAmountLimit, getPriceLimit} from '@/api/sys-params'

export default {
  created () {
    this.initLimit()
  },
  computed: {
    amountLimitDesc () {
      return `${this.amountLimit[0]} - ${this.amountLimit[1]}`
    },
    priceLimitDesc () {
      return `${this.priceLimit[0]} - ${this.priceLimit[1]}`
    }
  },
  data () {
    return {
      amountLimit: [],
      priceLimit: []
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
    }
  }
}