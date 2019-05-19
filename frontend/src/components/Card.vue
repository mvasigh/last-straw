<template>
  <v-layout>
    <v-card width="100%">
      <v-img
        :src="place.imageUrl"
        aspect-ratio="2.75"
      ></v-img>
      <v-card-title primary-title>
        {{place.name}}
        <span v-if="place.plastic===false">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <img v-on="on" src="../assets/straws.png">
            </template>
            <span>No plastic straws</span>
          </v-tooltip>
        </span>

        <span v-if="place.styrofoam===false">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <img v-on="on" src="../assets/containers.png">
            </template>
            <span>No styrofoam</span>
          </v-tooltip>
        </span>

        <span v-if="place.icondiments===false">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <img v-on="on" src="../assets/condiments.png">
            </template>
            <span>No condiment packets</span>
          </v-tooltip>
        </span>
      </v-card-title>
      <v-card-title secondary-title>{{place.address}}</v-card-title>
      <v-card-text>
        <p v-if="place.plastic===false">{{place.name}} {{this.plastic}}</p>
        <p v-if="place.styrofoam===false">{{place.name}} {{this.styrofoam}}</p>
        <p v-if="place.icondiments===false">{{place.name}} {{this.condiment}}</p>
      </v-card-text>
      <template v-if="dialogOpen">
        <DialogSurvey :dialogOpen="dialogOpen" @close-dialog="handleCloseDialog"/>
      </template>
      <v-btn flat color="primary" @click="handleDialogClick">Rate</v-btn>
    </v-card>
  </v-layout>
</template>

<script>
import DialogSurvey from './DialogSurvey';

const placeholder = 'https://file.videopolis.com/D/9dc9f4ba-0b2d-4cbb-979f-fee7be8a4198/8485.11521.brussels.the-hotel-brussels.amenity.restaurant-AD3WAP2L-13000-853x480.jpeg'

export default {
  props: {
    place: Object
  },
  data: function() {
    return {
      image: placeholder
    }
  },
  components: {
    DialogSurvey
  },
  watch: {
    place: function() {
      if (!this.place || !this.place.imageUrl) return this.image = placeholder;
      if (this.place.imageUrl.includes('photoreference=&')) {
        this.image = placeholder;
      }
      this.image = place.imageUrl
    }
  },
  data() {
    return {
      plastic:
        "doesn't use plastic straws, and is decreasing the over 500 million straws that are used every day in America.",
      styrofoam:
        "doesn't use styrofoam packaging. Only 0.2% of styrofoam food service packaging is recycled and much of that remaining 99.8% ends up in our oceans!",
      condiment:
        "doesn't offer single-use condiment packets, and is helping decrease the nearly 10 to 20 million tons of plastic that end up in our oceans each year.",
      dialogOpen: false
    };
  },
  methods: {
    handleDialogClick: function() {
      this.dialogOpen = true
    },
    handleCloseDialog: function() {
      this.dialogOpen = false;
    }
  }
};
</script>

<style scoped>
img {
  width: 2em;
  margin: 0 0.6em 0.8em 0.6em;
}
</style>
