# Layouts

`D3` provides multiple layouts for use with displaying hierarchies.

These include `Cluster`, `Tree`, `Treemap`, `Partition`, and `Pack`

Treemap and Pack both have a nested display, meaning they do not show links connecting nodes. Instead, they represent the hierarchy by fitting their descendants within the same space.

We can use these to create a number of layouts like the ones shown in the [examples](/#/intro/examples)

They expect a hierarchy instance to be passed, and they simply assign more properties to each node for position and size.

## Full Reactivity

Because of the way layouts are applied, we have to be careful about where we place our properties.

For example, when we run a layout, it mutates the hierarchy object by assigning various positioning values to each node.

Therefore the hierarchy object should be observed as as a data property, and not a computed one.

## The setup

Let's visualize a dataset of the `world population` in a `circle packing` layout.

We'll add a SVG to our template, and make it fill the entire area

```html
<svg width="100%" height="100%">
  <!-- Content Here -->
</svg>
```

---

### The Data

We need to assign some properties to our data object

In our script, let's setup the basic structure.

```javascript
data: () => ({
  width: 100,
  height: 100,
  padding: 2,
  h: d3.hierarchy({}),
  groupOrder: ["region", "subregion"],
  dataset: []
});
```

---

### Methods

Each layout needs some type of size in order to perform it's calculations for scaling and positioning.

By adding a resize method, we can assign the component's size to the `width` and `height` values

```javascript
methods: {
    updateSize() {
      const {
        width,
        height
      } = this.$el.getBoundingClientRect()
      this.width = width
      this.height = height
    }
}
```

---

### Mounting

When this component is mounted, we simply load our dataset in, as well as initialize our width and height

```javascript
async mounted() {
  // 1. Assign Sizes
  this.updateSize()

  // 2. Load the raw data
  const data = await d3.json('/datasets/populations.json')

  // 3. Assign data to our dataset object
  this.dataset = Object.freeze(data)
}
```

---

### Computed

We need a layout that updates whenever the dimensions or padding change.

```javascript
/**
 * if width, height or padding changes
 * this will change, triggering our watcher
 * to apply changes to our nodes
 * @returns {d3.PackLayout<population.Country>}
 */
layout() {
  return d3.pack()
    .size([this.width, this.height])
    .padding(this.padding)
}
```

Next, we can create a nester method that always reflects the current grouping order.

```javascript
/**
 * if the group order is changed
 * this will change, triggering the
 * hierarchy to be recreated
 * @returns {d3.Nest<population.Country>}
 */
nester() {
  const n = d3.nest()

  this.groupOrder.forEach(v => {
    n.key(node => node[v])
  })

  return n
}
```

Lastly, we will create another object that converts our raw data into a nested object that can be applied to our hierarchy.

```javascript
/**
 * If the nester method, or dataset changes
 * will generate a root node
 */
nestedData() {
  return {
    key:    'root',
    values: this.nester.entries(this.dataset)
  }
}
```

---

### Watchers

We need to observe some of these computed properties in order to recalculate everything

When the layout property changes, we can apply it to our hierarchy.

```javascript
/**
 * When layout method changes,
 * apply to the hierarchy
 * @type {Vue.WatchHandler<d3.PackLayout<population.Country>}
 */
layout() {
  this.layout(this.h)
}
```

---

Finally, when `nestedData` changes, we need to recreate our hierarchy.

We must also summarize and sort the values before we run the layout on it, and then observe the hierarchy _after_ it's been mutated by the layout.

```javascript
/**
 * When our nestedData changes,
 * updates h, and applys a new layout
 */
nestedData(val) {
  // * Add Hierarchy to nested data
  const h = d3.hierarchy(val, v => v.values)

  // ! Calculate Totals and sort
  h.sum(v => v.value)
  h.sort((a, b) => d3.ascending(a.value, b.value))

  /**
   * We must assign properties to hierarchy
   * before we pass it on to vue, so that they are observed
   */
  this.layout(h)

  /** Finally pass it to Vue for observing */
  this.h = h
}
```

> At this point, everything is observed, and will calculate things in an order that just works.
>
> Now we just need to render it.

---

### Visualizing the layout

In our SVG, let's add a circle for each descendant. We will bind `x`, `y`, and `r` for size and positioning, as well as a tooltip to show the key and value of each node.

```html
<!-- Render every descendant of our hierarchy -->
<circle
  v-for="(item, index) in h.descendants()"
  :key="index"
  :r="item.r"
  :cx="item.x"
  :cy="item.y"
>
  <!-- Tooltip -->
  <title>
    {{ item.data.key }}: {{ item.value }}
  </title>
</circle>
```

We can now change the width, height, padding of the layout,
as well as the raw data and the grouping order, and Vue will automatically render the changes.

---

Just for kicks, we can animate everything

```scss
circle {
  transition: all 300ms ease;
}
```

Keep in mind that even though we are using SVG elements, this concept can also be used in regular dom content by applying a dynamic style to each node.

---

### Rendering Links

In the `Pack` layout, we do not display links, because the hierarchy is displayed in a nested fashion.

Let's use a `Cluster` layout to visualize our hierarchy.

Since the logic involved for reactive layouts is exactly the same, we only need to change the layout we are currently using!

First, let's set the radius of each circle to be 5px, since the new layout will not include that value:

```html
<!-- Render every descendant of our hierarchy -->
<circle
  v-for="(item, index) in h.descendants()"
  :key="index"
  r="5"
  :cx="item.x"
  :cy="item.y"
>
  <!-- Tooltip -->
  <title>
    {{ item.data.key }}: {{ item.value }}
  </title>
</circle>
```

Next, we'll replace the `Pack` layout, with a `Cluster`, and remove the padding property

```javascript
/**
 * if width, height or padding changes
 * this will change, triggering our watcher
 * to apply changes to our nodes
 * @returns {d3.PackLayout<population.Country>}
 */
layout() {
  return d3.cluster()
    .size([this.width, this.height])
}
```

We should now see our circles resemble a tree like display! This is because the `x` and `y` properties are both used in `Pack` and `Cluster` layouts.

We need to visualize the links, so let's create a line generator as a computed property.

```javascript
/**
 * Creates a path string out of an array of points.
 * @returns {d3.Path}
 */
lineGen() {
  return d3.line()
    .x(node => node.x)
    .y(node => node.y)
}
```

In the template, we will create a path for each link in our hierarchy by calling our line generator.

```html
<!-- Render every link -->
<path
  v-for="(link, index) in h.links()"
  :key="`link${index}`"
  :d="lineGen([link.source, link.target])"
/>
```

We should now see a **dendrogram**, or in other words, a `Cluster`! 🎉
