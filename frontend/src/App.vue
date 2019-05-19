<template>
  <v-app>
    <NavBar/>
    <v-content>
      <div class="layout">
        <div class="sidebar">
          <Card/>
          <DialogSurvey/>
        </div>
        <div class="map">
          <Map v-on:bounds-updated="updateBounds"/>
        </div>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import { debounce } from 'throttle-debounce';
import DialogSurvey from './components/DialogSurvey';
import NavBar from './components/NavBar';
import Card from './components/Card';
import Map from './components/Map';
import allPlaces from './data';

const isInbounds = (val, [min, max]) => val > min && val < max;

export default {
  name: 'App',
  components: {
    DialogSurvey,
    NavBar,
    Card,
    Map
  },
  data: function() {
    return {
      allPlaces,
      places: allPlaces,
      query: '',
      bounds: []
    };
  },
  watch: {
    query: function() {
      this.filterPlaces();
    },
    bounds: function() {
      this.filterPlaces();
    }
  },
  methods: {
    updateBounds(bounds) {
      this.bounds = bounds;
    },
    filterPlaces: debounce(300, function() {
      const places = this.allPlaces
        .filter(place => {
          // filter by query
          if (!this.query) return true;
          return place['Restaurant Name']
            .toLowerCase()
            .includes(query.toLowerCase());
        })
        .filter(place => {
          const [lat, lng] = [place.Latitude, place.Longitude];
          const { latRange, lngRange } = this.bounds;
          return isInbounds(lat, latRange) && isInbounds(lng, lngRange);
        });
      this.places = places;
      console.log(this.places);
    })
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
