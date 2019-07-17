<script>
  import {VDataTable} from 'vuetify/lib'

  const PROP_DEFS_BASE = ['headers', 'items']
  const PROP_DEFS_OTHER = ['url']
  const EMISSION_NAMES = ['input', 'update:pagination']
  
  export default {
    name: 'VTable',
    components: {VDataTable},
    props: [...PROP_DEFS_BASE, ...PROP_DEFS_OTHER],
    render () {
      const scopedSlots = this.$scopedSlots
      const options = {
        props: {...this.$options.propsData},
        on: EMISSION_NAMES.map((emissionName) => ({
          [emissionName]: (...args) => {
            this.$emit(emissionName, ...args)
          }
        }))
      }

      return (
        <v-data-table {...options} scopedSlots={scopedSlots}></v-data-table>
      )
    }
  }
</script>

<style lang="scss" scoped>

</style>