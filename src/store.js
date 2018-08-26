import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/firebase/firebase.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    inputTodo: '',
    todos: [],
    status: 'start',
    inTodo: [],
    onDoing: [],
    inDone: []
  },
  mutations: {
    setInputTodo (state, payload) {
      state.inputTodo = payload
    },
    setGetAllTodo (state, payload) {
      state.todos = payload
    },
    setInTodo (state, payload) {
      state.inTodo = payload
    },
    setOnDoing (state, payload) {
      state.onDoing = payload
    },
    setDone (state, payload) {
      state.inDone = payload
    }
  },
  actions: {
    addTodo (context) {
      db.ref('todos/' + this.state.inputTodo).set({
        status: this.state.status,
        todo: this.state.inputTodo
      })
      this.state.inputTodo = ''
    },
    getAllTodo (context) {
      let todos = []
      let inTodo = []
      let onDoing = []
      let done = []
      db.ref('todos/').on('value', function (snapshot) {
        let data = Object.values(snapshot.val())
        data.forEach(element => {
          if (element.status === 'start') {
            todos.push(element)
          } else if (element.status === 'todo') {
            inTodo.push(element)
          } else if (element.status === 'doing') {
            onDoing.push(element)
          } else if (element.status === 'done') {
            done.push(element)
          }
        })
        context.commit('setGetAllTodo', todos)
        context.commit('setInTodo', inTodo)
        context.commit('setOnDoing', onDoing)
        context.commit('setDone', done)
      })
    },
    goTodo (context, payload) {
      context.dispatch('clear')
      db.ref('todos/' + payload).set({ todo: payload, status: 'todo' })
    },
    goDoing (context, payload) {
      context.dispatch('clear')
      db.ref('todos/' + payload).set({ todo: payload, status: 'doing' })
    },
    goDone (context, payload) {
      context.dispatch('clear')
      db.ref('todos/' + payload).set({ todo: payload, status: 'done' })
    },
    backToBacklog (context, payload) {
      context.dispatch('clear')
      db.ref('todos/' + payload).set({ todo: payload, status: 'start' })
    },
    deleteTodo (context, payload) {
      context.dispatch('clear')
      db.ref('todos/' + payload).set(null)
    },
    clear () {
      this.state.todos = []
      this.state.inDone = []
      this.state.inTodo = []
      this.state.onDoing = []
    }
  }
})
