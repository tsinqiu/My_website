import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i0.hdslb.com",
      },
      {
        protocol: "https",
        hostname: "i1.hdslb.com",
      },
      {
        protocol: "https",
        hostname: "i2.hdslb.com",
      },
      {
        protocol: "https",
        hostname: "mmbiz.qpic.cn",
      },
      {
        protocol: "https",
        hostname: "mmbiz.qlogo.cn",
      },
      {
        protocol: "https",
        hostname: "wx.qlogo.cn",
      },
    ],
  },
};

export default nextConfig;
