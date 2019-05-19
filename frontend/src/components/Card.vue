<template>
  <v-layout>

      <v-card>
      <v-img
          src="https://assets.simpleviewinc.com/simpleview/image/fetch/c_limit,h_640,q_60,w_800/https://assets.simpleviewinc.com/simpleview/image/upload/crm/houston/Niko-Niko-1_3ce738f4-fdbc-f6b6-bdb3824cf1b77b11.jpg"
          aspect-ratio="2.75"
        ></v-img>
        
        <v-card-title class="headline mb-0" primary-title>{{place.name}}
          <span v-if="place.plastic===false"><img src="../assets/straws.png"/></span>
          <span v-if="place.styrofoam===false"><img src="../assets/containers.png"/></span>
          <span v-if="place.icondiments===false"><img src="../assets/condiments.png"/></span>
        </v-card-title>
        <v-card-title secondary-title>{{place.address}}</v-card-title>
        <v-card-text>
        {{place.name}} doesn't use plastic straws. You're saving a potential 10 tons of plastic waste.
        </v-card-text>
        <DialogSurvey />
        <!-- {{ cleanAddress }} -->
      </v-card>

  </v-layout>
</template>

<script>
import DialogSurvey from './DialogSurvey';
import axios from 'axios';

export default {
  props: {
    place: Object
  },
  components: {
    DialogSurvey,
  },
  data() {
    return {
      img: null
    };
  },
  computed: {
    cleanAddress: function() {
      //3636 Rice Boulevard, West University Place, TX 77005
      //912+St+Emanuel+
      const first = this.place.address.split(',')[0]
      const cleanAddress = first.split(' ').join('+')
      console.log(cleanAddress)
    }
  },
  mounted() {
    this.cleanAddress
    // axios
    //   .get('https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA')
    //   .then(response => (this.img = response))
  },
}
</script>

<style scoped>
  .headline {
    font-size: .75em;
  }
  img {
    width: 1.1em;
    margin: .2em 0em .1em .2em;
  }
  .v-card__title {
    padding: 10px 10px 0px 10px;
  }
  .v-card__text {
    padding: 10px 10px 20px 10px;
  }
  .v-card {
    padding-bottom: 10px;
  }
</style>
