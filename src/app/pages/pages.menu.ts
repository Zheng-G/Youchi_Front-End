export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'cars',  // path for our page
        data: { // custom menu declaration
          menu: {
            title: '数库管理', // menu title
            icon: 'ion-android-car', // menu icon
            pathMatch: 'prefix', // use it if item children not displayed in menu
            selected: false,
            expanded: false,
            order: 50
          }
        },
        children: [
          {
            path: 'brands',
            data: {
              menu: {
                title: '车品牌',
              }
            }
          },
          {
            path: 'testDB-manager',
            data: {
              menu: {
                title: '检测项目， 城市',
              }
            }
          },
          {
            path: 'user-manager',
            data: {
              menu: {
                title: '用户管理',
              }
            }
          },
          {
            path: 'sell-car-manager',
            data: {
              menu: {
                title: '卖车管理',
              }
            }
          }
        ]
      },
      {
        path: 'requests',
        data: { // custom menu declaration
          menu: {
            title: '请求管理', // menu title
            icon: 'ion-android-mail', // menu icon
            pathMatch: 'prefix', // use it if item children not displayed in menu
            selected: false,
            expanded: false,
            order: 100
          }
        },
        children: [
          {
            path: 'buyer-manager',
            data: {
              menu: {
                title: '买家请求管理',
              }
            }
          },
          {
            path: 'seller-manager',
            data: {
              menu: {
                title: '卖家请求管理',
              }
            }
          }
        ]
      },
       {
        path: 'profile',  // path for our page
        data: { // custom menu declaration
          menu: {
            title: 'Profile', // menu title
            icon: 'ion-android-laptop' // menu icon
          }
        },
          children: [
          {
            path: 'profile-manager',
            data: {
              menu: {
                title: '经理',
              }
            }
          }]
      },
      {
        path: 'contents',  // path for our page
        data: { // custom menu declaration
          menu: {
            title: '资源管理', // menu title
            icon: 'ion-android-laptop', // menu icon
            pathMatch: 'prefix', // use it if item children not displayed in menu
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'feedback',  // path for our page
        data: { // custom menu declaration
          menu: {
            title: '意见反馈', // menu title
            icon: 'ion-android-laptop', // menu icon
            pathMatch: 'prefix', // use it if item children not displayed in menu
            selected: false,
            expanded: false,
            order: 0
          }
        }
      }
      
    ]
  }
];
