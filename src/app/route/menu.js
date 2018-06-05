export const allMenu = [
    /*{name: '应用管理', url: '/app', icon: 'home', key: '5'},*/
    {name: '视频管理', url: '/all', icon: 'bars', key: '1',
    children: [
        { name: '视频分类', url: '/index', key: '0101' },
        { name: '视频上传', url: '/video', key: '0102' },
    ]},
    { name: '系统管理', url: '/system', icon: 'team', key: '8',
        children: [
            { name: '用户管理', url: '/userTab', key: '0801' },
            { name: '评论管理', url: '/comment', key: '0802' }
        ]},
    
]
