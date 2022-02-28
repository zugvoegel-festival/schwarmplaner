<script>
// Extensions
  import View from '@/views/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'New',

    metaInfo: { title: 'New' },

    extends: View,

    mixins: [LoadSections(['New'])],

    props: {
      id: {
        type: String,
        default: 'New',
      },
    },
  }
</script>
