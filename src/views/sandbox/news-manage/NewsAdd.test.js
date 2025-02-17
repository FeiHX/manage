// import React from "react";
// import NewsAdd from "./NewsAdd";
// import userEvent from "@testing-library/user-event";
// // import { render  } from '../../test/test-utils';
// // import { render } from "../../../test/test-utils";
// import { act, screen,render ,within } from "@testing-library/react";
import { Provider } from "react-redux";
// import { store } from "../../../redux/store";
// import { fireEvent } from "@testing-library/react";
// import { BrowserRouter as Router } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';

// // import {mapStateToProps} from './NewsAdd'

// import { EditorState, ContentState } from 'draft-js';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// // describe('CategoriesReducer', () => {
// //     let store;
// //     let component;
// //     beforeEach(() => {
// //         store = mockStore({
// //           myState: 'sample text',
// //         });
// //         store.dispatch = jest.fn();
// //         component = ReactTestRenderer.create(
// //             <Provider store={store}>
// //                 <NewsAdd />
// //             </Provider>
// //         )
// //     })

// //   it('should dispatch the correct actions', () => {
// //     // const store = mockStore({categories: []});
// //     //     render(
// //     //         <Provider store={store}>
// //     //             <NewsAdd />
// //     //         </Provider>
// //     //     )
// //     // // return store.dispatch(CategoriesReducer()).then(() => {
// //     // //   const actions = store.getActions();
// //     // //   expect(actions[0].type).toEqual('change_categories');
// //     // //   expect(actions[1].type).toEqual('FETCH_PRODUCTS_SUCCESS');
// //     // // });
// //     expect(component.toJSON()).toMatchSnapshot();
// //   });
// // });














  

// describe('12344',()=>{
//     test('123',async()=>{
//         let store = mockStore({
//             categories: [
//                 {
//                     "id": 1,
//                     "title": "时事新闻",
//                     "value": "时事新闻"
//                 },
//                 {
//                     "id": 2,
//                     "title": "环球经济",
//                     "value": "环球经济"
//                 },
//                 {
//                     "id": 3,
//                     "title": "科学技术",
//                     "value": "科学技术"
//                 },
//                 {
//                     "id": 4,
//                     "title": "军事世界",
//                     "value": "军事世界"
//                 },
//                 {
//                     "id": 5,
//                     "title": "世界体育",
//                     "value": "世界体育"
//                 },
//                 {
//                     "id": 6,
//                     "title": "生活理财",
//                     "value": "生活理财"
//                 }
//             ],
//             region:'1',
//             username:'1',
//             roleId:'1',
//         });
//         // render(
//         //     <Provider store={store}>
//         //         <NewsAdd />
//         //     </Provider>
//         // )
//         // const mockProps = {
//            const categories = {categories:[
//             {
//                 "id": 1,
//                 "title": "时事新闻",
//                 "value": "时事新闻"
//             },
//             {
//                 "id": 2,
//                 "title": "环球经济",
//                 "value": "环球经济"
//             },
//             {
//                 "id": 3,
//                 "title": "科学技术",
//                 "value": "科学技术"
//             },
//             {
//                 "id": 4,
//                 "title": "军事世界",
//                 "value": "军事世界"
//             },
//             {
//                 "id": 5,
//                 "title": "世界体育",
//                 "value": "世界体育"
//             },
//             {
//                 "id": 6,
//                 "title": "生活理财",
//                 "value": "生活理财"
//             }
//         ]}
//             // increment: jest.fn(),
//             // decrement: jest.fn(),
//         //   };
//         // let props = mapStateToProps(categories)
//         render(
//             <Provider store={store}>
//                 <MemoryRouter>
//                     <NewsAdd />
//                 </MemoryRouter>
                
//             </Provider>
//             // <NewsAdd />
//         )
//         const NewsAddTitle = await screen.findByText('撰写新闻');   
//         expect(NewsAddTitle).toBeInTheDocument()

//         const nextText = await screen.findByText('下一步');   
//         userEvent.click(nextText);
//         const titleError = await screen.findByText('Please input your title!')
//         const subheadingError = await screen.findByText('Please input your subheading!')
//         const categoryError = await screen.findByText('Please input your category!')
//         expect(titleError).toBeInTheDocument()
//         expect(subheadingError).toBeInTheDocument()
//         expect(categoryError).toBeInTheDocument()

//         const NewsTitleInput = await screen.getByPlaceholderText('title');
//         await userEvent.type(NewsTitleInput, 'NewsTitle')
//         expect(NewsTitleInput.value).toBe('NewsTitle');

//         const SubheadingInput = await screen.getByPlaceholderText('subheading');
//         await userEvent.type(SubheadingInput, 'Subheading')
//         expect(SubheadingInput.value).toBe('Subheading');

//         // const categoriesSelect = await screen.getByText('categories');
//         // expect(categoriesSelect).toBeInTheDocument()
//         // userEvent.click(categoriesSelect);

//         const select = screen.getByRole('combobox');
//         // select.click();   
//         expect(select).toBeInTheDocument()
//         fireEvent.mouseDown(select); 
//         // userEvent.click(select);

//         const categoryItem = await screen.getByText('时事新闻')
//         userEvent.click(categoryItem);
//         expect(categoryItem).toBeInTheDocument()

//         // userEvent.click(categoryItem);
//         const nextStep = await screen.findByText('下一步')   
//         userEvent.click(nextStep);
//         const nextStep2 = await screen.findByText('上一步')   
//         // userEvent.click(nextStep2);
//         expect(nextStep2).toBeInTheDocument()

//         const nextStep1 = await screen.findByText('下一步')   
//         userEvent.click(nextStep1);
//         const emptyError = await screen.findByText('新闻内容不能为空')     
//         expect(emptyError).toBeInTheDocument()

//         const nextStep3 = await screen.findByText('Normal')   
//         // userEvent.click(nextStep2);
//         expect(nextStep3).toBeInTheDocument()


//         const textboxs = screen.getAllByRole('textbox');
//         expect(textboxs).toHaveLength(3);
//         // expect(editor).toBeInTheDocument();

//         const draftContainer = await screen.getByPlaceholderText('react-draft-wysiwyg');
//         expect(draftContainer).toBeInTheDocument();   

//         const Draft = within(draftContainer).getByRole('textbox');
//         expect(Draft).toBeInTheDocument();

//         const newContent = ContentState.createFromText('Hello,world!');
//         const newEditorState = EditorState.createWithContent(newContent);    



//         // fireEvent.change(Draft, { target: { value: newEditorState } } )
//         // userEvent.type(Draft, 'Hello,world!');
//         // const editorProps = Draft.closest('.rdw-editor-wrapper').querySelector('.rdw-editor-main').__reactProps$;
//         // editorProps.onChange(newEditorState);

//         // const newsContent = await screen.getByText('Hello,world!')   
//         // // userEvent.click(nextStep2);
//         // expect(newsContent).toBeInTheDocument()

// //尝试
//  // 获取编辑器组件
//  const editor = within(draftContainer).getByRole('textbox');

//  // 确保 editor 是一个有效的 DOM 元素
//  expect(editor).toBeInTheDocument();

//  // 查找最近的 .rdw-editor-wrapper
//  const editorWrapper = editor.closest('.rdw-editor-wrapper');
//  expect(editorWrapper).toBeInTheDocument();

//  // 查找 .rdw-editor-main
//  const editorMain = editorWrapper.querySelector('.rdw-editor-main');
//  expect(editorMain).toBeInTheDocument();

// //  // 创建一个新的 EditorState
// //  const newContent1 = ContentState.createFromText('Hello, world!');
// //  const newEditorState1 = EditorState.createWithContent(newContent1);

// //  // 手动触发 onChange 回调
//  const editorProps = editorMain.__reactProps$; // 不推荐使用
//  expect(editorProps).toBeInTheDocument();
// //  console.log('xx属性:',editorProps)
// //  editorProps.onChange(newEditorState1);
// //尝试


  

//         // const usernameInput = await screen.getByPlaceholderText('Username');
//         // await userEvent.type(usernameInput, 'admin')
//         // expect(usernameInput.value).toBe('admin');
//         // const passwordInput = await screen.getByPlaceholderText('Password');
//         // await userEvent.type(passwordInput, 'adminpassword')
//         // expect(passwordInput.value).toBe('adminpassword');
//     })
// })




















































import React from 'react';
import { render, screen, fireEvent,within } from '@testing-library/react';
import NewsAdd from './NewsAdd';
import { EditorState, ContentState, convertToRaw } from 'draft-js';

test('模拟用户输入文本', async () => {
  // 渲染组件
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
  render(
                <Provider store={store}>
                <MemoryRouter>
                    <NewsAdd />
                </MemoryRouter>
                
            </Provider>
//   <NewsAdd />
  );

  // 获取编辑器 DOM 元素
    const draftContainer = await screen.getByPlaceholderText('react-draft-wysiwyg');
    expect(draftContainer).toBeInTheDocument();   

    const editor = within(draftContainer).getByRole('textbox');
    expect(editor).toBeInTheDocument();
    // const editor = screen.getByRole('textbox');
      // 直接输入文本（需 Draft.js 支持 DOM 事件）
    fireEvent.change(editor, { target: { textContent: 'Hello World' } });
    
    expect(editor.textContent).toBe('Hello World');
});