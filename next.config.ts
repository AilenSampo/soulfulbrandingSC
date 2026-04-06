import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "8mb",
    },
  },
  /** Evita 404 si alguien escribe /login/admin/... en lugar de /admin/... */
  async redirects() {
    return [
      { source: "/login/admin", destination: "/admin/login", permanent: false },
      { source: "/login/admin/:path*", destination: "/admin/:path*", permanent: false },
    ];
  },
};

export default nextConfig;
