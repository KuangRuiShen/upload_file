export const allMenu = [
    /*{name: '应用管理', url: '/app', icon: 'home', key: '5'},*/
    { name: '欢迎页', url: '/welcome', icon: 'home', key: '2'},
    {name: '视频管理', url: '/all', icon: 'bars', key: '1',
    children: [
        { name: '视频分类', url: '/index', key: '0101' },
        // { name: '明星', url: '/star', key: '0102' },
        // { name: '标签管理', url: '/label', key: '0103' },
        { name: '视频上传', url: '/video', key: '0104' },
    ]},
    { name: '系统管理', url: '/system', icon: 'team', key: '8',
        children: [
            { name: '登录管理', url: '/login_user', key: '0803' },
        ]},
    
]
