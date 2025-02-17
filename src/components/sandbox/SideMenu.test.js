import React from "react";
import SideMenu from "./SideMenu";
import userEvent from "@testing-library/user-event";
// import { render  } from '../../test/test-utils';

import { act, screen,render as myrender,within,waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
// import { store } from "../../../redux/store";
import { fireEvent } from "@testing-library/react";
import { MemoryRouter,Router } from "react-router-dom";
import { createMemoryHistory } from 'history'

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('12344',()=>{
    test('123',async()=>{
        const mockState = { CollApsedReducer: { isCollapsed:false}, RoleListReducer:{rolelist: [
            {
              id: 1,
              roleType: 1,
              roleName: '超级管理员',
              rights: [
                '/chat',
                '/right-manage/role/update',
                '/right-manage/role/delete',
                '/right-manage/right/update',
                '/right-manage/right/delete',
                '/audit-manage',
                '/audit-manage/audit',
                '/audit-manage/list',
                '/right-manage',
                '/right-manage/role/list',
                '/right-manage/right/list',
                '/news-manage/list',
                '/news-manage/update/:id',
                '/news-manage/preview/:id',
                '/news-manage/draft',
                '/news-manage/category',
                '/news-manage',
                '/user-manage/add',
                '/user-manage/delete',
                '/user-manage/update',
                '/user-manage/list',
                '/user-manage',
                '/publish-manage/unpublished',
                '/publish-manage/published',
                '/publish-manage/sunset',
                '/publish-manage',
                '/home',
                '/news-manage/add'
              ]
            },]},
        CurrentUserReducer:{roleId:1},RightListReducer:{rightlist:[
            {
              id: 1,
              title: '首页',
              rightKey: '/home',
              pagepermission: 1,
              grade: 1,
              children: [],
              key: '/home'
            },
            {
              id: 2,
              title: '用户管理',
              rightKey: '/user-manage',
              pagepermission: 1,
              grade: 1,
              children: [
                {
                  id: 6,
                  title: '用户列表',
                  rightId: 2,
                  rightKey: '/user-manage/list',
                  grade: 2,
                  pagepermission: 1,
                  key: '/user-manage/list'
                }
              ],
              key: '/user-manage'
            },
            {
              id: 28,
              title: '聊天',
              rightKey: '/chat',
              pagepermission: 1,
              grade: 1,
              children: [],
              key: '/chat'
            }
          ]}}

        let store = mockStore(mockState);
        const history = createMemoryHistory()
        myrender(                
            <Provider store={store}>
                <MemoryRouter >
                    <SideMenu />
                </MemoryRouter>
            </Provider>)
 
            const home =  screen.getByText('首页');   
            expect(home).toBeInTheDocument()
            const userManage =  screen.getByText('用户管理');   
            expect(userManage).toBeInTheDocument()
            await userEvent.click(userManage)
            const userList =  screen.getByText('用户列表');   
            expect(userList).toBeInTheDocument()
            // await waitFor(() => {
            //     expect(history.location.pathname).toBe('/user-manage/list')
            // });

    })
})

















