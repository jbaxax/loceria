import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { QueryProvider } from "@/components/query-provider"
import { Toaster } from "sonner"
import { PwaRegister } from "@/components/pwa-register"
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "Locería",
  description: "Registro de ventas del negocio familiar",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Locería",
  },
}

export const viewport: Viewport = {
  themeColor: "#C04422",
  width: "device-width",
  initialScale: 1,
  maximumScale:1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}
    >
      <body>
        <QueryProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </QueryProvider>
        <Toaster richColors position="top-center" />
        <PwaRegister />
      </body>
    </html>
  )
}
