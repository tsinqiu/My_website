import type { ReactNode } from "react";

import styles from "./site-footer.module.css";

interface ContactLink {
  label: string;
  href: string;
  ariaLabel: string;
  icon: ReactNode;
  iconClassName: string;
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.57v-2.15c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.76 1.2 1.76 1.2 1.04 1.77 2.7 1.26 3.36.97.1-.74.4-1.25.74-1.54-2.57-.3-5.25-1.3-5.25-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.52-1.46.12-3.04 0 0 .97-.31 3.17 1.17a10.8 10.8 0 0 1 5.77 0c2.2-1.48 3.17-1.17 3.17-1.17.65 1.58.25 2.75.12 3.04.74.8 1.19 1.83 1.19 3.08 0 4.39-2.7 5.37-5.27 5.66.41.36.79 1.06.79 2.12v3.13c0 .31.21.67.79.57A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

function XiaohongshuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <path d="M8 9h8M8 12h8M8 15h5" />
      <path d="M17 14.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5Z" />
    </svg>
  );
}

function BilibiliIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="7" width="18" height="12" rx="2.8" />
      <path d="M8 4 6.5 7M16 4l1.5 3M9.5 12.2v.1M14.5 12.2v.1" />
    </svg>
  );
}

const contactLinks: ContactLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/tsinqiu",
    ariaLabel: "打开 GitHub 主页",
    icon: <GithubIcon />,
    iconClassName: styles.iconGithub,
  },
  {
    label: "小红书",
    href: "https://xhslink.com/m/8OOl4dvUOYr",
    ariaLabel: "打开小红书主页",
    icon: <XiaohongshuIcon />,
    iconClassName: styles.iconXhs,
  },
  {
    label: "哔哩哔哩",
    href: "https://b23.tv/iWT9xPl",
    ariaLabel: "打开哔哩哔哩主页",
    icon: <BilibiliIcon />,
    iconClassName: styles.iconBili,
  },
];

export function SiteFooter() {
  return (
    <footer className={styles.footer} aria-labelledby="site-contact-title">
      <div className={styles.footerInner}>
        <p className={styles.cardTitle}>西门晴耕的小田园</p>

        <section className={styles.contactBlock}>
          <h2 id="site-contact-title">联系方式</h2>

          <div className={styles.contactLinks}>
            {contactLinks.map((item) => (
              <a
                key={item.href}
                className={styles.contactLink}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.ariaLabel}
              >
                <span className={`${styles.contactIcon} ${item.iconClassName}`}>{item.icon}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>

          <p className={styles.email}>邮箱：tsinqiu@163.com</p>
        </section>
      </div>
    </footer>
  );
}
