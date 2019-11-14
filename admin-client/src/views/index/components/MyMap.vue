<template>
  <div class='my-map'>
    <!-- <baidu-map class="map" :center="center" :zoom="zoom" @ready="handler"></baidu-map> -->
    <baidu-map class="map" :center="center" :zoom="zoom" @ready="handler" :scroll-wheel-zoom="true"></baidu-map>

  </div>
</template>

<script>
export default {
  data() {
    return {
      center: { lng: 116.404, lat: 39.915 },
      zoom: 15
    };
  },
  methods: {
    // 地图初始化
    handler({ BMap, map }) {
      this.autoGetCurrentPosition();
    },
    // 自动定位
    autoGetCurrentPosition() {
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(
        r => {
          var mk = new BMap.Marker(r.point);
          this.center = {
            lng: r.point.lng,
            lat: r.point.lat
          };
        },
        { enableHighAccuracy: true }
      );
    }
  }
};
</script>

<style lang='scss'>
.my-map {
  height: 400px;
  border: 1px solid #000;
  .map {
    width: 100%;
    height: 100%;
  }
}
</style>
