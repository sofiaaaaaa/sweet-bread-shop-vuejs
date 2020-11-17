import Vue from 'vue'
import App from './App.vue'
import Vs from 'd3-vs';

Vue.config.productionTip = false

Vue.use(Vs);
// import {
//   // Flow transition
//   d3SankeyCircular,

//   // Time Serie
//   d3Timelion,
//   d3Timeline,

//   // Basic
//   d3Pie,
//   d3Line,
//   d3Metric,
//   d3MultiLine,
//   d3HorizontalBar,
//   d3VerticalBar,
//   d3Area,

//   // Functional
//   d3Tracker,
//   d3Slider,
//   d3ProgressArc,

//   // Layout
//   d3Sunburst,
//   d3Tree,
//   d3Pack,
//   d3Cluster,
//   d3ICicleVertical,
//   d3ICicleHorizontal,

//   // Leaflet
//   d3LChoropleth,
//   d3LHeat
// } from 'd3-vs';


new Vue({
  render: h => h(App),
}).$mount('#app')
