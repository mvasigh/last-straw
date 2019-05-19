<template>
  <v-layout>

      <v-card>
      <v-img
          src="https://assets.simpleviewinc.com/simpleview/image/fetch/c_limit,h_640,q_60,w_800/https://assets.simpleviewinc.com/simpleview/image/upload/crm/houston/Niko-Niko-1_3ce738f4-fdbc-f6b6-bdb3824cf1b77b11.jpg"
          aspect-ratio="2.75"
        ></v-img>
        <v-card-title primary-title>{{place.name}}
          <span v-if="place.plastic===false"><img src="../assets/straws.png"/></span>
          <span v-if="place.styrofoam===false"><img src="../assets/containers.png"/></span>
          <span v-if="place.icondiments===false"><img src="../assets/condiments.png"/></span>
        </v-card-title>
        <v-card-title secondary-title>{{place.address}}</v-card-title>
        <v-card-text>
        {{place.name}} doesn't use plastic straws. You're saving a potential 10 tons of plastic waste.
        </v-card-text>
        <DialogSurvey />
      </v-card>

  </v-layout>
</template>

<script>
import DialogSurvey from './DialogSurvey';

export default {
  props: {
    place: Object
  },
  components: {
    DialogSurvey,
  },
  data() {
    return {
      //
    };
  }
}
</script>

<style scoped>
  img {
    width: 2em;
    margin: 0 .6em .8em .6em;
  }
</style>
