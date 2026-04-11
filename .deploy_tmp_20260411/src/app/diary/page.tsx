import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { diaryEntries } from "@/content/diary";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "西门日记 | 西门晴耕的小田园",
  description: "西门晴耕的图文日记流页面，记录生活瞬间与当下心情。",
};

const formatDiaryTime = (publishedAt: string): string => {
  const date = new Date(publishedAt);

  if (Number.isNaN(date.getTime())) {
    return "时间待补充";
  }

  const parts = new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const part = (type: Intl.DateTimeFormatPartTypes): string =>
    parts.find((item) => item.type === type)?.value ?? "";

  return `${part("year")}年${part("month")}月${part("day")}日 ${part("hour")}:${part("minute")}`;
};

const sortedDiaryEntries = [...diaryEntries].sort((a, b) => {
  const left = new Date(a.publishedAt).getTime();
  const right = new Date(b.publishedAt).getTime();
  return right - left;
});

export default function DiaryPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.header}>
          <p>西门晴耕的日记流</p>
          <Link href="/" className={styles.backHome}>
            返回首页
          </Link>
        </header>

        <section className={styles.titleCard}>
          <h1>西门日记</h1>
          <p>像朋友圈一样，记录我发布的文字、图片和当下时间。</p>
        </section>

        {sortedDiaryEntries.length === 0 ? (
          <section className={styles.emptyCard}>
            <p>还没有发布日记，正在酝酿第一条记录。</p>
          </section>
        ) : (
          <section className={styles.timeline} aria-label="西门日记时间线">
            {sortedDiaryEntries.map((entry) => {
              const images = entry.images?.slice(0, 9) ?? [];
              const imageGridClassName = images.length === 1 ? `${styles.imageGrid} ${styles.imageGridSingle}` : styles.imageGrid;

              return (
                <article key={entry.id} className={styles.entryCard}>
                  <time className={styles.entryTime} dateTime={entry.publishedAt}>
                    {formatDiaryTime(entry.publishedAt)}
                  </time>

                  <p className={styles.entryText}>{entry.text}</p>

                  {images.length > 0 ? (
                    <div className={imageGridClassName}>
                      {images.map((image, index) => (
                        <figure key={`${entry.id}-${index}`} className={styles.imageWrap}>
                          <Image src={image.src} alt={image.alt} fill sizes="(max-width: 768px) 100vw, 320px" />
                        </figure>
                      ))}
                    </div>
                  ) : null}
                </article>
              );
            })}
          </section>
        )}
      </main>
    </div>
  );
}

