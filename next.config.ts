import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "beacontrustee.co.in",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
