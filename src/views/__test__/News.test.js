import React from "react";
import News from "../news/News";
import userEvent from "@testing-library/user-event";
import {
  act,
  screen,
  render,
  waitFor
} from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
// 模拟react-router-dom的useNavigate
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate 
}));
describe("News Test", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <withRoute>
          <News />
        </withRoute>
      </MemoryRouter>
    );
  });
  test("should show newsTitle in categoryTable when render", async () => {
    const news = screen.getByText(/新 闻/);
    expect(news).toBeInTheDocument();
    await waitFor(async() => {
      const category = screen.getByText(/环球经济/);
      expect(category).toBeInTheDocument();
      const newsTitle = screen.getByText(/离岸人民币/);
      expect(newsTitle).toBeInTheDocument();
    })
  });
  test("should navigate to newsDetail Page after searching news and clicking it", async () => {
    const search = screen.getByText(/请输入新闻关键词/);
    expect(search).toBeInTheDocument();
    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
    const backlogin = screen.getByText(/登 录/);
    expect(backlogin).toBeInTheDocument();
    await waitFor(async() => {
      const category = screen.getByText(/环球经济/);
      expect(category).toBeInTheDocument();
      const newsTitle = screen.getByText(/离岸人民币/);
      expect(newsTitle).toBeInTheDocument();
      userEvent.type(select, "京津冀");
      const newsTitleSearch = screen.getByText(/Main:京津冀/);
      expect(newsTitleSearch).toBeInTheDocument();
      const newsSubHeading = screen.getByText(/Sub:2024年北京市/);
      expect(newsSubHeading).toBeInTheDocument();
      userEvent.click(newsTitleSearch);
    });
    await waitFor(async() => {
      expect(mockedNavigate).toHaveBeenCalledWith("/detail/125");
    })
  });
  test("should navigate to login Page after clicking backLogin Button", async () => {
    const backlogin = screen.getByText(/登 录/);
    expect(backlogin).toBeInTheDocument();
    userEvent.click(backlogin);
    expect(mockedNavigate).toHaveBeenCalledWith('/login');
  });
});
