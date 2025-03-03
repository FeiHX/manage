Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false, // 默认不匹配
    media: query,
    onchange: null,
    addListener: jest.fn(), // 兼容旧版
    removeListener: jest.fn(), // 兼容旧版
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});
import "@testing-library/jest-dom";
import { server } from "./mocks/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
