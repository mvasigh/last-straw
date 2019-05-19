<template>
  <div class="map" style="height:100%; width:100%">
    <l-map
      style="height: 100%; width: 100%"
      :zoom="zoom"
      :center="center"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"
    >
      <l-tile-layer :url="url"></l-tile-layer>
      <template v-for="(place, index) in markers">
        <l-marker :lat-lng="place.latlng" v-bind:key="index">
          <l-tooltip>{{ place.name }}</l-tooltip>
        </l-marker>
      </template>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LTooltip } from 'vue2-leaflet';

const getRange = (val1, val2) => [Math.min(val1, val2), Math.max(val1, val2)];

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip
  },
  props: {
    pins: Array,
    center: Array,
    zoom: Number,
    bounds: Object,
    places: Array
  },
  data() {
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      markers: this.placesToMarkers(this.places)
    };
  },
  watch: {
    places: function(newPlaces) {
      this.markers = this.placesToMarkers(newPlaces);
      console.log(this.markers);
    }
  },
  methods: {
    placesToMarkers(places) {
      return places.map(place => ({
        latlng: [place.lat, place.long],
        name: place.name
      }))
    },
    zoomUpdated(zoom) {
      this.$emit('zoom-updated', zoom);
    },
    centerUpdated(center) {
      const { lat, lng } = center;
      this.$emit('center-updated', [lat, lng]);
    },
    boundsUpdated(bounds) {
      const { _northEast, _southWest } = bounds;
      const latRange = getRange(_northEast.lat, _southWest.lat);
      const lngRange = getRange(_northEast.lng, _southWest.lng);
      this.$emit('bounds-updated', { latRange, lngRange });
    }
  }
};
</script>

<style lang="scss">
.map {
  * {
    z-index: 0;
  }
}
</style>
