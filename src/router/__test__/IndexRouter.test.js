import React from "react";
import NewsSandBox from "../../views/sandbox/NewsSandBox.js";
import Login from "../../views/login/Login";
import News from "../../views/news/News";
import Detail from "../../views/news/Detail";
import { screen, render } from "@testing-library/react";
import IndexRouter from "../IndexRouter";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../redux/store";
import { Provider } from "react-redux";

function Render(ui, options) {
  const opts = options || {};
  const { initialRoute, renderOptions } = opts;
  const AllProviders = ({ children }) => {
    return (
      <Provider store={store}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </Provider>
    );
  };
  if (initialRoute) {
    window.history.pushState({}, "Initial Route", initialRoute);
  }
  return render(ui, { wrapper: AllProviders, ...renderOptions });
}

jest.mock("../../views/sandbox/NewsSandBox.js");
jest.mock("../../views/login/Login");
jest.mock("../../views/news/News");
jest.mock("../../views/news/Detail");

describe("IndexRouter Test", () => {
  test("should render NewsSandBox page on default route", () => {
    NewsSandBox.mockImplementation(() => <div>NewsSandBoxMock</div>);
    Render(<IndexRouter />);
    expect(screen.getByText("NewsSandBoxMock")).toBeTruthy();
  });
  test("should render Login page for login route", () => {
    Login.mockImplementation(() => <div>LoginMock</div>);
    Render(<IndexRouter />, { initialRoute: "/login" });
    expect(screen.getByText("LoginMock")).toBeTruthy();
  });
  test("should render Otherlogin page for otherlogin route", () => {
    Login.mockImplementation(() => <div>OtherloginMock</div>);
    Render(<IndexRouter />, { initialRoute: "/otherlogin" });
    expect(screen.queryByText("OtherloginMock")).toBeTruthy();
  });
  test("should render News page for News route", () => {
    News.mockImplementation(() => <div>NewsMock</div>);
    Render(<IndexRouter />, { initialRoute: "/news" });
    expect(screen.getByText("NewsMock")).toBeTruthy();
  });
  test("should render Detail page for Detail route", () => {
    Detail.mockImplementation(() => <div>DetailMock</div>);
    Render(<IndexRouter />, { initialRoute: "/detail/:id" });
    expect(screen.queryByText("DetailMock")).toBeTruthy();
  });
});
