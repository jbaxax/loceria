import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Locería",
    short_name: "Locería",
    description: "Registro de ventas del negocio familiar",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF8F5",
    theme_color: "#C04422",
    orientation: "portrait",
    icons: [
      {
        src: "/icon",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/api/icon512",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  }
}
