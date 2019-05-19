<template>
  <div>
    <Card v-for="place in places" :place="place"/>
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
