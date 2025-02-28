import React from "react";
import Detail from "../news/Detail";
import { screen, render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
describe("Detail Test",() => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <Detail history={{ param: { id: 140 } }} />
        </MemoryRouter>
      );
    });
    test("should show newsDetail header when render", async () => {
      await waitFor(
        () => {
          const creator = screen.getByText(/创建者：admin/);
          expect(creator).toBeInTheDocument();
          const newsTitle = screen.getByText(/热浪来袭/);
          expect(newsTitle).toBeInTheDocument();
          // const auditState = screen.getByText(/审核状态：/);
          // expect(auditState).toBeInTheDocument()
          // const publishState = screen.getByText(/发布状态：/);
          // expect(publishState).toBeInTheDocument()
          const region = screen.getByText(/区域：全球/);
          expect(region).toBeInTheDocument();
          const commentsCount = screen.getByText(/评论数量：/);
          expect(commentsCount).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });
    test("should increase starCount after liking", async () => {
      const starCount = await screen.findByText(/点赞数量：/);
      expect(starCount).toBeInTheDocument();
      const star = await screen.findByTestId("heart-icon");
      expect(star).toBeInTheDocument();
      userEvent.click(star);
      await waitFor(
        () => {
          const starNum = screen.getByText(/888/);
          expect(starNum).toBeInTheDocument();
        },
        { timeout: 5000 }
      );
    });
    test("should increase viewCount after render", async () => {
      const viewCount = await screen.findByText(/访问数量：/);
      expect(viewCount).toBeInTheDocument();
      await waitFor(
        () => {
          const viewNum = screen.getByText(/999/);
          expect(viewNum).toBeInTheDocument();
        },
        { timeout: 8000 }
      );
    });
  },
  25000
);
