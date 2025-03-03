const express = require("express");
const router = express.Router();
const sqlFn = require("../mysql");

const authMiddleware = require("../middlewares/auth");
router.use(authMiddleware);

router.get("/rightlistchildren", (req, res) => {
  const sql = `select * from rightsmenuchildren`;
  sqlFn(sql, [], function(data) {
    res.send(data);
  });
});
router.delete("/rightlistchildren", (req, res) => {
  const sql = "delete from rightsmenuchildren where `id` = ? ";
  const arr = [req.query.id];
  sqlFn(sql, arr, function() {
    res.send("删除成功");
  });
});
router.delete("/rightlistchildren/related", (req, res) => {
  const sql = "delete from rightsmenuchildren where `rightId` = ? ";
  const arr = [req.query.rightId];
  sqlFn(sql, arr, function() {
    res.send("删除成功");
  });
});
router.patch("/rightlistchildren", (req, res) => {
  const sql = "update rightsmenuchildren set `pagepermission`=? where `id`=?";
  const arr = [req.body.pagepermission, req.query.id];
  sqlFn(sql, arr, function() {
    res.send("修改成功");
  });
});
router.patch("/rightlistchildren/related", (req, res) => {
  // const sql = "update rightsmenuchildren set `pagepermission`=? where`rightId` = ?"
  const sql =
    "update rightsmenuchildren set `pagepermission`=? where (`rightId` = ?)  AND (`pagepermission` != 2)";
  const arr = [req.body.pagepermission, req.query.rightId];
  sqlFn(sql, arr, function() {
    res.send("修改成功");
  });
});
router.post("/rightlistchildren/restore", (req, res) => {
  const sql1 = "delete from rightsmenuchildren";
  const arr1 = [];
  sqlFn(sql1, arr1, function() {});
  req.body.map(data => {
    let sql =
      "insert into rightsmenuchildren (`id`,`title`,`rightId`,`rightKey`,`pagepermission`,`grade`) values (?,?,?,?,?,?)";
    let arr = [
      data.id,
      data.title,
      data.rightId,
      data.rightKey,
      data.pagepermission,
      data.grade
    ];
    sqlFn(sql, arr, function() {});
  });
  res.send("初始化成功");
});
module.exports = router;
