import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NewsEditor from "../news-manage/NewsEditor";
describe("NewsEditor Test", () => {
  test("should show newscontent after typing", () => {
    render(<NewsEditor />);

    // 通过 contentEditable 角色获取编辑器
    const editor = screen.getByRole("textbox");

    // 直接输入文本
    fireEvent.change(editor, { target: { textContent: "Hello World" } });

    expect(editor.textContent).toBe("Hello World");
  });
});







