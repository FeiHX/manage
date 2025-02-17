import React from "react";
import AuditList from "./AuditList";
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
        ]},CurrentUserReducer:{username:'admin'}});
    
        myrender(                
        <Provider store={store}>
            <MemoryRouter>
                <AuditList/>
            </MemoryRouter>
            
        </Provider>)
        const NewsAddTitle = await screen.findByText(/新闻标题/);   
        expect(NewsAddTitle).toBeInTheDocument()

        await waitFor(() => {
 
            const newsTitle = screen.getByText(/周冠宇/); 
            expect(newsTitle).toBeInTheDocument()
            const publish = screen.getByText(/发 布/);  
            // const reject = screen.getByText(/驳 回/);   
            expect(publish).toBeInTheDocument()
            // expect(reject).toBeInTheDocument()
            userEvent.click(publish);
          });
          await  waitFor(() => {   

            const message = screen.getByText(/您可以到【发布管理\/已发布】中查看您的新闻/);  
            expect(message).toBeInTheDocument()
        })

    })
})
