"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";

import styles from "./weather-mode-toggle.module.css";

const STORAGE_KEY = "xmqg-weather-mode";
const RAIN_DROP_COUNT = 72;

interface RainDrop {
  id: number;
  left: string;
  duration: string;
  delay: string;
  drift: string;
  length: string;
  opacity: string;
}

const menuItems = [
  { href: "/diary", label: "西门日记" },
  { href: "/about", label: "关于我" },
  { href: "/trajectory", label: "生活轨迹" },
] as const;

const pseudoRandom = (seed: number): number => {
  const value = Math.sin(seed * 12989.37) * 43758.55;
  return value - Math.floor(value);
};

const createRainDrops = (count: number): RainDrop[] =>
  Array.from({ length: count }, (_, index) => {
    const a = pseudoRandom(index + 1);
    const b = pseudoRandom(index + 101);
    const c = pseudoRandom(index + 1001);
    const d = pseudoRandom(index + 2001);
    const e = pseudoRandom(index + 3001);
    const f = pseudoRandom(index + 4001);

    return {
      id: index,
      left: `${Math.round(a * 100)}%`,
      duration: `${4.6 + b * 3.1}s`,
      delay: `${-(c * 8.5).toFixed(2)}s`,
      drift: `${4 + d * 8}vw`,
      length: `${10 + Math.round(e * 5)}px`,
      opacity: `${0.1 + f * 0.12}`,
    };
  });

export function WeatherModeToggle() {
  const pathname = usePathname();
  const [isRainMode, setIsRainMode] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.localStorage.getItem(STORAGE_KEY) === "rain";
  });
  const [menuOpen, setMenuOpen] = useState(false);

  const rainDrops = useMemo(() => createRainDrops(RAIN_DROP_COUNT), []);

  useEffect(() => {
    document.body.classList.toggle("weather-rain", isRainMode);
    window.localStorage.setItem(STORAGE_KEY, isRainMode ? "rain" : "sun");
  }, [isRainMode]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <>
      {menuOpen ? (
        <button className={`floatingUiLayer ${styles.backdrop}`} onClick={() => setMenuOpen(false)} aria-label="关闭菜单" />
      ) : null}

      <div className={`floatingUiLayer ${styles.menuDock}`}>
        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-controls="site-menu-panel"
          aria-label={menuOpen ? "收起菜单" : "展开菜单"}
        >
          <span className={styles.menuButtonText}>菜单</span>
          <span className={`${styles.bars} ${menuOpen ? styles.barsOpen : ""}`} aria-hidden>
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      {menuOpen ? (
        <aside id="site-menu-panel" className={`floatingUiLayer ${styles.menuPanel}`} aria-label="站点菜单">
          <h2>导航</h2>

          <nav className={styles.menuList} aria-label="主菜单">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.menuLink} ${pathname === item.href ? styles.menuLinkActive : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className={styles.divider} />

          <button
            type="button"
            className={styles.weatherSwitch}
            onClick={() => setIsRainMode((prev) => !prev)}
            aria-pressed={isRainMode}
          >
            <span>{isRainMode ? "雨天模式" : "晴天模式"}</span>
            <small>{isRainMode ? "切换到晴天" : "切换到雨天"}</small>
          </button>

          {isRainMode ? (
            <aside className={styles.easterEgg} aria-live="polite">
              <p>恭喜你发现西门晴耕的小彩蛋：EMO开关：网易云账号！</p>
              <a href="https://y.music.163.com/m/user?id=566419153" target="_blank" rel="noopener noreferrer">
                打开网易云主页
              </a>
            </aside>
          ) : null}
        </aside>
      ) : null}

      {isRainMode ? (
        <div className={`floatingUiLayer ${styles.rainOverlay}`} aria-hidden>
          <div className={styles.rainFog} />
          <div className={styles.rainShade} />
          <div className={styles.rainDrops}>
            {rainDrops.map((drop) => (
              <span
                key={drop.id}
                className={styles.rainDrop}
                style={
                  {
                    "--left": drop.left,
                    "--duration": drop.duration,
                    "--delay": drop.delay,
                    "--drift": drop.drift,
                    "--length": drop.length,
                    "--opacity": drop.opacity,
                  } as CSSProperties
                }
              />
            ))}
          </div>
          <div className={styles.rainMist} />
        </div>
      ) : null}
    </>
  );
}
