// import React from 'react';
// import { mount } from 'enzyme';
// import EditorComponent from './EditorComponent';
// import { EditorState, ContentState } from 'draft-js';
// import { Editor } from 'draft-js';
// describe('Draft.js Editor 测试', () => {
//   let wrapper;

//   beforeEach(() => {
//     wrapper = mount(<EditorComponent />);
//   });

//   afterEach(() => {
//     wrapper.unmount();
//   });

//   test('模拟用户输入文本', () => {
//     // 获取 Editor 组件的实例
//     const editor = wrapper.find(Editor);

//     // 创建一个新的 ContentState（模拟输入内容）
//     const newContent = ContentState.createFromText('Hello World');
//     const newEditorState = EditorState.createWithContent(newContent);

//     // 手动触发 Editor 的 onChange 回调
//     editor.prop('onChange')(newEditorState);

//     // 强制更新组件以应用新状态
//     wrapper.update();

//     // 验证组件状态是否更新
//     const updatedEditorState = editor.prop('editorState');
//     const plainText = updatedEditorState.getCurrentContent().getPlainText();
//     expect(plainText).toBe('Hello World');
//   });
// });


import React from 'react';
import { mount } from 'enzyme';
import EditorComponent from './EditorComponent';
import { Editor } from 'draft-js'; // ✅ 导入 Editor 类
import { EditorState, ContentState } from 'draft-js';

describe('Draft.js Editor 测试', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<EditorComponent />);
  });
  test('调试组件结构', () => {
    const wrapper = mount(<EditorComponent />);
    console.log(wrapper.debug()); // ✅ 查看渲染的 HTML 结构
  });
  test('模拟用户输入文本', () => {
    // ✅ 正确获取 Editor 组件实例
    const editor = wrapper.find(Editor);
    expect(editor).toHaveLength(1); // 确保找到组件

    // 构造新的 EditorState
    const newContent = ContentState.createFromText('Hello World');
    const newEditorState = EditorState.createWithContent(newContent);

    // 触发 onChange
    editor.prop('onChange')(newEditorState);
    wrapper.update();

    // 验证内容更新
    const updatedState = editor.prop('editorState');
    expect(updatedState.getCurrentContent().getPlainText()).toBe('Hello World');
  });
});



// import React from 'react';
// import { mount } from 'enzyme';
// import EditorComponent from './EditorComponent';
// import { Editor } from 'draft-js';
// import { EditorState, ContentState } from 'draft-js';

// describe('Draft.js Editor 测试', () => {
//   let wrapper;

//   beforeEach(() => {
//     wrapper = mount(<EditorComponent />);
//   });

//   test('模拟用户输入文本', () => {
//     // ✅ 直接访问组件实例并更新状态
//     const componentInstance = wrapper.instance();
//     const newContent = ContentState.createFromText('Hello World');
//     const newEditorState = EditorState.createWithContent(newContent);

//     // 强制更新组件的 editorState
//     componentInstance.setState({ editorState: newEditorState });
//     wrapper.update();

//     // ✅ 验证状态更新
//     const updatedState = componentInstance.state.editorState;
//     expect(updatedState.getCurrentContent().getPlainText()).toBe('Hello World');

//     // ✅ 验证 DOM 是否渲染内容（可选）
//     const editorDOM = wrapper.find('.public-DraftEditor-content').getDOMNode();
//     expect(editorDOM.textContent).toContain('Hello World');
//   });
// });