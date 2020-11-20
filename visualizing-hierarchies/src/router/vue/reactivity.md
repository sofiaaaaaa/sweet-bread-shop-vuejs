# Reactivity

User Interfaces for the most part, visually displays data objects.

They are the visual representation of structured information.

When you work with state management, the visual representation updates for you automatically. This means you don't have to put in extra work after changing the data to re-render it visually.

## Adding Reactivity

Let's add on to the component we just created, `MyComponent.vue`

We will make a simple calculator that adds two numbers.

```html
<template>
  <div>
    <input v-model.number="a" />
    <input v-model.number="b" />
    <h2>The sum is {{ a + b }}</h2>
  </div>
</template>

<script>
  export default {
    data: () => ({
      a: 2,
      b: 3
    })
  }
</script>
```

We are simply changing the value of our data object using `v-model`. Vue will detect this change in values, and automatically render it.

### Computed Props

There are many use cases for these, but the idea behind this is pretty cool.
You can create an object based on multiple values being observed.

Let's do this with our current properties

```html
<template>
  <div>
    <input v-model.number="a" />
    <input v-model.number="b" />
    <h2>The sum is {{ c }}</h2>
  </div>
</template>

<script>
  export default {
    data: () => ({
      a: 2,
      b: 3
    }),
    computed: {
      c() {
        return this.a + this.b
      }
    }
  }
</script>
```

This means that whenever `a` or `b` changes in value, the `c` property will automatically update. And it will _only_ update when it's called upon.

### Watchers

In some cases, computed properties aren't the best option. they are cached, and not observed internally. This is where `watch` comes in.

Let's add a `reduced` property to our data object.

When `c` changes, we will set `reduced` to be the same value, and then continuously subtract until it's 0

```html
<template>
  <div>
    <input v-model.number="a" />
    <input v-model.number="b" />
    <h2>The sum is {{ c }}</h2>
    <h4>Reduced {{ reduced }}</h4>
  </div>
</template>

<script>
  export default {
    data: () => ({
      a: 2,
      b: 3,
      reduced: 0
    }),
    computed: {
      c() {
        return this.a + this.b
      }
    },
    watch: {
      /**
       * When c changes, set reduced
       * to the same number
       * Then start subtracting
       */
      c(val) {
        this.reduced = val
        this.subtract()
      }
    },
    methods: {
      /**
       * will continuously subtract
       * from reduced until it's 0
       */
      subtract() {
        this.reduced -= 0.1
        if (this.reduced > 0.001) {
          requestAnimationFrame(this.subtract)
        } else {
          this.reduced = 0
        }
      }
    }
  }
</script>
```
