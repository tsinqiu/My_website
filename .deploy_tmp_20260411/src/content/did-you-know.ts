export const didYouKnowFacts: string[] = [
  '你知道吗？ 西门的第一行代码是 printf("Hello World");，但当时他用的中文输入法。',
  "你知道吗？ 西门有个很贵的树莓派，落灰很久了。",
  "你知道吗？ 西门对各种文字报告有着咬文嚼字的严谨态度。",
  "你知道吗？ “西门晴耕”这个名字里，藏着他对“熵减”人生的追求。",
  "你知道吗？ 比起键鼠，西门更喜欢纸笔。",
  "你知道吗？ 西门曾为了写数学建模论文，连续 72 小时没离开过电脑。",
  "你知道吗？ 西门觉得代码写得优雅，本身就是一种不需要翻译的浪漫。",
  "你知道吗？ 虽然在无锡，但西门依然觉得有些美食甜得超标了。",
  "你知道吗？ 西门在学院有两个工位，在那里学习效率会提升 200%。",
  "你知道吗？ 深夜的一碗泡面，让西门幸福感拉满。",
  "你知道吗？ 西门是一个“晚霞捕捉计划”成员，手机里存满了不同颜色的天空。",
  "你知道吗？ 西门最喜欢公园夜跑，因为那时候风是凉的，世界是静的。",
  "你知道吗？ 西门喝咖啡不加糖，他觉得那种苦味能让逻辑更清晰。",
  "你知道吗？ 西门是典型的 ISFJ，比起在人群中发言，他更擅长在角落里观察。",
  "你知道吗？ 下雨天是西门的充电模式，他会听着雨声思考一些毫无用处的哲学问题。",
  "你知道吗？ 西门有一个专门存放记忆的文字秘密世界。",
  "你知道吗？ 每一个“你知道吗”背后的文字，其实都是西门反复修改了三次的结果。",
  "你知道吗？ 西门最擅长的技能是“情绪独自消化”，虽然过程有点慢，但很彻底。",
  "你知道吗？ 西门内心住着一个诗人，但他对外只展示他的逻辑电路。",
  "你知道吗？ 相比于盛大的节日，西门更迷恋那些细碎、微小、不为人知的温柔瞬间。",
  "你知道吗？ 《MC》是西门唯一玩不腻的游戏。",
  "你知道吗？ 西门梦想成为一名音乐制作人，甚至尝试过给树莓派编曲。",
  "你知道吗？ 西门非常擅长收拾房间和文件，他认为整理环境就是在整理大脑。",
  "你知道吗？ 西门对一切带有时光故事的东西都没有抵抗力。",
  "你知道吗？ 西门很想学会做饭，只不过目前没有属于自己的小窝。",
  "你知道吗？ 西门现在有一个“内耗计时器”，时间一到就强制终止 Emo 进程。",
  "你知道吗？ 西门坚信，20 岁这几年的迷茫，是为了换取更自由的 25 岁。",
  "你知道吗？ 这个网站的每个效果，都是西门的 idea。",
  "你知道吗？ 西门最想去海边，和伴侣看日出日落。",
  "你知道吗？ 你现在正在读的这句话，是西门跨越时空想对你打的一个招呼。",
];

export const getShanghaiDateKey = (date: Date = new Date()): string =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);

const stableHash = (text: string): number => {
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash * 33 + text.charCodeAt(i)) >>> 0;
  }
  return hash;
};

export const pickDidYouKnowByDateKey = (dateKey: string): string => {
  if (didYouKnowFacts.length === 0) {
    return "你知道吗？ 西门正在准备新的故事。";
  }
  const index = stableHash(dateKey) % didYouKnowFacts.length;
  return didYouKnowFacts[index];
};

export const pickTodayDidYouKnow = (date: Date = new Date()): string =>
  pickDidYouKnowByDateKey(getShanghaiDateKey(date));

