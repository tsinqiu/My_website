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
