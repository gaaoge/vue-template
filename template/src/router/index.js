/**
 * Created by GG on 2017/1/4.
 */
import VueRouter from 'vue-router';

import Scene1 from  '../app/Scene1.vue';
import Scene2 from  '../app/Scene2.vue';

const router = new VueRouter({
    routes: [
        {path: '/', redirect: '/scene1'},
        {path: '/scene1', component: Scene1},
        {path: '/scene2', component: Scene2}
    ]
});

export default router;