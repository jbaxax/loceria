import { ImageResponse } from "next/og"

export function GET() {
  return new ImageResponse(
    <div
      style={{
        background: "#C04422",
        width: 512,
        height: 512,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 112,
      }}
    >
      <span style={{ color: "white", fontSize: 300, fontWeight: 700 }}>L</span>
    </div>,
    { width: 512, height: 512 },
  )
}
