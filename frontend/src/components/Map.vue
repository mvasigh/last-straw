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
import { LMap, LTileLayer } from 'vue2-leaflet';

const getRange = (val1, val2) => [Math.min(val1, val2), Math.max(val1, val2)];

export default {
  components: {
    LMap,
    LTileLayer
  },
  props: {
    pins: Array,
    center: Array,
    zoom: Number,
    bounds: Object
  },
  data() {
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
    };
  },
  methods: {
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
