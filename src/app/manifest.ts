import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Saulo Matheus | Backend Software Engineer",
    short_name: "Saulo Matheus",
    description:
      "Backend Software Engineer especializado em NestJS, Node.js, TypeScript e Python.",
    start_url: ".",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      { src: "icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
