<template>
  <div class="my-map">
    <baidu-map
      class="map"
      :center="center"
      :zoom="zoom"
      @ready="handler"
      :scroll-wheel-zoom="true"
      ak="QyBoyPZx0VZfYo7WuZjhCQpBc7IO2fLr"
    ></baidu-map>
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
export default {
  components: {
    BaiduMap
  },
  data() {
    return {
      center: { lng: 116.404, lat: 39.915 },
      zoom: 15
    }
  },
  methods: {
    // 地图初始化
    handler() {
      this.autoGetCurrentPosition()
    },
    // 自动定位
    autoGetCurrentPosition() {
      // eslint-disable-next-line no-undef
      var geolocation = new BMap.Geolocation()
      geolocation.getCurrentPosition(
        r => {
          this.center = {
            lng: r.point.lng,
            lat: r.point.lat
          }
        },
        { enableHighAccuracy: true }
      )
    }
  }
}
</script>

<style lang='scss'>
.my-map {
  height: 100%;
  .map {
    width: 100%;
    height: 100%;
  }
}
</style>
