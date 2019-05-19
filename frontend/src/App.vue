<template>
  <v-app>
    <NavBar :query="query" @query-change="handleQueryChange" />
    <v-content>
      <div class="layout">
        <div class="sidebar">
          <CardList :places="places"/>
        </div>
        <div class="map">
          <Map
            :bounds="bounds"
            :zoom="zoom"
            :center="center"
            :places="places"
            @bounds-updated="updateBounds"
            @center-updated="updateCenter"
            @zoom-updated="updateZoom"
          />
        </div>
      </div>
    </v-content>
    <template v-if="!visited">
      <PagingDialog @dialog-close="hasVisited"></PagingDialog>
    </template>
  </v-app>
</template>

<script>
import { debounce } from 'throttle-debounce';
import NavBar from './components/NavBar';
import CardList from './components/CardList';
import Map from './components/Map';
import PagingDialog from './components/PagingDialog';
import allPlaces from './data';
import { getAllPlaces } from './lib/api';

const isInbounds = (val, [min, max]) => val > min && val < max;

export default {
  name: 'App',
  components: {
    NavBar,
    CardList,
    PagingDialog,
    Map
  },
  data: function() {
    return {
      allPlaces,
      places: allPlaces,
      query: '',
      bounds: {},
      center: [29.7604, -95.3698], // default to Houston, TX
      zoom: 12,
      visited: true
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
  mounted: function() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const { coords } = position;
        this.center = [coords.latitude, coords.longitude];
        this.zoom = 15;
      });
    }
    const visited = localStorage.getItem('has-visited');
    this.visited = Boolean(visited);
    getAllPlaces()
      .then(places => (this.allPlaces = places))
      .catch(() => (this.allPlaces = allPlaces));
  },
  methods: {
    updateBounds: function(bounds) {
      this.bounds = bounds;
    },
    updateCenter: function(center) {
      this.center = center;
    },
    updateZoom: function(zoom) {
      this.zoom = zoom;
    },
    filterPlaces: debounce(1000, function() {
      const places = this.allPlaces
        .filter(place => {
          // filter by query
          if (!this.query) return true;
          return place.name
            .toLowerCase()
            .includes(this.query.toLowerCase());
        })
        .filter(place => {
          const [lat, lng] = [place.lat, place.long];
          const { latRange, lngRange } = this.bounds;
          return isInbounds(lat, latRange) && isInbounds(lng, lngRange);
        });
      this.places = places;
    }),
    hasVisited: function() {
      localStorage.setItem('has-visited', true);
    },
    handleQueryChange: function(query) {
      console.log({query})
      this.query = query;
    }
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
    max-height: 100%;
    overflow-y: auto;
  }
}

.map {
  flex-grow: 1;
  flex-basis: 60%;
  height: 100%;
  width: 100%;
}
</style>
