<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <TodoList title="Mehdi's todo list"/>
    <input class="Input" />
  </div>
</template>

<script>
import TodoList from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    TodoList
  }
}
</script>

<style>
</style>
