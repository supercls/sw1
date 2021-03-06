let actionArr = [
    {
        name:'一键起飞',
        icon:'icon-ic_flight_takeoff_px',
        id:1
    },
    {
        name:'悬停',
        icon:'icon-zanting',
        id:2
    },
    {
        name:'续航',
        icon:'icon-ic_xuhangbang',
        id:3
    },
    {
        name:'返航',
        icon:'icon-fanhang',
        id:4
    },
    {
        name:'左转10度',
        icon:'icon-zuoxuanzhuan',
        id:5
    },
    {
        name:'右转10度',
        icon:'icon-youxuanzhuan',
        id:6
    }
]

let boteList = [
    {
        value:110
    },
    {
        value:300
    },
    {
        value:600
    },
    {
        value:1200
    },
    {
        value:2400
    },
    {
        value:4800
    },
    {
        value:9600
    },
    {
        value:14400
    },
    {
        value:19200
    },
    {
        value:38400
    },
    {
        value:56000
    },
    {
        value:57600
    },
    {
        value:115200
    }
]

let sysList = [
    {
        name:'姿态',
        field:'',
    },
    {
        name:'GPS',
        field:''
    },
    {
        name:'通讯',
        field:''
    },
    {
        name:'飞行模式',
        field:''
    },
    {
        name:'操作模式',
        field:''
    },
    {
        name:'导航',
        field:''
    },
    {
        name:'主电源',
        obj:'socket2',
        field:'boardVoltage'
    },
    {
        name:'动力电源',
        obj:'socket2',
        field:'powerVoltage'
    },
    {
        name:'信号状态',
        field:''
    },
    {
        name:'解锁状态',
        field:''
    },

]

let flyList = [
    {
        title:'GPS信息',
        children:[
            {
                name:'GPS时间：',
                field:''
            },
            {
                name:'GPS状态：',
                obj:'socket2',
                field:'gpsState'
            },
            {
                name:'纬度：',
                obj:'socket1',
                field:'curLat'
            },
            {
                name:'经度：',
                obj:'socket1',
                field:'curLng'
            },
            {
                name:'地速北：',
                field:''
            },
            {
                name:'地速东：',
                field:''
            },
            {
                name:'HMSL：',
                field:''
            },
            {
                name:'地速下：',
                field:''
            },
            {
                name:'pDop：',
                obj:'socket2',
                field:'dop'
            },
            {
                name:'地速：',
                field:'velocityGround',
                obj:'socket1',
            },
            {
                name:'卫星数：',
                obj:'socket2',
                field:'satNum'
            },
            {
                name:'航向：',
                field:''
            },
        ]
    },
    {
        title:'大气数据',
        children:[
            {
                name:'高度：',
                field:'curAlt',
                obj:'socket1',
            },
            {
                name:'空速：',
                field:''
            },
        ]
    },
    {
        title:'欧拉角',
        children:[
            {
                name:'滚转：',
                field:'roll',
                obj:'socket1',
            },
            {
                name:'俯仰：',
                field:'pitch',
                obj:'socket1',
            },
            {
                name:'偏航：',
                field:'yaw',
                obj:'socket1',
            },
        ]
    },
    {
        title:'风速',
        children:[
            {
                name:'南风：',
                field:''
            },
            {
                name:'西风：',
                field:''
            },

        ]
    },
    {
        title:'导航信息',
        children:[
            {
                name:'沿航线：',
                field:''
            },
            {
                name:'横偏：',
                field:''
            },
        ]
    },
    {
        title:'其它',
        children:[
            {
                name:'雷达/超声高度：',
                field:''
            },
            {
                name:'磁航向：',
                field:'magOrient',
                obj:'socket2',
            },
            {
                name:'GPS航向锁定：',
                field:''
            },
            {
                name:'角速率振动系数：',
                field:''
            },
            {
                name:'加速度振动系数：',
                field:''
            },
        ]
    },
]

let senList = [
    {
        title:'系统',
        children:[
            {
                name:'温度【℃】：',
                field:'temperature',
                obj:'socket2',
            },
            {
                name:'静压【Pa】：',
                obj:'socket2',
                field:''
            },
            {
                name:'动压【Pa】：',
                obj:'socket1',
                field:''
            },

        ]
    },
    {
        title:'磁传感器【mGauss】',
        children:[
            {
                name:'X轴：',
                field:'magX',
                obj:'socket2',
            },
            {
                name:'Y轴：',
                field:'magY',
                obj:'socket2',
            },
            {
                name:'Z轴：',
                field:'magZ',
                obj:'socket2',
            },
        ]
    },
    {
        title:'角速度【deg/s】',
        children:[
            {
                name:'滚转：',
                field:'',
                obj:'socket1',
            },
            {
                name:'俯仰：',
                field:'',
                obj:'socket1',
            },
            {
                name:'偏航：',
                field:'',
                obj:'socket1',
            },
        ]
    },
    {
        title:'角速度偏差【deg/s】',
        children:[
            {
                name:'滚转：',
                field:'',
                obj:'socket1',
            },
            {
                name:'俯仰：',
                field:'',
                obj:'socket1',
            },
            {
                name:'偏航：',
                field:'',
                obj:'socket1',
            },
        ]
    },
    {
        title:'体轴加速度【m/s/s】',
        children:[
            {
                name:'X轴：',
                field:'',
                obj:'',
            },
            {
                name:'Y轴：',
                field:''
            },
            {
                name:'Z轴：',
                field:''
            },
        ]
    },
    {
        title:'加速度偏差【m/s/s】',
        children:[
            {
                name:'X轴：',
                field:'accelOffsetX',
                obj:'socket2',
            },
            {
                name:'Y轴：',
                field:'accelOffsetY',
                obj:'socket2',
            },
            {
                name:'Z轴：',
                field:'accelOffsetZ',
                obj:'socket2',
            },
        ]
    },
]

export {actionArr,boteList,sysList,flyList,senList}