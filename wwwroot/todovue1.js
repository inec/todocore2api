console.log('tt');
new Vue({
		el: '#app',
		data: {
		  message: 'L-26 Hello Vue.js!'
		},
  mounted () {
    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => (this.message  = response))
  }
	  })