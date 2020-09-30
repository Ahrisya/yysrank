import VueRouter from 'vue-router';
import routes from './routes';

const router = new VueRouter({
    base: '/',
    mode: 'history',
    routes
});

export default router;
