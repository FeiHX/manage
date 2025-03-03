const cache = (req, res, data) => {
  res.setHeader("Cache-Control", "no-cache");
  const ifNoneMatch = req.headers["if-none-match"];
  let temp = JSON.parse(JSON.stringify(data))[0].content;
  let temp1 = temp ? temp : JSON.parse(JSON.stringify(data));
  let hash = require("crypto")
    .createHash("sha1")
    .update(JSON.stringify(temp1))
    .digest("base64");
  if (ifNoneMatch) {
    res.setHeader("Etag", hash);
    if (ifNoneMatch !== hash) {
      console.log("走协商缓存200");
      res.statusCode = 200;
      res.send(data);
    } else {
      console.log("走协商缓存304");
      res.statusCode = 304;
      res.end();
    }
  } else {
    console.log("第一次请求,设置Etag");
    res.setHeader("Etag", hash);
    res.send(data);
  }
};
module.exports = cache;
