import "babel-polyfill"
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/appRouter'
import store from './storage/'
import {routerMode} from './config/env'
import './config/rem'
import FastClick from 'fastclick'

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

Vue.use(VueRouter)
const router = new VueRouter({
	routes,
	mode: routerMode,
	strict: true
})


new Vue({
	router,
	store,
}).$mount('#app')

