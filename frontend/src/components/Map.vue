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
    </l-map>
  </div>
</template>

<script>
// starting bounds
// _northEast: LatLng
// lat: 29.887387948026454
// lng: -95.25901794433594
// _southWest: LatLng
// lat: 29.633457007900898
// lng: -95.48046112060548

import { LMap, LTileLayer } from 'vue2-leaflet';

const getRange = (val1, val2) => [Math.min(val1, val2), Math.max(val1, val2)];

export default {
  components: {
    LMap,
    LTileLayer
  },
  props: {
    pins: Array
  },
  data() {
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 12,
      center: [29.7604, -95.3698],
      bounds: null
    };
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    boundsUpdated(bounds) {
      this.bounds = bounds;
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
