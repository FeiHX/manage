import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditorComponent from './EditorComponent';

test('模拟输入文本', () => {
  render(<EditorComponent />);
  
  // 通过 contentEditable 角色获取编辑器
  const editor = screen.getByRole('textbox');
  
  // 直接输入文本（需 Draft.js 支持 DOM 事件）
  fireEvent.change(editor, { target: { textContent: 'Hello World' } });
  
  expect(editor.textContent).toBe('Hello World1');
});