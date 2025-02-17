// import { render } from "@testing-library/react";
import React from "react";
import { act, screen,render  } from "@testing-library/react";
import MyLogin from "./MyLogin";
import userEvent from "@testing-library/user-event";
// test('',async()=>{
//     render(<MyLogin></MyLogin>)
//     const username1 = await screen.getByTestId('username-input1');
//     screen.debug(username1)
//     await userEvent.type(username1, 'admin1')
//     // // expect(username).toHaveValue('admin');
//     // expect(username1).toHaveValue('admin2');
//     expect(username1.value).toBe('admin12');
// })

describe('12344',()=>{
    test('123',async()=>{
        // render(<MyLogin></MyLogin>)
        // const username1 = await screen.getByTestId('username-input1');
        // screen.debug(username1)
        // await fireEvent.change(username1, 'admin1')
        // expect(username1.value).toBe('admin1');
        render(<MyLogin></MyLogin>)
        const username1 = await screen.getByTestId('username-input1');
        screen.debug(username1)
        await userEvent.type(username1, 'admin1')
        // // expect(username).toHaveValue('admin');
        // expect(username1).toHaveValue('admin2');
        expect(username1.value).toBe('admin1');
    })
})
