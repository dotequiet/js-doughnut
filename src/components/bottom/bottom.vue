<template lang="pug">
  .bottom-wrapper
    .bottom
      .bottom-second-info dadsadsadas
    .footer
      .footer-info.clearfix.width-visual
        .copy
          span © Alll dasdadasdsad
          span 京ICP备1207534号-1
</template>
<script>
export default {
  name: 'bottom',
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
  .bottom-wrapper {
    .bottom {
      padding: 55px 0 35px;
      width: 100%;
      background-color: #333;
    }
    .bottom-second-info {
      padding: 0 30px;
      width: 1124px;
      margin: 0 auto;
      color: #fff;
    }
    .footer {
      width: 100%;
      height: 40px;
      background-color: #292929;
    }
    .footer-info {
      margin: 0 auto;
      height: 40px;
      padding: 0 20px;
      background-color: #292929;
    }
    .copy {
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 12px;
      color: #777;
    }
  }
</style>
