// import React from 'react';
// import { render, screen, fireEvent,within ,act,waitFor} from '@testing-library/react';
// import UserList from './UserList';
// import configureStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import userEvent from "@testing-library/user-event";
// import { Provider } from "react-redux";
// import { MemoryRouter } from 'react-router-dom';
// // import { fireEvent } from "@testing-library/react";
// const middlewares = [thunk];
// const mockStore = configureStore(middlewares);

// test('添加用户123', async () => {
//   // ... 初始化 store 和渲染代码不变 ...

//   let store = mockStore({
//     CurrentUserReducer:{roleId:'1',region:'1',username:'1'},                                     
//     RoleListReducer:{rolelist: [
//         {
//           id: 1,
//           roleType: 1,
//           roleName: '超级管理员',
//           rights: [
//             '/chat',
//             '/right-manage/role/update',
//             '/right-manage/role/delete',
//             '/right-manage/right/update',
//             '/right-manage/right/delete',
//             '/audit-manage',
//             '/audit-manage/audit',
//             '/audit-manage/list',
//             '/right-manage',
//             '/right-manage/role/list',
//             '/right-manage/right/list',
//             '/news-manage/list',
//             '/news-manage/update/:id',
//             '/news-manage/preview/:id',
//             '/news-manage/draft',
//             '/news-manage/category',
//             '/news-manage',
//             '/user-manage/add',
//             '/user-manage/delete',
//             '/user-manage/update',
//             '/user-manage/list',
//             '/user-manage',
//             '/publish-manage/unpublished',
//             '/publish-manage/published',
//             '/publish-manage/sunset',
//             '/publish-manage',
//             '/home',
//             '/news-manage/add'
//           ]
//         },
//         {
//           id: 2,
//           roleType: 2,
//           roleName: '区域管理员',
//           rights: [
//             '/chat',
//             '/audit-manage',
//             '/audit-manage/audit',
//             '/audit-manage/list',
//             '/news-manage/list',
//             '/news-manage/add',
//             '/news-manage/update/:id',
//             '/news-manage/preview/:id',
//             '/news-manage/draft',
//             '/news-manage/category',
//             '/news-manage',
//             '/user-manage/list',
//             '/user-manage',
//             '/home',
//             '/publish-manage/unpublished',
//             '/publish-manage/published',
//             '/publish-manage/sunset',
//             '/publish-manage'
//           ]
//         },
//         {
//           id: 3,
//           roleType: 3,
//           roleName: '区域编辑',
//           rights: [
//             '/chat',
//             '/audit-manage',
//             '/audit-manage/list',
//             '/news-manage/list',
//             '/news-manage/add',
//             '/news-manage/update/:id',
//             '/news-manage/preview/:id',
//             '/news-manage/draft',
//             '/news-manage',
//             '/home'
//           ]
//         }
//       ]}
// });
// // await act(()=>{
//     render( 
//   <Provider store={store}>
//         <MemoryRouter>
//             <UserList />
//         </MemoryRouter>
//   </Provider>);

//   // 打开添加用户模态框
//   const addButton = screen.getByText('添加用户');
//   await userEvent.click(addButton);

//   // 等待模态框渲染
//   await waitFor(() => {
//     expect(screen.getByText("密码")).toBeInTheDocument();
//   });

//   // 填写表单
//   const usernameInput = screen.getByLabelText('用户名'); // 替换实际 label
//   const passwordInput = screen.getByLabelText('密码');
//   const regionSelect = screen.getAllByRole('combobox')[0];
//   const roleSelect = screen.getAllByRole('combobox')[1];



//                     // const regionSelect = screen.getAllByRole('combobox')[0]; 
//                     expect(regionSelect).toBeInTheDocument()
//                     fireEvent.mouseDown(regionSelect); 
//                     const region = await screen.getByText('南极洲')
//                     userEvent.click(region);
//                     expect(region).toBeInTheDocument()

//                     // const roleSelect = screen.getAllByRole('combobox')[1]; 
//                     expect(roleSelect).toBeInTheDocument()
//                     fireEvent.mouseDown(roleSelect); 

//                     const roleType = screen.getByText('区域管理员')
//                     userEvent.click(roleType);
//                     expect(roleType).toBeInTheDocument()


//   await act(async () => {
//     await userEvent.type(usernameInput, 'admin');
//     await userEvent.type(passwordInput, 'adminpassword');
    









//     // 选择区域
//     fireEvent.mouseDown(regionSelect);
//     fireEvent.click(await screen.getAllByText('南极洲')[0]);
    
//     // 选择角色
//     fireEvent.mouseDown(roleSelect);
//     fireEvent.click(await screen.getAllByText('区域管理员')[0]);
    
//   });

//   // 提交表单
//   const okButton = screen.getByTestId("modal-ok");
//   await userEvent.click(okButton);

//   // 验证成功提示
//   await waitFor(() => {
//     expect(screen.getByText('用户添加成功')).toBeInTheDocument();
//   });
// }, 10000);



// test('添加用户', async () => {
//           let store = mockStore({
//             CurrentUserReducer:{roleId:'1',region:'1',username:'1'},                                     
//             RoleListReducer:{rolelist: [
//                 {
//                   id: 1,
//                   roleType: 1,
//                   roleName: '超级管理员',
//                   rights: [
//                     '/chat',
//                     '/right-manage/role/update',
//                     '/right-manage/role/delete',
//                     '/right-manage/right/update',
//                     '/right-manage/right/delete',
//                     '/audit-manage',
//                     '/audit-manage/audit',
//                     '/audit-manage/list',
//                     '/right-manage',
//                     '/right-manage/role/list',
//                     '/right-manage/right/list',
//                     '/news-manage/list',
//                     '/news-manage/update/:id',
//                     '/news-manage/preview/:id',
//                     '/news-manage/draft',
//                     '/news-manage/category',
//                     '/news-manage',
//                     '/user-manage/add',
//                     '/user-manage/delete',
//                     '/user-manage/update',
//                     '/user-manage/list',
//                     '/user-manage',
//                     '/publish-manage/unpublished',
//                     '/publish-manage/published',
//                     '/publish-manage/sunset',
//                     '/publish-manage',
//                     '/home',
//                     '/news-manage/add'
//                   ]
//                 },
//                 {
//                   id: 2,
//                   roleType: 2,
//                   roleName: '区域管理员',
//                   rights: [
//                     '/chat',
//                     '/audit-manage',
//                     '/audit-manage/audit',
//                     '/audit-manage/list',
//                     '/news-manage/list',
//                     '/news-manage/add',
//                     '/news-manage/update/:id',
//                     '/news-manage/preview/:id',
//                     '/news-manage/draft',
//                     '/news-manage/category',
//                     '/news-manage',
//                     '/user-manage/list',
//                     '/user-manage',
//                     '/home',
//                     '/publish-manage/unpublished',
//                     '/publish-manage/published',
//                     '/publish-manage/sunset',
//                     '/publish-manage'
//                   ]
//                 },
//                 {
//                   id: 3,
//                   roleType: 3,
//                   roleName: '区域编辑',
//                   rights: [
//                     '/chat',
//                     '/audit-manage',
//                     '/audit-manage/list',
//                     '/news-manage/list',
//                     '/news-manage/add',
//                     '/news-manage/update/:id',
//                     '/news-manage/preview/:id',
//                     '/news-manage/draft',
//                     '/news-manage',
//                     '/home'
//                   ]
//                 }
//               ]}
//         });
//         // await act(()=>{
//             render( 
//           <Provider store={store}>
//                 <MemoryRouter>
//                     <UserList />
//                 </MemoryRouter>
//           </Provider>);
//           // })
// //   render(
// //                 <Provider store={store}>
// //                 <MemoryRouter>
// //                     <UserList />
// //                 </MemoryRouter>
                
// //             </Provider>
// //   );
//     // const admin = await screen.findByText('admin');
//     // expect(admin).toBeInTheDocument()
//     // const EditButton = await screen.getByTestId('EditButton');
//     // expect(EditButton).toBeInTheDocument()

//     const addUsers = screen.getByText('添加用户');
//     expect(addUsers).toBeInTheDocument();
//     await userEvent.click(addUsers);


//     // rerender(          
//     //   <Provider store={store}>
//     //     <MemoryRouter>
//     //       <UserList />
//     //     </MemoryRouter>
//     //   </Provider>
//     // )
//     // const password = await screen.findByText('密码');
//     // expect(password).toBeInTheDocument()
//     await waitFor(() => {
//       expect(screen.getByText("密码")).toBeInTheDocument();
//       // const usernameInput = screen.getByPlaceholderText('Username');
//       // userEvent.type(usernameInput, 'admin')
//       // expect(usernameInput.value).toBe('admin');

//       // const passwordInput = screen.getByPlaceholderText('Password');
//       // userEvent.type(passwordInput, 'adminpassword')
//       // expect(passwordInput.value).toBe('adminpassword');

//       // // const select = screen.getAllByRole('combobox')[0];
//       // // // select.click();   
//       // // expect(select).toBeInTheDocument()
//       // // fireEvent.mouseDown(select); 
//       // // // userEvent.click(select);

//       // // const region = await screen.getByText('南极洲')
//       // // userEvent.click(region);
//       // // expect(region).toBeInTheDocument()

//       // // const roleType = await screen.getByText('区域编辑')
//       // // userEvent.click(roleType);
//       // // expect(roleType).toBeInTheDocument()


//       // const regionSelect = screen.getAllByRole('combobox')[0]; 
//       // expect(regionSelect).toBeInTheDocument()
//       // fireEvent.mouseDown(regionSelect); 


//       // const region = screen.getByText('南极洲')
//       // userEvent.click(region);
//       // expect(region).toBeInTheDocument()

//       // const roleSelect = screen.getAllByRole('combobox')[1]; 
//       // expect(roleSelect).toBeInTheDocument()
//       // fireEvent.mouseDown(roleSelect); 

//       // const roleType = screen.getByText('区域管理员')
//       // userEvent.click(roleType);
//       // expect(roleType).toBeInTheDocument()

//       // const okButton = screen.getByTestId("modal-ok");
//       // expect(okButton).toBeInTheDocument()
//       // userEvent.click(okButton);
//       // const message = screen.getByText('用户添加成功')
//       //  expect(message).toBeInTheDocument()
//     }); 



//     // const usernameError = await screen.findByText('用户名不能为空!')
//     // const passwordError = await screen.findByText('用户名不能为空!')
//     // const regionError = await screen.findByText('请选择区域!')
//     // const roleError = await screen.findByText('请选择用户角色！')
//     // expect(usernameError).toBeInTheDocument()
//     // expect(passwordError).toBeInTheDocument()
//     // expect(regionError).toBeInTheDocument()
//     // expect(roleError).toBeInTheDocument()
 

//     const usernameInput = await screen.getByPlaceholderText('Username');
//     await userEvent.type(usernameInput, 'admin')
//     expect(usernameInput.value).toBe('admin');

//     const passwordInput = await screen.getByPlaceholderText('Password');
//     await userEvent.type(passwordInput, 'adminpassword')
//     expect(passwordInput.value).toBe('adminpassword');

//     // const select = screen.getAllByRole('combobox')[0];
//     // // select.click();   
//     // expect(select).toBeInTheDocument()
//     // fireEvent.mouseDown(select); 
//     // // userEvent.click(select);

//     // const region = await screen.getByText('南极洲')
//     // userEvent.click(region);
//     // expect(region).toBeInTheDocument()

//     // const roleType = await screen.getByText('区域编辑')
//     // userEvent.click(roleType);
//     // expect(roleType).toBeInTheDocument()


// const regionSelect = screen.getAllByRole('combobox')[0]; 
// expect(regionSelect).toBeInTheDocument()
// fireEvent.mouseDown(regionSelect); 


// const region = await screen.getByText('南极洲')
// userEvent.click(region);
// expect(region).toBeInTheDocument()

// const roleSelect = screen.getAllByRole('combobox')[1]; 
// expect(roleSelect).toBeInTheDocument()
// fireEvent.mouseDown(roleSelect); 

// const roleType = await screen.getByText('区域管理员')
// userEvent.click(roleType);
// expect(roleType).toBeInTheDocument()

//     // const okButton = screen.getByTestId("modal-ok");


//     // await userEvent.click(okButton);

    
//     // // await expect(message).toBeInTheDocument()

//     await waitFor(() => {
//       // const okButton = screen.getByText('OK');
//       const okButton = screen.getByTestId("modal-ok");
//       expect(okButton).toBeInTheDocument()
//       userEvent.click(okButton);
//       const message = screen.getByText('用户添加成功')
//        expect(message).toBeInTheDocument()
//     });

//     //EditButton
// },10000);

// test('修改用户', async () => {
//   let store = mockStore({
//     CurrentUserReducer:{roleId:'1',region:'1',username:'1'},                                     
//     RoleListReducer:{rolelist: [
//         {
//           id: 1,
//           roleType: 1,
//           roleName: '超级管理员',
//           rights: [
//             '/chat',
//             '/right-manage/role/update',
//             '/right-manage/role/delete',
//             '/right-manage/right/update',
//             '/right-manage/right/delete',
//             '/audit-manage',
//             '/audit-manage/audit',
//             '/audit-manage/list',
//             '/right-manage',
//             '/right-manage/role/list',
//             '/right-manage/right/list',
//             '/news-manage/list',
//             '/news-manage/update/:id',
//             '/news-manage/preview/:id',
//             '/news-manage/draft',
//             '/news-manage/category',
//             '/news-manage',
//             '/user-manage/add',
//             '/user-manage/delete',
//             '/user-manage/update',
//             '/user-manage/list',
//             '/user-manage',
//             '/publish-manage/unpublished',
//             '/publish-manage/published',
//             '/publish-manage/sunset',
//             '/publish-manage',
//             '/home',
//             '/news-manage/add'
//           ]
//         },
//         {
//           id: 2,
//           roleType: 2,
//           roleName: '区域管理员',
//           rights: [
//             '/chat',
//             '/audit-manage',
//             '/audit-manage/audit',
//             '/audit-manage/list',
//             '/news-manage/list',
//             '/news-manage/add',
//             '/news-manage/update/:id',
//             '/news-manage/preview/:id',
//             '/news-manage/draft',
//             '/news-manage/category',
//             '/news-manage',
//             '/user-manage/list',
//             '/user-manage',
//             '/home',
//             '/publish-manage/unpublished',
//             '/publish-manage/published',
//             '/publish-manage/sunset',
//             '/publish-manage'
//           ]
//         },
//         {
//           id: 3,
//           roleType: 3,
//           roleName: '区域编辑',
//           rights: [
//             '/chat',
//             '/audit-manage',
//             '/audit-manage/list',
//             '/news-manage/list',
//             '/news-manage/add',
//             '/news-manage/update/:id',
//             '/news-manage/preview/:id',
//             '/news-manage/draft',
//             '/news-manage',
//             '/home'
//           ]
//         }
//       ]}
// });
// // await act(()=>{
// render( 
//   <Provider store={store}>
//         <MemoryRouter>
//             <UserList />
//         </MemoryRouter>
//   </Provider>);
//   // })

//     await waitFor(() => {
//       expect(screen.getAllByTestId('EditButton')[0]).toBeInTheDocument();
//       const EditButton = screen.getAllByTestId('EditButton')[1]
//       expect(EditButton).toBeInTheDocument()
//       userEvent.click(EditButton)

//     });
//     const edit = screen.getByText('更新用户');
//     expect(edit).toBeInTheDocument()


  


// //  //1   

// // const admin = await screen.findByText('admin');
// // expect(admin).toBeInTheDocument()

// // const addUsers = screen.getByText('添加用户');
// // expect(addUsers).toBeInTheDocument();
// // await userEvent.click(addUsers);

// // const password = await screen.findByText('密码');
// // expect(password).toBeInTheDocument()
// // // await waitFor(() => {
// // // expect(screen.getByText("密码")).toBeInTheDocument();
// // // }); 
// // // const okButton = screen.getByTestId("modal-ok");
// // const okButton = await screen.getByText('OK');
// // expect(okButton).toBeInTheDocument()
// // // await userEvent.click(okButton);

// // //1




// // const usernameError = await screen.findByText('用户名不能为空!')
// // const passwordError = await screen.findByText('用户名不能为空!')
// // const regionError = await screen.findByText('请选择区域!')
// // const roleError = await screen.findByText('请选择用户角色！')
// // expect(usernameError).toBeInTheDocument()
// // expect(passwordError).toBeInTheDocument()
// // expect(regionError).toBeInTheDocument()
// // expect(roleError).toBeInTheDocument()





// const usernameInput = await screen.getByPlaceholderText('Username');
// await userEvent.type(usernameInput, '{selectall}');

// // 2. 删除选中内容
// await userEvent.type(usernameInput, '{backspace}');

// // 验证输入框已清空
// expect(usernameInput).toHaveValue('');

// await userEvent.type(usernameInput, 'admin')
// expect(usernameInput.value).toBe('admin');

// const passwordInput = await screen.getByPlaceholderText('Password');
// await userEvent.type(passwordInput, '{selectall}');

// // 2. 删除选中内容
// await userEvent.type(passwordInput, '{backspace}');

// // 验证输入框已清空
// expect(passwordInput).toHaveValue('');
// await userEvent.type(passwordInput, 'adminpassword')
// expect(passwordInput.value).toBe('adminpassword');

// const regionSelect = screen.getAllByRole('combobox')[0]; 
// expect(regionSelect).toBeInTheDocument()
// fireEvent.mouseDown(regionSelect); 


// const region = await screen.getByText('南极洲')
// userEvent.click(region);
// expect(region).toBeInTheDocument()

// const roleSelect = screen.getAllByRole('combobox')[1]; 
// expect(roleSelect).toBeInTheDocument()
// fireEvent.mouseDown(roleSelect); 

// const roleType = await screen.getByText('区域管理员')
// userEvent.click(roleType);
// expect(roleType).toBeInTheDocument()







//   // const okButton = screen.getByTestId('modal-ok')
//   //  expect(okButton).toBeInTheDocument()
//   //  await userEvent.click(okButton);
//   //  const message = await screen.getByText('修改成功')
//   // expect(message).toBeInTheDocument()

// },10000);




























import React from 'react';
import { render, screen, fireEvent,within ,act,waitFor} from '@testing-library/react';
import UserList from './UserList';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from 'react-router-dom';
// import { fireEvent } from "@testing-library/react";
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

test('添加用户123', async () => {
  // ... 初始化 store 和渲染代码不变 ...

  let store = mockStore({
    CurrentUserReducer:{roleId:'1',region:'1',username:'1'},                                     
    RoleListReducer:{rolelist: [
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
        },
        {
          id: 2,
          roleType: 2,
          roleName: '区域管理员',
          rights: [
            '/chat',
            '/audit-manage',
            '/audit-manage/audit',
            '/audit-manage/list',
            '/news-manage/list',
            '/news-manage/add',
            '/news-manage/update/:id',
            '/news-manage/preview/:id',
            '/news-manage/draft',
            '/news-manage/category',
            '/news-manage',
            '/user-manage/list',
            '/user-manage',
            '/home',
            '/publish-manage/unpublished',
            '/publish-manage/published',
            '/publish-manage/sunset',
            '/publish-manage'
          ]
        },
        {
          id: 3,
          roleType: 3,
          roleName: '区域编辑',
          rights: [
            '/chat',
            '/audit-manage',
            '/audit-manage/list',
            '/news-manage/list',
            '/news-manage/add',
            '/news-manage/update/:id',
            '/news-manage/preview/:id',
            '/news-manage/draft',
            '/news-manage',
            '/home'
          ]
        }
      ]}
});
    render( 
  <Provider store={store}>
        <MemoryRouter>
            <UserList />
        </MemoryRouter>
  </Provider>);

  // 打开添加用户模态框
  const addButton = screen.getByText('添加用户');
  expect(addButton).toBeInTheDocument();
  await userEvent.click(addButton);

  // 等待模态框渲染
  await waitFor(() => {
    expect(screen.getByText("密码")).toBeInTheDocument();
  });

  // 填写表单
  const usernameInput = screen.getByLabelText('用户名'); // 替换实际 label
  const passwordInput = screen.getByLabelText('密码');
  const regionSelect = screen.getAllByRole('combobox')[0];
  const roleSelect = screen.getAllByRole('combobox')[1];

  // // 提交表单
  // const okButton1 = screen.getByTestId("modal-ok");
  // await fireEvent.click(okButton1);
  // await waitFor(() => {
  //   const usernameError =  screen.findByText('用户名不能为空!')
  //   const passwordError =  screen.findByText('用户名不能为空!')
  //   const regionError =  screen.findByText('请选择区域!')
  //   const roleError =  screen.findByText('请选择用户角色！')
  //   expect(usernameError).toBeInTheDocument()
  //   expect(passwordError).toBeInTheDocument()
  //   expect(regionError).toBeInTheDocument()
  //   expect(roleError).toBeInTheDocument()
  // });



  expect(regionSelect).toBeInTheDocument()
  fireEvent.mouseDown(regionSelect); 

  expect(roleSelect).toBeInTheDocument()
  fireEvent.mouseDown(roleSelect); 

  await act(async () => {
    await userEvent.type(usernameInput, 'admin');
    expect(usernameInput.value).toBe('admin');
    await userEvent.type(passwordInput, 'adminpassword');
    expect(passwordInput.value).toBe('adminpassword');
    
    const region = await screen.getAllByText('南极洲')[0]
    expect(region).toBeInTheDocument()
    fireEvent.click(region);

    const roleType = await screen.getAllByText('区域管理员')[0]
    expect(roleType).toBeInTheDocument()
     fireEvent.click(roleType);  
  });

  // 提交表单
  const okButton = screen.getByTestId("modal-ok");
  await userEvent.click(okButton);

  // 验证成功提示
  await waitFor(() => {
    expect(screen.getByText('用户添加成功321')).toBeInTheDocument();
  });
}, 11000);



// test('添加用户', async () => {
//           let store = mockStore({
//             CurrentUserReducer:{roleId:'1',region:'1',username:'1'},                                     
//             RoleListReducer:{rolelist: [
//                 {
//                   id: 1,
//                   roleType: 1,
//                   roleName: '超级管理员',
//                   rights: [
//                     '/chat',
//                     '/right-manage/role/update',
//                     '/right-manage/role/delete',
//                     '/right-manage/right/update',
//                     '/right-manage/right/delete',
//                     '/audit-manage',
//                     '/audit-manage/audit',
//                     '/audit-manage/list',
//                     '/right-manage',
//                     '/right-manage/role/list',
//                     '/right-manage/right/list',
//                     '/news-manage/list',
//                     '/news-manage/update/:id',
//                     '/news-manage/preview/:id',
//                     '/news-manage/draft',
//                     '/news-manage/category',
//                     '/news-manage',
//                     '/user-manage/add',
//                     '/user-manage/delete',
//                     '/user-manage/update',
//                     '/user-manage/list',
//                     '/user-manage',
//                     '/publish-manage/unpublished',
//                     '/publish-manage/published',
//                     '/publish-manage/sunset',
//                     '/publish-manage',
//                     '/home',
//                     '/news-manage/add'
//                   ]
//                 },
//                 {
//                   id: 2,
//                   roleType: 2,
//                   roleName: '区域管理员',
//                   rights: [
//                     '/chat',
//                     '/audit-manage',
//                     '/audit-manage/audit',
//                     '/audit-manage/list',
//                     '/news-manage/list',
//                     '/news-manage/add',
//                     '/news-manage/update/:id',
//                     '/news-manage/preview/:id',
//                     '/news-manage/draft',
//                     '/news-manage/category',
//                     '/news-manage',
//                     '/user-manage/list',
//                     '/user-manage',
//                     '/home',
//                     '/publish-manage/unpublished',
//                     '/publish-manage/published',
//                     '/publish-manage/sunset',
//                     '/publish-manage'
//                   ]
//                 },
//                 {
//                   id: 3,
//                   roleType: 3,
//                   roleName: '区域编辑',
//                   rights: [
//                     '/chat',
//                     '/audit-manage',
//                     '/audit-manage/list',
//                     '/news-manage/list',
//                     '/news-manage/add',
//                     '/news-manage/update/:id',
//                     '/news-manage/preview/:id',
//                     '/news-manage/draft',
//                     '/news-manage',
//                     '/home'
//                   ]
//                 }
//               ]}
//         });
//         // await act(()=>{
//             render( 
//           <Provider store={store}>
//                 <MemoryRouter>
//                     <UserList />
//                 </MemoryRouter>
//           </Provider>);
//           // })
// //   render(
// //                 <Provider store={store}>
// //                 <MemoryRouter>
// //                     <UserList />
// //                 </MemoryRouter>
                
// //             </Provider>
// //   );
//     // const admin = await screen.findByText('admin');
//     // expect(admin).toBeInTheDocument()
//     // const EditButton = await screen.getByTestId('EditButton');
//     // expect(EditButton).toBeInTheDocument()

//     const addUsers = screen.getByText('添加用户');
//     expect(addUsers).toBeInTheDocument();
//     await userEvent.click(addUsers);


//     // rerender(          
//     //   <Provider store={store}>
//     //     <MemoryRouter>
//     //       <UserList />
//     //     </MemoryRouter>
//     //   </Provider>
//     // )
//     // const password = await screen.findByText('密码');
//     // expect(password).toBeInTheDocument()
//     await waitFor(() => {
//       expect(screen.getByText("密码")).toBeInTheDocument();
//       // const usernameInput = screen.getByPlaceholderText('Username');
//       // userEvent.type(usernameInput, 'admin')
//       // expect(usernameInput.value).toBe('admin');

//       // const passwordInput = screen.getByPlaceholderText('Password');
//       // userEvent.type(passwordInput, 'adminpassword')
//       // expect(passwordInput.value).toBe('adminpassword');

//       // // const select = screen.getAllByRole('combobox')[0];
//       // // // select.click();   
//       // // expect(select).toBeInTheDocument()
//       // // fireEvent.mouseDown(select); 
//       // // // userEvent.click(select);

//       // // const region = await screen.getByText('南极洲')
//       // // userEvent.click(region);
//       // // expect(region).toBeInTheDocument()

//       // // const roleType = await screen.getByText('区域编辑')
//       // // userEvent.click(roleType);
//       // // expect(roleType).toBeInTheDocument()


//       // const regionSelect = screen.getAllByRole('combobox')[0]; 
//       // expect(regionSelect).toBeInTheDocument()
//       // fireEvent.mouseDown(regionSelect); 


//       // const region = screen.getByText('南极洲')
//       // userEvent.click(region);
//       // expect(region).toBeInTheDocument()

//       // const roleSelect = screen.getAllByRole('combobox')[1]; 
//       // expect(roleSelect).toBeInTheDocument()
//       // fireEvent.mouseDown(roleSelect); 

//       // const roleType = screen.getByText('区域管理员')
//       // userEvent.click(roleType);
//       // expect(roleType).toBeInTheDocument()

//       // const okButton = screen.getByTestId("modal-ok");
//       // expect(okButton).toBeInTheDocument()
//       // userEvent.click(okButton);
//       // const message = screen.getByText('用户添加成功')
//       //  expect(message).toBeInTheDocument()
//     }); 



//     // const usernameError = await screen.findByText('用户名不能为空!')
//     // const passwordError = await screen.findByText('用户名不能为空!')
//     // const regionError = await screen.findByText('请选择区域!')
//     // const roleError = await screen.findByText('请选择用户角色！')
//     // expect(usernameError).toBeInTheDocument()
//     // expect(passwordError).toBeInTheDocument()
//     // expect(regionError).toBeInTheDocument()
//     // expect(roleError).toBeInTheDocument()
 

//     const usernameInput = await screen.getByPlaceholderText('Username');
//     await userEvent.type(usernameInput, 'admin')
//     expect(usernameInput.value).toBe('admin');

//     const passwordInput = await screen.getByPlaceholderText('Password');
//     await userEvent.type(passwordInput, 'adminpassword1')
//     expect(passwordInput.value).toBe('adminpassword1');

//     // const select = screen.getAllByRole('combobox')[0];
//     // // select.click();   
//     // expect(select).toBeInTheDocument()
//     // fireEvent.mouseDown(select); 
//     // // userEvent.click(select);

//     // const region = await screen.getByText('南极洲')
//     // userEvent.click(region);
//     // expect(region).toBeInTheDocument()

//     // const roleType = await screen.getByText('区域编辑')
//     // userEvent.click(roleType);
//     // expect(roleType).toBeInTheDocument()


// const regionSelect = screen.getAllByRole('combobox')[0]; 
// expect(regionSelect).toBeInTheDocument()
// fireEvent.mouseDown(regionSelect); 


// const region = await screen.getByText('南极洲')
// userEvent.click(region);
// expect(region).toBeInTheDocument()

// const roleSelect = screen.getAllByRole('combobox')[1]; 
// expect(roleSelect).toBeInTheDocument()
// fireEvent.mouseDown(roleSelect); 

// const roleType = await screen.getByText('区域管理员')
// userEvent.click(roleType);
// expect(roleType).toBeInTheDocument()

//     // const okButton = screen.getByTestId("modal-ok");


//     // await userEvent.click(okButton);

    
//     // // await expect(message).toBeInTheDocument()

//     await waitFor(() => {
//       // const okButton = screen.getByText('OK');
//       const okButton = screen.getByTestId("modal-ok");
//       expect(okButton).toBeInTheDocument()
//       userEvent.click(okButton);
//       const message = screen.getByText('用户添加成功')
//        expect(message).toBeInTheDocument()
//     });

//     //EditButton
// },11000);

test('修改用户', async () => {
  let store = mockStore({
    CurrentUserReducer:{roleId:'1',region:'1',username:'1'},                                     
    RoleListReducer:{rolelist: [
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
        },
        {
          id: 2,
          roleType: 2,
          roleName: '区域管理员',
          rights: [
            '/chat',
            '/audit-manage',
            '/audit-manage/audit',
            '/audit-manage/list',
            '/news-manage/list',
            '/news-manage/add',
            '/news-manage/update/:id',
            '/news-manage/preview/:id',
            '/news-manage/draft',
            '/news-manage/category',
            '/news-manage',
            '/user-manage/list',
            '/user-manage',
            '/home',
            '/publish-manage/unpublished',
            '/publish-manage/published',
            '/publish-manage/sunset',
            '/publish-manage'
          ]
        },
        {
          id: 3,
          roleType: 3,
          roleName: '区域编辑',
          rights: [
            '/chat',
            '/audit-manage',
            '/audit-manage/list',
            '/news-manage/list',
            '/news-manage/add',
            '/news-manage/update/:id',
            '/news-manage/preview/:id',
            '/news-manage/draft',
            '/news-manage',
            '/home'
          ]
        }
      ]}
});
// await act(()=>{
render( 
  <Provider store={store}>
        <MemoryRouter>
            <UserList />
        </MemoryRouter>
  </Provider>);
  // })

    await waitFor(() => {
      expect(screen.getAllByTestId('EditButton')[0]).toBeInTheDocument();
      const EditButton = screen.getAllByTestId('EditButton')[1]
      expect(EditButton).toBeInTheDocument()
      userEvent.click(EditButton)

    });
    const edit = screen.getByText('更新用户');
    expect(edit).toBeInTheDocument()




const usernameInput = await screen.getByPlaceholderText('Username');
await userEvent.type(usernameInput, '{selectall}');

// 2. 删除选中内容
await userEvent.type(usernameInput, '{backspace}');

// 验证输入框已清空
expect(usernameInput).toHaveValue('');

await userEvent.type(usernameInput, 'admin')
expect(usernameInput.value).toBe('admin');

const passwordInput = await screen.getByPlaceholderText('Password');
await userEvent.type(passwordInput, '{selectall}');

// 2. 删除选中内容
await userEvent.type(passwordInput, '{backspace}');

// 验证输入框已清空
expect(passwordInput).toHaveValue('');
await userEvent.type(passwordInput, 'adminpassword')
expect(passwordInput.value).toBe('adminpassword');

const regionSelect = screen.getAllByRole('combobox')[0]; 
expect(regionSelect).toBeInTheDocument()
fireEvent.mouseDown(regionSelect); 


const region = await screen.getByText('南极洲')
userEvent.click(region);
expect(region).toBeInTheDocument()

const roleSelect = screen.getAllByRole('combobox')[1]; 
expect(roleSelect).toBeInTheDocument()
fireEvent.mouseDown(roleSelect); 

const roleType = await screen.getByText('区域管理员')
userEvent.click(roleType);
expect(roleType).toBeInTheDocument()



 // 提交表单
 const okButton = screen.getByTestId("modal-ok");
 await userEvent.click(okButton);

 // 验证成功提示
 await waitFor(() => {
   expect(screen.getByText('修改成功123')).toBeInTheDocument();
 });



  // const okButton = screen.getByTestId('modal-ok')
  //  expect(okButton).toBeInTheDocument()
  //  await userEvent.click(okButton);
  //  const message = await screen.getByText('修改成功')
  // expect(message).toBeInTheDocument()

},11000);