import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  outputFileTracingRoot: path.join(__dirname),
  // geo-tz loads binary .dat timezone data files at runtime via Node.js fs.
  // Marking as server external packages means Next.js won't bundle them —
  // they stay as native require() calls that resolve files relative to their
  // own package directories, which is what they expect.
  serverExternalPackages: ["geo-tz", "astronomy-engine"],
};

export default nextConfig;
