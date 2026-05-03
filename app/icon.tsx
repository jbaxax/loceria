import { ImageResponse } from "next/og"

export const size = { width: 192, height: 192 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        background: "#C04422",
        width: 192,
        height: 192,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 42,
      }}
    >
      <span style={{ color: "white", fontSize: 112, fontWeight: 700 }}>L</span>
    </div>,
    { width: 192, height: 192 },
  )
}
