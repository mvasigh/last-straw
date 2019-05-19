<template>
  <div class="card-list">
    <Card v-for="place in places" :place="place" v-bind:key="place.id"/>
  </div>
</template>

<script>
import Card from './Card';

export default {
  name: 'CardList',
  props: {
    places: Array
  },
  components: {
    Card,
  },
  data() {
    return {
      //
    };
  }
};
</script>

<style lang="scss">
.card-list {
  max-height: 100%;
  overflow-y: scroll;
}
</style>
