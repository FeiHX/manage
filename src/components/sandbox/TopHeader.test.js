import React from "react";
import TopHeader from "./TopHeader";
import userEvent from "@testing-library/user-event";
// import { render  } from '../../test/test-utils';

import { act, screen,render as myrender,within,waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
// import { store } from "../../../redux/store";
import { fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";


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
        CurrentUserReducer:{roleId:1,username:'admin',role:'超级管理员'},NoticeListReducer:{noticelist:[
          {
            id: 173,
            message: {
              type: 'submit',
              time: 1738559583611,
              send: 'admin',
              recieve: '全球',
              content: '待审核:用户admin提交新闻《12》'
            }
          },]}}

        let store = mockStore(mockState);
        
        myrender(                
            <Provider store={store}>
                <MemoryRouter>
                    <TopHeader />
                </MemoryRouter>
            </Provider>)


        
 
            const home =  screen.getByText(/欢 迎/); 
            await waitFor(() => {
              expect(home).toBeInTheDocument()
          });
            
            const noticeButton = screen.getByTestId('notice-button');   
            expect(noticeButton).toBeInTheDocument()
            await userEvent.click(noticeButton)
            const noticeTitle =  screen.getByText('通知');   
            const notification =  screen.getByText('待审核:用户admin提交新闻《12》');  
            expect(noticeTitle).toBeInTheDocument()
            expect(notification).toBeInTheDocument()
            // await userEvent.click(userManage)
            // const userList =  screen.getByText('用户列表');   
            // expect(userList).toBeInTheDocument()

            
    })
})