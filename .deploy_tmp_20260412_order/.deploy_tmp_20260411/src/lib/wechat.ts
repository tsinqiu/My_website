import type { FeedEntry } from "@/content/site.config";

const WECHAT_TOKEN_API = "https://api.weixin.qq.com/cgi-bin/token";
const WECHAT_BATCH_MATERIAL_API = "https://api.weixin.qq.com/cgi-bin/material/batchget_material";
export const WECHAT_REVALIDATE_SECONDS = 60 * 60 * 6;

interface WechatTokenResponse {
  access_token?: string;
  errcode?: number;
  errmsg?: string;
}

interface WechatMaterialResponse {
  item?: Array<{
    update_time?: number;
    content?: {
      news_item?: Array<{
        title?: string;
        digest?: string;
        url?: string;
        thumb_url?: string;
      }>;
    };
  }>;
  errcode?: number;
  errmsg?: string;
}

const firstLine = (text: string | undefined): string | undefined => {
  if (!text) {
    return undefined;
  }

  const value = text
    .split("\n")
    .map((item) => item.trim())
    .find(Boolean);

  if (!value) {
    return undefined;
  }

  return value.length > 56 ? `${value.slice(0, 56)}...` : value;
};

const toHttps = (url: string | undefined): string | undefined => {
  if (!url) {
    return undefined;
  }

  if (url.startsWith("//")) {
    return `https:${url}`;
  }

  if (url.startsWith("http://")) {
    return `https://${url.slice(7)}`;
  }

  return url;
};

const formatDate = (timestamp: number | undefined): string | undefined => {
  if (!timestamp || timestamp <= 0) {
    return undefined;
  }

  return new Date(timestamp * 1000).toISOString().slice(0, 10);
};

const getWechatAccessToken = async (): Promise<string | null> => {
  const appId = process.env.WECHAT_APP_ID;
  const appSecret = process.env.WECHAT_APP_SECRET;

  if (!appId || !appSecret) {
    return null;
  }

  const response = await fetch(
    `${WECHAT_TOKEN_API}?grant_type=client_credential&appid=${appId}&secret=${appSecret}`,
    {
      next: { revalidate: WECHAT_REVALIDATE_SECONDS },
    },
  );

  if (!response.ok) {
    return null;
  }

  const tokenJson = (await response.json()) as WechatTokenResponse;
  return tokenJson.access_token ?? null;
};

const fetchWechatMaterials = async (accessToken: string) => {
  const response = await fetch(`${WECHAT_BATCH_MATERIAL_API}?access_token=${accessToken}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "news",
      offset: 0,
      count: 20,
    }),
    next: { revalidate: WECHAT_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    return null;
  }

  const materialJson = (await response.json()) as WechatMaterialResponse;
  if (materialJson.errcode || !materialJson.item?.length) {
    return null;
  }

  return materialJson.item;
};

const convertMaterialToEntries = (items: NonNullable<WechatMaterialResponse["item"]>): FeedEntry[] => {
  const entries: FeedEntry[] = [];

  for (const material of items) {
    const articleDate = formatDate(material.update_time);
    const newsItems = material.content?.news_item ?? [];

    for (const article of newsItems) {
      if (!article.url) {
        continue;
      }

      entries.push({
        platform: "wechat",
        title: article.title || "微信公众号文章",
        summary: firstLine(article.digest) || "点击查看公众号原文。",
        date: articleDate || "待补充",
        url: article.url,
        coverUrl: toHttps(article.thumb_url),
        sourceTag: "WECHAT",
      });
    }
  }

  return entries;
};

export const syncWechatEntries = async (fallbackEntries: FeedEntry[]): Promise<FeedEntry[]> => {
  const token = await getWechatAccessToken();
  if (!token) {
    return fallbackEntries;
  }

  const materials = await fetchWechatMaterials(token);
  if (!materials) {
    return fallbackEntries;
  }

  const liveEntries = convertMaterialToEntries(materials);
  if (liveEntries.length === 0) {
    return fallbackEntries;
  }

  return liveEntries.slice(0, Math.max(fallbackEntries.length, 6));
};
