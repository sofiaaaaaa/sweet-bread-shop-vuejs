<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="호떡집에 오신 것을 환영합니다."/> -->
    <d3-svg/>
    <!-- <HodduckZip msg="호떡집에 오신 것을 환영합니다." 
      metricValue="400" 
      circleValue="0.7" 
      :pieValue="pieValue"
      margin="20" /> -->
      <!-- 
      pieValue="[{key:'apple', value:'30'},{key:'banana', value:'70'}]" -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import HodduckZip from './components/HodduckZip.vue'
import D3Svg from './components/D3Svg.vue'

// https://menutong.com/bbs/board.php?bo_table=sangto&wr_id=3861
// https://observablehq.com/@d3/gallery
// github.com/public-apis/public-apis
// https://observablehq.com/@d3/bubble-chart 

// vuejs 에서 d3 설치해서 사용하는 가이드 https://vuejsexamples.com/vue-visualisation-package-using-d3-js-and-leaflet/
// Visualizing Hierarchies with Vue.js and D3.js https://www.youtube.com/watch?v=GuecoTcqmVE

export default {
  name: 'App',
  components: {
    // HelloWorld,
    // HodduckZip,
    D3Svg
  },
  data() {
		return {
			pieValue: [{key:'apple', value:'30'},{key:'banana', value:'70'}]
		}
	},
}
</script>

<style>
/* body {  background-color: black; } */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
