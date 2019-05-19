<template>
  <v-layout>

      <v-card>
      <v-img
          src="https://assets.simpleviewinc.com/simpleview/image/fetch/c_limit,h_640,q_60,w_800/https://assets.simpleviewinc.com/simpleview/image/upload/crm/houston/Niko-Niko-1_3ce738f4-fdbc-f6b6-bdb3824cf1b77b11.jpg"
          aspect-ratio="2.75"
        ></v-img>
        <v-card-title primary-title>Niko Niko's [icon] [icon] [icon]
        </v-card-title>
        <v-card-title secondary-title>123 Smith St., Houston, TX.</v-card-title>
        <v-card-text>
        Niko Niko doesn't use plastic straws. You're saving a potential 10 tons of plastic waste.
        </v-card-text>
        <DialogSurvey />
      </v-card>

  </v-layout>
</template>

<script>
import DialogSurvey from './DialogSurvey';

export default {
  components: {
    DialogSurvey,
  }
}
</script>
