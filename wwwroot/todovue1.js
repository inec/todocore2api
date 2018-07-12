
function randomId () {
  return Math.random()
    .toString()
    .substr(2, 10)
}

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
          })
      },
      addTodo ({  state }) {
        if (!state.newTodo) {
          // do not add empty todos
          return
        }
        console.log(state)
        const todo = {
          title: state.newTodo,
          completed: false,
          id: randomId()
        }
       
        axios.post('/v1/todos',  {title: "sdf"}).then(_ => {
          commit('ADD_TODO', todo)
        })
      },
      setNewTodo () {
        console.log("L-66")
        commit('SET_NEW_TODO', todo)
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
		data: {
       editedTodo: null,
        newTodo: '',
         //todos: [ { "id": 1, "order": 2, "title": "tst332", "url": "http://localhost:5000/v1/todos/1", "completed": false }, { "id": 2, "order": 2, "title": "tst2", "url": "http://localhost:5000/v1/todos/2", "completed": false } ],
         todos: JSON.parse(localStorage.getItem("todos")) || [],
           message: 'L-26 Hello Vue.js!'
        },
        created () {
          this.$store.dispatch('loadTodos')
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
          //this.$store.dispatch('clearNewTodo')
        },
        removeTodo (todo) {
          this.$store.dispatch('removeTodo', todo)
        }
        /*addTodo: function () {
            var value = this.newTodo && this.newTodo.trim();
            if (!value) {
                return
            }
            this.todos.push({
                id: new Date().getTime(),
                title: value,
                completed: false
            });
            this.newTodo = ''
        }*/
      }, mounted() {
          axios.get('/v1/todos')
          .then(response => (this.todos  = response.data))
        }
        
      });
   