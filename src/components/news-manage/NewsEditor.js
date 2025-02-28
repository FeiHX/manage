Axiosimport React, { useEffect, useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import Axios from "../../utils/myAxios";
import { message } from "antd";
export default function NewsEditor(props) {
  const [editorState, setEditorState] = useState("");
  useEffect(
    () => {
      const html = props.content;
      if (html === undefined) return;
      const contentBlock = htmlToDraft(html);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState);
        console.log(contentState);
      }
    },
    [props.content]
  );
  const onContentStateChange = content => {
    // contentState = content
    console.log(content);
  };
  const compressImage = files => {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.readAsDataURL(files);
      fr.onload = function(event) {
        const { result: src } = event.target;
        const image = new Image();
        image.src = src;
        setTimeout(() => {
          let pressCanvas = document.createElement("canvas");
          pressCanvas.width = image.width;
          pressCanvas.height = image.height;
          let ctx = pressCanvas.getContext("2d");
          ctx.drawImage(image, 0, 0, image.width, image.height);
          pressCanvas.toBlob(blob => resolve(blob), "image/jpeg", 0.8);
        });
      };
    });
  };
  const uploadChunks = async (blob, originalName) => {
    const chunkSize = 2 * 1024 * 1024; // 2MB
    const totalChunks = Math.ceil(blob.size / chunkSize);
    const uuid = Date.now().toString(36); // 生成唯一标识
    for (let i = 0; i < totalChunks; i++) {
      const chunk = blob.slice(i * chunkSize, (i + 1) * chunkSize);
      const formData = new FormData();
      formData.append("file", chunk);
      formData.append("filename", originalName);
      formData.append("chunkIndex", i);
      formData.append("totalChunks", totalChunks);
      formData.append("uuid", uuid);
      await Axios({
        method: "post",
        url: "/api/files",
        headers: { "Content-Type": "multipart/form-data" },
        data: formData
      });
    }
    const { data } = await Axios.post("/api/merge", {
      filename: originalName,
      uuid,
      totalChunks
    });
    return data.fileLink;
  };
  const uploadImageCallBack = async function(files) {
    return new Promise(async (resolve, reject) => {
      if (!["image/jpeg", "image/jpg", "image/png"].includes(files.type)) {
        console.log(files.type);
        reject({ err: "文件类型不符" });
        message.error("文件类型不符");
        return;
      }
      const compressedBlob = await compressImage(files);
      const fileUrl = await uploadChunks(compressedBlob, files.name);
      resolve({ data: { link: fileUrl } });
    });
  };
  return (
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={editorState => setEditorState(editorState)}
      onContentStateChange={onContentStateChange}
      onBlur={() => {
        props.getContent(
          draftToHtml(convertToRaw(editorState.getCurrentContent()))
        );
      }}
      toolbar={{
        image: {
          urlEnabled: true,
          uploadEnabled: true,
          alignmentEnabled: true, // 是否显示排列按钮 相当于text-align
          uploadCallback: uploadImageCallBack,
          previewImage: true,
          inputAccept: "image/*",
          alt: { present: false, mandatory: false, previewImage: true }
        }
      }}
    />
  );
}