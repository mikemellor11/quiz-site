import Vue from "vue";
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
	linkExactActiveClass: 'active',
	mode: 'history',
	routes: [
		{
			path: '/',
			component: require('../vue/routes/PLanding.vue').default
		},
		{
			path: '/*',
			component: require('../vue/routes/PIndex.vue').default
		}
	],
});