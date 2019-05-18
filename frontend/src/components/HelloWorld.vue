<template>
  <div>{{ hello }}</div>

</template>

<script>
const networkRequest = () => new Promise(resolve => {
  setTimeout(() => resolve({hello: 'world'}), 3000);
})

export default {
  name: 'HelloWorld',
  data: function() {
    // returns your initial state
    return {
      hello: 'loading...'
    }
  },
  props: {
    msg: String,
    id: Number
  },
  mounted: function() {
    // can do network request on mounted lifecycle hook
    networkRequest().then(data => {
      // set the state property you want directly on `this`
      this.hello = data.hello
    })
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
