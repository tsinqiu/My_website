import type { FeedEntry } from "@/content/site.config";

const BILIBILI_VIEW_API = "https://api.bilibili.com/x/web-interface/view";
const SYNC_REVALIDATE_SECONDS = 60 * 60 * 6;

interface BilibiliViewApiResponse {
  code: number;
  data?: {
    title?: string;
    desc?: string;
    pubdate?: number;
    pic?: string;
    duration?: number;
    stat?: {
      view?: number;
      like?: number;
    };
  };
}

const extractBvid = (url: string): string | null => {
  const matched = url.match(/BV[0-9A-Za-z]+/);
  return matched?.[0] ?? null;
};

const toHttps = (url: string | undefined): string | undefined => {
  if (!url) {
    return undefined;
  }

  return url.startsWith("http://") ? `https://${url.slice(7)}` : url;
};

const formatDate = (unixSeconds: number | undefined): string | undefined => {
  if (!unixSeconds || unixSeconds <= 0) {
    return undefined;
  }

  return new Date(unixSeconds * 1000).toISOString().slice(0, 10);
};

const formatDuration = (seconds: number | undefined): string | undefined => {
  if (!seconds || seconds < 0) {
    return undefined;
  }

  const minutes = Math.floor(seconds / 60);
  const remain = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remain).padStart(2, "0")}`;
};

const firstLine = (text: string | undefined): string | undefined => {
  if (!text) {
    return undefined;
  }

  const line = text
    .split("\n")
    .map((item) => item.trim())
    .find(Boolean);

  if (!line) {
    return undefined;
  }

  return line.length > 42 ? `${line.slice(0, 42)}...` : line;
};

const fetchBilibiliByBvid = async (bvid: string) => {
  const response = await fetch(`${BILIBILI_VIEW_API}?bvid=${bvid}`, {
    next: { revalidate: SYNC_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    return null;
  }

  const json = (await response.json()) as BilibiliViewApiResponse;
  if (json.code !== 0 || !json.data) {
    return null;
  }

  return json.data;
};

export const syncBilibiliEntries = async (entries: FeedEntry[]): Promise<FeedEntry[]> => {
  const synced = await Promise.all(
    entries.map(async (entry) => {
      const bvid = extractBvid(entry.url);
      if (!bvid) {
        return entry;
      }

      const live = await fetchBilibiliByBvid(bvid);
      if (!live) {
        return entry;
      }

      return {
        ...entry,
        title: live.title || entry.title,
        summary: firstLine(live.desc) || entry.summary,
        date: formatDate(live.pubdate) || entry.date,
        coverUrl: toHttps(live.pic) || entry.coverUrl,
        duration: formatDuration(live.duration) || entry.duration,
        views: typeof live.stat?.view === "number" ? live.stat.view : entry.views,
        likes: typeof live.stat?.like === "number" ? live.stat.like : entry.likes,
      };
    }),
  );

  return synced;
};

export { SYNC_REVALIDATE_SECONDS };
