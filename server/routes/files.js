const fs = require("fs-extra");
const express = require("express");
const router = express.Router();
const sqlFn = require("../mysql");
const multiparty = require("multiparty");
const path = require("path");
const uploadDir = `${__dirname}/upload`;
const parentDir = path.join(__dirname, "/..");
const parentDir1 = path.join(parentDir, "public/upload/");
const multiparty_upload = function multiparty_upload(req, auto) {
  typeof auto !== "boolean" ? (auto = false) : null;
  let config = {
    maxFieldsSize: 200 * 1024 * 1024
  };
  if (auto) {
    config.uploadDir = parentDir1;
  }
  return new Promise(async (resolve, reject) => {
    // await delay();
    new multiparty.Form(config).parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ fields, files });
    });
  });
};
router.post("/files", async (req, res) => {
  try {
    const { fields, files } = await multiparty_upload(req, false);
    console.log(files);
    // 获取分片信息
    const filename = fields.filename[0];
    const uuid = fields.uuid[0];
    const chunkIndex = parseInt(fields.chunkIndex[0]);
    const totalChunks = parseInt(fields.totalChunks[0]);
    // 创建临时目录
    const tempDir = path.join(parentDir1, `${filename}_${uuid}`);
    await fs.ensureDir(tempDir);
    // 保存分片文件
    const chunkPath = path.join(tempDir, `${chunkIndex}`);
    await fs.move(files.file[0].path, chunkPath, { overwrite: true });
    res.send({
      code: 0,
      codeText: "Chunk upload success",
      chunkIndex
    });
  } catch (err) {
    res.status(500).send({
      code: -1,
      codeText: "Upload failed"
    });
  }
});
router.post("/merge", async (req, res) => {
  console.log('filename, uuid, totalChunks:',[filename, uuid, totalChunks])
  const { filename, uuid, totalChunks } = req.body;
  const tempDir = path.join(parentDir1, `${filename}_${uuid}`);
  const targetPath = path.join(parentDir1, filename);
  try {
    // 验证分片完整性
    const chunks = await fs.readdir(tempDir);
    if (chunks.length !== totalChunks) {
      throw new Error("Missing chunks");
    }
    // 按序号排序分片
    const sortedChunks = chunks
      .map(name => parseInt(name))
      .sort((a, b) => a - b);
    // 流式合并
    const writeStream = fs.createWriteStream(targetPath);
    for (const chunkIndex of sortedChunks) {
      const chunkPath = path.join(tempDir, chunkIndex.toString());
      await new Promise(resolve => {
        const readStream = fs.createReadStream(chunkPath);
        readStream.pipe(writeStream, { end: false });
        readStream.on("end", () => {
          fs.unlinkSync(chunkPath);
          resolve();
        });
      });
    }
    // 完成合并
    writeStream.end();
    await fs.rmdir(tempDir); // 删除临时目录
    res.send({
      code: 0,
      codeText: "Merge success",
      fileLink: "api/" + filename
    });
  } catch (err) {
    await fs.remove(tempDir).catch(console.error);
    res.status(500).send({
      code: -1,
      codeText: "Merge failed"
    });
  }
});
module.exports = router;
