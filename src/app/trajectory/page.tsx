import type { Metadata } from "next";
import Link from "next/link";

import styles from "../profile-pages.module.css";

export const metadata: Metadata = {
  title: "生活轨迹 | 西门晴耕的小田园",
  description: "西门晴耕的成长与生活轨迹页面。",
};

export default function TrajectoryPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.header}>
          <p>西门晴耕的生活轨迹</p>
          <Link href="/" className={styles.backHome}>
            返回首页
          </Link>
        </header>

        <section className={styles.card}>
          <h1>生活轨迹</h1>
          <p>生活轨迹：</p>

          <div className={styles.timeline}>
            <article className={styles.timelineItem}>
              <h3>2004.10</h3>
              <p>破壳而出</p>
            </article>

            <article className={styles.timelineItem}>
              <h3>2017.7</h3>
              <p>摇号进入第八中学（top2）</p>
            </article>

            <article className={styles.timelineItem}>
              <h3>2020.7</h3>
              <p>考入第一中学（Best）</p>
            </article>

            <article className={styles.timelineItem}>
              <h3>2023.7</h3>
              <p>考入江南大学物联网工程专业</p>
            </article>

            <article className={styles.timelineItem}>
              <h3>2025.5</h3>
              <p>开始在小红书分享日常生活</p>
            </article>

            <article className={styles.timelineItem}>
              <h3>2026.3</h3>
              <p>开通了自己的微信公众号</p>
            </article>

            <article className={styles.timelineItem}>
              <h3>2026.4</h3>
              <p>搭建了自己的个人网站，并正式计划系统地频繁记录自己的生活轨迹</p>
            </article>

            <article className={styles.timelineItem}>
              <h3>未完待续...</h3>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
