const menuList = [
    {
        name: '文件',
        icon: 'icon-weibiaoti1',
        active: true,
        children: [
            {
                name: '日志路径',
                active: false,
                path: '/'
            },
        ]
    },
    {
        name: '地图',
        icon: 'icon-ditu',
        active: false,
        children: []
    },
    {
        name: '系统设置',
        icon: 'icon-xitongshezhi',
        active: false,
        children: [
            {
                name: '控制器参数',
                active: false,
                path: '/'
            },
        ]
    },
    {
        name: '数据显示',
        icon: 'icon-shuju',
        active: false,
        children: [
            {
                name: '飞行数据',
                active: false,
                path: '/home/flyView',
                width: 1000,
                height: 800
            },
            {
                name: '传感器数据',
                active: false,
                path: '/home/sensor',
                width: 650,
                height: 700
            },
        ]
    },
    {
        name: '任务设置',
        icon: 'icon-shezhi',
        active: false,
        children: []
    },
    {
        name: '飞前检查',
        icon: 'icon-jiancha',
        active: false,
        path: '/home/flycheck',
        width: 650,
        height: 700,
        children: []
    },
    {
        name: '视图窗口',
        icon: 'icon-xinchuangkoudakai',
        active: false,
        children: [
            // {
            //     name:'仪表显示器',
            //     active:false,
            //     path:'/'
            // },
            // {
            //     name:'对象列表栏',
            //     active:false,
            //     path:'/'
            // },
            // {
            //     name:'动作指令栏',
            //     active:false,
            //     path:'/'
            // },
            // {
            //     name:'地图工具栏',
            //     active:false,
            //     path:''
            // },
            // {
            //     name:'系统状态栏',
            //     active:false,
            //     path:''
            // },
            {
                name: '控制显示栏',
                active: false,
                path: '/home/controlView',
                width: 600,
                height: 700
            }
        ]
    }
]
export default menuList
