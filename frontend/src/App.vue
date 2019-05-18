<template>
  <v-app>
    <NavBar/>
    <v-content>
      <div class="layout">
        <div class="sidebar">
          <Card />
          <DialogSurvey />
        </div>
        <div class="map">
          <Map />
        </div>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import DialogSurvey from './components/DialogSurvey';
import NavBar from './components/NavBar';
import Card from './components/Card';
import Map from './components/Map';

export default {
  name: 'App',
  components: {
    DialogSurvey,
    NavBar,
    Card,
    Map
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
  z-index: 1;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);

  @media (min-width: 940px) {
    flex-direction: row;
    max-width: 500px;
  }
}

.map {
  flex-grow: 1;
  flex-basis: 60%;
  height: 100%;
  width: 100%;
}
</style>
