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
    'value'
  ]
  const PROP_DEFS_OTHER = ['ajax']
  const EMISSION_NAMES = ['input', 'update:pagination']
  
  export default {
    name: 'VTable',
    components: {VDataTable},
    props: [...PROP_DEFS_BASE, ...PROP_DEFS_OTHER],
    render () {
      const scopedSlots = this.$scopedSlots
      const options = {
        // dispatch vDataTable props
        props: {...this.$options.propsData},
        // dispatch vDataTable methods
        on: EMISSION_NAMES.reduce((total, emissionName) => {
          total[emissionName] = (...args) => {
            this.$emit(emissionName, ...args)
            if (emissionName === 'update:pagination') {
              this.pagination = args[0]
            }
          }
          return total
        }, {})
      }

      return (
        <v-data-table {...options} pagination={this.pagination} items={this.desserts} total-items={this.totalDesserts} loading={this.loading} scopedSlots={scopedSlots}></v-data-table>
      )
    },
    data: () => ({
      totalDesserts: 0,
      desserts: [],
      loading: true,
      pagination: {}
    }),
    watch: {
      pagination: {
        handler (val) {
          if (Object.keys(val).length) {
            this.getDataFromApi().then(data => {
              this.desserts = data.items
              this.totalDesserts = data.total
            })
          }
        },
        deep: true,
        immediate: true
      }
    },
    methods: {
      getDataFromApi () {
        this.loading = false
        return new Promise((resolve) => {
          const {sortBy, descending, page, rowsPerPage} = this.pagination
          const {url, params} = this.$options.propsData.ajax
          let items = this.getDesserts(url, params)
          const total = items.length

          if (sortBy) {
            items = items.sort((a, b) => {
              const sortA = a[sortBy]
              const sortB = b[sortBy]
              if (descending) {
                if (descending) {
                  if (sortA < sortB) return 1
                  if (sortA > sortB) return -1
                  return 0
                } else {
                  if (sortA < sortB) return -1
                  if (sortA > sortB) return 1
                  return 0
                }
              }
            })
            if (rowsPerPage > 0) {
              items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
            }
            setTimeout(() => {
              this.loading = false
              resolve({
                items,
                total
              })
            }, 1000)
          }
        })
      },
      getDesserts () {
        return [
          {name: 'wyd1**', avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', per: 2000, amount: 100},
          {name: 'wyd2**', avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', per: 3000, amount: 100},
          {name: 'wyd3**', avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', per: 100, amount: 100},
          {name: 'wyd4**', avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', per: 500, amount: 100},
          {name: 'wyd5**', avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', per: 500, amount: 100},
          {name: 'wyd6**', avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', per: 500, amount: 100},
          {name: 'wyd7**', avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', per: 500, amount: 100}
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>