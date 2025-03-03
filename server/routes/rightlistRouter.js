const express = require("express");
const router = express.Router();
const sqlFn = require("../mysql");

const authMiddleware = require("../middlewares/auth");
router.use(authMiddleware);

router.get("/rightlist", (req, res) => {
  const sql = `select * from rightsmenu`;
  sqlFn(sql, [], function(data) {
    res.send(data);
  });
});
router.delete("/rightlist", (req, res) => {
  const sql = "delete from rightsmenu where `id` = ? ";
  const arr = [req.query.id];
  sqlFn(sql, arr, function() {
    res.send("删除成功");
  });
});
router.patch("/rightlist", (req, res) => {
  const sql = "update rightsmenu set `pagepermission`=? where `id`=?";
  const arr = [req.body.pagepermission, req.query.id];
  sqlFn(sql, arr, function() {
    res.send("修改成功");
  });
});
router.post("/rightlist/restore", (req, res) => {
  const sql1 = "delete from rightsmenu";
  const arr1 = [];
  sqlFn(sql1, arr1, function() {});
  req.body.map(data => {
    let sql =
      "insert into rightsmenu (`id`,`title`,`rightKey`,`pagepermission`,`grade`) values (?,?,?,?,?)";
    let arr = [
      data.id,
      data.title,
      data.rightKey,
      data.pagepermission,
      data.grade
    ];
    sqlFn(sql, arr, function() {});
  });
  res.send("初始化成功");
});
module.exports = router;
