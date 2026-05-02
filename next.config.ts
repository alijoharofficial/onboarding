import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/onboarding",
  assetPrefix: "/onboarding/",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
