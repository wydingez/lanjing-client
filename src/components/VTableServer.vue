<script>
  import vTable from './VTable'
  import request from '@/utils/request'

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
    'value'
  ]
  const PROP_DEFS_OTHER = ['ajax']
  const EMISSION_NAMES = ['input', 'update:pagination']
  
  export default {
    name: 'vTableServer',
    components: {vTable},
    props: [...PROP_DEFS_BASE, ...PROP_DEFS_OTHER],
    render () {
      const scopedSlots = this.$scopedSlots
      const options = {
        // dispatch vDataTable props
        props: {...this.$options.propsData},
        // dispatch vDataTable methods
        on: {
          ...EMISSION_NAMES.reduce((total, emissionName) => {
            total[emissionName] = (...args) => {
              this.$emit(emissionName, ...args)
              if (emissionName === 'update:pagination') {
                this.pagination = args[0]
              }
            }
            return total
          }, {}),
          'phone-paging-changed': (val) => {
            this.pagination.page = val
          }
        }
      }

      return (
        <v-table {...options} pagination={this.pagination} items={this.desserts} total-items={this.totalDesserts} loading={this.loading} scopedSlots={scopedSlots}></v-table>
      )
    },
    data: () => ({
      totalDesserts: 0,
      desserts: [],
      loading: false,
      pagination: {}
    }),
    watch: {
      pagination: {
        handler (newVal, oldVal) {
          // 防止pc上触发查询多次
          if (Object.keys(newVal).length) {
            let isPhone = this.$root.smallScreen
            if (isPhone ||  (!isPhone && JSON.stringify(newVal) !== JSON.stringify(oldVal))) {
              this.loadTableData()
            }
          }
        },
        deep: true,
        immediate: true
      },
      'ajax' () {
        this.refresh()
      },
    },
    methods: {
      async getDataFromApi () {
        this.loading = true
        const {url, params, rowsPerPage} = this.$options.propsData.ajax
        let res = await this.getDesserts(url, params || {}, rowsPerPage)

        this.loading = false
        return res
      },
      async getDesserts (url, params, rowsPerPage) {
        if (rowsPerPage) {
          this.pagination.rowsPerPage = rowsPerPage
        }
        let pageParams = {pageNum: this.pagination.page, pageSize: this.pagination.rowsPerPage}
        let res = await request({
          url,
          method: 'post',
          data: {
            ...pageParams,
            ...params
          }
        })
        if (res.success) {
          return res.data
        }
      },
      loadTableData () {
        this.getDataFromApi().then(data => {
          this.desserts = data.rows
          this.totalDesserts = data.total
        })
      },
      refresh () {
        this.loadTableData()
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>