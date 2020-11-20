<template>
  <svg width="100%" 
      height="10000"
      @click="addPoint" 
      @contextmenu.prevent="point= []">

      <!-- Path -->
      <path fill="transparent" stroke="blue" stroke-width="1" 
            :d="lineGenerator(points)" />

      <!-- Circles -->
      <circle v-for="(item, index) in points" 
        :key="index"
        r="30" 
        :cx="item.x" 
        :cy="item.y"
        stroke="black" stroke-width="3" fill="yellow"
        
         />  
  </svg>
</template>

<script>
import *  as d3 from 'd3'

export default {
  name: 'D3Sample',
  props: {
    msg: String,
   
  },
  data: () => ({
    points: [
      {
        x: 200,
        y: 400
      }
    ]
  }),
  methods: {
    /** @param {MouseEvent} ev */
    addPoint(ev) {
      const {
        layerX: x,
        layerY: y
      } = ev

      this.points.push({x,y})
    }
  },
  created() {
  },
  computed: {
   lineGenerator() {
     return d3.line()
     .x(item => item.x)
     .y(item => item.y)
     .curve(d3.curveNatural)
   }
  },
  watch: {
   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
