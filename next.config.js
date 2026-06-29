/** @type {import('next').NextConfig} */
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  reactStrictMode: true,
  // Fully static site (no server features) → exports to ./out for free static
  // hosting (GitHub Pages / Cloudflare Pages). Served from a sub-path on a
  // Pages project site, so base/asset prefixes come from NEXT_PUBLIC_BASE_PATH.
  output: "export",
  basePath: base || undefined,
  assetPrefix: base || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  // Allow the dev server's /_next resources to be loaded through tunnels
  // (cloudflared/ngrok) so the site works when viewed off-machine.
  allowedDevOrigins: [
    "*.trycloudflare.com",
    "*.ngrok-free.app",
    "*.ngrok.app",
  ],
};

module.exports = nextConfig;
