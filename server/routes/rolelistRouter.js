const express = require("express");
const router = express.Router();
const sqlFn = require("../mysql");

const authMiddleware = require("../middlewares/auth");
router.use(authMiddleware);

router.get("/rolelist", (req, res) => {
  const sql = `select * from rolesrightsmenu`;
  sqlFn(sql, [], function(data) {
    res.send(data);
  });
});
router.delete("/rolelist", (req, res) => {
  const sql = "delete from rolesrightsmenu where `id` = ? ";
  const arr = [req.query.id];
  sqlFn(sql, arr, function() {
    res.send("删除成功");
  });
});
router.patch("/rolelist", (req, res) => {
  const sql = "update rolesrightsmenu set `rights`= ? where `id`= ?";
  const arr = [req.body.rights.join(), req.query.id];
  console.log(arr);
  sqlFn(sql, arr, function() {
    res.send("修改成功");
  });
});
router.patch("/rolelist/related", (req, res) => {
  const { rolelist } = req.body;
  const sql1 = "update rolesrightsmenu set `rights`= ? where `id`= ?";
  const arr1 = [rolelist[0].rights.join(), 1];
  sqlFn(sql1, arr1, function() {});
  const sql2 = "update rolesrightsmenu set `rights`= ? where `id`= ?";
  const arr2 = [rolelist[1].rights.join(), 2];
  sqlFn(sql2, arr2, function() {});
  const sql3 = "update rolesrightsmenu set `rights`= ? where `id`= ?";
  const arr3 = [rolelist[2].rights.join(), 3];
  sqlFn(sql3, arr3, function() {
    res.send("修改成功");
  });
});
router.post("/rolelist/restore", (req, res) => {
  const sql1 = "delete from rolesrightsmenu";
  const arr1 = [];
  sqlFn(sql1, arr1, function() {});
  req.body.map(data => {
    let sql =
      "insert into rolesrightsmenu (`id`,`roleType`,`roleName`,`rights`) values (?,?,?,?)";
    let arr = [data.id, data.roleType, data.roleName, data.rights];
    sqlFn(sql, arr, function() {});
  });
  res.send("初始化成功");
});
module.exports = router;
