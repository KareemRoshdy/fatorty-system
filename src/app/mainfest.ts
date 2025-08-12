import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Fatorty - فاتورتي",
    short_name: "فاتورتي",
    description: "تابع فواتيرك بسهولة وأمان",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    orientation: "portrait",
    icons: [
      {
        src: "/apple-icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon1.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
