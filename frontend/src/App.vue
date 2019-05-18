<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank">
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <div class="layout">
        <div class="sidebar">
          <Card />
          <DialogSurvey />
        </div>
        <div class="map">map here</div>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import DialogSurvey from './components/DialogSurvey';
import Layout from './components/Layout';
import Card from './components/Card';

export default {
  name: 'App',
  components: {
    HelloWorld,
    DialogSurvey,
    Layout,
    Card,
  },
  data() {
    return {
      //
    };
  }
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column-reverse;
  height: 100%;
  width: 100%;

  @media (min-width: 940px) {
    flex-direction: row;
  }
}

.sidebar {
  background: #eee;
  flex-basis: 40%;

  @media (min-width: 940px) {
    flex-direction: row;
    max-width: 500px;
  }
}

.map {
  flex-grow: 1;
  flex-basis: 60%;
}
</style>
