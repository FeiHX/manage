import React, { useEffect, useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw ,ContentState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs'
export default function NewsEditor(props) {
  useEffect(()=>{
    // console.log(props.content)
    const html = props.content;
    
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
    
    }
  },[props.content])

  const [editorState,setEditorState] = useState('')
  return (
    <div>
        <Editor
  editorState={editorState}
  toolbarClassName="toolbarClassName"
  wrapperClassName="wrapperClassName"
  editorClassName="editorClassName"
  onEditorStateChange={(editorState)=>setEditorState(editorState)}
  onBlur={()=>{
    // console.log()
    props.getContent(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  }}
/>;
    </div>
  )
}
