/** @type {import('next').NextConfig} */
const isProd: boolean = process.env.NODE_ENV === "production";

const repo = "front-next-portfolio";
const basePath = isProd ? `/${repo}` : "";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath ? `${basePath}/` : "",
};

module.exports = nextConfig;

export default nextConfig;
