import { rest } from "msw";

export const handlers = [
  rest.get("https://randomuser.me/api", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        results: [{ name: { title: "Mr", first: "Jimmy", last: "Wirtanen" } }]
      })
    );
  }),
  rest.get("/api/users", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 2,
          username: "admin",
          password: "c4ca4238a0b923820dcc509a6f75849b",
          roleId: 1,
          region: "全球",
          role: "超级管理员",
          roleState: 1,
          roleDefault: 1
        },
        {
          id: 11,
          username: "2",
          password: "c4ca4238a0b923820dcc509a6f75849b",
          roleId: 3,
          region: "非洲",
          role: "区域管理员",
          roleState: 1,
          roleDefault: 0
        }
      ])
    );
  }),
  rest.post("/api/users/adduser", async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json("用户添加成功"));
  }),
  rest.put("/api/users?id=11", async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json("修改成功"));
  }),
  rest.get("/api/news/preview?id=140", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 140,
          title: "夏日感拉满！北方组团冲击30℃ 大城市升温日历看哪里直奔夏天",
          subheading: "热浪来袭",
          categoryId: 6,
          content:
            '<p style="text-align:start;"><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 18px;font-family: PingFangSC-Regular, Helvetica, Arial, "Microsoft Yahei", sans-serif;">中国天气网讯 刚刚进入立夏节气不久，我国北方的夏日气息便扑面而来。预计未来一周（5月7日至13日），北方地区将掀起一波升温浪潮，西北、华北、黄淮等多地最高气温或创今年来新高，30℃组团来袭，向着真正的夏天大步迈进。中国天气网推出北方大城市升温日历，看看哪些地方夏日感将迅速拉满。</span></p>\n<p style="text-align:start;">&nbsp;<span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 18px;font-family: PingFangSC-Regular, Helvetica, Arial, "Microsoft Yahei", sans-serif;"><strong>未来一周北方气温组团创新高 西安或现今年首个高温天气</strong></span></p>\n<p style="text-align:start;"><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 18px;font-family: PingFangSC-Regular, Helvetica, Arial, "Microsoft Yahei", sans-serif;">　　“未来一周，西北、华北、黄淮等地暖热天气发展增多，多地最高气温或超30℃，较常年同期偏高4-8℃，局地甚至偏高10℃左右，并将大面积刷新今年以来气温新高。”中国天气网气象分析师李靓介绍。</span></p>\n<p style="text-align:start;"><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 18px;font-family: PingFangSC-Regular, Helvetica, Arial, "Microsoft Yahei", sans-serif;">　　不过，升温的过程中也会出现“小插曲”，8日至10日，西北地区东部、华北等地气温将陆续冲高；之后，10日至11日还将有冷涡系统影响北方，多地气温会有所波动；12日开始，华北、黄淮等地最高气温又将迎来一波暖热高潮，局地或有35℃及以上的高温出现。</span></p>\n<p style="text-align:center;"></p>\n<img src="https://p1.img.cctvpic.com/photoworkspace/contentimg/2024/05/07/2024050720403788938.jpg" alt="bqtb" style="height: ;width: "/>\n<p style="text-align:start;"><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 18px;font-family: PingFangSC-Regular, Helvetica, Arial, "Microsoft Yahei", sans-serif;">　　从中国天气网推出的北方大城市升温日历中可以看出，明后两天，呼和浩特、北京、天津、石家庄、西安、兰州、银川最高气温都可能刷新今年来新高。上述城市中，除呼和浩特外，其他城市最高气温都将达到或超过30℃，其中北京、天津、兰州、银川将是今年首个30℃。</span></p>\n<p style="text-align:start;"><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 18px;font-family: PingFangSC-Regular, Helvetica, Arial, "Microsoft Yahei", sans-serif;">　　之后，虽然在冷涡影响下北方气温会短暂下滑，但很快又会迎来一波暖热高潮，12日前后多地气温将再创新高，局地还会出现高温天气。像银川，11日、12日两天气温将连创新高，最高或达34℃。西安12日、13日也将连创新高，其中13日最高气温或达35℃，如果兑现，将是今年北方大城市中首个高温。</span></p>\n<p style="text-align:start;"><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 18px;font-family: PingFangSC-Regular, Helvetica, Arial, "Microsoft Yahei", sans-serif;">　　气温的快速蹿升也将推动北方多地的入夏进程。预计，升温过后，夏季的最北端将至少推进到河北南部一带。大城市中，石家庄、济南、西安有望在本周正式迈入夏季的门槛；乌鲁木齐、兰州、银川、太原、北京、天津等地目前正处于春夏临界，也可能于本周开启入夏进程，较常年略早。</span></p>\n<p style="text-align:start;">&nbsp;<span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 18px;font-family: PingFangSC-Regular, Helvetica, Arial, "Microsoft Yahei", sans-serif;"><strong>北方为何热过南方？专家解读背后原因</strong></span></p>\n<p style="text-align:start;"><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 18px;font-family: PingFangSC-Regular, Helvetica, Arial, "Microsoft Yahei", sans-serif;">　　相较于升温势头猛烈的北方，未来一周，南方大部气温却“支棱”不起来。长江中下游地区未来一周最高气温多在25℃上下，较常年同期偏低，略有凉意。</span></p>\n<p style="text-align:start;"><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 18px;font-family: PingFangSC-Regular, Helvetica, Arial, "Microsoft Yahei", sans-serif;">　　为何此次北方升温力度如此强劲，甚至热过南方？李靓表示，这主要是由于本周大多数时间中，西北、华北、黄淮等地处于高空暖脊或脊前西北气流控制下，天气晴朗、降水稀少，且太阳辐射强，利于出现干热天气。而南方降雨频繁，辐射条件较差，因此升温疲软，热度自然不及北方。常年来看，5月至6月上中旬这段时间，北方的暖热确实经常胜过南方。</span></p>\n<p style="text-align:start;"><span style="color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 18px;font-family: PingFangSC-Regular, Helvetica, Arial, "Microsoft Yahei", sans-serif;">　　中国天气网提醒，虽然近期北方大部晴热当道，但夜间最低气温仍较低，昼夜温差普遍超10℃，部分地区在15℃以上。建议大家根据气温变化及时调整着装，早晚出行时多穿一件薄外套，避免着凉感冒。</span>&nbsp;</p>\n',
          region: "全球",
          author: "admin",
          roleId: 1,
          auditState: 2,
          publishState: 2,
          star: 887,
          view: 998,
          createTime: "1715264397118",
          publishTime: "1715270757205"
        }
      ])
    );
  }),
  rest.patch("/api/news/preview/view?id=140", async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),
  rest.get("/api/categories", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          title: "时事新闻",
          value: "时事新闻"
        },
        { id: 2, title: "环球经济", value: "环球经济" }
      ])
    );
  }),
  rest.get("/api/news/homepublish?publishState=2", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 125,
          title: "京津冀将新增超百项“区域通办”政务服务事项",
          subheading: "2024年北京市全面优化营商环境工作要点",
          categoryId: 1,
          content: "",
          region: "全球",
          author: "admin",
          roleId: 1,
          auditState: 2,
          publishState: 2,
          star: 0,
          view: 10,
          createTime: "1715262803027",
          publishTime: null
        },
        {
          id: 116,
          title: "离岸人民币：与港股一起共舞",
          subheading: "离岸人民币",
          categoryId: 2,
          content: "",
          region: "全球",
          author: "admin",
          roleId: 1,
          auditState: 2,
          publishState: 2,
          star: 6,
          view: 34,
          createTime: "1714722445897",
          publishTime: null
        }
      ])
    );
  }),
  //
  rest.get("/api/news/audit?auditState=1", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 198,
          title: "周冠宇",
          subheading: "C42",
          categoryId: 5,
          content: "",
          region: "全球",
          author: "admin",
          roleId: 1,
          auditState: 1,
          publishState: 0,
          star: 0,
          view: 3,
          createTime: "1735118462835",
          publishTime: "0"
        }
      ])
    );
  }),
  //
  rest.patch("/api/news/audit?id=198", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 198,
          title: "周冠宇",
          subheading: "C42",
          categoryId: 5,
          content: "",
          region: "全球",
          author: "admin",
          roleId: 1,
          auditState: 1,
          publishState: 0,
          star: 0,
          view: 3,
          createTime: "1735118462835",
          publishTime: "0"
        }
      ])
    );
  }),
  rest.get(
    "/api/news/auditlist?author=admin&auditState1=1&auditState2=2&auditState3=3&publishState0=0&publishState1=1",
    async (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          {
            id: 198,
            title: "周冠宇",
            subheading: "C42",
            categoryId: 5,
            content: "",
            region: "全球",
            author: "admin",
            roleId: 1,
            auditState: 2,
            publishState: 1,
            star: 0,
            view: 3,
            createTime: "1735118462835",
            publishTime: "0"
          },
          {
            id: 144,
            title: "赵继伟22分付豪31+9 辽宁大胜广东总比分2比2",
            subheading: "CBA季后赛半决赛",
            categoryId: 5,
            content: "",
            region: "全球",
            author: "admin",
            roleId: 1,
            auditState: 1,
            publishState: 0,
            star: 0,
            view: 4,
            createTime: "1735118462835",
            publishTime: "0"
          }
        ])
      );
    }
  ),
  rest.patch("/api/news/update/publish?id=198", async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),
  //
  rest.post("/api/news", async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),
  rest.post("/api/users", async (req, res, ctx) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "adminpassword") {
      return res(ctx.status(200), ctx.json(""));
    } else if (username === "bannedAdmin" && password === "password") {
      return res(ctx.status(401), ctx.json("账号被封禁，请联系管理员！"));
    } else {
      return res(ctx.status(400), ctx.json("用户名或密码错误！"));
    }
  }),
  rest.patch("/api/news/update/upload?id=144", async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),
  rest.patch("/api/news/preview/star?id=140", async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  })
];
