import React from "react";
import NewsAdd from "../sandbox/news-manage/NewsAdd";
import userEvent from "@testing-library/user-event";
import { screen, render, within, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { mockstore } from "../../test/mockStore";

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate // 直接返回模拟函数
}));

describe("12344", () => {
  beforeEach(() => {
    render(
      <Provider store={mockstore}>
        <MemoryRouter>
          <NewsAdd />
        </MemoryRouter>
      </Provider>
    );
  });
  test("should show required field errors when empty inputs",async () => {
    const NewsAddTitle = await screen.findByText("撰写新闻");
    expect(NewsAddTitle).toBeInTheDocument();
    const firstNextButton = screen.getByPlaceholderText("nextStep");
    expect(firstNextButton).toBeInTheDocument();
    userEvent.click(firstNextButton);
    await waitFor(async () => {
      expect(await screen.findByText("Please input your title!")).toBeInTheDocument();
      expect(await screen.findByText("Please input your subheading!")).toBeInTheDocument();
      expect(await screen.findByText("Please input your category!")).toBeInTheDocument();
    });
  })
  test("should show successful message and navigate to draft page after finishing and save draft",async () => {
    // 第一步：输入标题和副标题
    const titleInput = await screen.findByPlaceholderText("title");
    userEvent.type(titleInput, "NewsTitle");
    const subheadingInput = await screen.findByPlaceholderText("subheading");
    userEvent.type(subheadingInput, "Subheading");
    // 第二步：选择分类
    const categorySelect = await screen.findByRole("combobox");
    fireEvent.mouseDown(categorySelect);
    const categoryItem = await screen.findByText("时事新闻");
    userEvent.click(categoryItem);
    // 第三步：进入内容编辑步骤
    const secondNextButton = await screen.findByPlaceholderText("nextStep");
    expect(secondNextButton).toBeInTheDocument();
    userEvent.click(secondNextButton);
    await waitFor(
      async () => {
        expect(await screen.findByText(/上一步/)).toBeInTheDocument();
      }
    );
    // 第七步：处理富文本输入
    await waitFor(
      async () => {
        const draftContainer = await screen.findByPlaceholderText("react-draft-wysiwyg");
        expect(draftContainer).toBeInTheDocument();
        const editor = within(draftContainer).getByRole("textbox");
        expect(editor).toBeInTheDocument();
        fireEvent.change(editor, {
          target: { textContent: "Hello World" }
        });
        expect(editor.textContent).toBe("Hello World");
      }
    );
    // 第八步：进入提交步骤
    const finalNextButton = await screen.findByPlaceholderText("nextStep"); // 获取新按钮
    expect(finalNextButton).toBeInTheDocument();
    userEvent.click(finalNextButton);
    // 最终验证
    await waitFor(
      async () => {
        userEvent.click(await screen.findByPlaceholderText("saveDraft"));
      }
    );
    await waitFor(
      async () => {
        expect(await screen.findByText(/您可以到草稿箱中查看您的新闻/)).toBeInTheDocument();
        expect(mockedNavigate).toHaveBeenCalledWith("/news-manage/draft");
      }
    );
  },15000);
  test("should show successful message and navigate to newslist page after finishing and submitting",async () => {
    // 第一步：输入标题和副标题
    const titleInput = await screen.findByPlaceholderText("title");
    userEvent.type(titleInput, "NewsTitle");
    const subheadingInput = await screen.findByPlaceholderText("subheading");
    userEvent.type(subheadingInput, "Subheading");
    // 第二步：选择分类
    const categorySelect = await screen.findByRole("combobox");
    fireEvent.mouseDown(categorySelect);
    const categoryItem = await screen.findByText("时事新闻");
    userEvent.click(categoryItem);
    // 第三步：进入内容编辑步骤
    const secondNextButton = await screen.findByPlaceholderText("nextStep");
    expect(secondNextButton).toBeInTheDocument();
    userEvent.click(secondNextButton);
    await waitFor(
      async () => {
        expect(await screen.findByText(/上一步/)).toBeInTheDocument();
      }
    );
    // 第七步：处理富文本输入
    await waitFor(
      async () => {
        const draftContainer = await screen.findByPlaceholderText("react-draft-wysiwyg");
        expect(draftContainer).toBeInTheDocument();
        const editor = within(draftContainer).getByRole("textbox");
        expect(editor).toBeInTheDocument();
        fireEvent.change(editor, {
          target: { textContent: "Hello World" }
        });
        expect(editor.textContent).toBe("Hello World");
      }
    );
    // 第八步：进入提交步骤
    const finalNextButton = await screen.findByPlaceholderText("nextStep"); // 获取新按钮
    expect(finalNextButton).toBeInTheDocument();
    userEvent.click(finalNextButton);
    // 最终验证
    await waitFor(
      async () => {
        userEvent.click(await screen.findByPlaceholderText("submit"));
      }
    );
    await waitFor(
      async () => {
        expect(await screen.findByText(/您可以到审核列表中查看您的新闻/)).toBeInTheDocument();
        expect(mockedNavigate).toHaveBeenCalledWith("/audit-manage/list");
      }
    );
  },15000);
});
