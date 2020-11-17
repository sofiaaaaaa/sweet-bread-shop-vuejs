<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <d3-metric
      :data="metricValue"
      :options="options"
      :margin="margin"
      width="100%"
      height="400px">
  </d3-metric>

  <d3-circle
    :data="circleValue"
    :options="options"
    :margin="margin"
    width="100%"
    height="400px">
</d3-circle>

<d3-pie
    :data="pieValue"
    :options="options"
    :margin="margin"
    width="100%"
    height="400px">
</d3-pie>


  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    metricValue: Number, 
    circleValue: Number,
    pieValue: Array,
    options: Object,
    margin: Number
  },
  methods: {
    goChart(){
    }
  },
  created() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
