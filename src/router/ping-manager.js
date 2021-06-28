export function getPingManager(Layout) {
    const pingManager = {
        path: '/ping-manager',
        //   component: process.env.NODE_ENV === 'development' ? Layout : { render: (r) => r("router-view") },
        component: Layout,
        name: 'PingManager',
        id: '199',
        alwaysShow: true,
        show: false,
        hidden: false,
        meta: { title: 'Ping管理', icon: 'repair' },
        children: [
            {
                name: 'pingManager1',
                path: 'pingManager1',
                id: "201001",
                hidden: false,
                component: () => import('@/views/PingManager/Home/PingManagerHome.vue'),
                meta: {
                    title: 'Ping管理首页',
                    icon: 'app'
                }
            },
            {
                name: 'PingManagerInsert1',
                path: 'PingManagerInsert1',
                id: "201002",
                hidden: false,
                component: () => import('@/views/PingManager/Home/PingManagerInsert.vue'),
                meta: {
                    title: 'Ping管理新增',
                    icon: 'app'
                }
            },
        ]
    }

    return pingManager
}