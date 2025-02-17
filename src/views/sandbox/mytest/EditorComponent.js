import React, { useState } from 'react';
import { Editor, EditorState } from 'draft-js';

const EditorComponent = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  return (
    <Editor
      editorState={editorState}
      onChange={setEditorState}
      placeholder="输入内容..."
    />
  );
};

export default EditorComponent;