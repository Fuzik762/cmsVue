import { createApp } from 'vue'
import App from './App.vue'
import messagePlugin from './utils/message.plugin'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database'


firebase.initializeApp({
  apiKey: "AIzaSyAey2GT__VsRnOu80x-Ay0wix6xZKh54to",
  authDomain: "vue-crm-fuzik.firebaseapp.com",
  projectId: "vue-crm-fuzik",
  storageBucket: "vue-crm-fuzik.appspot.com",
  messagingSenderId: "855845521791",
  appId: "1:855845521791:web:f7e1e89ff40a899c2af24a",
  measurementId: "G-56FX677NP2"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = createApp(App).use(store).use(messagePlugin).use(router).mount('#app')
  }
})


