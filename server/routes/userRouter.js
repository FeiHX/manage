const express = require("express");
const router = express.Router();
const sqlFn = require("../mysql");
const jwt = require("jsonwebtoken");
const { jwtSecret, expiresIn } = require("./config");
// const authMiddleware = require('../middlewares/auth')
const cache = require("../middlewares/cache");
const NodeRSA = require("node-rsa");
const WebSocket = require("ws");

const authMiddleware = require("../middlewares/auth");
router.use(authMiddleware);

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
router.put("/users", (req, res) => {
  const { username, password, region, roleId } = req.body;
  let searchsql = "select * from user where `username`=? AND `id`!=?";
  sqlFn(searchsql, [username, req.query.id], function(data) {
    if (data.length) {
      res.send("用户名已被占用-修改失败");
    } else {
      const sql =
        "update user set `username`=?  , `password`=?  ,  `region`=?  , `roleId`=? where `id`=?";
      const arr = [username, password, region, roleId, req.query.id];
      sqlFn(sql, arr, function() {
        res.send("修改成功");
      });
    }
  });
});
router.post("/users", (req, res) => {
  const { username, password } = req.body;
  const sql = "select * from user where `username`=? AND `password`=?";
  const arr = [username, password];
  sqlFn(sql, arr, function(data) {
    data = JSON.parse(JSON.stringify(data));
    if (data.length > 0) {
      if (data[0].roleState) {
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
      } else {
        res.status(400).send("账号被封禁，请联系管理员！");
      }
    } else {
      res.status(400).send("用户名或者密码错误！");
    }
  });
});
router.post("/users/otherlogin", (req, res) => {
  const { username, password } = req.body;
  const sql = "select * from user where `username`=? AND `password`=?";
  const arr = [username, password];
  sqlFn(sql, arr, function(data) {
    data = JSON.parse(JSON.stringify(data));
    if (data.length > 0) {
      if (data[0].roleState) {
        const token = jwt.sign(
          {
            id: data[0].id,
            username: data[0].username,
            roleId: data[0].roleId,
            region: data[0].region,
            role: data[0].role
          },
          jwtSecret,
          { expiresIn: 10 }
        );
        res.send({ token: token, expiresIn: 60 });
      } else {
        res.status(400).send("账号被封禁，请联系管理员！");
      }
    } else {
      res.status(400).send("用户名或者密码错误！");
    }
  });
});
router.post("/users/adduser", (req, res) => {
  let {
    username,
    password,
    roleId,
    region,
    role,
    roleState,
    roleDefault
  } = req.body;
  let searchsql = "select * from user where `username`=?";
  sqlFn(searchsql, [username], function(data) {
    if (data.length) {
      res.send("用户名已被占用-注册失败");
    } else {
      let sql =
        "insert into user (`username`,`password`,`roleId`,`region`,`role`,`roleState`,`roleDefault`) values (?,?,?,?,?,?,?)";
      let arr = [
        username,
        password,
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
