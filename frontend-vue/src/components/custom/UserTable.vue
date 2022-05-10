<template>
  <div>
    <p>Hallo Welt</p>
    <li v-for="item in tableData.data.data" v-bind:key="item.id">
      {{ item.surname }}
    </li>
  </div>
</template>

<script>
export default {
  name: "LoginCard",
  inheritAttrs: false,
  props: {
    tableData: { i: "" },
  },
  methods: {},
};
</script>
