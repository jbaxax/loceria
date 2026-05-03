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
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon-maskable.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  }
}
