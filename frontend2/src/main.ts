import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import GAuth from 'vue3-google-oauth2'


createApp(App).use(store).use(router).use(GAuth, {
    clientId: "408077029007-b2j0stflkuace7jiquvc8glo17g9gir9.apps.googleusercontent.com"
}).mount('#app')