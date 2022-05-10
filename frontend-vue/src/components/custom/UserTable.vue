<template>
<div>
  <p>
    Hallo Welt
  </p>
</div>


</template>

<script>
  export default {
    name: 'LoginCard',
    inheritAttrs: false,
    props: {
      showBack: {type: Boolean, default: false},
      textBack: {type: String, default: "Zurück"},
      loadingNext: {type: Boolean, default: false},
      disabledNext: {type: Boolean, default: false},
      textNext: {type: String, default: "Weiter"}
    },
  methods: {
    next() {
       this.$emit("next");
    },
       back() {
       this.$emit("back");
    }
  },
  }
</script>
