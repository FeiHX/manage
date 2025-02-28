import React from "react";
import SideMenu from "../sandbox/SideMenu";
import userEvent from "@testing-library/user-event";
import {
  screen,
  render,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { mockstore } from "../../test/mockStore";

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate 
}));

describe("SideMenu Test", () => {
  beforeEach(() => {
    render(
      <Provider store={mockstore}>
        <MemoryRouter>
          <SideMenu/>
        </MemoryRouter>
      </Provider>
    );
  });
  test("should navigate to /home after clicking Lv1 Navigation", async () => {
    const home = screen.getByText("首页");
    expect(home).toBeInTheDocument();
    userEvent.click(home);
    expect(mockedNavigate).toHaveBeenCalledWith("/home");
  });
  test("should navigate to /user-manage/list after clicking Lv2 Navigation", async () => {
    const userManage = screen.getByText("用户管理");
    expect(userManage).toBeInTheDocument();
    await userEvent.click(userManage);
    const userList = screen.getByText("用户列表");
    expect(userList).toBeInTheDocument();
    userEvent.click(userList);
    expect(mockedNavigate).toHaveBeenCalledWith("/user-manage/list");
  });
});
