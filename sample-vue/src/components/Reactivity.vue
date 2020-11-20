<template>
  <div>
    <h1>{{ msg }}</h1>
    <div class="">
      <input v-model.number="a">
      <input v-model.number="b">

      <h2>The sum is {{ c }}</h2>
      <h4>Reduced {{reduced}}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
   
  },
  data: () => ({
    a: 2,
    b: 3,
    reduced : 0
  }),
  methods: {
    subtract() {
      this.reduced -= .1
      if(this.reduced > .001 ) {
        requestAnimationFrame(this.subtract)
      } else {
        this.reduced = 0
      }
    }
  },
  created() {
  },
  computed: {
    c() {
      return this.a + this.b
    }
  },
  watch: {
    c(val) {
      this.reduced = val
      this.subtract()
    }
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
