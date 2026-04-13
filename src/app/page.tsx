import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteSidebar } from "@/components/site-sidebar";
import { homeSocialMenu, profileConfig } from "@/content/site.config";

import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.skyGlow} aria-hidden />
      <div className={styles.pixelDust} aria-hidden />

      <div className={styles.desktopLayout}>
        <main className={styles.main}>
          <section className={styles.hero} aria-labelledby="site-title">
            <div className={styles.avatarWrap}>
              <Image
                src={profileConfig.avatarUrl}
                alt={`${profileConfig.name} 的个人头像`}
                width={260}
                height={260}
                priority
              />
            </div>

            <div className={styles.heroCopy}>
              <p className={`${styles.introLine} ${styles.stepA}`}>你好，欢迎来到我的主页</p>
              <h1 id="site-title" className={styles.stepB}>
                {profileConfig.name}
              </h1>
              <p className={`${styles.tagline} ${styles.stepC}`}>{profileConfig.tagline}</p>
              <p className={`${styles.bio} ${styles.stepD}`}>{profileConfig.bio}</p>
              <p className={`${styles.location} ${styles.stepD}`}>所在地：{profileConfig.location}</p>
            </div>
          </section>

          <section className={styles.menuSection} aria-labelledby="social-menu-title">
            <div className={styles.sectionHeading}>
              <h2 id="social-menu-title">西门的生活记录本</h2>
              <p>点击菜单项进入对应子页面，查看文章、帖子或视频内容，并跳转到原始平台。</p>
            </div>

            <nav className={styles.menuNav} aria-label="社交入口">
              {homeSocialMenu.map((item) =>
                item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.menuLink}
                    style={{ "--menu-color": item.colorToken } as CSSProperties}
                    aria-label={`打开 ${item.label}`}
                  >
                    <span className={styles.menuLabel}>{item.label}</span>
                    <span className={styles.menuArrow} aria-hidden>
                      ↗
                    </span>
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={styles.menuLink}
                    style={{ "--menu-color": item.colorToken } as CSSProperties}
                  >
                    <span className={styles.menuLabel}>{item.label}</span>
                    <span className={styles.menuArrow} aria-hidden>
                      →
                    </span>
                  </Link>
                ),
              )}
            </nav>
          </section>
        </main>

        <SiteSidebar />
      </div>

      <SiteFooter />
    </div>
  );
}

