import React from "react";
import TopHeader from "../sandbox/TopHeader";
import userEvent from "@testing-library/user-event";
import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { mockstore } from "../../test/mockStore";
describe("TopHeader Test", () => {
  beforeEach(() => {
    render(
      <Provider store={mockstore}>
        <MemoryRouter>
          <TopHeader />
        </MemoryRouter>
      </Provider>
    );
  });
  test("should navigate to /home after clicking Lv1 Navigation", async () => {
    const welcome =  screen.getByText(/欢 迎/); 
    await waitFor(() => {
      expect(welcome).toBeInTheDocument()
    },3000);
    // const userInfo = await screen.findByPlaceholderText("userInfo");
    // expect(userInfo).toBeInTheDocument();
    // const home1 = await screen.findByText(/用户/); 
    // await fireEvent.click(home1)
    // const logout = await screen.findByText(/超级管理员/);
    // expect(logout).toBeInTheDocument();
    // fireEvent.click(logout)
    // await waitFor(() => {

    // },{ timeout: 15000 });
    //fireEvent.focus(input);
  });
  test("should show correct num when render", async () => {
    const noticeCount = await screen.getByText(/9/); 
    expect(noticeCount).toBeInTheDocument()
  });
  test("should render notice after clicking button", async () => {
    const noticeButton = screen.getByTestId("notice-button");
    expect(noticeButton).toBeInTheDocument();
    await userEvent.click(noticeButton);
    const noticeTitle = screen.getByText("通知");
    const notification = screen.getByText("待审核:用户admin提交新闻《12》");
    expect(noticeTitle).toBeInTheDocument();
    expect(notification).toBeInTheDocument();
  },40000);
});
