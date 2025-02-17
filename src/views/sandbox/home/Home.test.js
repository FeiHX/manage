import React from "react";
import Home from "./Home";
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
        ]},CurrentUserReducer:{region:'全球',username:'admin',role:'超级管理员'},});
    
        myrender(                
        <Provider store={store}>
            <MemoryRouter>
                <Home />
            </MemoryRouter>
            
        </Provider>)
        const moreVisitorTitle = await screen.findByText(/用户最常浏览/);   
        expect(moreVisitorTitle).toBeInTheDocument()

        const moreStarTitle = await screen.findByText(/用户点赞最多/);   
        expect(moreStarTitle).toBeInTheDocument()
        await waitFor(() => {
            const newsTitle = screen.getAllByText(/离岸人民币：与港股一起共舞/)[0];   
            expect(newsTitle).toBeInTheDocument()

          });


    })
})
