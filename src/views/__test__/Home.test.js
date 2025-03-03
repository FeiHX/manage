/**
 * @jest-environment jsdom
 */
import React from "react";
import Home from "../sandbox/home/Home";
import userEvent from "@testing-library/user-event";
import { act, screen, render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { mockstore } from "../../test/mockStore";

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate // 直接返回模拟函数
}));

describe("Home Test", () => {
  beforeEach(() => {
    render(
      <Provider store={mockstore}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
  });
  test("should show newsRank when render", async () => {
    const moreVisitorTitle = await screen.findByText(/用户最常浏览/);
    expect(moreVisitorTitle).toBeInTheDocument();
    const moreStarTitle = await screen.findByText(/用户点赞最多/);
    expect(moreStarTitle).toBeInTheDocument();
  });
  test("should navigate to newsPreview page after clicking newsRank", async () => {
    await waitFor(() => {
        const newsTitle = screen.getAllByText(/离岸人民币：与港股一起共舞/)[0];
        expect(newsTitle).toBeInTheDocument();
        userEvent.click(newsTitle);
      });
      await waitFor(async () => {
        expect(mockedNavigate).toHaveBeenCalledWith("/news-manage/preview/116");
      });
  });
});
