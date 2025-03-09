import React, { useCallback, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState, Modifier } from "draft-js";
import draftToHtml from "draftjs-to-html";
import Axios from "../../utils/myAxios";
import { message } from "antd";

export default function NewsEditor(props) {
  const [editorState, setEditorState] = useState(() => {
    const initialContent = ContentState.createFromText("");
    const selection = initialContent.getSelectionAfter().merge({
      anchorOffset: 0,
      focusOffset: initialContent.getPlainText().length
    });
    const contentWithStyle = Modifier.applyInlineStyle(
      initialContent,
      selection,
      "fontsize-22"
    );
    return EditorState.createWithContent(contentWithStyle);
  });

  // 自定义块渲染器
  const mediaBlockRenderer = useCallback(block => {
    if (block.getType() === "atomic") {
      return {
        component: MediaComponent,
        editable: false
      };
    }
    return null;
  }, []);

  // 媒体组件（处理图片尺寸）
  const MediaComponent = useCallback(({ block, contentState }) => {
    const entity = contentState.getEntity(block.getEntityAt(0));
    if (!entity) return null;

    const { src, alt, width, height } = entity.getData();
    const maxWidth = 600; // 编辑器容器最大宽度

    const ratio = width / height;
    const adjustedWidth = Math.min(width, maxWidth);
    const adjustedHeight = adjustedWidth / ratio;

    return (
      <img
        src={src}
        alt={alt}
        style={{
          width: `${adjustedWidth}px`,
          height: `${adjustedHeight}px`,
          maxWidth: "100%",
          objectFit: "contain"
        }}
      />
    );
  }, []);

  // 清空编辑器内容（优化版）
  const clearEditor = useCallback(
    () => {
      const emptyContent = ContentState.createFromText("");
      const newState = EditorState.push(
        editorState,
        emptyContent,
        "remove-range"
      );
      setEditorState(EditorState.moveFocusToEnd(newState));
    },
    [editorState]
  );

  // 图片压缩（添加错误处理）
  const compressImage = useCallback(file => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith("image/")) {
        reject(new Error("Invalid file type"));
        return;
      }

      const reader = new FileReader();
      reader.onload = async e => {
        try {
          const img = new Image();
          img.src = e.target.result;

          await new Promise(resolve => {
            img.onload = resolve;
            img.onerror = () => reject(new Error("Image loading failed"));
          });

          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // 计算调整尺寸
          const maxDimension = 1000;
          let width = img.width;
          let height = img.height;

          if (width > height && width > maxDimension) {
            height *= maxDimension / width;
            width = maxDimension;
          } else if (height > maxDimension) {
            width *= maxDimension / height;
            height = maxDimension;
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            blob =>
              resolve({
                blob,
                width: canvas.width,
                height: canvas.height
              }),
            "image/jpeg",
            0.8
          );
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const uploadChunks = async (blob, originalName) => {
    const chunkSize = 2 * 1024 * 1024; // 2MB
    const totalChunks = Math.ceil(blob.size / chunkSize);
    const uuid = Date.now().toString(36); // 生成唯一标识
    const uploadPromises = [];
    for (let i = 0; i < totalChunks; i++) {
      const chunk = blob.slice(i * chunkSize, (i + 1) * chunkSize);
      const formData = new FormData();
      formData.append("file", chunk);
      formData.append("filename", originalName);
      formData.append("chunkIndex", i);
      formData.append("totalChunks", totalChunks);
      formData.append("uuid", uuid);
      uploadPromises.push(
        axios({
          method: "post",
          url: "/api/files",
          headers: { "Content-Type": "multipart/form-data" },
          data: formData
        })
      );
    }
    await Promise.all(uploadPromises);
    const { data } = await axios.post("/api/merge", {
      filename: originalName,
      uuid,
      totalChunks
    });
    return data.fileLink;
  };

  // 上传回调
  const uploadImageCallBack = useCallback(
    async file => {
      try {
        const { blob } = await compressImage(file);
        const fileUrl = await uploadChunks(blob, file.name);

        return { data: { link: fileUrl } };
      } catch (error) {
        message.error(`上传失败: ${error.message}`);
        throw error;
      }
    },
    [editorState, compressImage]
  );
  // 处理编辑器失焦事件
  const handleBlur = useCallback(
    () => {
      const content = draftToHtml(
        convertToRaw(editorState.getCurrentContent())
      );
      props.getContent(content);
    },
    [editorState, props]
  );

  return (
    <div className="fixed-toolbar-wrapper">
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="fixed-toolbar-wrapper"
        editorClassName="fixed-font-editor"
        onEditorStateChange={setEditorState}
        onBlur={handleBlur}
        customBlockRenderFunc={mediaBlockRenderer}
        toolbar={{
          ...(props.options && { options: props.options }),
          image: {
            urlEnabled: true,
            uploadEnabled: true,
            alignmentEnabled: true,
            uploadCallback: uploadImageCallBack,
            previewImage: true,
            inputAccept: "image/*",
            defaultSize: {
              width: "auto",
              height: "auto",
              ratio: "original"
            },
            alt: { present: false, mandatory: false }
          }
        }}
        wrapperStyle={{
          outline: "none",
          tabIndex: -1
        }}
        // 输入处理
        handleBeforeInput={(char, editorState) => {
          const allowedChars = /[\p{Unified_Ideograph}\d\w,\.\?!@#\$%^&*()\-+=]/u;
          return allowedChars.test(char) ? "not-handled" : "handled";
        }}
      />
      {props.children && props.children(clearEditor)}
    </div>
  );
}
