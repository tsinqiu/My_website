export interface DiaryImage {
  src: string;
  alt: string;
}

export interface DiaryEntry {
  id: string;
  publishedAt: string;
  text: string;
  images?: DiaryImage[];
}

export const diaryEntries: DiaryEntry[] = [
  {
    id: "2026-04-12-codex-antigravity-ai",
    publishedAt: "2026-04-12T22:20:00+08:00",
    text: "今日AI大更新！使用Codex将陈年的OpenCode的Bug修复，并且让Codex同志经过艰难的战斗，配合魔法工具的进步，最终将Antigravity成功配置！随后在三个平台上尝试了PPT-Master项目，还得是Claude大人厉害！AI现在可以帮我写论文，做PPT，写代码，虽然以后可能是我的敌人，但现在是我的朋友！",
  },
  {
    id: "2026-04-11-screen-ai-question",
    publishedAt: "2026-04-11T22:30:00+08:00",
    text: "昨晚刷着视频屏幕突然出现了绿线，今天下午去官方售后免费维修，体验很棒。晚上和同学聊起AI，现在AI真的很强大！能写代码，能做PPT，能做音乐，能写论文，未来会大规模替代人类吗？这是个Question！",
  },
  {
    id: "2026-04-07-study-run",
    publishedAt: "2026-04-07T22:00:00+08:00",
    text: "充实的一天~上午数字图像处理听得很明白，下午机器学习也有所灵感。工程伦理时复习了数字图像处理的编码部分。晚上跑步+复习。唯一的怪怪的点就是教学楼旁边的石楠花开了，味道怪怪的。",
  },
  {
    id: "2026-04-06-open-day-review",
    publishedAt: "2026-04-06T21:00:00+08:00",
    text: "早上直接睡到11点，下午复习数字图像处理到9点，也是积极向上的一天！校园里很多小孩子，毕竟是校园开放日，很是热闹。",
  },
  {
    id: "2026-04-04-station-review",
    publishedAt: "2026-04-04T20:30:00+08:00",
    text: "早起陪朋友去了高铁站，下午休息，然后复习数字图像处理。没有观众的时候就要调整自己，努力长大！",
  },
  {
    id: "2026-04-03-night-walk",
    publishedAt: "2026-04-03T21:35:00+08:00",
    text: "晚饭后去操场走了几圈，风很轻，路灯下像一条安静的银河。今天也认真生活了一天。",
  },
  {
    id: "2026-04-02-lake-sun",
    publishedAt: "2026-04-02T16:12:00+08:00",
    text: "在校园湖边晒了会太阳，顺手拍了几张。春天真的很适合把心情拿出来通风。",
    images: [
      { src: "/diary/sun-1.svg", alt: "湖边阳光与树影" },
      { src: "/diary/sun-2.svg", alt: "公园长椅与绿意" },
      { src: "/diary/sun-3.svg", alt: "傍晚天色与云层" },
    ],
  },
  {
    id: "2026-04-01-study-desk",
    publishedAt: "2026-04-01T08:20:00+08:00",
    text: "早八前把今天的任务列好了：课程复盘、写一段新的想法、晚上再读十页书。慢慢来，但每天都在向前。",
    images: [{ src: "/diary/sun-1.svg", alt: "清晨书桌与计划清单" }],
  },
];
