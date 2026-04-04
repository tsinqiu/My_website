export type SocialPlatform = "wechat" | "xiaohongshu" | "bilibili";

export interface ProfileConfig {
  name: string;
  tagline: string;
  bio: string;
  avatarUrl: string;
  location: string;
}

export interface SocialMenuItem {
  platform: SocialPlatform;
  label: string;
  path: "/articles" | "/xhs" | "/videos";
  colorToken: string;
}

export interface HomeMenuItem {
  label: string;
  href: string;
  colorToken: string;
  external?: boolean;
}

export interface FeedEntry {
  platform: SocialPlatform;
  title: string;
  summary: string;
  date: string;
  url: string;
  coverUrl?: string;
  duration?: string;
  views?: number;
  likes?: number;
  sourceTag?: string;
}

export interface FeedPageConfig {
  slug: "articles" | "xhs" | "videos";
  title: string;
  description: string;
  style?: "list" | "media";
  entries: FeedEntry[];
}

export const profileConfig: ProfileConfig = {
  name: "西门晴耕",
  tagline: "ISFJ，平时正经，偶尔神经，保持热爱",
  bio: "你好，我是西门晴耕。欢迎来到我的个人主页，这里记录我在内容创作与生活中的真实片段。",
  avatarUrl: "/profile-photo.jpg",
  location: "江南大学",
};

export const socialMenu: SocialMenuItem[] = [
  {
    platform: "wechat",
    label: "微信公众号",
    path: "/articles",
    colorToken: "var(--button-wechat-gradient)",
  },
  {
    platform: "xiaohongshu",
    label: "小红书",
    path: "/xhs",
    colorToken: "var(--button-xhs-gradient)",
  },
  {
    platform: "bilibili",
    label: "哔哩哔哩",
    path: "/videos",
    colorToken: "var(--button-bili-gradient)",
  },
];

export const homeSocialMenu: HomeMenuItem[] = [
  {
    label: "微信公众号",
    href: "/articles",
    colorToken: "var(--button-wechat-gradient)",
  },
  {
    label: "小红书",
    href: "/xhs",
    colorToken: "var(--button-xhs-gradient)",
  },
  {
    label: "哔哩哔哩",
    href: "/videos",
    colorToken: "var(--button-bili-gradient)",
  },
  {
    label: "语雀",
    href: "https://www.yuque.com/tsinqiu/rfvmki",
    colorToken: "var(--button-yuque-gradient)",
    external: true,
  },
];

export const wechatEntries: FeedEntry[] = [
  {
    platform: "wechat",
    title: "西门晴耕：在荒岛上种一颗番茄",
    summary: "公众号文章入口，点击卡片即可查看原文。",
    date: "2026-03-25",
    url: "https://mp.weixin.qq.com/s/OQEnKXLdWY4Vsv2-0vOtwQ",
    coverUrl: "/wechat-cover-placeholder.svg",
    sourceTag: "WECHAT",
  },
  {
    platform: "wechat",
    title: "中学时代，还有那场没写完的番外",
    summary: "公众号文章入口，点击卡片即可查看原文。",
    date: "2026-03-26",
    url: "https://mp.weixin.qq.com/s/EfZdOuXhtP6lUSMD0veBJA",
    coverUrl: "/wechat-cover-placeholder.svg",
    sourceTag: "WECHAT",
  },
  {
    platform: "wechat",
    title: "西门的新开始",
    summary: "公众号文章入口，点击卡片即可查看原文。",
    date: "2026-03-30",
    url: "https://mp.weixin.qq.com/s/83R9xYpAWbPl1R2qtkrWHQ",
    coverUrl: "/wechat-cover-placeholder.svg",
    sourceTag: "WECHAT",
  },
];

export const xhsEntries: FeedEntry[] = [
  {
    platform: "xiaohongshu",
    title: "把不开心留在今天",
    summary: "就去洗个澡，就收拾房间，就起身出门，让情绪转移而不是硬抗。",
    date: "2026-04-01",
    url: "https://www.xiaohongshu.com/explore/69ccc7ae0000000021006ea2?xsec_token=ABtX6Agt_ALMwR54WH35TT0Ch8EUpbrkgBKnKR3eksq9c=&xsec_source=pc_user",
  },
  {
    platform: "xiaohongshu",
    title: "不要做扫兴的人",
    summary: "亲密关系前期建立积极沟通基调，彼此真诚接纳，在关系中一起变得更好。",
    date: "2026-03-23",
    url: "https://www.xiaohongshu.com/explore/69c1423400000000230123bd?xsec_token=ABEWkptcmX7gBI22p2P-EvWkHC-Obh5w0RT1BIVrL939Q=&xsec_source=pc_user",
  },
  {
    platform: "xiaohongshu",
    title: "在遇见你之前",
    summary: "先把自己照顾得很好、把生活过得精彩，然后在丰盛中选择靠近。",
    date: "2026-03-22",
    url: "https://www.xiaohongshu.com/explore/69bfd6e2000000001a025420?xsec_token=ABunvNw9OKCXsDInupr7hBGvnkY0rscgiwC_F2M28nwzQ=&xsec_source=pc_user",
  },
];

export const bilibiliEntries: FeedEntry[] = [
  {
    platform: "bilibili",
    title: "【J Perm】贴纸有无之争",
    summary: "关于魔方相关话题的内容分享。",
    date: "2024-02-18",
    url: "https://www.bilibili.com/video/BV1pu4m1A79U/?spm_id_from=333.1387.upload.video_card.click",
    coverUrl: "https://i2.hdslb.com/bfs/archive/864c35f08add5f193b872521dd1b4b128e0860c9.png",
    duration: "08:54",
    views: 1092,
    likes: 8,
    sourceTag: "BILIBILI",
  },
  {
    platform: "bilibili",
    title: "【Dave】不是你想的那样！",
    summary: "内容交流与观点展示。",
    date: "2023-12-22",
    url: "https://www.bilibili.com/video/BV1bK41187G5/?spm_id_from=333.1387.upload.video_card.click",
    coverUrl: "https://i2.hdslb.com/bfs/archive/e8e357d6e20ec10cade21fcf9f55cb370c090a8d.jpg",
    duration: "04:43",
    views: 20,
    likes: 2,
    sourceTag: "BILIBILI",
  },
  {
    platform: "bilibili",
    title: "【J Perm熟肉】F2L技巧",
    summary: "围绕 F2L 的技巧讲解与实践。",
    date: "2023-11-18",
    url: "https://www.bilibili.com/video/BV1Fj411J7Dm/?spm_id_from=333.1387.upload.video_card.click",
    coverUrl: "https://i2.hdslb.com/bfs/archive/101244f58bac6739bb1bb73d147034139d112a5f.jpg",
    duration: "03:38",
    views: 2537,
    likes: 95,
    sourceTag: "BILIBILI",
  },
  {
    platform: "bilibili",
    title: "用水给魔方染色 DIY",
    summary: "DIY 向内容，展示趣味魔方改造。",
    date: "2020-01-28",
    url: "https://www.bilibili.com/video/BV1c7411r7gP/?spm_id_from=333.1387.upload.video_card.click",
    coverUrl: "https://i2.hdslb.com/bfs/archive/9ddea1246fd7178e6e25bb85972857377ef11b86.jpg",
    duration: "12:26",
    views: 44565,
    likes: 1248,
    sourceTag: "BILIBILI",
  },
  {
    platform: "bilibili",
    title: "【Green】高阶魔方拼出各国国旗全集",
    summary: "高阶魔方内容展示与创意组合。",
    date: "2020-01-28",
    url: "https://www.bilibili.com/video/BV1J7411r76N/?spm_id_from=333.1387.upload.video_card.click",
    coverUrl: "https://i2.hdslb.com/bfs/archive/1be013dff50d97e9fa50f3cab91c8665ff15d222.jpg",
    duration: "27:18",
    views: 235128,
    likes: 7929,
    sourceTag: "BILIBILI",
  },
  {
    platform: "bilibili",
    title: "【WR】菲神WR慢放",
    summary: "WR 相关慢放展示视频。",
    date: "2019-04-14",
    url: "https://www.bilibili.com/video/BV1kb411L792/?spm_id_from=333.1387.upload.video_card.click",
    coverUrl: "https://i0.hdslb.com/bfs/archive/049b25e9acff166ae9cdf062f87dc2809059c951.jpg",
    duration: "01:04",
    views: 17559,
    likes: 126,
    sourceTag: "BILIBILI",
  },
  {
    platform: "bilibili",
    title: "【J Perm】精华F2l(强推)",
    summary: "F2L 精华向内容，适合复盘学习。",
    date: "2019-03-04",
    url: "https://www.bilibili.com/video/BV1ib411B7ta/?spm_id_from=333.1387.upload.video_card.click",
    coverUrl: "https://i1.hdslb.com/bfs/archive/9703639e62492c5e856bf4186c1b59e9d0e2904d.jpg",
    duration: "05:03",
    views: 4480,
    likes: 104,
    sourceTag: "BILIBILI",
  },
];

export const articlesPageConfig: FeedPageConfig = {
  slug: "articles",
  title: "微信公众号文章",
  description: "收录公众号文章入口，点击卡片可直接跳转阅读。",
  style: "media",
  entries: wechatEntries,
};

export const xhsPageConfig: FeedPageConfig = {
  slug: "xhs",
  title: "小红书内容",
  description: "收录小红书帖子入口，点击卡片可直接跳转查看。",
  entries: xhsEntries,
};

export const videosPageConfig: FeedPageConfig = {
  slug: "videos",
  title: "哔哩哔哩视频",
  description: "收录哔哩哔哩视频入口，点击卡片可直接跳转播放。",
  style: "media",
  entries: bilibiliEntries,
};


