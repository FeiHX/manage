import React from "react";
import Redirect from "./Redirect.js";
import { connect } from "react-redux";
import { Routes, Route } from "react-router-dom";
import NewsSandBox from "../views/sandbox/NewsSandBox.js";
import Login from "../views/login/Login.js";
import News from "../views/news/News.js";
import Detail from "../views/news/Detail.js";

const Home = React.lazy(() => import("../views/sandbox/home/Home.js"));
const RightList = React.lazy(() =>
  import("../views/sandbox/right-manage/RightList.js")
);
const RoleList = React.lazy(() =>
  import("../views/sandbox/right-manage/RoleList.js")
);
const UserList = React.lazy(() =>
  import("../views/sandbox/use-manage/UserList.js")
);
const NoPermission = React.lazy(() =>
  import("../views/sandbox/nopermission/NoPermission.js")
);
const NewsAdd = React.lazy(() =>
  import("../views/sandbox/news-manage/NewsAdd")
);
const NewsDraft = React.lazy(() =>
  import("../views/sandbox/news-manage/NewsDraft")
);
const NewsPreview = React.lazy(() =>
  import("../views/sandbox/news-manage/NewsPreview")
);
const NewsUpdate = React.lazy(() =>
  import("../views/sandbox/news-manage/NewsUpdate")
);
const NewsCategory = React.lazy(() =>
  import("../views/sandbox/news-manage/NewsCategory")
);
const Audit = React.lazy(() => import("../views/sandbox/audit-manage/Audit"));
const AuditList = React.lazy(() =>
  import("../views/sandbox/audit-manage/AuditList")
);
const Unpublish = React.lazy(() =>
  import("../views/sandbox/publish-manage/Unpublish")
);
const Sunset = React.lazy(() =>
  import("../views/sandbox/publish-manage/Sunset")
);
const Publish = React.lazy(() =>
  import("../views/sandbox/publish-manage/Publish")
);
const Chat = React.lazy(() => import("../views/sandbox/chat/Chat.js"));

const LocalRouterMap = {
  "/home": <Home />,
  "/user-manage/list": <UserList />,
  "/right-manage/role/list": <RoleList />,
  "/right-manage/right/list": <RightList />,
  "/news-manage/add": <NewsAdd />,
  "/news-manage/draft": <NewsDraft />,
  "/news-manage/category": <NewsCategory />,
  "/news-manage/preview/:id": <NewsPreview />,
  "/news-manage/update/:id": <NewsUpdate />,
  "/audit-manage/audit": <Audit />,
  "/audit-manage/list": <AuditList />,
  "/publish-manage/unpublished": <Unpublish />,
  "/publish-manage/published": <Publish />,
  "/publish-manage/sunset": <Sunset />,
  "/chat": <Chat />,

  "/": <Redirect to="/home" />,
  "*": <NoPermission />
};

function Indexrouter(props) {
  const routeList1 = [];
  for (let item of props.rolelist) {
    if (item.roleType == props.roleId) {
      for (let right of item.rights) {
        if (LocalRouterMap[right]) {
          routeList1.push({
            path: right,
            element: LocalRouterMap[right]
          });
        } else {
          routeList1.push({
            path: right,
            element: <NoPermission />
          });
        }
      }
    }
  }
  let routeList = [
    ...routeList1,
    {
      path: "/",
      element: <Redirect to="/home" />
    },
    {
      path: "/*",
      element: <NoPermission />
    }
  ];
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <Login description={["/api/users", "/otherlogin", "临时登录", ""]} />
        }
      />
      <Route
        path="/otherlogin"
        element={
          <Login
            description={[
              "/api/users/otherlogin",
              "/login",
              "返回登录",
              "此页面登录JWT失效时间为60秒"
            ]}
          />
        }
      />
      <Route path="/news" element={<News />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/*" element={<NewsSandBox />}>
        {routeList.map(item => {
          return (
            <Route
              path={item.path.slice(1)}
              element={
                <React.Suspense fallback={<>加载中...................</>}>
                  {item.element}
                </React.Suspense>
              }
            />
          );
        })}
      </Route>
    </Routes>
  );
}
const mapStateToProps = ({
  CurrentUserReducer: { roleId },
  RoleListReducer: { rolelist }
}) => {
  return {
    roleId,
    rolelist
  };
};

export default connect(mapStateToProps, null)(Indexrouter);
