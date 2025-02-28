import React from "react";
import Audit from "../sandbox/audit-manage/Audit";
import userEvent from "@testing-library/user-event";
import {
  screen,
  render,
  waitFor
} from "@testing-library/react";
import { Provider } from "react-redux";
import { fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { mockstore } from "../../test/mockStore";
describe("Audit Test", () => {
  beforeEach(() => {
    render(
      <Provider store={mockstore}>
        <MemoryRouter>
          <Audit />
        </MemoryRouter>
      </Provider>
    );
  });
  test("should show aduitHeader when render", async () => {
    expect(await screen.findByText(/新闻标题/)).toBeInTheDocument();
    expect(await screen.findByText(/新闻副标题/)).toBeInTheDocument();
    expect(await screen.findByText(/作者/)).toBeInTheDocument();
    expect(await screen.findByText(/新闻分类/)).toBeInTheDocument();
    expect(await screen.findByText(/操作/)).toBeInTheDocument();
  });
  test("should show notice after approving or rejecting news", async () => {
    await waitFor(() => {
      const newsTitle = screen.getByText(/周冠宇/);
      expect(newsTitle).toBeInTheDocument();
      const pass = screen.getByText(/通 过/);
      const reject = screen.getByText(/驳 回/);
      expect(pass).toBeInTheDocument();
      expect(reject).toBeInTheDocument();
      userEvent.click(pass);
    });
    await waitFor(() => {
      expect(screen.getAllByText(/您可以到【审核管理\/审核列表】中查看您的新闻的审核状态/)[0]).toBeInTheDocument();
    });
  });
});
