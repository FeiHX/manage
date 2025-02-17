import React from "react";
import News from "../news/News";
import Login from "./Login";
import { Route, Routes, HashRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { render  } from '../../test/test-utils';
import { act, screen,render as myrender } from "@testing-library/react";
// 
import LoginForm from "./LoginForm";
import { Provider } from "react-redux";
import store from '../../redux/store'
import MyLogin from "./MyLogin";
import { fireEvent } from "@testing-library/react";

// describe('12344',()=>{
//     test('123',async()=>{
//         render(<LoginForm description={['/api/users','/otherlogin','临时登录','']}/>)
//         const usernameInput = await screen.getByPlaceholderText('Username');
//         await userEvent.type(usernameInput, 'admin')
//         expect(usernameInput.value).toBe('admin');
//         const passwordInput = await screen.getByPlaceholderText('Password');
//         await userEvent.type(passwordInput, 'adminpassword')
//         expect(passwordInput.value).toBe('adminpassword');
//     })
// })
describe('登录框',() => {
    
    test('登录框的输入验证',async()=>{
        render(<LoginForm description={['/api/users','/otherlogin','临时登录','']}/>)

        const loginText = await screen.findByText('登 录');   
        userEvent.click(loginText);
        const usernameError = await screen.findByText('Please input your Username!')
        const passwordError = await screen.findByText('Please input your Password!')
        expect(usernameError).toBeInTheDocument()
        expect(passwordError).toBeInTheDocument()

        const usernameInput = await screen.getByPlaceholderText('Username');
        await userEvent.type(usernameInput, 'admin')
        expect(usernameInput.value).toBe('admin');

        const passwordInput = await screen.getByPlaceholderText('Password');
        await userEvent.type(passwordInput, 'adminpassword')
        expect(passwordInput.value).toBe('adminpassword');


    })
    test('登录框的访客模式浏览新闻模块',async() => {
        act(()=>{
            render(
                // <HashRouter>
                    <Routes>
                        <Route path="/" element={<Login description={['/api/users','/otherlogin','临时登录','']}/>} />
                        <Route path="/news" element={<News />} />
                        <Route path="/login" element={<Login description={['/api/users','/otherlogin','临时登录','']}/>} />
                    </Routes>
                // </HashRouter>
            );
        })
        // const password = screen.findByTestId('password-input');
        // screen.debug(password)
        const news = await screen.findByText('游客访问');
        userEvent.click(news);
        const newsText = await screen.findByText('新 闻');   
        expect(newsText).toBeInTheDocument();    
        // const loginText = await screen.findByText('登 录'); 
        // userEvent.click(loginText);
        // const manageText = await screen.findByText('新闻管理系统'); 
        // expect(manageText).toBeInTheDocument();    

    });

    
})
