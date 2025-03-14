const express = require("express");
const router = express.Router();
const expressWs = require("express-ws")(router);

const sqlFn = require("../mysql");
const jwt = require("jsonwebtoken");
const { jwtSecret, expiresIn } = require("./config");
// const authMiddleware = require('../middlewares/auth')
const cache = require("../middlewares/cache");
const NodeRSA = require("node-rsa");
const bcrypt = require("bcryptjs");
const { RsaAes } = require("../utils/RsaAes");
const authMiddleware = require("../middlewares/auth");
router.use(authMiddleware);

//1.创建RSA对象，并指定 秘钥长度
var key = new NodeRSA({ b: 512 });
key.setOptions({ encryptionScheme: "pkcs1" }); //指定加密格式

//2.生成 公钥私钥，使用 pkcs8标准，pem格式
var publicPem = key.exportKey("pkcs8-public-pem"); //制定输出格式
var privatePem = key.exportKey("pkcs8-private-pem");
var pubKey =  `-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAI4Sd1JVtIIrHDoMcknO6iva2+iAMPFo
Jx+dGrjlgvcYdyePwPJft1ZB4WkZb/vRHN8UKn123CV5B2XolmqrDv0CAwEAAQ==
-----END PUBLIC KEY-----`
const priKey =
"-----BEGIN PRIVATE KEY-----\n" +
"MIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEAjhJ3UlW0giscOgxy\n" +
"Sc7qK9rb6IAw8WgnH50auOWC9xh3J4/A8l+3VkHhaRlv+9Ec3xQqfXbcJXkHZeiW\n" +
"aqsO/QIDAQABAkBwCF/PrYYKn7RCkk4Npf1DV/LSBUSTGW7An0LTSylbb+HKp73X\n" +
"QUeALkJ3ranLe3UBiAGXZq4IywuDVSu9I4yBAiEAzoY9O1TRcQt8QdG6wNjB5VQM\n" +
"zmkTtMzicBEu2JtCu7cCIQCwG31HUw7+emB6eDiiLDor/IoeQxujEZu4tMgXcDky\n" +
"6wIhAMuT8+P6dgJzCedvsCHNCUTgF0eYuL4ugL9rkLwgQCX9AiAwLYULYyyh78a/\n" +
"Gm6b5y+O4wrCFqfT57hLQqHOz7PGOwIgPN0W26+BrhXIaazkCEf0/qz95cwHEdgl\n" +
"Sc6Jev4DrBw=\n" +
"-----END PRIVATE KEY-----";

router.ws('/websocket/pubKey',(ws,req )=> {
  ws.send(publicPem)
})

router.get("/users", (req, res) => {
  const sql = `select * from user`;
  sqlFn(sql, [], function(data) {
    cache(req, res, data);
  });
});
router.delete("/users", authMiddleware, (req, res) => {
  const sql = "delete from user where `id` = ? ";
  const arr = [req.query.id];
  sqlFn(sql, arr, function() {
    res.send("删除成功");
  });
});
router.patch("/users", (req, res) => {
  const { id, roleState } = req.body;
  const sql = "update user set `roleState`=? where `id`=?";
  const arr = [roleState, id];
  sqlFn(sql, arr, function() {
    res.send("修改成功");
  });
});
router.put("/users", async (req, res) => {
  const {
    username,
    region,
    roleId,
    encryptedAesKey,
    encryptedData,
    iv
  } = req.body;
  let searchsql = "select * from user where `username`=? AND `id`!=?";
  sqlFn(searchsql, [username, req.query.id], async function(data) {
    if (data.length) {
      res.send("用户名已被占用-修改失败");
    } else {

      const { password } = RsaAes(priKey, encryptedAesKey, encryptedData, iv);
      const sql =
        "update user set `username`=?  , `password`=?  ,  `region`=?  , `roleId`=? where `id`=?";
      const arr = [
        username,
        await bcrypt.hash(password, 10),
        region,
        roleId,
        req.query.id
      ];
      sqlFn(sql, arr, function() {
        res.send("修改成功");
      });
    }
  });
});
router.post("/users", (req, res) => {
  // const { username, password } = req.body;
  const { username, encryptedAesKey, encryptedData, iv } = req.body;
  const { password } = RsaAes(priKey, encryptedAesKey, encryptedData, iv);
  const sql = "select * from user where `username`=?";
  const arr = [username];
  sqlFn(sql, arr, async function(data) {
    data = JSON.parse(JSON.stringify(data));
    if (data.length == 0) {
      return res.status(400).json("用户不存在！");
    }
    if (!data[0].roleState) {
      return res.status(401).json("账号被封禁，请联系管理员！");
    }
    if (!await bcrypt.compare(password, data[0].password)) {
      return res.status(400).json("密码错误！");
    }
    const token = jwt.sign(
      {
        id: data[0].id,
        username: data[0].username,
        roleId: data[0].roleId,
        region: data[0].region,
        role: data[0].role
      },
      jwtSecret,
      { expiresIn }
    );
    res.send({ token: token, expiresIn: expiresIn });
  });
});
router.post("/users/otherlogin", async (req, res) => {
  const { username, password } = req.body;
  const sql = "select * from user where `username`=? AND `password`=?";
  const arr = [username, password];
  sqlFn(sql, arr, async function(data) {
    data = JSON.parse(JSON.stringify(data));
    if (data.length == 0) {
      return res.status(400).json("用户不存在！");
    }
    if (!data[0].roleState) {
      return res.status(401).json("账号被封禁，请联系管理员！");
    }
    if (!await bcrypt.compare(password, data[0].password)) {
      return res.status(400).json("密码错误！");
    }
    const token = jwt.sign(
      {
        id: data[0].id,
        username: data[0].username,
        roleId: data[0].roleId,
        region: data[0].region,
        role: data[0].role
      },
      jwtSecret,
      { expiresIn: 60 }
    );
    res.send({ token: token, expiresIn: 60 });
  });
});
router.post("/users/adduser", (req, res) => {
  let {
    username,
    roleId,
    region,
    role,
    roleState,
    roleDefault,
    encryptedAesKey,
    iv,
    encryptedData
  } = req.body;
  let searchsql = "select * from user where `username`=?";
  sqlFn(searchsql, [username], async function(data) {
    if (data.length) {
      res.send("用户名已被占用-注册失败");
    } else {
      const { password } = RsaAes(priKey, encryptedAesKey, encryptedData, iv);
      let sql =
        "insert into user (`username`,`password`,`roleId`,`region`,`role`,`roleState`,`roleDefault`) values (?,?,?,?,?,?,?)";
      let arr = [
        username,
        await bcrypt.hash(password, 10),
        roleId,
        region,
        role,
        roleState,
        roleDefault
      ];
      sqlFn(sql, arr, function(data) {
        res.send("用户添加成功");
      });
    }
  });
});
module.exports = router;
