const KierunekLista = Vue.component('kierunek-lista', {
    data: function () {
        return { kierunki: null}
    },
    template: 
    `<div id="kierunek-lista">
      <ul>
        <li v-for="kierunek in kierunki" :key="kierunek._id">{{kierunek.nazwa}} {{kierunek.rodzaj}} {{kierunek.kod}} (id: {{kierunek._id}})
          <ul v-if="kierunek.specjalnosc.length > 0">
            <li v-for="spec in kierunek.specjalnosc">{{spec}}</li>
          </ul>
        </li>                
      </ul>
    </div>`,
    created: function() {
      axios.get("/webresources/kierunki").then((response) => {
        const data = response.data;
        console.log(data);
        this.kierunki = data;
      }).catch(error => {
        alert("Error: " + error)
      });
    }
  })
  