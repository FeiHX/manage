// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// import { TextEncoder, TextDecoder } from 'util';

// // 设置全局变量
// global.TextEncoder = TextEncoder;
// global.TextDecoder = TextDecoder;
// import 'text-encoding';
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false, // 默认不匹配
      media: query,
      onchange: null,
      addListener: jest.fn(), // 兼容旧版
      removeListener: jest.fn(), // 兼容旧版
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
import "@testing-library/jest-dom";
import { server } from "./mocks/server";

import Enzyme from "enzyme";
const Adapter = require('@cfaester/enzyme-adapter-react-18').default;
// import enableHooks from 'jest-react-hooks-shallow';

// import 'text-encoding';
// import { TextEncoder, TextDecoder } from '@types/text-encoding';

// global.TextEncoder = TextEncoder;
// global.TextDecoder = TextDecoder;


beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());





// jest-react-hooks-shallow
// pass an instance of jest to `enableHooks()`
// This package makes React Hooks (namely, useEffect() and useLayoutEffect()) work with shallow rendering. 
// In other words, you can use enzyme.
// enableHooks(jest);

Enzyme.configure({
	adapter: new Adapter(),
	// disableLifecycleMethods: true, // only run when declared
});

