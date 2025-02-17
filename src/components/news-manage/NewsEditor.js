import React, { useEffect, useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw ,ContentState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs'
import { message } from 'antd';
import axios from 'axios'
import Axios from '../../utils/myAxios'
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
    const uploadImageCallBack=async function(files) {
        return new Promise(async(resolve, reject) => {
            if(!['image/jpeg','image/jpg',"image/png"].includes(files.type)) {
                reject({err:'文件类型不符'})
                message.error('文件类型不符') 
                return
            }
            // let _formData = new FormData();
            // _formData.append('file',files);
            // _formData.append('filename',files.name);
            // Axios({method:'post',url:'/api/files',headers: {'Content-Type': 'multipart/form-data'},data:_formData})
            //     .then(res => {
            //         if (res.data.code==0) {
            //                 resolve({ data: { link: res.data.fileLink } })
            //             } else {
            //                 reject(new Error(res.data.codeText)) 
            //             }
            //     })
            const fr = new FileReader()
            fr.readAsDataURL(files)
            fr.onload = function(event) {
                const {result:src} = event.target
                const image = new Image()
                image.src = src
                setTimeout(()=> {
                    let pressCanvas = document.createElement('canvas')
                    pressCanvas.width = image.width
                    pressCanvas.height = image.height
                    let ctx = pressCanvas.getContext('2d')
                    ctx.drawImage(image,0,0,image.width,image.height)
                    pressCanvas.toBlob((blob)=>{
                        let _formData = new FormData();
                        _formData.append('file',blob);
                        // _formData.append('filename',files.name);
                        Axios({method:'post',url:'/api/files',headers: {'Content-Type': 'multipart/form-data'},data:_formData})
                            .then(res => {
                                if(res.data.code==0) {
                                        resolve({ data: { link: res.data.fileLink } })
                                    }else {
                                        reject(new Error(res.data.codeText)) 
                                    }
                            })
                    },'image/jpeg',0.4)
                    // let newUrl = pressCanvas.toDataURL('image/jpeg',0.92)
                    // resolve({ data: { link: newUrl } }) 
                })
                 
            }
        })
    }
    return (
        
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
            />
        
  )
}

