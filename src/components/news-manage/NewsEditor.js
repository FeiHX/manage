import React, { useEffect, useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw ,ContentState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs'
import axios from 'axios'
export default function NewsEditor(props) {
    const [editorState,setEditorState] = useState('')
    useEffect(()=>{
        const html = props.content;
        if(html===undefined) return;
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            setEditorState(editorState)
        }
    },[props.content])
    const uploadImageCallBack=async function(files){
        return new Promise(
          async(resolve, reject) => {
            let _formData = new FormData();
            _formData.append('file',files);
            _formData.append('filename',files.name);
            axios({method:'post',url:'/api/files',headers: {'Content-Type': 'multipart/form-data'},data:_formData})
                .then(res => {
                    if (1) {
                            console.log(res.data)
                            resolve({ data: { link: res.data.fileLink } })
                        } else {
    
                        }
                })
          }
        )
      }
    return (
        <div>
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={(editorState)=>setEditorState(editorState)}
                onBlur={()=>{
                    props.getContent(draftToHtml(convertToRaw(editorState.getCurrentContent())))
                }}
                toolbar={{
                    image: {
                        urlEnabled: true,
                        uploadEnabled: true,
                        alignmentEnabled: true,   // 是否显示排列按钮 相当于text-align
                        uploadCallback: uploadImageCallBack,
                        previewImage: true,
                        inputAccept: 'image/gif,image/jpeg,image/jpg,image/png',
                        alt: {present: false, mandatory: false,previewImage: true}
                    },
                  }}
            />;
        </div>
  )
}

