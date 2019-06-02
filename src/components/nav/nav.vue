<template lang="pug">
  .nav-wrapper
    .header-banner.clearfix
      .logo.fl
        img(:src="require('@assets/logo.png')")
      ul.fl.clearfix
        template(v-for="item in navTab")
          li.fl
            a(:href="item.path")
              span {{item.name}}
              i(:class="{active: active === item.alias}")
      .funtion-banner.fr.clearfix
        Button.btn(@click="gotoLogin" type="primary" ghost) 登 录
        Button.btn(@click="gotoSignup" type="primary" ghost) 注 册
        Button.btn(@click="gotoShop" type="primary" ghost) 购 买
</template>
<script>
  import { navTab } from './config'
  export default {
    name: 'selfnav',
    props: {
      active: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        navTab
      }
    },
    mounted() {
    },
    methods: {
      gotoLogin() {
        location.href='/login'
      },
      gotoSignup() {
        location.href='/signup'
      },
      gotoShop() {
        location.href='/shop'
      },
    }
  }
</script>
<style lang="scss" scoped>
  .nav-wrapper {
    width: 100%;
    .header-banner {
      width: 1124px;
      height: 90px;
      line-height: 90px;
      margin: 0 auto;
      li {
        position: relative;
        margin: 0 15px;
        text-align: center;
        span {
          font-size: 16px;
        }
        i {
          display: none;
          position: absolute;
          width: 26px;
          height: 3px;
          left: 50%;
          bottom: 24px;
          border-radius: 2px;
          margin-left: -13px;
          background-color: #8c0776;
        }
        .active {
          display: block;
        }
      }
    }
    .logo {
      width: 114px;
      height: 45px;
    }
    ul {
      height: 90px;
      line-height: 90px;
    }
    img {
      height: 100%;
      display: inline-block;
      vertical-align: middle;
    }
    .btn {
      margin-right: 10px;
    }
  }
</style>
