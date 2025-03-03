
客户端目录

```
│  
│  babel.config.js
│  jest.config.js
│  package-lock.json
│  package.json
│  README.md
│  
├─config
│  │  webpack.config.js
│  │  
│  └─jest
│          cssTransform.js
│          fileTransform.js
│          
├─public
│      favicon.ico
│      index.html
│      logo192.png
│      logo512.png
│      manifest.json
│      mockServiceWorker.js
│      robots.txt
│      
├─server
│          
└─src
    │  .babelrc
    │  App.css
    │  App.js
    │  babel.config.js
    │  index.css
    │  index.js
    │  logo.svg
    │  setupTests.js
    │  
    ├─components
    │  ├─news-manage
    │  │      NewsEditor.js
    │  │      
    │  ├─publish-manage
    │  │      NewsPublish.js
    │  │      usePublish.js
    │  │      
    │  ├─sandbox
    │  │      index.css
    │  │      SideMenu.js
    │  │      TopHeader.js
    │  │      withRoute.js
    │  │      
    │  ├─user-manage
    │  │      UserForm.js
    │  │      
    │  └─__test__
    │          NewsEditor.test.js
    │          NewsPublish.test.js
    │          SideMenu.test.js
    │          TopHeader.test.js
    │          
    ├─image
    │      JiqGstEfoWAOHiTxclqi.png
    │      QasfAllzWOlzRzlqooai.jpg
    │      
    ├─mocks
    │      handlers.js
    │      server.js
    │      
    ├─redux
    │  │  store.js
    │  │  
    │  └─reducers
    │          CategoriesReducer.js
    │          ChatMessageReducer.js
    │          CollapsedReducer.js
    │          CurrentUserReducer.js
    │          NoticeListReducer.js
    │          RightListReducer.js
    │          RoleListReducer.js
    │          
    ├─router
    │  │  DetailRoute.js
    │  │  IndexRouter.js
    │  │  LoginRoute.js
    │  │  NewsRoute.js
    │  │  Redirect.js
    │  │  
    │  └─__test__
    │          IndexRouter.test.js
    │          
    ├─test
    │      mockStore.js
    │      
    ├─utils
    │      data.js
    │      echarts.js
    │      myAxios.js
    │      
    ├─views
    │  ├─login
    │  │      login.css
    │  │      Login.js
    │  │      LoginForm.js
    │  │      
    │  ├─news
    │  │      Detail.css
    │  │      Detail.js
    │  │      News.css
    │  │      News.js
    │  │      
    │  ├─sandbox
    │  │  │  NewsSandBox.css
    │  │  │  NewsSandBox.js
    │  │  │  
    │  │  ├─audit-manage
    │  │  │      Audit.js
    │  │  │      AuditList.js
    │  │  │      
    │  │  ├─chat
    │  │  │      chat.css
    │  │  │      Chat.js
    │  │  │      
    │  │  ├─home
    │  │  │      home.css
    │  │  │      Home.js
    │  │  │      
    │  │  ├─news-manage
    │  │  │      NewsAdd.css
    │  │  │      NewsAdd.js
    │  │  │      NewsCategory.js
    │  │  │      NewsDraft.js
    │  │  │      NewsPreview.css
    │  │  │      NewsPreview.js
    │  │  │      NewsUpdate.js
    │  │  │      
    │  │  ├─nopermission
    │  │  │      NoPermission.css
    │  │  │      NoPermission.js
    │  │  │      
    │  │  ├─publish-manage
    │  │  │      Publish.js
    │  │  │      Sunset.js
    │  │  │      Unpublish.js
    │  │  │      
    │  │  ├─right-manage
    │  │  │      RightList.js
    │  │  │      RoleList.js
    │  │  │      
    │  │  └─use-manage
    │  │          UserList.js
    │  │          
    │  └─__test__
    │      │  Audit.test.js
    │      │  AuditList.test.js
    │      │  Detail.test.js
    │      │  Home.test.js
    │      │  LoginForm.test.js
    │      │  News.test.js
    │      │  NewsAdd.test.js
    │      │  NoPermission.test.js
    │      │  UserList.test.js
    │      │  
    │      └─__snapshots__
    │              NoPermission.test.js.snap
    │              
    └─__mocks__
            echarts.js
            styleMock.js
            

```



服务器server目录


```
│      
├─server
│  │  index.js
│  │  package-lock.json
│  │  package.json
│  │  
│  ├─middlewares
│  │      auth.js
│  │      cache.js
│  │      
│  ├─mysql
│  │      index.js
│  │      
│  ├─public
│  │  └─upload
│  │          
│  └─routes
│          categoriesRouter.js
│          config.js
│          files.js
│          messageRouter.js
│          newsRouter.js
│          rightlistchildrenRouter.js
│          rightlistRouter.js
│          rolelistRouter.js
│          userRouter.js
```





