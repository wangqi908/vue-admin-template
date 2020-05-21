<template>
  <div class="error-page">
    <img class="astronaut" src="../../assets/imgs/astronaut.png" alt />
    <div class="earth"></div>
    <div class="tip">
      <p>Oppppps</p>
      <p>页面被三体人劫持......</p>
      <p @click="$router.go(-1)">点击返回飞船</p>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang='scss' scoped>
.error-page {
  background-color: rgb(14, 14, 14);
  height: 100%;
  height: 100%;
  position: relative;
  .earth {
    position: absolute;
    bottom: 0;
    height: 200px;
    width: 100%;
    background: url('../../assets/imgs/earth.png') no-repeat;
    background-size: 100% 100%;
  }
  .astronaut {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 86px;
    width: 70px;
    animation: astronaut 3s linear infinite alternate;
  }

  @keyframes astronaut {
    from {
      top: 54%;
    }
    to {
      top: 46%;
    }
  }

  .tip {
    position: absolute;
    top: 20%;
    left: 10%;
    p {
      margin: 20px;
      &:first-child {
        font-size: 40px;
        font-weight: 700;
        color: rgb(228, 228, 228);
      }
      &:nth-child(2) {
        font-weight: 600;
        color: rgb(209, 209, 209);
      }
      &:last-child {
        font-weight: 600;
        font-size: 14px;
        color: rgb(160, 160, 160);
        cursor: pointer;
        &:hover {
          color: rgb(199, 199, 199);
        }
        &:active {
          color: rgb(133, 131, 131);
        }
      }
    }
  }
}
</style>