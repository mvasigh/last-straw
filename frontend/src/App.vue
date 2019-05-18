<template>
  <v-app>
    <NavBar/>
    <v-content>
      <div class="layout">
        <div class="sidebar">
          <DialogSurvey/>
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
import NavBar from './components/NavBar';

export default {
  name: 'App',
  components: {
    HelloWorld,
    DialogSurvey,
    Layout,
    NavBar
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