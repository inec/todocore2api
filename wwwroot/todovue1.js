(function () {
  Vue.use(Vuex)


  const store = new Vuex.Store({
    state: {
      loading: true,
      todos: [],
      newTodo: ''
    },
    getters: {
      newTodo: state => state.newTodo,
      todos: state => state.todos
    },
    mutations: {
      SET_LOADING (state, flag) {
        state.loading = flag
      },
      SET_TODOS (state, todos) {
        state.todos = todos
      },
      SET_NEW_TODO (state, todo) {
        state.newTodo = todo
      },
      ADD_TODO (state, todoObject) {
        console.log('add todo', todoObject)
        state.todos.push(todoObject)
      },
      REMOVE_TODO (state, todo) {
        var todos = state.todos
        todos.splice(todos.indexOf(todo), 1)
      },
      CLEAR_NEW_TODO (state) {
        state.newTodo = ''
        console.log('clearing new todo')
      }
    },
    actions: {
      loadTodos ({ commit }) {
        axios
          .get('/v1/todos')
          .then(r => r.data)
          .then(todos => {
            commit('SET_TODOS', todos)
            commit('SET_LOADING', false)
          })
      },
      addTodo ({ commit, state }) {
        if (!state.newTodo) {
          // do not add empty todos
          return
        }

        const todo = {
          title: state.newTodo,
          //id:randomId(),
          completed: false
        }
       
        axios.post('/v1/todos', todo).then(_ => {
          commit('ADD_TODO', todo)
        })
      },
      setNewTodo ({ commit }, todo) {
        console.log("action L-66")
        store.commit('SET_NEW_TODO',todo)
      },
      removeTodo ({ commit }, todo) {
        axios.delete(`/v1/todos/${todo.id}`).then(_ => {
          console.log('removed todo', todo.id, 'from the server')
          commit('REMOVE_TODO', todo)
        })
      },
      clearNewTodo ({ commit }) {
        commit('CLEAR_NEW_TODO')
      }
    }
  })


new Vue({
    el: '#app',
    store,
		data: {
       editedTodo: null,
       // newTodo: '',
         //todos: [ { "id": 1, "order": 2, "title": "tst332", "url": "http://localhost:5000/v1/todos/1", "completed": false }, { "id": 2, "order": 2, "title": "tst2", "url": "http://localhost:5000/v1/todos/2", "completed": false } ],
       //  todos:  [],
           message: 'L-26 Hello Vue.js!'
        },
        created () {
          store.dispatch('loadTodos')
        },
        computed: {
          newTodo () {
            return this.$store.getters.newTodo
          },
          todos () {
            return this.$store.getters.todos
          }
        },
  // watch todos change for localStorage persistence
 /* watch: {
    todos: {
      handler: function (todos) {

       console.log(JSON.stringify(todos.slice(-1)[0].title ));
      // localStorage.setItem("todos", JSON.stringify(todos))
       axios.post("/v1/Todos", {title: todos.slice(-1)[0].title})
       .then(() => { // persist all changes to backend
            console.log("saved to server")         });

      },

      deep: true
    }
  },*/
    // methods that implement data logic.
    // note there's no DOM manipulation here at all.
    methods: {
        editTodo: function (todo) {
          this.beforeEditCache = todo.title
          this.editedTodo = todo
        },
        setNewTodo (e) {
         store.dispatch('setNewTodo', e.target.value)
        },
  
        addTodo (e) {
          e.target.value = ''
          //this.$
          store.dispatch('addTodo')
          store.dispatch('clearNewTodo')
        },
        removeTodo (todo) {
          store.dispatch('removeTodo', todo)
        }

      }, mounted() {
          axios.get('/v1/todos')
          .then(response => (this.todos  = response.data))
        }
        
      });
      window.app = app
    })() 