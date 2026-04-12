import type { Metadata } from "next";

import { SocialFeedPage } from "@/components/social-feed-page";
import { xhsPageConfig } from "@/content/site.config";

export const metadata: Metadata = {
  title: "小红书内容 | 西门晴耕的小田园",
  description: "西门晴耕的小田园：小红书内容索引页。",
};

export default function XiaohongshuPage() {
  return <SocialFeedPage config={xhsPageConfig} />;
}
