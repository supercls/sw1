
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
NProgress.configure({ showSpinner: false, easing: 'ease', speed: 1000 }); // NProgress Configuration

import { createRouter, createWebHashHistory } from 'vue-router';

import SecurityLayout from '@/layouts/SecurityLayout.vue';
import IndexLayout from '@/layouts/IndexLayout/index.vue';

const routes = [
  {
    title: 'Home',
    path: '/',
    component: SecurityLayout,
    children: [
      {
        title: 'Home',
        path: '/',
        redirect: '/login',
        component: IndexLayout,
        children: [
          {
            title: 'Home',
            path: '/home/workplace',
            component: () => import('@/views/home/index.vue'),
          },
        ]
      },
      {
        title: 'empty',
        path: '/refresh',
        component: () => import('@/views/refresh/index.vue'),
      },
      {
        title: 'controlView',
        path: '/home/controlView',
        component: () => import('@/views/viewset/control.vue'),
      },
      {
        title: 'flyView',
        path: '/home/flyView',
        component: () => import('@/views/viewset/flyview.vue'),
      },
      {
        title: 'sensor',
        path: '/home/sensor',
        component: () => import('@/views/viewset/sensor.vue'),
      },
      {
        title: 'flycheck',
        path: '/home/flycheck',
        component: () => import('@/views/flycheck/index.vue'),
      },
      {
        title: 'flysetting',
        path: '/home/flysetting',
        component: () => import('@/views/setting/index.vue'),
      },
      {
        title: 'setting',
        path: '/home/setting',
        component: () => import('@/views/dialog/syssetting.vue'),
      },
    ]
  },
  {
    title: 'login',
    path: '/login',
    component: () => import('@/views/user/login/index.vue'),
    children: []
  },
  {
    title: 'app.global.menu.notfound',
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/404/index.vue'),
  }
]

const router = createRouter({
  scrollBehavior(/* to, from, savedPosition */) {
    return { top: 0 }
  },
  history: createWebHashHistory(process.env.BASE_URL),
  routes: routes,
});

router.beforeEach((/* to, from */) => {
  // start progress bar
  NProgress.start();
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});

export default router;
