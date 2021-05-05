const KierunekDelete = Vue.component('kierunek-delete', {
    template: 
`<form id="kierunek-delete" @submit.prevent="process()">
	<div>
		<label for="name">Nazwa kierunka do usuwania</label>
		<input type="text" id="name" name="name" v-model="nazwa">
	</div>
	<div>
		<label for="code">Kod kierunka do usuwania</label>
		<input type="text" id="code" name="code" v-model="kod">
	</div>
	<button type="submit" style="width: 80px; display: block; margin: auto">OK</button>
</form>`,
	data: function() {
		return {
			nazwa: "Kierunek studiow",
			kod: "ABC",
			stopien: "inż"
		}
	},
	methods: {
		process: function() {

			console.log("form: nazwa=", this.nazwa, "kod=", this.kod);
			dane = {
				nazwa: this.nazwa,
				kod: this.kod,
			}
			axios.post('/webresources/deletingKierunki',
						JSON.stringify(dane), 
                        {   
                            headers: {
                            'Content-Type': 'application/json; charset=UTF-8'
                            }
                        }
            ).then((response) => {
                console.log(response);
                this.$router.push('/lista');
            }).catch(error => {
                alert("Error in deliting: " + error)
            });
		}
	}
})

