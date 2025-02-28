import React from "react";
import NewsAdd from "../sandbox/news-manage/NewsAdd";
import userEvent from "@testing-library/user-event";
// import { render  } from '../../test/test-utils';
import {
  act,
  screen,
  render as myrender,
  within,
  waitFor
} from "@testing-library/react";
import { Provider } from "react-redux";
import { fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// import configureStore from "redux-mock-store";
// import thunk from "redux-thunk";

// const middlewares = [thunk];
// const mockStore = configureStore(middlewares);
import { mockstore } from "../../test/mockStore";

// jest.spyOn(React, 'useState')
//     .mockImplementationOnce(() => {
//       const [content, setContent] = React.useState('Hello World');
//       trackedContent = content;
//       return [content, (v) => { trackedContent = v; setContent(v) }];
//     });
// 模拟react-router-dom的useNavigate
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate // 直接返回模拟函数
}));
describe("12344",
  () => {
    test("123", async () => {
      // let store = mockStore({
      //   CategoriesReducer: {
      //     categories: [
      //       {
      //         id: 1,
      //         title: "时事新闻",
      //         value: "时事新闻"
      //       },
      //       {
      //         id: 2,
      //         title: "环球经济",
      //         value: "环球经济"
      //       },
      //       {
      //         id: 3,
      //         title: "科学技术",
      //         value: "科学技术"
      //       },
      //       {
      //         id: 4,
      //         title: "军事世界",
      //         value: "军事世界"
      //       },
      //       {
      //         id: 5,
      //         title: "世界体育",
      //         value: "世界体育"
      //       },
      //       {
      //         id: 6,
      //         title: "生活理财",
      //         value: "生活理财"
      //       }
      //     ]
      //   },
      //   CurrentUserReducer: { region: "1", username: "1", roleId: "1" }
      // });

      myrender(
        <Provider store={mockstore}>
          <MemoryRouter>
            <NewsAdd />
          </MemoryRouter>
        </Provider>
      );

      // // const next = await screen.findByText('下一步');
      // // expect(next).toBeInTheDocument();
      // // const draftContainer1 = screen.getByPlaceholderText(
      // //   "react-draft-wysiwyg"
      // // );
      // // expect(draftContainer1).toBeInTheDocument();
      const NewsAddTitle = await screen.findByText("撰写新闻");
      expect(NewsAddTitle).toBeInTheDocument();
      // const newsContent0 =  screen.getByText(/current::0/);
      // expect(newsContent0).toBeInTheDocument();
      // // const nextText4 = await screen.findByText('下一步');   
      // // userEvent.click(nextText4);
      // const nextText = await screen.getByPlaceholderText("nextStep");
      // expect(nextText).toBeInTheDocument();
      // // const nextText = await screen.getByPlaceholderText("nextStep");
      // await userEvent.click(nextText);
      // // userEvent.click(next);
      // // await waitFor(() => {
       
        


      // //   });
      // // await waitFor(() => {

        


      // //   });
      
      // const titleError = await screen.findByText("Please input your title!");
      // const subheadingError = await screen.findByText(
      //   "Please input your subheading!"
      // );
      // const categoryError = await screen.findByText(
      //   "Please input your category!"
      // );
      // expect(titleError).toBeInTheDocument();
      // expect(subheadingError).toBeInTheDocument();
      // expect(categoryError).toBeInTheDocument();
      // const NewsTitleInput = await screen.getByPlaceholderText("title");
      // await userEvent.type(NewsTitleInput, "NewsTitle");
      // expect(NewsTitleInput.value).toBe("NewsTitle");
      // // await waitFor(() => {

        


      // //   });
      // const SubheadingInput = await screen.getByPlaceholderText("subheading");
      // await userEvent.type(SubheadingInput, "Subheading");
      // expect(SubheadingInput.value).toBe("Subheading");

      // // const categoriesSelect = await screen.getByText('categories');
      // // expect(categoriesSelect).toBeInTheDocument()
      // // userEvent.click(categoriesSelect);

      // const select = screen.getByRole("combobox");
      // // select.click();
      // expect(select).toBeInTheDocument();
      // fireEvent.mouseDown(select);
      // // userEvent.click(select);

      // const categoryItem = await screen.getByText("时事新闻");
      // userEvent.click(categoryItem);
      // expect(categoryItem).toBeInTheDocument();

      // // const draftContainer1 = await screen.getByPlaceholderText(
      // //   "react-draft-wysiwyg"
      // // );
      // // expect(draftContainer1).toBeInTheDocument();


      // // userEvent.click(categoryItem);
      // // const nextStep = await screen.findByText("下一步");
      // // const nextStep = await screen.getByPlaceholderText('nextStep')
      // await userEvent.click(nextText);
      // // const emptyError = await screen.findByText('新闻内容不能为空1')
      // // expect(emptyError).toBeInTheDocument()

      // // const usernameInput = await screen.getByPlaceholderText('Username');
      // // await userEvent.type(usernameInput, 'admin')
      // // expect(usernameInput.value).toBe('admin');
      // // const passwordInput = await screen.getByPlaceholderText('Password');
      // // await userEvent.type(passwordInput, 'adminpassword')
      // // expect(passwordInput.value).toBe('adminpassword');
      // await waitFor(async() => {
      //   const newsContent1 = await screen.findByText(/current::1/);
      //   expect(newsContent1).toBeInTheDocument();


      //   const draftContainer = screen.getByPlaceholderText(
      //     "react-draft-wysiwyg"
      //   );
      //   expect(draftContainer).toBeInTheDocument();

      //   const editor = within(draftContainer).getByRole("textbox");
      //   expect(editor).toBeInTheDocument();
      //   // const editor = screen.getByRole('textbox');
      //   // 直接输入文本（需 Draft.js 支持 DOM 事件）
      //   fireEvent.change(editor, { target: { textContent: "Hello World" } });
      //   expect(editor.textContent).toBe("Hello World");



      // // await waitFor(() => {
      

      //   const newsContent =  screen.getByText("Hello World");
      //   expect(newsContent).toBeInTheDocument();

      //   const nextText2 = await screen.getByPlaceholderText('jia')
      //   expect(nextText2).toBeInTheDocument();
      //   const nextText7 = await screen.getByPlaceholderText("nextStep");
      //   expect(nextText7).toBeInTheDocument();
  

      //   // const nextText = await screen.getByPlaceholderText("nextStep");
      //   await fireEvent.click(nextText7);
      //   await act(() => Promise.resolve());

      // })


      //   // const nextText = await screen.getByPlaceholderText("nextStep");
      //   // userEvent.click(nextText7);
      //   // userEvent.click(nextText7);
      //   // userEvent.click(nextText);
      //   // userEvent.click(nextText2);
      //   // });

      //   // const nextText8 = screen.getByText("下一步");
      //   // expect(nextText8).toBeInTheDocument();
      //   // fireEvent.click(nextText8);
      // await waitFor(async () => {
        


      //   const newsContent2 = await screen.findByText(/current::2/);
      //   expect(newsContent2).toBeInTheDocument();
      //   const saveOrSend = await screen.getByPlaceholderText('saveDraft')
      //   expect(saveOrSend).toBeInTheDocument()
        


      //   },{ timeout: 5000 });







      // // userEvent.click(nextStep);


      // // const saveOrNextOrPre = screen.getByPlaceholderText("saveOrNextOrPre");
      // // expect(saveOrNextOrPre).toBeInTheDocument();
      // // const nextText2 = within(saveOrNextOrPre).getByPlaceholderText(
      // //   "nextStep"
      // // );
      // // const nextText2 =await screen.findByText(/下一步/)
      // // expect(nextText2).toBeInTheDocument();

      // // const draftContainer1 = await screen.getByPlaceholderText('react-draft-wysiwyg');
      // // expect(draftContainer1).toBeInTheDocument();

      // // saveOrNextOrPre
      // // await waitFor(() => {
      // //   const preStep = within(saveOrNextOrPre).getByPlaceholderText("preStep");
      // //   expect(preStep).toBeInTheDocument();
      // //   // userEvent.click(preStep);
      // //   // const preText2 =  screen.getByPlaceholderText('preStep');

      // //   // expect(preText2).toBeInTheDocument()
      // //   // const saveOrSend = within(saveOrNextOrPre).getByPlaceholderText('saveDraft')
      // //   // expect(saveOrSend).toBeInTheDocument()
      // // });
      // // userEvent.click(nextText2);
      // // const saveOrSend = await screen.getByText(/保存草稿箱/)
      // // expect(saveOrSend).toBeInTheDocument()
      // // await waitFor(() => {

        


      // //   });






















     

      // const editorContainer = await screen.findByTestId('draft-editor-container');
      // expect(editorContainer).toBeInTheDocument();
      // const editor = within(editorContainer).getByRole('textbox');
      // await userEvent.click(editor);
      // await userEvent.type(editor, '测试内容');
      
      // expect(editor).toHaveTextContent('测试内容');
// 第一步：验证初始状态
await waitFor(async () => {
  expect(await screen.findByText(/current::0/)).toBeInTheDocument();
});

// 第二步：填写表单并提交
// 重新获取按钮引用
const firstNextButton = await screen.getByPlaceholderText("nextStep");
expect(firstNextButton).toBeInTheDocument();
await userEvent.click(firstNextButton);
      //   const nextText2 = await screen.getByPlaceholderText('jia')
      //   expect(nextText2).toBeInTheDocument();
      //  await userEvent.click(nextText2);

// 第三步：验证表单错误提示
await waitFor(async () => {
  expect(await screen.findByText("Please input your title!")).toBeInTheDocument();
});

// 第四步：输入标题和副标题
const titleInput = await screen.findByPlaceholderText("title");
await userEvent.type(titleInput, "NewsTitle");

const subheadingInput = await screen.findByPlaceholderText("subheading");
await userEvent.type(subheadingInput, "Subheading");

// 第五步：选择分类
const categorySelect = await screen.findByRole("combobox");
fireEvent.mouseDown(categorySelect);
const categoryItem = await screen.findByText("时事新闻");
await userEvent.click(categoryItem);

// 第六步：进入内容编辑步骤（关键修改）
const secondNextButton = await screen.findByPlaceholderText("nextStep"); // 重新获取按钮
expect(secondNextButton).toBeInTheDocument();
await userEvent.click(secondNextButton);
await waitFor(async () => {
  expect(await screen.findByText(/current::1/)).toBeInTheDocument();
}, { timeout: 8000 });

// 第七步：处理富文本输入（正确方式）
await waitFor(async () => {
  // const editor = await screen.findByRole("textbox");
  // await userEvent.type(editor, "Hello World{enter}"); // 使用实际输入事件
  // expect(await screen.findByText("Hello World")).toBeInTheDocument();

  // const editorContainer = await screen.findByTestId('react-draft-wysiwyg', {}, { timeout: 3000 });
  // expect(editorContainer).toBeInTheDocument();
      const draftContainer = await screen.findByPlaceholderText(
        "react-draft-wysiwyg"
      );
      expect(draftContainer).toBeInTheDocument();

      const editor = within(draftContainer).getByRole("textbox");
      expect(editor).toBeInTheDocument();
      // const editor = screen.getByRole('textbox');
      // 直接输入文本（需 Draft.js 支持 DOM 事件）
      // await userEvent.click(editor);
      // await userEvent.type(editor,  "Hello World" );
      await fireEvent.change(editor, { target: { textContent: "Hello World" } });
      expect(editor.textContent).toBe("Hello World");
      // expect(await screen.findByText(/请输入新闻内容！！！/)).toBeInTheDocument();
      // expect(await screen.findByText(/注意!新闻内容为初始！！请输入新闻内容！！！/)).toBeInTheDocument();
      // await fireEvent.blur(editor);

}, { timeout: 5000 });





// await waitFor(async () => {
//   // 1. 获取编辑器容器
//   const editorContainer =  await screen.findByPlaceholderText('react-draft-wysiwyg');
 
//     //         "react-draft-wysiwyg"
//     //       );
//   // 2. 定位可编辑区域
//   const editableDiv = within(editorContainer).getByRole('textbox');
  
//   // 3. 模拟真实输入流程
//   await userEvent.click(editableDiv);  // 确保获取焦点
//   await userEvent.type(editableDiv, 'Hello World');

//   // 4. 使用 Draft.js 专用验证方式
//   await waitFor(() => {
//     // 查找 Draft.js 生成的文本节点
//     const contentBlock = within(editorContainer).getByText('Hello World');
//     expect(contentBlock).toBeInTheDocument();
//   }, { timeout: 5000 });
// }, { timeout: 8000 });













// 第八步：进入提交步骤
const finalNextButton = await screen.findByPlaceholderText("nextStep"); // 再次获取新按钮
expect(finalNextButton).toBeInTheDocument();
await userEvent.click(finalNextButton);
      //   const nextText3 = await screen.getByPlaceholderText('jia')
      //   expect(nextText3).toBeInTheDocument();
      //  await userEvent.click(nextText3);
// 最终验证（必须使用findBy*）
await waitFor(async () => {
  // expect(await screen.findByText(/新闻内容不能为空/)).toBeInTheDocument();
  expect(await screen.findByText(/current::2/)).toBeInTheDocument();
  expect(await screen.findByPlaceholderText("saveDraft")).toBeInTheDocument();
  await userEvent.click(await screen.findByPlaceholderText("saveDraft"));
}, { timeout: 8000 });

await waitFor(async () => {
  // expect(await screen.findByText(/新闻内容不能为空/)).toBeInTheDocument();
  expect(await screen.findByText(/您可以到草稿箱中查看您的新闻/)).toBeInTheDocument();
  expect(mockedNavigate).toHaveBeenCalledWith("/news-manage/draft");
}, { timeout: 8000 });
  },65000);
}
);





































// import React from "react";
// import NewsAdd from "../sandbox/news-manage/NewsAdd";
// import userEvent from "@testing-library/user-event";
// // import { render  } from '../../test/test-utils';
// import {
//   act,
//   screen,
//   render as myrender,
//   within,
//   waitFor
// } from "@testing-library/react";
// import { Provider } from "react-redux";
// import { fireEvent } from "@testing-library/react";
// import { MemoryRouter } from "react-router-dom";

// import configureStore from "redux-mock-store";
// import thunk from "redux-thunk";

// const middlewares = [thunk];
// const mockStore = configureStore(middlewares);

// describe("12344",
//   () => {
//     test("123", async () => {
//       let store = mockStore({
//         CategoriesReducer: {
//           categories: [
//             {
//               id: 1,
//               title: "时事新闻",
//               value: "时事新闻"
//             },
//             {
//               id: 2,
//               title: "环球经济",
//               value: "环球经济"
//             },
//             {
//               id: 3,
//               title: "科学技术",
//               value: "科学技术"
//             },
//             {
//               id: 4,
//               title: "军事世界",
//               value: "军事世界"
//             },
//             {
//               id: 5,
//               title: "世界体育",
//               value: "世界体育"
//             },
//             {
//               id: 6,
//               title: "生活理财",
//               value: "生活理财"
//             }
//           ]
//         },
//         CurrentUserReducer: { region: "1", username: "1", roleId: "1" }
//       });

//       const { debug,container } =  myrender(
//         <Provider store={store}>
//           <MemoryRouter>
//             <NewsAdd />
//           </MemoryRouter>
//         </Provider>
//       );
//       // const NewsAddTitle = await screen.findByText("撰写新闻");
//       // expect(NewsAddTitle).toBeInTheDocument();
//       const nextText = await screen.getByPlaceholderText("nextStep");
//       expect(nextText).toBeInTheDocument();
//         const jia = screen.getByPlaceholderText("jia");
//         expect(jia).toBeInTheDocument();
//         userEvent.click(jia);
//          const nextText2 = await screen.findByText(/current::1/)
//         expect(nextText2).toBeInTheDocument();
//         userEvent.click(jia);
//         const nextText3 = await screen.findByText(/current::2/)
//         expect(nextText3).toBeInTheDocument();
//           // 初始状态打印（带注释）

//   //  await waitFor(() => {
//   //       userEvent.click(nextText2);
//   //       screen.debug(container, { maxDepth: 100 })
//   //       // const nextText3 =  screen.findByText(/下一步/)
//   //       // expect(nextText3).toBeInTheDocument();
//   //       });

//     },15000);
//   }
// );



































// import React from "react";
// import NewsAdd from "../sandbox/news-manage/NewsAdd";
// import userEvent from "@testing-library/user-event";
// // import { render  } from '../../test/test-utils';
// import {
//   act,
//   screen,
//   render as myrender,
//   within,
//   waitFor
// } from "@testing-library/react";
// import { Provider } from "react-redux";
// import { fireEvent } from "@testing-library/react";
// import { MemoryRouter } from "react-router-dom";

// import configureStore from "redux-mock-store";
// import thunk from "redux-thunk";

// const middlewares = [thunk];
// const mockStore = configureStore(middlewares);

// describe("12344",
//   () => {
//     test("123", async () => {
//       let store = mockStore({
//         CategoriesReducer: {
//           categories: [
//             {
//               id: 1,
//               title: "时事新闻",
//               value: "时事新闻"
//             },
//             {
//               id: 2,
//               title: "环球经济",
//               value: "环球经济"
//             },
//             {
//               id: 3,
//               title: "科学技术",
//               value: "科学技术"
//             },
//             {
//               id: 4,
//               title: "军事世界",
//               value: "军事世界"
//             },
//             {
//               id: 5,
//               title: "世界体育",
//               value: "世界体育"
//             },
//             {
//               id: 6,
//               title: "生活理财",
//               value: "生活理财"
//             }
//           ]
//         },
//         CurrentUserReducer: { region: "1", username: "1", roleId: "1" }
//       });

//       myrender(
//         <Provider store={store}>
//           <MemoryRouter>
//             <NewsAdd />
//           </MemoryRouter>
//         </Provider>
//       );

//       // const next = await screen.findByText('下一步');
//       // expect(next).toBeInTheDocument();
//       // const draftContainer1 = screen.getByPlaceholderText(
//       //   "react-draft-wysiwyg"
//       // );
//       // expect(draftContainer1).toBeInTheDocument();
//       const NewsAddTitle = await screen.findByText("撰写新闻");
//       expect(NewsAddTitle).toBeInTheDocument();
//       const newsContent0 =  screen.getByText(/current::0/);
//       expect(newsContent0).toBeInTheDocument();
//       // const nextText4 = await screen.findByText('下一步');   
//       // userEvent.click(nextText4);
//       const nextText = await screen.getByPlaceholderText("nextStep");
//       expect(nextText).toBeInTheDocument();
//       // const nextText = await screen.getByPlaceholderText("nextStep");
//       userEvent.click(nextText);
//       // userEvent.click(next);
//       const titleError = await screen.findByText("Please input your title!");
//       const subheadingError = await screen.findByText(
//         "Please input your subheading!"
//       );
//       const categoryError = await screen.findByText(
//         "Please input your category!"
//       );
//       expect(titleError).toBeInTheDocument();
//       expect(subheadingError).toBeInTheDocument();
//       expect(categoryError).toBeInTheDocument();

//       const NewsTitleInput = await screen.getByPlaceholderText("title");
//       await userEvent.type(NewsTitleInput, "NewsTitle");
//       expect(NewsTitleInput.value).toBe("NewsTitle");

//       const SubheadingInput = await screen.getByPlaceholderText("subheading");
//       await userEvent.type(SubheadingInput, "Subheading");
//       expect(SubheadingInput.value).toBe("Subheading");

//       // const categoriesSelect = await screen.getByText('categories');
//       // expect(categoriesSelect).toBeInTheDocument()
//       // userEvent.click(categoriesSelect);

//       const select = screen.getByRole("combobox");
//       // select.click();
//       expect(select).toBeInTheDocument();
//       fireEvent.mouseDown(select);
//       // userEvent.click(select);

//       const categoryItem = await screen.getByText("时事新闻");
//       userEvent.click(categoryItem);
//       expect(categoryItem).toBeInTheDocument();

//       // const draftContainer1 = await screen.getByPlaceholderText(
//       //   "react-draft-wysiwyg"
//       // );
//       // expect(draftContainer1).toBeInTheDocument();


//       // userEvent.click(categoryItem);
//       // const nextStep = await screen.findByText("下一步");
//       // const nextStep = await screen.getByPlaceholderText('nextStep')
//       userEvent.click(nextText);
//       // const emptyError = await screen.findByText('新闻内容不能为空1')
//       // expect(emptyError).toBeInTheDocument()

//       // const usernameInput = await screen.getByPlaceholderText('Username');
//       // await userEvent.type(usernameInput, 'admin')
//       // expect(usernameInput.value).toBe('admin');
//       // const passwordInput = await screen.getByPlaceholderText('Password');
//       // await userEvent.type(passwordInput, 'adminpassword')
//       // expect(passwordInput.value).toBe('adminpassword');
//       await waitFor(() => {
//       const newsContent1 =  screen.getByText(/current::1/);
//       expect(newsContent1).toBeInTheDocument();

//       })



//   const draftContainer = screen.getByPlaceholderText(
//           "react-draft-wysiwyg"
//         );
//         expect(draftContainer).toBeInTheDocument();
  
//         const editor = within(draftContainer).getByRole("textbox");
//         expect(editor).toBeInTheDocument();
//         // const editor = screen.getByRole('textbox');
//         // 直接输入文本（需 Draft.js 支持 DOM 事件）
//         fireEvent.change(editor, { target: { textContent: "Hello World" } });
//         expect(editor.textContent).toBe("Hello World");
  


//       // await waitFor(() => {
      

//         const newsContent = await screen.getByText("Hello World");
//         expect(newsContent).toBeInTheDocument();

//         const nextText2 =await screen.getByPlaceholderText('jia')
//         expect(nextText2).toBeInTheDocument();
//         const nextText7 = await screen.getByPlaceholderText("nextStep");
//         expect(nextText7).toBeInTheDocument();
//         // const nextText = await screen.getByPlaceholderText("nextStep");
//         // userEvent.click(nextText7);
//         // userEvent.click(nextText7);
//         // userEvent.click(nextText);
//         // userEvent.click(nextText2);
//         // });
//         // const nextText = await screen.getByPlaceholderText("nextStep");
//         // expect(nextText).toBeInTheDocument();
//         // // const nextText = await screen.getByPlaceholderText("nextStep");
//         // userEvent.click(nextText);
//         await waitFor(() => {
//           const nextText8 = screen.getByText("下一步");
//         expect(nextText8).toBeInTheDocument();
//         userEvent.click(nextText7);
//         })
        
//       await waitFor(() => {
        


//         const newsContent2 =  screen.getByText(/current::2/);
//         expect(newsContent2).toBeInTheDocument();
//         const saveOrSend =  screen.getByPlaceholderText('saveDraft')
//         expect(saveOrSend).toBeInTheDocument()
        


//         });







//       // userEvent.click(nextStep);


//       // const saveOrNextOrPre = screen.getByPlaceholderText("saveOrNextOrPre");
//       // expect(saveOrNextOrPre).toBeInTheDocument();
//       // const nextText2 = within(saveOrNextOrPre).getByPlaceholderText(
//       //   "nextStep"
//       // );
//       // const nextText2 =await screen.findByText(/下一步/)
//       // expect(nextText2).toBeInTheDocument();

//       // const draftContainer1 = await screen.getByPlaceholderText('react-draft-wysiwyg');
//       // expect(draftContainer1).toBeInTheDocument();

//       // saveOrNextOrPre
//       // await waitFor(() => {
//       //   const preStep = within(saveOrNextOrPre).getByPlaceholderText("preStep");
//       //   expect(preStep).toBeInTheDocument();
//       //   // userEvent.click(preStep);
//       //   // const preText2 =  screen.getByPlaceholderText('preStep');

//       //   // expect(preText2).toBeInTheDocument()
//       //   // const saveOrSend = within(saveOrNextOrPre).getByPlaceholderText('saveDraft')
//       //   // expect(saveOrSend).toBeInTheDocument()
//       // });
//       // userEvent.click(nextText2);
//       // const saveOrSend = await screen.getByText(/保存草稿箱/)
//       // expect(saveOrSend).toBeInTheDocument()
//       // await waitFor(() => {

        


//       //   });
//     },15000);
//   }
// );










