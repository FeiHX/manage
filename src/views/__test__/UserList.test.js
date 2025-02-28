import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor
} from "@testing-library/react";
import UserList from "../sandbox/use-manage/UserList";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { mockstore } from "../../test/mockStore";
describe("UserList Test", () => {
  beforeEach(() => {
    render(
      <Provider store={mockstore}>
        <MemoryRouter>
          <UserList />
        </MemoryRouter>
      </Provider>
    );
  });
  test(
    "should show message after adding user successfully",
    async () => {
      // 1.打开添加用户模态框
      const addButton = screen.getByText("添加用户");
      expect(addButton).toBeInTheDocument();
      userEvent.click(addButton);

      // 2.等待模态框渲染
      await waitFor(() => {
        expect(screen.getByText("密码")).toBeInTheDocument();
      });

      // 3.填写表单
      const usernameInput = screen.getByLabelText("用户名");
      const passwordInput = screen.getByLabelText("密码");
      const regionSelect = screen.getAllByRole("combobox")[0];
      const roleSelect = screen.getAllByRole("combobox")[1];
      fireEvent.mouseDown(regionSelect);
      fireEvent.mouseDown(roleSelect);
      await act(async () => {
        userEvent.type(usernameInput, "admin");
        expect(usernameInput.value).toBe("admin");
        userEvent.type(passwordInput, "adminpassword");
        expect(passwordInput.value).toBe("adminpassword");
        const region = screen.getAllByText("南极洲")[0];
        expect(region).toBeInTheDocument();
        fireEvent.click(region);
        const roleType = screen.getAllByText("区域管理员")[0];
        expect(roleType).toBeInTheDocument();
        fireEvent.click(roleType);
      });

      // 4.提交表单
      const okButton = screen.getByTestId("modal-ok");
      userEvent.click(okButton);

      // 5.验证添加成功提示
      await waitFor(() => {
        expect(screen.getByText("用户添加成功")).toBeInTheDocument();
      });
    },
    15000
  );

  test(
    "should show message after modifying user successfully",
    async () => {
      //1.打开更新用户模态框
      await waitFor(() => {
        const EditButton = screen.getAllByTestId("EditButton")[1];
        expect(EditButton).toBeInTheDocument();
        userEvent.click(EditButton);
      });
      const edit = screen.getByText("更新用户");
      expect(edit).toBeInTheDocument();

      //2.修改用户名
      const usernameInput = screen.getByPlaceholderText("Username");
      userEvent.type(usernameInput, "{selectall}");
      userEvent.type(usernameInput, "{backspace}");
      expect(usernameInput).toHaveValue("");
      userEvent.type(usernameInput, "admin");
      expect(usernameInput.value).toBe("admin");

      //3.修改密码
      const passwordInput = screen.getByPlaceholderText("Password");
      userEvent.type(passwordInput, "{selectall}");
      userEvent.type(passwordInput, "{backspace}");
      expect(passwordInput).toHaveValue("");
      userEvent.type(passwordInput, "adminpassword");
      expect(passwordInput.value).toBe("adminpassword");

      //4.修改用户区域
      const regionSelect = screen.getAllByRole("combobox")[0];
      expect(regionSelect).toBeInTheDocument();
      fireEvent.mouseDown(regionSelect);
      const region = screen.getByText("南极洲");
      userEvent.click(region);
      expect(region).toBeInTheDocument();

      //5.修改用户角色
      const roleSelect = screen.getAllByRole("combobox")[1];
      expect(roleSelect).toBeInTheDocument();
      fireEvent.mouseDown(roleSelect);
      const roleType = screen.getByText("区域管理员");
      userEvent.click(roleType);
      expect(roleType).toBeInTheDocument();

      //6.提交表单
      const okButton = screen.getByTestId("modal-ok");
      userEvent.click(okButton);

      //7.验证修改成功提示
      await waitFor(() => {
        expect(screen.getByText("修改成功")).toBeInTheDocument();
      });
    },
    25000
  );
});
