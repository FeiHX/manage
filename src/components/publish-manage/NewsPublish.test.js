import React from "react";
import NewsPublish from "./NewsPublish";
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
        ]},CurrentUserReducer:{username:'admin'}});
        const dataSource = [
            {
                "id": 137,
                "title": "研究发现维生素D可增强小鼠癌症免疫力",
                "subheading": "维生素D",
                "categoryId": 3,
                "content": "",
                "region": "全球",
                "author": "admin",
                "roleId": 1,
                "auditState": 0,
                "publishState": 0,
                "star": 5,
                "view": 2,
                "createTime": "1715264194329",
                "publishTime": "1715270751515"
            },
            {
                "id": 163,
                "title": "RE",
                "subheading": "E",
                "categoryId": 1,
                "content": "",
                "region": "全球",
                "author": "admin",
                "roleId": 1,
                "auditState": 0,
                "publishState": 0,
                "star": 0,
                "view": 0,
                "createTime": "1732353624595",
                "publishTime": "0"
            }
        ]
        myrender(                <Provider store={store}>
            <MemoryRouter>
                <NewsPublish dataSource={dataSource} button={()=>{}}/>
            </MemoryRouter>
            
        </Provider>)


        await waitFor(() => {
 
            const NewsTitle =  screen.getByText('维生素D');   
            expect(NewsTitle).toBeInTheDocument()
      
          });

    })
})