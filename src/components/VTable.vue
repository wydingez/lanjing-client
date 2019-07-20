<script>
  import {VDataTable} from 'vuetify/lib'

  const PROP_DEFS_BASE = [
    'custom-filter',
    'custom-sort',
    'dark',
    'disable-initial-sort',
    'expand',
    'filter',
    'header-key',
    'header-text',
    'headers',
    'headers-length',
    'hide-actions',
    'hide-headers',
    'item-key',
    'light',
    'must-sort',
    'next-icon',
    'no-data-text',
    'no-results-text',
    'prev-icon',
    'rows-per-page-items',
    'rows-per-page-text',
    'search',
    'select-all',
    'sort-icon',
    'value',
    'pagination',
    'items',
    'total-items',
    'loading'
  ]
  const EMISSION_NAMES = ['input', 'update:pagination']
  
  export default {
    name: 'VTable',
    components: {VDataTable},
    props: [...PROP_DEFS_BASE],
    render () {
      const {smallScreen} = this.$root
      const scopedSlots = this.$scopedSlots
      const options = {
        // dispatch vDataTable props
        props: {...this.$options.propsData},
        // dispatch vDataTable methods
        on: EMISSION_NAMES.reduce((total, emissionName) => {
          total[emissionName] = (...args) => {
            this.$emit(emissionName, ...args)
          }
          return total
        }, {})
      }

      const phoneTable = this.genPhoneRows()

      const pcTable = (
        <v-data-table {...options} scopedSlots={scopedSlots}></v-data-table>
      )
      
      return smallScreen ? phoneTable : pcTable
    },

    methods: {
      genPhoneRows () {
        if (!this.$scopedSlots.items) {
          return null
        }

        let tableDefine = null
        let rows = []
        this.items.forEach((item) => {
          let scopedSlot = this.$scopedSlots({item})
          let row = []
          this.headers.forEach((header) => {
            row.push()
          })
        })

        tableDefine = (
          <div class={['v-table-phone']}>
            <div class={['v-table-phone-row']}>
              <span class={['v-table-phone-row-title']}>

              </span>
            </div>
          </div>
        )
        // this.items.forEach((item) => {
        //   rows.push(this.$createElement('div', {
        //     'class': {
        //       'v-table-phone-row': true
        //     }
        //   }, this.$scopedSlots.items({item})))
        // })

        // tableDefine = this.$createElement('div', {
        //   'class': {
        //     'v-table-phone': true
        //   }
        // }, rows)

        return tableDefine
      }
    }
  }
</script>

<style lang="stylus">
.v-table-phone {
  &-row {
    margin: 10px;
    td {
      display: block;
      height: 52px;
      line-height: 52px;
      text-align: right;
    }
  }
}
</style>