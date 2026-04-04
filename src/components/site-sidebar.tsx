"use client";

import { useEffect, useMemo, useState } from "react";

import { didYouKnowFacts, getShanghaiDateKey, pickDidYouKnowByDateKey } from "@/content/did-you-know";

import styles from "./site-sidebar.module.css";

interface SidebarPayload {
  ip?: string;
  location?: string;
  weather?: string;
  weatherCode?: number | null;
  quote?: string;
  didYouKnow?: string;
}

const positiveFallback = [
  "慢慢来，你已经在变好的路上了。",
  "今天也请为自己鼓掌，哪怕只前进一小步。",
  "愿你被温柔对待，也有温柔自己的能力。",
  "保持热爱，日子会慢慢亮起来。",
  "认真生活的人，都会被时间奖励。",
];

const dateText = (date: Date): string =>
  new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
    timeZone: "Asia/Shanghai",
  }).format(date);

const pickFallbackQuote = (): string => {
  const day = new Date().getDate();
  return positiveFallback[day % positiveFallback.length];
};

const pickFallbackDidYouKnow = (): string => {
  if (didYouKnowFacts.length === 0) {
    return "你知道吗？ 西门正在准备新的故事。";
  }
  return pickDidYouKnowByDateKey(getShanghaiDateKey(new Date()));
};

export function SiteSidebar() {
  const [today, setToday] = useState(() => dateText(new Date()));
  const [ip, setIp] = useState("--");
  const [location, setLocation] = useState("定位中...");
  const [weather, setWeather] = useState("天气加载中...");
  const [weatherCode, setWeatherCode] = useState<number | null>(null);
  const [quote, setQuote] = useState(pickFallbackQuote());
  const [didYouKnow, setDidYouKnow] = useState(pickFallbackDidYouKnow());

  useEffect(() => {
    const timer = setInterval(() => setToday(dateText(new Date())), 60_000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/sidebar-context", { cache: "no-store" });
        if (!res.ok) throw new Error("sidebar api failed");
        const payload = (await res.json()) as SidebarPayload;

        setIp(payload.ip || "--");
        setLocation(payload.location || "未知地区");
        setWeather(payload.weather || "天气暂不可用");
        setWeatherCode(typeof payload.weatherCode === "number" ? payload.weatherCode : null);
        setQuote(payload.quote || pickFallbackQuote());
        setDidYouKnow(payload.didYouKnow || pickFallbackDidYouKnow());
      } catch {
        setLocation("定位失败");
        setWeather("天气暂不可用");
        setWeatherCode(null);
        setQuote(pickFallbackQuote());
        setDidYouKnow(pickFallbackDidYouKnow());
      }
    };

    void load();
  }, []);

  const weatherTip = useMemo(() => {
    if (weatherCode !== null) {
      if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) return "记得带伞，慢慢走。";
      if ([0, 1, 2].includes(weatherCode)) return "晒晒太阳，补充好心情。";
      if ([45, 48].includes(weatherCode)) return "注意出行安全，保持从容。";
    }

    if (weather.includes("雨")) return "记得带伞，慢慢走。";
    if (weather.includes("晴")) return "晒晒太阳，补充好心情。";
    if (weather.includes("雾")) return "注意出行安全，保持从容。";
    return "无论天气如何，都要照顾好自己。";
  }, [weather, weatherCode]);

  return (
    <aside className={styles.sidebar} aria-label="信息侧边栏">
      <section className={styles.card}>
        <h3>今天</h3>
        <p className={styles.value}>{today}</p>
      </section>

      <section className={styles.card}>
        <h3>IP 地址与天气</h3>
        <p className={styles.value}>{location}</p>
        <p className={styles.sub}>IP：{ip}</p>
        <p className={styles.weather}>{weather}</p>
        <p className={styles.tip}>{weatherTip}</p>
      </section>

      <section className={styles.card}>
        <h3>每日一句</h3>
        <p className={styles.quote}>{quote}</p>
      </section>

      <section className={styles.card}>
        <h3>你知道吗</h3>
        <p className={styles.didYouKnow}>{didYouKnow}</p>
      </section>
    </aside>
  );
}
