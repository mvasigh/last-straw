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
    title: 'Slide 1',
    body: 'Lorem ipsum dolor sit amet'
  },
  {
    title: 'Slide 2',
    body: 'The quick brown fox jumps over the lazy dog'
  },
  {
    title: 'Slide 3',
    body: 'This is the last slide'
  }
];

export default {
  name: 'PagingDialog',
  props: {
    slides: slides
  },
  data: function() {
    const open = !this.visited;
    return {
      open,
      slide: 0
    };
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
