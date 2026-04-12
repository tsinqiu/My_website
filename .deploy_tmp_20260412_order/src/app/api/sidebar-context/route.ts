import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { pickTodayDidYouKnow } from "@/content/did-you-know";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface LocationSnapshot {
  ip: string;
  city: string;
  region: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
}

interface WeatherSnapshot {
  label: string;
  code: number | null;
  temperature: number | null;
}

const DEFAULT_CENTER = {
  latitude: 31.49,
  longitude: 120.31,
};

const NEGATIVE_TONE_RE = /痛苦|绝望|难过|离别|死亡|emo|崩溃|压抑/i;

const POSITIVE_QUOTES = [
  "慢慢来，你已经在变好的路上了。",
  "今天也请为自己鼓掌，哪怕只前进一小步。",
  "愿你被温柔对待，也有温柔自己的能力。",
  "保持热爱，日子会慢慢亮起来。",
  "认真生活的人，都会被时间奖励。",
];

const weatherCodeText = (code: number | null): string => {
  if (code === null) return "天气加载中";
  if (code === 0) return "晴朗";
  if (code === 1) return "晴间多云";
  if (code === 2) return "局部多云";
  if (code === 3) return "阴天";
  if (code === 45 || code === 48) return "有雾";
  if ([51, 53, 55, 56, 57].includes(code)) return "毛毛雨";
  if ([61, 63, 65, 66, 67].includes(code)) return "小到中雨";
  if ([71, 73, 75, 77].includes(code)) return "降雪";
  if ([80, 81, 82].includes(code)) return "阵雨";
  if ([95, 96, 99].includes(code)) return "雷阵雨";
  return "天气多变";
};

const pickFallbackQuote = (): string => {
  const day = new Date().getDate();
  return POSITIVE_QUOTES[day % POSITIVE_QUOTES.length];
};

const pickText = (...values: Array<unknown>): string => {
  for (const value of values) {
    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }
  }
  return "";
};

const pickNumber = (...values: Array<unknown>): number | null => {
  for (const value of values) {
    const parsed =
      typeof value === "number" ? value : typeof value === "string" ? Number.parseFloat(value) : Number.NaN;
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }
  return null;
};

const withTimeout = (ms = 5000): AbortSignal => AbortSignal.timeout(ms);

const parseClientIp = (rawIp: string | null): string => {
  if (!rawIp) return "";
  const ip = rawIp.trim();
  const noPort = ip.split(":").length > 2 ? ip : ip.split(":")[0];
  return noPort.replace(/^::ffff:/, "");
};

const extractIpFromHeaders = (h: Headers): string => {
  const candidates = [
    h.get("x-forwarded-for")?.split(",")[0] ?? "",
    h.get("x-real-ip") ?? "",
    h.get("x-vercel-forwarded-for") ?? "",
    h.get("cf-connecting-ip") ?? "",
  ];

  for (const candidate of candidates) {
    const ip = parseClientIp(candidate);
    if (ip) return ip;
  }

  return "";
};

const parseIpWho = (payload: unknown): Partial<LocationSnapshot> | null => {
  if (!payload || typeof payload !== "object") return null;
  const record = payload as Record<string, unknown>;
  if (record.success === false) return null;

  return {
    ip: pickText(record.ip),
    city: pickText(record.city),
    region: pickText(record.region),
    country: pickText(record.country),
    latitude: pickNumber(record.latitude),
    longitude: pickNumber(record.longitude),
  };
};

const parseIpApi = (payload: unknown): Partial<LocationSnapshot> | null => {
  if (!payload || typeof payload !== "object") return null;
  const record = payload as Record<string, unknown>;
  if (record.status !== "success") return null;

  return {
    ip: pickText(record.query),
    city: pickText(record.city),
    region: pickText(record.regionName),
    country: pickText(record.country),
    latitude: pickNumber(record.lat),
    longitude: pickNumber(record.lon),
  };
};

const fetchJson = async (url: string): Promise<unknown | null> => {
  try {
    const res = await fetch(url, {
      cache: "no-store",
      signal: withTimeout(5000),
      headers: {
        "user-agent": "xmqg.cc sidebar context",
      },
    });
    if (!res.ok) return null;
    return (await res.json()) as unknown;
  } catch {
    return null;
  }
};

const mergeLocation = (
  base: LocationSnapshot,
  incoming: Partial<LocationSnapshot> | null,
): LocationSnapshot => {
  if (!incoming) return base;
  return {
    ip: incoming.ip || base.ip,
    city: incoming.city || base.city,
    region: incoming.region || base.region,
    country: incoming.country || base.country,
    latitude: incoming.latitude ?? base.latitude,
    longitude: incoming.longitude ?? base.longitude,
  };
};

const getLocation = async (clientIp: string, h: Headers): Promise<LocationSnapshot> => {
  let location: LocationSnapshot = {
    ip: clientIp || "--",
    city: h.get("x-vercel-ip-city") ?? "",
    region: h.get("x-vercel-ip-country-region") ?? "",
    country: h.get("x-vercel-ip-country") ?? "",
    latitude: pickNumber(h.get("x-vercel-ip-latitude")),
    longitude: pickNumber(h.get("x-vercel-ip-longitude")),
  };

  if (!location.city && !location.region && !location.country) {
    const ipWhoUrl = clientIp ? `https://ipwho.is/${encodeURIComponent(clientIp)}` : "https://ipwho.is/";
    location = mergeLocation(location, parseIpWho(await fetchJson(ipWhoUrl)));
  }

  if (!location.city && !location.region && !location.country) {
    const ipApiUrl = clientIp
      ? `http://ip-api.com/json/${encodeURIComponent(clientIp)}?lang=zh-CN`
      : "http://ip-api.com/json/?lang=zh-CN";
    location = mergeLocation(location, parseIpApi(await fetchJson(ipApiUrl)));
  }

  if (!location.ip) location.ip = "--";
  return location;
};

const getWeather = async (latitude: number, longitude: number): Promise<WeatherSnapshot> => {
  const weatherApi = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`;
  const payload = await fetchJson(weatherApi);

  if (!payload || typeof payload !== "object") {
    return { label: "天气暂不可用", code: null, temperature: null };
  }

  const current = (payload as { current_weather?: Record<string, unknown> }).current_weather;
  const code = pickNumber(current?.weathercode);
  const temp = pickNumber(current?.temperature);
  const label = weatherCodeText(code);

  return {
    label: temp !== null ? `${label} ${temp.toFixed(1)}°C` : label,
    code,
    temperature: temp,
  };
};

const readQuoteText = (payload: unknown): string => {
  if (!payload || typeof payload !== "object") return "";
  const record = payload as Record<string, unknown>;
  const data = (record.data as Record<string, unknown> | undefined) ?? undefined;
  return pickText(record.hitokoto, data?.content, record.content, record.note);
};

const getQuote = async (): Promise<string> => {
  const quoteUrls = [
    "https://v1.hitokoto.cn/?c=d&encode=json",
    "https://v2.jinrishici.com/one.json",
    "https://api.ooopn.com/ciba/api.php",
  ];

  for (const url of quoteUrls) {
    const payload = await fetchJson(url);
    const quote = readQuoteText(payload);
    if (quote && !NEGATIVE_TONE_RE.test(quote)) {
      return quote;
    }
  }

  return pickFallbackQuote();
};

const compactPlace = (location: LocationSnapshot): string => {
  const text = [location.city, location.region, location.country].filter(Boolean).join(" · ");
  return text || "未知地区";
};

export async function GET() {
  const h = await headers();
  const clientIp = extractIpFromHeaders(h);

  const location = await getLocation(clientIp, h);
  const latitude = location.latitude ?? DEFAULT_CENTER.latitude;
  const longitude = location.longitude ?? DEFAULT_CENTER.longitude;
  const weather = await getWeather(latitude, longitude);
  const quote = await getQuote();
  const didYouKnow = pickTodayDidYouKnow();

  return NextResponse.json(
    {
      ip: location.ip || "--",
      location: compactPlace(location),
      weather: weather.label,
      weatherCode: weather.code,
      quote,
      didYouKnow,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
