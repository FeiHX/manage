export const data =
[
    {"type":"table","name":"categories","database":"reactlogin","data":
    [
    {"id":"1","title":"时事新闻","value":"时事新闻"},
    {"id":"2","title":"环球经济","value":"环球经济"},
    {"id":"3","title":"科学技术","value":"科学技术"},
    {"id":"4","title":"军事世界","value":"军事世界"},
    {"id":"5","title":"世界体育","value":"世界体育"},
    {"id":"6","title":"生活理财","value":"生活理财"}
    ]
    }
    ,{"type":"table","name":"rightsmenu","database":"reactlogin","data":
    [
    {"id":"1","title":"首页","rightKey":"\/home","pagepermission":"1","grade":"1"},
    {"id":"2","title":"用户管理","rightKey":"\/user-manage","pagepermission":"1","grade":"1"},
    {"id":"7","title":"权限管理","rightKey":"\/right-manage","pagepermission":"2","grade":"1"},
    {"id":"14","title":"新闻管理","rightKey":"\/news-manage","pagepermission":"1","grade":"1"},
    {"id":"21","title":"审核管理","rightKey":"\/audit-manage","pagepermission":"1","grade":"1"},
    {"id":"24","title":"发布管理","rightKey":"\/publish-manage","pagepermission":"1","grade":"1"},
    {"id":"28","title":"聊天","rightKey":"\/chat","pagepermission":"1","grade":"1"}
    ]
    }
    ,{"type":"table","name":"rightsmenuchildren","database":"reactlogin","data":
    [
    {"id":"3","title":"添加用户","rightId":"2","rightKey":"\/user-manage\/add","grade":"2","pagepermission":"2"},
    {"id":"4","title":"删除用户","rightId":"2","rightKey":"\/user-manage\/delete","grade":"2","pagepermission":"2"},
    {"id":"5","title":"修改用户","rightId":"2","rightKey":"\/user-manage\/update","grade":"2","pagepermission":"2"},
    {"id":"6","title":"用户列表","rightId":"2","rightKey":"\/user-manage\/list","grade":"2","pagepermission":"1"},
    {"id":"8","title":"角色列表","rightId":"7","rightKey":"\/right-manage\/role\/list","grade":"2","pagepermission":"2"},
    {"id":"9","title":"权限列表","rightId":"7","rightKey":"\/right-manage\/right\/list","grade":"2","pagepermission":"2"},
    {"id":"10","title":"修改角色","rightId":"7","rightKey":"\/right-manage\/role\/update","grade":"2","pagepermission":"2"},
    {"id":"11","title":"删除角色","rightId":"7","rightKey":"\/right-manage\/role\/delete","grade":"2","pagepermission":"2"},
    {"id":"12","title":"修改权限","rightId":"7","rightKey":"\/right-manage\/right\/update","grade":"2","pagepermission":"2"},
    {"id":"13","title":"删除权限","rightId":"7","rightKey":"\/right-manage\/right\/delete","grade":"2","pagepermission":"2"},
    {"id":"15","title":"新闻列表","rightId":"14","rightKey":"\/news-manage\/list","grade":"2","pagepermission":"2"},
    {"id":"16","title":"撰写新闻","rightId":"14","rightKey":"\/news-manage\/add","grade":"2","pagepermission":"1"},
    {"id":"17","title":"新闻更新","rightId":"14","rightKey":"\/news-manage\/update\/:id","grade":"2","pagepermission":"2"},
    {"id":"18","title":"新闻预览","rightId":"14","rightKey":"\/news-manage\/preview\/:id","grade":"2","pagepermission":"2"},
    {"id":"19","title":"草稿箱","rightId":"14","rightKey":"\/news-manage\/draft","grade":"2","pagepermission":"1"},
    {"id":"20","title":"新闻分类","rightId":"14","rightKey":"\/news-manage\/category","grade":"2","pagepermission":"1"},
    {"id":"22","title":"审核新闻","rightId":"21","rightKey":"\/audit-manage\/audit","grade":"2","pagepermission":"1"},
    {"id":"23","title":"审核列表","rightId":"21","rightKey":"\/audit-manage\/list","grade":"2","pagepermission":"1"},
    {"id":"25","title":"待发布","rightId":"24","rightKey":"\/publish-manage\/unpublished","grade":"2","pagepermission":"1"},
    {"id":"26","title":"已发布","rightId":"24","rightKey":"\/publish-manage\/published","grade":"2","pagepermission":"1"},
    {"id":"27","title":"已下线","rightId":"24","rightKey":"\/publish-manage\/sunset","grade":"2","pagepermission":"1"}
    ]
    }
    ,{"type":"table","name":"rolesrightsmenu","database":"reactlogin","data":
    [
    {"id":"1","roleType":"1","roleName":"超级管理员","rights":"\/chat,\/right-manage\/role\/update,\/right-manage\/role\/delete,\/right-manage\/right\/update,\/right-manage\/right\/delete,\/audit-manage,\/audit-manage\/audit,\/audit-manage\/list,\/right-manage,\/right-manage\/role\/list,\/right-manage\/right\/list,\/news-manage\/list,\/news-manage\/update\/:id,\/news-manage\/preview\/:id,\/news-manage\/draft,\/news-manage\/category,\/news-manage,\/user-manage\/add,\/user-manage\/delete,\/user-manage\/update,\/user-manage\/list,\/user-manage,\/publish-manage\/unpublished,\/publish-manage\/published,\/publish-manage\/sunset,\/publish-manage,\/home,\/news-manage\/add"},
    {"id":"2","roleType":"2","roleName":"区域管理员","rights":"\/chat,\/audit-manage,\/audit-manage\/audit,\/audit-manage\/list,\/news-manage\/list,\/news-manage\/add,\/news-manage\/update\/:id,\/news-manage\/preview\/:id,\/news-manage\/draft,\/news-manage\/category,\/news-manage,\/user-manage\/list,\/user-manage,\/home,\/publish-manage\/unpublished,\/publish-manage\/published,\/publish-manage\/sunset,\/publish-manage"},
    {"id":"3","roleType":"3","roleName":"区域编辑","rights":"\/chat,\/audit-manage,\/audit-manage\/list,\/news-manage\/list,\/news-manage\/add,\/news-manage\/update\/:id,\/news-manage\/preview\/:id,\/news-manage\/draft,\/news-manage,\/home"}
    ]
    }
    ]




    
    