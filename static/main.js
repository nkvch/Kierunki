const NotFound = { template: '<div>nie ma takiego numeru</div>' }

const routes = [
    { path: '/', redirect: '/lista'},
    { path: '/lista', 
      component: KierunekLista, 
      name: "lista"
    },
    { path: '/nowy', name: 'nowy', component: KierunekForm },
    { path: '/delete', name: 'delete', component: KierunekDelete},
    { path: '/edit', name: 'edit', component: KierunekEdit},
    { path: '*', component: NotFound}
]

const router = new VueRouter({
    routes: routes
})

const app = new Vue({
    router: router,    
    data: {
      kierunki: "abc"
    },
    methods: {
      send: function() {
        console.log("submit form");
      }
  }
  }).$mount('#app')
