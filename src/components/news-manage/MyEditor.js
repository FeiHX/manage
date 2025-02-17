import React, { useState } from 'react';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

const MyEditor = ({ onChange }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorChange = (state) => {
    setEditorState(state);
    if (onChange) {
      onChange(state);
    }
  };

  return (
    <Editor
      editorState={editorState}
      onChange={handleEditorChange}
    />
  );
};

export default MyEditor;