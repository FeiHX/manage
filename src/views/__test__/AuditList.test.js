import React from "react";
import AuditList from "../sandbox/audit-manage/AuditList";
import userEvent from "@testing-library/user-event";
import {
  screen,
  render as render,
  waitFor
} from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { mockstore } from "../../test/mockStore";
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate 
}));
describe("AduitList Test", () => {
  beforeEach(() => {
    render(
      <Provider store={mockstore}>
        <MemoryRouter>
          <AuditList />
        </MemoryRouter>
      </Provider>
    );
  });
  test("should show aduitListHeader when render", async () => {
    expect(await screen.findByText(/新闻标题/)).toBeInTheDocument();
    expect(await screen.findByText(/新闻副标题/)).toBeInTheDocument();
    expect(await screen.findByText(/作者/)).toBeInTheDocument();
    expect(await screen.findByText(/新闻分类/)).toBeInTheDocument();
    expect(await screen.findByText(/审核状态/)).toBeInTheDocument();
    expect(await screen.findByText(/操作/)).toBeInTheDocument();
  });
  test("should show successful notice after publishing news", async () => {
    await waitFor(() => {
      const newsTitle = screen.getByText(/周冠宇/);
      expect(newsTitle).toBeInTheDocument();
      const publish = screen.getByText(/发 布/);
      expect(publish).toBeInTheDocument();
      const revoke = screen.getByText(/撤 销/);
      expect(revoke).toBeInTheDocument();
      userEvent.click(publish);
    });
    await waitFor(() => {
      expect(screen.getByText(/您可以到【发布管理\/已发布】中查看您的新闻/)).toBeInTheDocument();
      expect(mockedNavigate).toHaveBeenCalledWith("/publish-manage/published");
    });
  });
  test("should show successful notice after revoking news", async () => {
    await waitFor(() => {
      const newsTitle = screen.getByText(/辽宁大胜广东/);
      expect(newsTitle).toBeInTheDocument();
      const revoke = screen.getByText(/撤 销/);
      expect(revoke).toBeInTheDocument();
      userEvent.click(revoke);
    });
    await waitFor(() => {
      expect(screen.getByText(/您可以到【草稿箱】中查看您的新闻/)).toBeInTheDocument();
    });
  });
});
