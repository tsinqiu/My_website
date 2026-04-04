import type { Metadata } from "next";
import Link from "next/link";

import styles from "../profile-pages.module.css";

export const metadata: Metadata = {
  title: "关于我 | 西门晴耕的小田园",
  description: "西门晴耕的详细自我介绍页面。",
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.header}>
          <p>西门晴耕的自我介绍</p>
          <Link href="/" className={styles.backHome}>
            返回首页
          </Link>
        </header>

        <section className={styles.card}>
          <h1>关于我</h1>
          <p>我是西门晴耕，出生于 2004 年 10 月，来自北方的一个幸福的小城市，家庭温馨美满。</p>
          <p>我是个快乐的小镇做题家，通过努力考入 JNU- IOT 专业。</p>
          <p>我时不时会冒出很多的 Idea，关于家庭，关于过往，关于学习，关于未来，关于朋友，关于爱情 etc.</p>
          <p>对生活有着十足的热爱，喜欢逛公园，晒太阳，喜欢美食，也喜欢把自己的 Idea 用文字装起来~</p>
          <p>严谨之余，有着一颗与理工背景格格不入的温柔灵魂，时而拧巴，时而俏皮，不同情绪下的我组成了完整而立体的我。</p>
          <p>目前仍在学校进修中，在没有观众的时候悄悄长大变强，是一件很酷的事情！</p>
          <p>一定会成为很好的大人！</p>
        </section>
      </main>
    </div>
  );
}
