import React from "react";
import Audit from "./Audit";
import userEvent from "@testing-library/user-event";
// import { render  } from '../../test/test-utils';
// import { render } from "../../../test/test-utils";
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
        let store = mockStore({CategoriesReducer:{categories: [
            {
                "id": 1,
                "title": "时事新闻",
                "value": "时事新闻"
            },
            {
                "id": 2,
                "title": "环球经济",
                "value": "环球经济"
            },
            {
                "id": 3,
                "title": "科学技术",
                "value": "科学技术"
            },
            {
                "id": 4,
                "title": "军事世界",
                "value": "军事世界"
            },
            {
                "id": 5,
                "title": "世界体育",
                "value": "世界体育"
            },
            {
                "id": 6,
                "title": "生活理财",
                "value": "生活理财"
            }
        ]},CurrentUserReducer:{region:'全球',username:'admin',roleId:'超级管理员'}, RoleListReducer:{rolelist: [
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
            },]},});
    
        myrender(                
        <Provider store={store}>
            <MemoryRouter>
                <Audit />
            </MemoryRouter>
            
        </Provider>)
        const NewsAddTitle = await screen.findByText(/新闻标题/);   
        expect(NewsAddTitle).toBeInTheDocument()

        await waitFor(() => {
 
            const newsTitle = screen.getByText(/周冠宇/); 
            expect(newsTitle).toBeInTheDocument()
            const pass = screen.getByText(/通 过/);  
            const reject = screen.getByText(/驳 回/);   
            expect(pass).toBeInTheDocument()
            expect(reject).toBeInTheDocument()
            userEvent.click(pass);
          });
          await  waitFor(() => {   

            const message = screen.getAllByText(/您可以到【审核管理\/审核列表】中查看您的新闻的审核状态/)[0];  
            expect(message).toBeInTheDocument()
        })

    })
})
