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
      
      // $createElement 将VNodes转换为具体节点信息
      let rowNodes = this.$createElement('div', this.genPhoneRows())
      const phoneTable = rowNodes

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

        const rows = []
        this.items.forEach((item, index) => {
          rows.push(this.$scopedSlots.items({item}))
        })

        return rows
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>