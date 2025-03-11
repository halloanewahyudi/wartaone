// vue router 
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/Home.vue')
        },
        {
            path: '/terkirim',
            name: 'terkirim',
            component: () => import('../views/Terkirim.vue')
        },
        {
            path: '/entries',
            name: 'entries',
            component: () => import('../views/Entries.vue')
        },
        {
            path: '/export',
            name: 'export',
            component: () => import('../views/Export.vue')
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 }
    }

});

export default router

