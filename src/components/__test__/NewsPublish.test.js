import React from "react";
import NewsPublish from "../publish-manage/NewsPublish";
import { screen, render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { mockstore, dataSource } from "../../test/mockStore";
describe("NewsPublish Test", () => {
  test("should show newsList when render", async () => {
    render(
      <Provider store={mockstore}>
        <MemoryRouter>
          <NewsPublish dataSource={dataSource} button={() => {}} />
        </MemoryRouter>
      </Provider>
    );
    await waitFor(() => {
      const NewsTitle = screen.getByText("维生素D");
      expect(NewsTitle).toBeInTheDocument();
    });
  });
});
