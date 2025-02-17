import React from "react";
import News from "./News";
import userEvent from "@testing-library/user-event";
// import { render  } from '../../test/test-utils';

import { act, screen,render as myrender,within,waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
// import { store } from "../../../redux/store";
import { fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import withRoute from "../../components/sandbox/withRoute";

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from "axios";
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('12344',()=>{
    // test('fetches data with axios.all', async () => {
    //     const response = await axios.all([
    //       axios.get('/api/categories'),
    //       axios.get('/api/news/homepublish?publishState=2'),
    //     ]);
      
    //     // expect(response[0].data).toEqual({ name: 'Alice' });
    //     expect(response[1].data).toEqual([{ id: 1, title: 'Post 1' }]);
    //   });
    test('123',async()=>{
        await act(async () => {
            myrender(                

                <MemoryRouter>
                    <withRoute><News /></withRoute>
                    
                </MemoryRouter>
            )
          });
        

          const news =  screen.getByText(/新 闻/); 
          expect(news).toBeInTheDocument()
          const search =  screen.getByText(/请输入新闻关键词/); 
          expect(search).toBeInTheDocument()
          const select = screen.getByRole('combobox');
          // select.click();   
          expect(select).toBeInTheDocument()
          const backlogin =  screen.getByText(/登 录/); 
          expect(backlogin).toBeInTheDocument()
        //   userEvent.click(login);

            await waitFor(() => {
                // const category1 =  screen.getByText(/时事新闻/); 
                // expect(category1).toBeInTheDocument()
                // const newsTitle1 =  screen.getByText(/京津冀/); 
                // expect(newsTitle1).toBeInTheDocument()
                const category =  screen.getByText(/环球经济/); 
                expect(category).toBeInTheDocument()
                const newsTitle =  screen.getByText(/离岸人民币/); 
                expect(newsTitle).toBeInTheDocument()
                // fireEvent.mouseDown(select); 
                userEvent.type(select, '京津冀');
                const newsTitleSearch =  screen.getByText(/Main:京津冀/); 
                expect(newsTitleSearch).toBeInTheDocument()
                const newsSubHeading =  screen.getByText(/Sub:2024年北京市/); 
                expect(newsSubHeading).toBeInTheDocument()
                // userEvent.click(newsTitle2);
                // const newsContent =  screen.getByText(/新华社/); 
                // expect(newsContent).toBeInTheDocument()
          });

            
    })
})