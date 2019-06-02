import Vue from 'vue';
import store from '../../store';
import iView from 'iview';
import '@styles/lib/main.scss';
import '@styles/index/index.scss';
import '@styles/my-theme/index.less'
import { logMixin } from '@mixins/test.js'
import { initCircle } from './components/canvas.js'
import { svgCircle } from './components/svg.js'


Vue.use(iView);
new Vue({
  mixins: [logMixin],
  el: '#app',
  store,
  data () {
    return {}
  },
  mounted () {
    new initCircle()
    new svgCircle()
  },
  methods: {

  },
  components: {
  }
});
