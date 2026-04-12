import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import { socialMenu } from "@/content/site.config";
import type { FeedPageConfig, SocialPlatform } from "@/content/site.config";

import styles from "./social-feed-page.module.css";

interface SocialFeedPageProps {
  config: FeedPageConfig;
}

const platformCode: Record<SocialPlatform, string> = {
  wechat: "WX",
  xiaohongshu: "XHS",
  bilibili: "BILI",
};

const platformLabel: Record<SocialPlatform, string> = {
  wechat: "微信公众号",
  xiaohongshu: "小红书",
  bilibili: "哔哩哔哩",
};

const hasValidUrl = (url: string): boolean => /^https?:\/\//.test(url);

const formatCount = (value?: number): string => {
  if (!value || value < 0) {
    return "0";
  }

  if (value >= 10000) {
    const mapped = (value / 10000).toFixed(value >= 100000 ? 0 : 1);
    return `${mapped.replace(/\.0$/, "")}万`;
  }

  return String(value);
};

export function SocialFeedPage({ config }: SocialFeedPageProps) {
  const currentPath = `/${config.slug}` as const;
  const isMediaPage = config.style === "media";

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.header}>
          <p>西门晴耕的内容索引</p>
          <Link href="/" className={styles.backHome}>
            返回首页
          </Link>
        </header>

        <nav className={styles.menu} aria-label="社交子页面菜单">
          {socialMenu.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`${styles.menuItem} ${item.path === currentPath ? styles.menuItemActive : ""}`}
              style={{ "--menu-color": item.colorToken } as CSSProperties}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <section className={styles.titleBlock} aria-labelledby="feed-title">
          <h1 id="feed-title">{config.title}</h1>
          <p>{config.description}</p>
        </section>

        <section className={isMediaPage ? styles.videoGrid : styles.feedList}>
          {config.entries.map((entry, index) => {
            const active = hasValidUrl(entry.url);
            const hasStats =
              typeof entry.views === "number" ||
              typeof entry.likes === "number" ||
              typeof entry.duration === "string";

            if (isMediaPage) {
              return (
                <article className={styles.videoCard} key={`${entry.url}-${index}`}>
                  <div className={styles.coverWrap}>
                    {entry.coverUrl ? (
                      <Image
                        src={entry.coverUrl}
                        alt={`${entry.title} 视频封面`}
                        fill
                        sizes="(max-width: 900px) 100vw, 33vw"
                      />
                    ) : (
                      <div className={styles.coverFallback}>{platformCode[entry.platform]}</div>
                    )}

                    <span className={styles.sourceBadge}>{entry.sourceTag ?? platformCode[entry.platform]}</span>
                    {entry.duration ? <span className={styles.durationBadge}>{entry.duration}</span> : null}
                  </div>

                  <div className={styles.videoBody}>
                    <div className={styles.metaRow}>
                      <span className={styles.platformTag}>{platformLabel[entry.platform]}</span>
                      <span>{entry.date}</span>
                    </div>

                    <h2>{entry.title}</h2>
                    <p>{entry.summary}</p>

                    <div className={styles.videoFooter}>
                      {hasStats ? (
                        <div className={styles.stats}>
                          {typeof entry.views === "number" ? <span>观看 {formatCount(entry.views)}</span> : null}
                          {typeof entry.likes === "number" ? <span>点赞 {formatCount(entry.likes)}</span> : null}
                        </div>
                      ) : (
                        <div className={styles.statsMuted}>点击可跳转原文</div>
                      )}

                      {active ? (
                        <a
                          className={styles.arrow}
                          href={entry.url}
                          rel="noopener noreferrer"
                          target="_blank"
                          aria-label={`打开${entry.title}`}
                        >
                          ↗
                        </a>
                      ) : (
                        <span className={styles.arrowDisabled}>待补充</span>
                      )}
                    </div>
                  </div>
                </article>
              );
            }

            return (
              <article className={styles.feedCard} key={`${entry.url}-${index}`}>
                <div className={styles.leftVisual} aria-hidden>
                  <span>{platformCode[entry.platform]}</span>
                </div>

                <div className={styles.content}>
                  <div className={styles.metaRow}>
                    <span className={styles.platformTag}>{platformLabel[entry.platform]}</span>
                    <span>{entry.date}</span>
                  </div>
                  <h2>{entry.title}</h2>
                  <p>{entry.summary}</p>
                </div>

                {active ? (
                  <a
                    className={styles.arrow}
                    href={entry.url}
                    rel="noopener noreferrer"
                    target="_blank"
                    aria-label={`打开${entry.title}`}
                  >
                    →
                  </a>
                ) : (
                  <span className={styles.arrowDisabled}>待补充</span>
                )}
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
}
