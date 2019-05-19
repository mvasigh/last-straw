<template>
  <v-toolbar app>
    <v-toolbar-title class="headline text-uppercase">
      <span>LAST</span>
      <span class="font-weight-light">STRAW</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-text-field @input="emitQuery" hide-details prepend-icon="search" single-line></v-text-field>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    query: String
  },
  methods: {
    emitQuery: function(input) {
      this.$emit('query-change', input)
    }
  }
};
</script>

<style>
</style>
