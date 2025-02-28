import React from "react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { act, screen, render, waitFor } from "@testing-library/react";
import LoginForm from "../login/LoginForm";
import { Provider } from "react-redux";
import axios from "axios";
import { mockstore } from "../../test/mockStore";

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate // 直接返回模拟函数
}));
let username;
let password;
let errorMessage;
describe("LoginForm Test", () => {
  beforeEach(() => {
    let loginActions = async () => {
      try {
        const res = await axios.post("/api/users", {
          username: username,
          password: password
        });
      } catch (err) {
        errorMessage = err.response.data;
      }
    };
    render(
      <Provider store={mockstore}>
        <MemoryRouter>
          <LoginForm
            description={["/api/users", "/otherlogin", "临时登录", ""]}
            loginActions={loginActions}
          />
        </MemoryRouter>
      </Provider>
    );
  });
  test("should show errors when submitting empty login form", async () => {
    const loginText = await screen.findByText("登 录");
    userEvent.click(loginText);
    const usernameError = await screen.findByText(
      "Please input your Username!"
    );
    const passwordError = await screen.findByText(
      "Please input your Password!"
    );
    expect(usernameError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
  });
  test(
    "should navigate to Home page after submitting correct login form",
    async () => {
      const usernameInput = await screen.getByPlaceholderText("Username");
      userEvent.type(usernameInput, "admin");
      expect(usernameInput.value).toBe("admin");
      username = usernameInput.value;
      const passwordInput = await screen.getByPlaceholderText("Password");
      userEvent.type(passwordInput, "adminpassword");
      expect(passwordInput.value).toBe("adminpassword");
      password = passwordInput.value;
      const login = await screen.findByText("登 录");
      userEvent.click(login);
      await waitFor(
        async () => {
          expect(mockedNavigate).toHaveBeenCalledWith("/home");
        }
      );
    }
  );
  test(
    "should show error after submitting wrong login form",
    async () => {
      const usernameInput = await screen.getByPlaceholderText("Username");
      userEvent.type(usernameInput, "admin");
      expect(usernameInput.value).toBe("admin");
      username = usernameInput.value;
      const passwordInput = await screen.getByPlaceholderText("Password");
      userEvent.type(passwordInput, "adminErrorPassword");
      expect(passwordInput.value).toBe("adminErrorPassword");
      password = passwordInput.value;
      const login = await screen.findByText("登 录");
      userEvent.click(login);
      await waitFor(
        async () => {
          expect(errorMessage).toBe('用户名或密码错误！');
        }
      );
    }
  );
  test(
    "should show bannedError after submitting banned login form",
    async () => {
      const usernameInput = await screen.getByPlaceholderText("Username");
      userEvent.type(usernameInput, "bannedAdmin");
      expect(usernameInput.value).toBe("bannedAdmin");
      username = usernameInput.value;
      const passwordInput = await screen.getByPlaceholderText("Password");
      userEvent.type(passwordInput, "password");
      expect(passwordInput.value).toBe("password");
      password = passwordInput.value;
      const login = await screen.findByText("登 录");
      userEvent.click(login);
      await waitFor(
        async () => {
          expect(errorMessage).toBe('账号被封禁，请联系管理员！');
        }
      );
    }
  );
  test("should navigate to News page after clicking touristButton", async () => {
    const news = await screen.findByText("游客访问");
    userEvent.click(news);
    await waitFor(async () => {
      expect(mockedNavigate).toHaveBeenCalledWith("/news");
    });
  });
});
