console.log('tt');
new Vue({
		el: '#app',
		data: {
         todos: [ { "id": 1, "order": 2, "title": "tst332", "url": "http://localhost:5000/v1/todos/1", "completed": false }, { "id": 2, "order": 2, "title": "tst2", "url": "http://localhost:5000/v1/todos/2", "completed": false } ],

           message: 'L-26 Hello Vue.js!'
        },
  created: function () {
    // `this` points to the vm instance
    Vue.http.get("/v1/todos").then(response => {
       // this.todos = response.body;
    });
    console.log('a is: ' + this.todos.length)
  },computed: {
    filteredTodos: function () {
      return filters[this.visibility](this.todos)
    }},
  mounted () {
    axios
     .get('/v1/todos')
     .then(response => (this.message  = response.data)) // .get('https://api.coindesk.com/v1/bpi/currentprice.json')
  }
	  })