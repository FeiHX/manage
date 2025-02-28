import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mockstore = mockStore({
  CollApsedReducer: { isCollapsed: false },
  RoleListReducer: {
    rolelist: [
      {
        id: 1,
        roleType: 1,
        roleName: "超级管理员",
        rights: [
          "/chat",
          "/right-manage/role/update",
          "/right-manage/role/delete",
          "/right-manage/right/update",
          "/right-manage/right/delete",
          "/audit-manage",
          "/audit-manage/audit",
          "/audit-manage/list",
          "/right-manage",
          "/right-manage/role/list",
          "/right-manage/right/list",
          "/news-manage/list",
          "/news-manage/update/:id",
          "/news-manage/preview/:id",
          "/news-manage/draft",
          "/news-manage/category",
          "/news-manage",
          "/user-manage/add",
          "/user-manage/delete",
          "/user-manage/update",
          "/user-manage/list",
          "/user-manage",
          "/publish-manage/unpublished",
          "/publish-manage/published",
          "/publish-manage/sunset",
          "/publish-manage",
          "/home",
          "/news-manage/add"
        ]
      }
    ]
  },
  CategoriesReducer: {
    categories: [
      {
        id: 1,
        title: "时事新闻",
        value: "时事新闻"
      },
      {
        id: 2,
        title: "环球经济",
        value: "环球经济"
      },
      {
        id: 3,
        title: "科学技术",
        value: "科学技术"
      },
      {
        id: 4,
        title: "军事世界",
        value: "军事世界"
      },
      {
        id: 5,
        title: "世界体育",
        value: "世界体育"
      },
      {
        id: 6,
        title: "生活理财",
        value: "生活理财"
      }
    ]
  },
  CurrentUserReducer: {
    region: "全球",
    username: "admin",
    roleId: 1,
    role: "超级管理员"
  },
  RoleListReducer: {
    rolelist: [
      {
        id: 1,
        roleType: 1,
        roleName: "超级管理员",
        rights: [
          "/chat",
          "/right-manage/role/update",
          "/right-manage/role/delete",
          "/right-manage/right/update",
          "/right-manage/right/delete",
          "/audit-manage",
          "/audit-manage/audit",
          "/audit-manage/list",
          "/right-manage",
          "/right-manage/role/list",
          "/right-manage/right/list",
          "/news-manage/list",
          "/news-manage/update/:id",
          "/news-manage/preview/:id",
          "/news-manage/draft",
          "/news-manage/category",
          "/news-manage",
          "/user-manage/add",
          "/user-manage/delete",
          "/user-manage/update",
          "/user-manage/list",
          "/user-manage",
          "/publish-manage/unpublished",
          "/publish-manage/published",
          "/publish-manage/sunset",
          "/publish-manage",
          "/home",
          "/news-manage/add"
        ]
      },
      {
        id: 2,
        roleType: 2,
        roleName: "区域管理员",
        rights: [
          "/chat",
          "/audit-manage",
          "/audit-manage/audit",
          "/audit-manage/list",
          "/news-manage/list",
          "/news-manage/add",
          "/news-manage/update/:id",
          "/news-manage/preview/:id",
          "/news-manage/draft",
          "/news-manage/category",
          "/news-manage",
          "/user-manage/list",
          "/user-manage",
          "/home",
          "/publish-manage/unpublished",
          "/publish-manage/published",
          "/publish-manage/sunset",
          "/publish-manage"
        ]
      }
    ]
  },
  RightListReducer: {
    rightlist: [
      {
        id: 1,
        title: "首页",
        rightKey: "/home",
        pagepermission: 1,
        grade: 1,
        children: [],
        key: "/home"
      },
      {
        id: 2,
        title: "用户管理",
        rightKey: "/user-manage",
        pagepermission: 1,
        grade: 1,
        children: [
          {
            id: 6,
            title: "用户列表",
            rightId: 2,
            rightKey: "/user-manage/list",
            grade: 2,
            pagepermission: 1,
            key: "/user-manage/list"
          }
        ],
        key: "/user-manage"
      },
      {
        id: 28,
        title: "聊天",
        rightKey: "/chat",
        pagepermission: 1,
        grade: 1,
        children: [],
        key: "/chat"
      }
    ]
  },
  NoticeListReducer: {
    noticelist: [
      {
        id: 173,
        message: {
          type: "submit",
          time: 1738559583611,
          send: "admin",
          recieve: "全球",
          content: "待审核:用户admin提交新闻《12》"
        }
      },
      {
        id: 172,
        message: {
          type: "pass",
          time: 1737353138069,
          send: "admin",
          recieve: "admin",
          content: "审核通过:用户admin提交的新闻《123》审核通过"
        }
      },
      {
        id: 171,
        message: {
          type: "submit",
          time: 1737352830481,
          send: "admin",
          recieve: "全球",
          content: "待审核:用户admin提交新闻《123》"
        }
      },
      {
        id: 170,
        message: {
          type: "delete",
          time: 1735146946299,
          send: "admin",
          recieve: "admin",
          content: "已删除:用户admin的新闻《Q》已删除"
        }
      },
      {
        id: 169,
        message: {
          type: "delete",
          time: 1735146937595,
          send: "admin",
          recieve: "admin",
          content: "已删除:用户admin的新闻《TTTT》已删除"
        }
      },
      {
        id: 168,
        message: {
          type: "delete",
          time: 1735146864256,
          send: "admin",
          recieve: "admin",
          content: "已删除:用户admin的新闻《RRRRR》已删除"
        }
      },
      {
        id: 167,
        message: {
          type: "submit",
          time: 1735118463132,
          send: "admin",
          recieve: "全球",
          content: "待审核:用户admin提交新闻《周冠宇》"
        }
      },
      {
        id: 166,
        message: {
          type: "sunset",
          time: 1735116914288,
          send: "admin",
          recieve: "admin",
          content: "已下线:用户admin的新闻《Q》已下线"
        }
      },
      {
        id: 165,
        message: {
          type: "sunset",
          time: 1735114660672,
          send: "admin",
          recieve: "admin",
          content: "已下线:用户admin的新闻《TTTT》已下线"
        }
      }
    ]
  }
});
const dataSource = [
  {
    id: 137,
    title: "研究发现维生素D可增强小鼠癌症免疫力",
    subheading: "维生素D",
    categoryId: 3,
    content: "",
    region: "全球",
    author: "admin",
    roleId: 1,
    auditState: 0,
    publishState: 0,
    star: 5,
    view: 2,
    createTime: "1715264194329",
    publishTime: "1715270751515"
  },
  {
    id: 163,
    title: "RE",
    subheading: "E",
    categoryId: 1,
    content: "",
    region: "全球",
    author: "admin",
    roleId: 1,
    auditState: 0,
    publishState: 0,
    star: 0,
    view: 0,
    createTime: "1732353624595",
    publishTime: "0"
  }
];
export { mockstore, dataSource };
