import type { Metadata } from "next";

import { SocialFeedPage } from "@/components/social-feed-page";
import { bilibiliEntries, videosPageConfig } from "@/content/site.config";
import { syncBilibiliEntries } from "@/lib/bilibili";

export const metadata: Metadata = {
  title: "哔哩哔哩视频 | 西门晴耕的小田园",
  description: "西门晴耕的小田园：哔哩哔哩视频索引页。",
};

export const revalidate = 21600;

export default async function VideosPage() {
  const syncedEntries = await syncBilibiliEntries(bilibiliEntries);

  return (
    <SocialFeedPage
      config={{
        ...videosPageConfig,
        entries: syncedEntries,
      }}
    />
  );
}
