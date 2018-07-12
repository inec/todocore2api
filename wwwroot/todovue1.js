console.log('tt');
new Vue({
		el: '#app',
		data: {
       editedTodo: null,
        newTodo: '',
         //todos: [ { "id": 1, "order": 2, "title": "tst332", "url": "http://localhost:5000/v1/todos/1", "completed": false }, { "id": 2, "order": 2, "title": "tst2", "url": "http://localhost:5000/v1/todos/2", "completed": false } ],
         todos: JSON.parse(localStorage.getItem("todos")) || [],
           message: 'L-26 Hello Vue.js!'
        },

  // watch todos change for localStorage persistence
  watch: {
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
  },
    // methods that implement data logic.
    // note there's no DOM manipulation here at all.
    methods: {
        editTodo: function (todo) {
          this.beforeEditCache = todo.title
          this.editedTodo = todo
        },
        addTodo: function () {
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
        }
      }, mounted() {
          axios.get('/v1/todos')
          .then(response => (this.todos  = response.data))
        }
        
      });
   