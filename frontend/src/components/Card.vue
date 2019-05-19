<template>
  <v-layout>

      <v-card width="100%">
      <v-img
          src="https://assets.simpleviewinc.com/simpleview/image/fetch/c_limit,h_640,q_60,w_800/https://assets.simpleviewinc.com/simpleview/image/upload/crm/houston/Niko-Niko-1_3ce738f4-fdbc-f6b6-bdb3824cf1b77b11.jpg"
          aspect-ratio="2.75"
        ></v-img>
        <v-card-title primary-title>{{place.name}}

          <span v-if="place.plastic===false">
            <v-tooltip bottom><template v-slot:activator="{ on }">
                <img v-on="on" src="../assets/straws.png"/>
              </template>
              <span>No plastic straws</span>
            </v-tooltip>
          </span>

          <span v-if="place.styrofoam===false">
            <v-tooltip bottom><template v-slot:activator="{ on }">
                <img v-on="on" src="../assets/containers.png"/>
              </template>
              <span>No styrofoam</span>
            </v-tooltip>
          </span>

          <span v-if="place.icondiments===false">
            <v-tooltip bottom><template v-slot:activator="{ on }">
                <img v-on="on" src="../assets/condiments.png"/>
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
        plastic: "doesn't use plastic straws, and is decreasing the over 500 million straws that are used every day in America.",
        styrofoam: "doesn't use styrofoam packaging. Only 0.2% of styrofoam food service packaging is recycled and much of that remaining 99.8% ends up in our oceans!",
        condiment: "doesn't offer single-use condiment packets, and is helping decrease the nearly 10 to 20 million tons of plastic that end up in our oceans each year."
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
