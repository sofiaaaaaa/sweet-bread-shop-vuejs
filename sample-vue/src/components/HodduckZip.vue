<template>
  <div>
    <h1>{{ msg }}</h1>
    <div class="flex-container">
      


    </div>
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

.flex-container {
  display: flex;
  /* background-color: DodgerBlue; */
}

.flex-container > div {
  background-color: #f1f1f1;
  margin: 10px;
  padding: 20px;
  font-size: 30px;
  width: 150px;
  height: 150px;
}
</style>
