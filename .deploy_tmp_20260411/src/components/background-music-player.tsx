"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./background-music-player.module.css";

const AUDIO_SRC = "/audio/blissful-reverie.mp3";
const ENABLED_KEY = "xmqg-bg-music-enabled";
const VOLUME_KEY = "xmqg-bg-music-volume";
const DEFAULT_VOLUME = 0.55;

const parseVolume = (raw: string | null): number => {
  if (!raw) return DEFAULT_VOLUME;
  const value = Number.parseFloat(raw);
  if (!Number.isFinite(value)) return DEFAULT_VOLUME;
  return Math.max(0, Math.min(1, value));
};

export function BackgroundMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(ENABLED_KEY) === "1";
  });
  const [volume] = useState<number>(() => {
    if (typeof window === "undefined") return DEFAULT_VOLUME;
    return parseVolume(window.localStorage.getItem(VOLUME_KEY));
  });

  useEffect(() => {
    window.localStorage.setItem(VOLUME_KEY, String(volume));
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;
    window.localStorage.setItem(ENABLED_KEY, isPlaying ? "1" : "0");

    if (!isPlaying) {
      audioRef.current.pause();
      return;
    }

    void audioRef.current.play().catch(() => {
      setIsPlaying(false);
    });
  }, [isPlaying]);

  const togglePlayback = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <div className={`floatingUiLayer ${styles.musicDock}`}>
      <audio ref={audioRef} src={AUDIO_SRC} loop preload="metadata" />
      <button
        type="button"
        className={styles.musicButton}
        onClick={togglePlayback}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? "暂停背景音乐" : "播放背景音乐"}
      >
        <span className={styles.mainLabel}>背景音乐</span>
        <span className={styles.subLabel}>{isPlaying ? "正在播放" : "点击播放"}</span>
      </button>
    </div>
  );
}
