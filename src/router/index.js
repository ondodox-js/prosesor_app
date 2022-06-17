import { createRouter, createWebHistory } from 'vue-router';
import HomeIndex from '../views/HomeIndex.vue';
import FifoIndex from '../views/FifoIndex.vue';
import SjfIndex from '../views/SjfIndex.vue';
import RrIndex from '../views/RrIndex.vue';
const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeIndex,
    },
    {
        path: '/fifo',
        name: 'Fifo',
        component: FifoIndex,
    },
    {
        path: '/sjf',
        name: 'Sjf',
        component: SjfIndex,
    },
    {
        path: '/Rr',
        name: 'Rr',
        component: RrIndex,
    },
];

const router = createRouter({
    history: createWebHistory(),
    base: process.env.BASE_URL,
    routes,
});
export default router;
