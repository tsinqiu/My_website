import type { Metadata } from "next";

import { SocialFeedPage } from "@/components/social-feed-page";
import { articlesPageConfig } from "@/content/site.config";

export const metadata: Metadata = {
  title: "微信公众号文章 | 西门晴耕的小田园",
  description: "西门晴耕的小田园：微信公众号文章索引页。",
};

export const revalidate = 21600;

export default function ArticlesPage() {
  return <SocialFeedPage config={articlesPageConfig} />;
}
