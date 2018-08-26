<template>
  <div>
    <div class="form-row align-items-center" id="formAddTodo">
      <input type="text" v-model="inputTodo" class="form-control" id="inputTodo" placeholder="Create new todo">
      <button type="button" @click="addTodo" class="btn btn-info">Add Todo</button>
    </div>
    <div class="row" id="board">
      <div class="col sm-3">
        <div class="card" style="width: 18rem;">
          <button type="button" class="btn btn-danger">Backlog</button>
          <div class="card-body" v-for="(todo, index) in todos" v-bind:key="index">
            <h5 class="card-title">{{todo.todo}}</h5>
            <a href="#" class="btn btn-danger" @click="deleteTodo(todo.todo)">Delete</a>
            <a href="#" class="btn btn-warning" @click="goTodo(todo.todo)">To-Do</a>
            <hr>
          </div>
        </div>
      </div>

      <div class="col sm-3">
        <div class="card" style="width: 18rem;">
          <button type="button" class="btn btn-warning">To-Do</button>
          <div class="card-body" v-for="(todo, index) in inTodo" v-bind:key="index">
            <h5 class="card-title">{{todo.todo}}</h5>
            <a href="#" class="btn btn-danger" @click="backToBacklog(todo.todo)">Back</a>
            <a href="#" class="btn btn-primary" @click="goDoing(todo.todo)">Doing</a>
            <hr>
          </div>
        </div>
      </div>

      <div class="col sm-3">
        <div class="card" style="width: 18rem;">
          <button type="button" class="btn btn-primary">Doing</button>
          <div class="card-body" v-for="(todo, index) in onDoing" v-bind:key="index">
            <h5 class="card-title">{{todo.todo}}</h5>
            <a href="#" class="btn btn-warning" @click="goTodo(todo.todo)">Back</a>
            <a href="#" class="btn btn-success" @click="goDone(todo.todo)">Done</a>
            <hr>
          </div>
        </div>
      </div>

      <div class="col sm-3">
        <div class="card" style="width: 18rem;">
          <button type="button" class="btn btn-success">Done</button>
          <div class="card-body" v-for="(todo, index) in inDone" v-bind:key="index">
            <h5 class="card-title">{{todo.todo}}</h5>
            <a href="#" class="btn btn-primary" @click="goDoing(todo.todo)">Back</a>
            <a href="#" class="btn btn-danger" @click="deleteTodo(todo.todo)">Delete</a>
            <hr>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'forbody',
  data () {
    return {
    }
  },
  mounted () {
    this.getAllTodo()
  },
  watch: {
    // todos () {
    //   this.getAllTodo()
    // }
  },
  computed: {
    ...mapState([
      'inputTodo', 'todos', 'inTodo', 'onDoing', 'inDone'
    ]),
    inputTodo: {
      get () {
        return this.$store.state.inputTodo
      },
      set (value) {
        this.$store.commit('setInputTodo', value)
      }
    }
  },
  methods: {
    ...mapActions([
      'addTodo', 'getAllTodo', 'goTodo', 'goDoing', 'goDone', 'backToBacklog', 'deleteTodo'
    ])
  }
}
</script>

<style scoped>
  #inputTodo {
    width: 40%;
    height: 40px;
    border-radius: 5px;
  }
  #formAddTodo{
    justify-content: center;
    margin: 30px;
  }
  #board{
    justify-content: center;
    margin-left: 10px;
  }
</style>
