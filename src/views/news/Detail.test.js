import React from "react";
import Detail from "./Detail";
import userEvent from "@testing-library/user-event";
// import { render  } from '../../test/test-utils';

import { act, screen,render as myrender,within,waitFor } from "@testing-library/react";
// import { Provider } from "react-redux";
// import { store } from "../../../redux/store";
import { fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";


// import configureStore from 'redux-mock-store';
// import thunk from 'redux-thunk';

// const middlewares = [thunk];
// const mockStore = configureStore(middlewares);

describe('12344',()=>{
    test('123',async()=>{

        myrender(    
          <MemoryRouter>
            <Detail history={{param:{id:140}}}/>
          </MemoryRouter>)
        
        await waitFor(() => {
          const home =  screen.getByText(/创建者：admin/);   
          expect(home).toBeInTheDocument()
          
          const home1 =  screen.getByText(/热浪来袭/); 
          expect(home1).toBeInTheDocument()

        });

            // const noticeButton = screen.getByTestId('notice-button');   
            // expect(noticeButton).toBeInTheDocument()
            // await userEvent.click(noticeButton)
            // const noticeTitle =  screen.getByText('通知');   
            // const notification =  screen.getByText('待审核:用户admin提交新闻《12》');  
            // expect(noticeTitle).toBeInTheDocument()
            // expect(notification).toBeInTheDocument()
            // await userEvent.click(userManage)
            // const userList =  screen.getByText('用户列表');   
            // expect(userList).toBeInTheDocument()

            
    })
})