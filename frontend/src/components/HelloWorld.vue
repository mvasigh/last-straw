<template>
  <div>
    <!-- show todo list -->
    <h2>{{ title }}</h2>
    <ul>
      <li v-for="todo in todos" v-bind:key="todo">{{ todo }}</li>
    </ul>

    <!-- input and button to add to todo list -->
    <input class="Input" type="text" v-model="todo">
    <button v-on:click="addTodo">Add todo</button>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  props: {
    title: String
  },
  data: function() {
    return {
      todo: '',
      todos: ['clean the sink']
    };
  },
  methods: {
    addTodo: function() {
      const { todos, todo } = this;
      this.todos = [...todos, todo]
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Input {
  background: red;
}
</style>
