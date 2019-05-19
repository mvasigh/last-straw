<template>
  <v-dialog v-model="open" max-width="400">
    <v-card>
      <v-card-title>{{ content.title }}</v-card-title>
      <v-card-text>{{ content.body }}</v-card-text>
      <v-card-actions class="actions">
        <v-btn flat color="primary" @click="handleClick">{{ buttonLabel }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
const slides = [
  {
    title: 'What are the diferent types of Single Use Plastic.',
    body:
      'These are items like plastic bags, straws, coffee stirrers, soda or water bottles and most food packaging.'
  },
  {
    title: 'How do they affect the environment',
    body:
      'More than 300 million tons of plastics are produced annually, and there are at least five trillion plastic pieces floating in our oceans. Microplastic particles are either dumped directly into the seas via sewers and rivers or form when larger chunks of plastic break down over time.'
  },
  {
    title: 'How can you get involved ',
    body:
      'you can reduce your personal single use plastic consumption the next time you go out to eat, order take-out, or bring home leftovers. Visit restaurants that avoid passing single use plastics to consumers'
  }
];

export default {
  name: 'PagingDialog',
  data: function() {
    return {
      open: true,
      slide: 0,
      slides: slides
    };
  },
  mounted: function() {
    if (localStorage.getItem('has-visited')) {
      this.open = false;
    }
  },
  computed: {
    content: function() {
      return this.slides[this.slide];
    },
    buttonLabel: function() {
      return this.slide === this.slides.length - 1 ? 'Got it' : 'Next';
    }
  },
  methods: {
    handleClick: function() {
      this.slide === this.slides.length - 1
        ? this.closeDialog()
        : this.nextSlide();
    },
    nextSlide: function() {
      this.slide += 1;
    },
    closeDialog: function() {
      this.open = false;
      this.$emit('dialog-close');
    }
  }
};
</script>

<style lang="scss">
.actions {
  justify-content: flex-end;
}
</style>
