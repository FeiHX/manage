import React from "react";
import NewsAdd from "./NewsAdd";
import userEvent from "@testing-library/user-event";
// import { render  } from '../../test/test-utils';
import { render } from "../../../test/test-utils";
import { act, screen,render as myrender,within,waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
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
        ]},CurrentUserReducer:{region:'1',username:'1',roleId:'1'}});
    
        myrender(                <Provider store={store}>
            <MemoryRouter>
                <NewsAdd />
            </MemoryRouter>
            
        </Provider>)
        const NewsAddTitle = await screen.findByText('撰写新闻');   
        expect(NewsAddTitle).toBeInTheDocument()

        const nextText = await screen.findByText('下一步');   
        userEvent.click(nextText);
        const titleError = await screen.findByText('Please input your title!')
        const subheadingError = await screen.findByText('Please input your subheading!')
        const categoryError = await screen.findByText('Please input your category!')
        expect(titleError).toBeInTheDocument()
        expect(subheadingError).toBeInTheDocument()
        expect(categoryError).toBeInTheDocument()

        const NewsTitleInput = await screen.getByPlaceholderText('title');
        await userEvent.type(NewsTitleInput, 'NewsTitle')
        expect(NewsTitleInput.value).toBe('NewsTitle');

        const SubheadingInput = await screen.getByPlaceholderText('subheading');
        await userEvent.type(SubheadingInput, 'Subheading')
        expect(SubheadingInput.value).toBe('Subheading');

        // const categoriesSelect = await screen.getByText('categories');
        // expect(categoriesSelect).toBeInTheDocument()
        // userEvent.click(categoriesSelect);

        const select = screen.getByRole('combobox');
        // select.click();   
        expect(select).toBeInTheDocument()
        fireEvent.mouseDown(select); 
        // userEvent.click(select);

        const categoryItem = await screen.getByText('时事新闻')
        userEvent.click(categoryItem);
        expect(categoryItem).toBeInTheDocument()

        // userEvent.click(categoryItem);
        const nextStep = await screen.findByText('下一步')   
        userEvent.click(nextStep);
        // const emptyError = await screen.findByText('新闻内容不能为空1')     
        // expect(emptyError).toBeInTheDocument()
  
        // const usernameInput = await screen.getByPlaceholderText('Username');
        // await userEvent.type(usernameInput, 'admin')
        // expect(usernameInput.value).toBe('admin');
        // const passwordInput = await screen.getByPlaceholderText('Password');
        // await userEvent.type(passwordInput, 'adminpassword')
        // expect(passwordInput.value).toBe('adminpassword');




        const draftContainer = await screen.getByPlaceholderText('react-draft-wysiwyg');
        expect(draftContainer).toBeInTheDocument();   
    
        const editor = within(draftContainer).getByRole('textbox');
        expect(editor).toBeInTheDocument();
        // const editor = screen.getByRole('textbox');
          // 直接输入文本（需 Draft.js 支持 DOM 事件）
        fireEvent.change(editor, { target: { textContent: 'Hello World' } });
        expect(editor.textContent).toBe('Hello World');

        
        const newsContent = await screen.getByText('Hello World')
        expect(newsContent).toBeInTheDocument()

        
        const saveOrNextOrPre = screen.getByPlaceholderText('saveOrNextOrPre');
        expect(saveOrNextOrPre).toBeInTheDocument(); 
        const nextText2 =  within(saveOrNextOrPre).getByPlaceholderText('nextStep');  

        expect(nextText2).toBeInTheDocument() 
        userEvent.click(nextText2); 
         
        // const draftContainer1 = await screen.getByPlaceholderText('react-draft-wysiwyg');
        // expect(draftContainer1).toBeInTheDocument();  
  
    
       
        // saveOrNextOrPre
        await waitFor(() => {
            



            const preStep = within(saveOrNextOrPre).getByPlaceholderText('preStep');
            expect(preStep).toBeInTheDocument() 
            // userEvent.click(preStep); 
            // const preText2 =  screen.getByPlaceholderText('preStep');  
        
            // expect(preText2).toBeInTheDocument()
            // const saveOrSend = within(saveOrNextOrPre).getByPlaceholderText('saveDraft')
            // expect(saveOrSend).toBeInTheDocument()
      
      
          });

  

        // await waitFor(() => {
 
        //     const saveOrSend = screen.getByPlaceholderText('saveDraft')
        //     expect(saveOrSend).toBeInTheDocument()
      
        //   });

    })
},15000)



// components/Counter.test.js
// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import Counter from './Counter';
// import counterReducer from '../reducers/counter';

// const renderWithRedux = (component, { initialState, store = createStore(counterReducer, initialState) } = {}) => {
//   return {
//     ...render(<Provider store={store}>{component}</Provider>),
//     store,
//   };
// };

// test('renders with initial state', () => {
//   renderWithRedux(<Counter />, { initialState: { count: 0 } });

//   expect(screen.getByText('Count: 0')).toBeInTheDocument();
// });

// test('dispatches INCREMENT action', () => {
//   const { store } = renderWithRedux(<Counter />, { initialState: { count: 0 } });

//   fireEvent.click(screen.getByText('Increment'));

//   expect(store.getState()).toEqual({ count: 1 });
// });

// test('dispatches DECREMENT action', () => {
//   const { store } = renderWithRedux(<Counter />, { initialState: { count: 0 } });

//   fireEvent.click(screen.getByText('Decrement'));

//   expect(store.getState()).toEqual({ count: -1 });
// });


