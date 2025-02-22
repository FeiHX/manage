import React from "react";
import NewsAdd from "../sandbox/news-manage/NewsAdd";
import userEvent from "@testing-library/user-event";
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

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate // 直接返回模拟函数
}));

describe("12344", () => {
  test(
    "123",
    async () => {
      let store = mockStore({
        CategoriesReducer: {
          categories: [
            {
              id: 1,
              title: "时事新闻",
              value: "时事新闻"
            },
            {
              id: 2,
              title: "环球经济",
              value: "环球经济"
            },
            {
              id: 3,
              title: "科学技术",
              value: "科学技术"
            },
            {
              id: 4,
              title: "军事世界",
              value: "军事世界"
            },
            {
              id: 5,
              title: "世界体育",
              value: "世界体育"
            },
            {
              id: 6,
              title: "生活理财",
              value: "生活理财"
            }
          ]
        },
        CurrentUserReducer: { region: "1", username: "1", roleId: "1" }
      });

      myrender(
        <Provider store={store}>
          <MemoryRouter>
            <NewsAdd />
          </MemoryRouter>
        </Provider>
      );
      const NewsAddTitle = await screen.findByText("撰写新闻");
      expect(NewsAddTitle).toBeInTheDocument();
      // 第一步：验证初始状态
      // await waitFor(async () => {
      //   expect(await screen.findByText(/current::0/)).toBeInTheDocument();
      // });

      // 第二步：填写表单并提交
      // 重新获取按钮引用
      const firstNextButton = await screen.getByPlaceholderText("nextStep");
      expect(firstNextButton).toBeInTheDocument();
      await userEvent.click(firstNextButton);

      // 第三步：验证表单错误提示
      await waitFor(async () => {
        expect(
          await screen.findByText("Please input your title!")
        ).toBeInTheDocument();
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
      await waitFor(
        async () => {
          expect(await screen.findByText(/current::1/)).toBeInTheDocument();
        },
        { timeout: 8000 }
      );

      // 第七步：处理富文本输入（正确方式）
      await waitFor(
        async () => {
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
          await fireEvent.change(editor, {
            target: { textContent: "Hello World" }
          });
          expect(editor.textContent).toBe("Hello World");
          // expect(await screen.findByText(/请输入新闻内容！！！/)).toBeInTheDocument();
          // expect(await screen.findByText(/注意!新闻内容为初始！！请输入新闻内容！！！/)).toBeInTheDocument();
          // await fireEvent.blur(editor);
        },
        { timeout: 5000 }
      );

      // 第八步：进入提交步骤
      const finalNextButton = await screen.findByPlaceholderText("nextStep"); // 再次获取新按钮
      expect(finalNextButton).toBeInTheDocument();
      await userEvent.click(finalNextButton);
      // 最终验证（必须使用findBy*）
      await waitFor(
        async () => {
          // expect(await screen.findByText(/新闻内容不能为空/)).toBeInTheDocument();
          // expect(await screen.findByText(/current::2/)).toBeInTheDocument();
          expect(
            await screen.findByPlaceholderText("saveDraft")
          ).toBeInTheDocument();
          await userEvent.click(
            await screen.findByPlaceholderText("saveDraft")
          );
        },
        { timeout: 8000 }
      );

      await waitFor(
        async () => {
          // expect(await screen.findByText(/新闻内容不能为空/)).toBeInTheDocument();
          expect(await screen.findByText(/您可以到草稿箱中查看您的新闻/)).toBeInTheDocument();
          expect(mockedNavigate).toHaveBeenCalledWith("/news-manage/draft");
        },
        { timeout: 8000 }
      );
    },
    65000
  );

  test(
    "123",
    async () => {
      let store = mockStore({
        CategoriesReducer: {
          categories: [
            {
              id: 1,
              title: "时事新闻",
              value: "时事新闻"
            },
            {
              id: 2,
              title: "环球经济",
              value: "环球经济"
            },
            {
              id: 3,
              title: "科学技术",
              value: "科学技术"
            },
            {
              id: 4,
              title: "军事世界",
              value: "军事世界"
            },
            {
              id: 5,
              title: "世界体育",
              value: "世界体育"
            },
            {
              id: 6,
              title: "生活理财",
              value: "生活理财"
            }
          ]
        },
        CurrentUserReducer: { region: "1", username: "1", roleId: "1" }
      });

      myrender(
        <Provider store={store}>
          <MemoryRouter>
            <NewsAdd />
          </MemoryRouter>
        </Provider>
      );
      const NewsAddTitle = await screen.findByText("撰写新闻");
      expect(NewsAddTitle).toBeInTheDocument();
      // 第一步：验证初始状态
      // await waitFor(async () => {
      //    expect(await screen.findByText(/current::0/)).toBeInTheDocument();
      // });

      // 第二步：填写表单并提交
      // 重新获取按钮引用
      const firstNextButton = await screen.getByPlaceholderText("nextStep");
      expect(firstNextButton).toBeInTheDocument();
      await userEvent.click(firstNextButton);

      // 第三步：验证表单错误提示
      await waitFor(async () => {
        expect(
          await screen.findByText("Please input your title!")
        ).toBeInTheDocument();
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
      await waitFor(
        async () => {
          expect(await screen.findByText(/current::1/)).toBeInTheDocument();
        },
        { timeout: 8000 }
      );

      // 第七步：处理富文本输入（正确方式）
      await waitFor(
        async () => {
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
          await fireEvent.change(editor, {
            target: { textContent: "Hello World" }
          });
          expect(editor.textContent).toBe("Hello World");
          // expect(await screen.findByText(/请输入新闻内容！！！/)).toBeInTheDocument();
          // expect(await screen.findByText(/注意!新闻内容为初始！！请输入新闻内容！！！/)).toBeInTheDocument();
          // await fireEvent.blur(editor);
        },
        { timeout: 5000 }
      );

      // 第八步：进入提交步骤
      const finalNextButton = await screen.findByPlaceholderText("nextStep"); // 再次获取新按钮
      expect(finalNextButton).toBeInTheDocument();
      await userEvent.click(finalNextButton);
      // 最终验证（必须使用findBy*）
      await waitFor(
        async () => {
          // expect(await screen.findByText(/新闻内容不能为空/)).toBeInTheDocument();
          // expect(await screen.findByText(/current::2/)).toBeInTheDocument();
          expect(
            await screen.findByPlaceholderText("submit")
          ).toBeInTheDocument();
          await userEvent.click(await screen.findByPlaceholderText("submit"));
        },
        { timeout: 8000 }
      );

      await waitFor(
        async () => {
          expect(
            await screen.findByText(/您可以到审核列表中查看您的新闻/)
          ).toBeInTheDocument();
          expect(mockedNavigate).toHaveBeenCalledWith("/audit-manage/list");
        },
        { timeout: 8000 }
      );
    },
    65000
  );
});