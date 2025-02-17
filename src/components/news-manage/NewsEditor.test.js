
import React from 'react';
import { render, screen, fireEvent,waitFor } from '@testing-library/react';
import NewsEditor from './NewsEditor';

test('模拟输入文本', () => {
  render(<NewsEditor />)
  
  // 通过 contentEditable 角色获取编辑器
  const editor = screen.getByRole('textbox');
  
  // 直接输入文本（需 Draft.js 支持 DOM 事件）
  fireEvent.change(editor, { target: { textContent: 'Hello World' } });
  
  expect(editor.textContent).toBe('Hello World');
});
// test('集成测试应验证内容回调', async () => {
//   const mockGetContent = jest.fn();
  
//   render(<NewsEditor getContent={mockGetContent} />);
//   const editor = screen.getByRole('textbox');
//   fireEvent.input(editor, {
//     target: { textContent: '测试内容' }
//   });

//   await waitFor(() => {
//     expect(mockGetContent).toHaveBeenCalledWith(
//       expect.stringContaining('测试内容')
//     );
//   });
// });
// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import NewsEditor from './NewsEditor';
// import axios from 'axios';
// import { EditorState, convertToRaw ,ContentState} from 'draft-js';
// // Mock 第三方组件和工具
// jest.mock('react-draft-wysiwyg', () => ({
//   Editor: jest.fn(({ toolbar, onBlur }) => (
//     <div data-testid="editor-mock">
//       <button onClick={onBlur}>Trigger Blur</button>
//     </div>
//   ))
// }));

// jest.mock('antd', () => ({
//   message: {
//     error: jest.fn()
//   }
// }));

// jest.mock('../../utils/myaxios', () => ({
//   __esModule: true,
//   default: jest.fn()
// }));

// describe('NewsEditor 组件测试', () => {
//   const mockGetContent = jest.fn();
//   const mockContent = '<p>初始内容</p>';

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   // 基础渲染测试
//   test('应正确渲染编辑器', () => {
//     render(<NewsEditor getContent={mockGetContent} />);
//     expect(screen.getByTestId('editor-mock')).toBeInTheDocument();
//   });

//   // 初始内容加载测试
//   test('应正确初始化内容', async () => {
//     render(<NewsEditor getContent={mockGetContent} content={mockContent} />);
    
//     // 验证 HTML 转换逻辑被调用
//     await waitFor(() => {
//       expect(EditorState.createWithContent).toHaveBeenCalled();
//     });
//   });

//   // 内容更新测试
//   test('内容更新应触发回调', async () => {
//     render(<NewsEditor getContent={mockGetContent} />);
    
//     fireEvent.click(screen.getByText('Trigger Blur'));
    
//     await waitFor(() => {
//       expect(mockGetContent).toHaveBeenCalled();
//     });
//   });

//   // 图片上传测试
//   describe('图片上传功能', () => {
//     const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });

//     test('应拒绝无效文件类型', async () => {
//       const invalidFile = new File(['test'], 'test.txt', { type: 'text/plain' });
//       const { uploadCallback } = getToolbarConfig();
      
//       await expect(uploadCallback(invalidFile)).rejects.toEqual({ err: '文件类型不符' });
//       expect(message.error).toHaveBeenCalledWith('文件类型不符');
//     });

//     test('应正确处理图片压缩和上传', async () => {
//       const mockResponse = { data: { code: 0, fileLink: 'http://test.com/image.jpg' } };
//       axios.mockResolvedValue(mockResponse);
      
//       const { uploadCallback } = getToolbarConfig();
//       const result = await uploadCallback(mockFile);
      
//       expect(result).toEqual({ data: { link: 'http://test.com/image.jpg' } });
//       expect(axios).toHaveBeenCalledWith(expect.objectContaining({
//         method: 'post',
//         url: '/api/files'
//       }));
//     });

//     test('应处理上传失败情况', async () => {
//       const errorResponse = { data: { code: 500, codeText: '上传失败' } };
//       axios.mockRejectedValue(errorResponse);
      
//       const { uploadCallback } = getToolbarConfig();
      
//       await expect(uploadCallback(mockFile)).rejects.toThrow('上传失败');
//     });
//   });

//   // 辅助函数获取工具栏配置
//   function getToolbarConfig() {
//     const EditorMock = require('react-draft-wysiwyg').Editor;
//     const lastCall = EditorMock.mock.calls[EditorMock.mock.calls.length - 1];
//     return lastCall[0].toolbar.image;
//   }
// });