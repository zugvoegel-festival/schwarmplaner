<script>
// Extensions
  import View from '@/views/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'Calendar',

    metaInfo: { title: 'Calendar' },

    extends: View,

    mixins: [LoadSections(['userChooser', 'calendar'])],

    props: {
      id: {
        type: String,
        default: 'Calendar',
      },
    },
  }
</script>
