import { ImageResponse } from "next/og"

export function GET() {
  return new ImageResponse(
    <div
      style={{
        width: 1280,
        height: 720,
        background: "#EDE8E2",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Centered card */}
      <div
        style={{
          width: 420,
          background: "#FAF8F5",
          borderRadius: 24,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "24px 20px 8px",
          }}
        >
          <span style={{ fontSize: 24, fontWeight: 700, color: "#111827" }}>Locería</span>
          <span style={{ fontSize: 13, color: "#9CA3AF" }}>dom, 3 may.</span>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid #E5E7EB",
            padding: "0 20px",
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#C04422",
              padding: "10px 0",
              marginRight: 24,
              borderBottom: "2px solid #C04422",
            }}
          >
            Vender
          </span>
          <span style={{ fontSize: 14, color: "#9CA3AF", padding: "10px 0" }}>
            Resumen
          </span>
        </div>

        {/* Body */}
        <div style={{ padding: "20px", display: "flex", flexDirection: "column" }}>
          {/* Puesto buttons */}
          <div style={{ display: "flex", marginBottom: 14 }}>
            <div
              style={{
                flex: 1,
                background: "#C04422",
                borderRadius: 14,
                padding: "12px 0",
                color: "white",
                fontSize: 13,
                fontWeight: 600,
                display: "flex",
                justifyContent: "center",
                marginRight: 10,
              }}
            >
              Puesto 1
            </div>
            <div
              style={{
                flex: 1,
                background: "white",
                border: "1px solid #E5E7EB",
                borderRadius: 14,
                padding: "12px 0",
                color: "#374151",
                fontSize: 13,
                fontWeight: 600,
                display: "flex",
                justifyContent: "center",
              }}
            >
              Puesto 2
            </div>
          </div>

          {/* Vendido hoy */}
          <div
            style={{
              background: "#FDDDD0",
              borderRadius: 14,
              padding: "10px 14px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <span style={{ color: "#C04422", fontSize: 13 }}>Vendido hoy · Puesto 1</span>
            <span style={{ color: "#C04422", fontWeight: 700 }}>S/ 42.00</span>
          </div>

          {/* Input row */}
          <div style={{ display: "flex", marginBottom: 10 }}>
            <div
              style={{
                flex: 1,
                background: "white",
                border: "1px solid #E5E7EB",
                borderRadius: 12,
                padding: "10px 12px",
                marginRight: 8,
              }}
            >
              <span style={{ color: "#9CA3AF", fontSize: 13 }}>¿Qué vendiste?</span>
            </div>
            <div
              style={{
                width: 76,
                background: "white",
                border: "1px solid #E5E7EB",
                borderRadius: 12,
                padding: "10px 8px",
                marginRight: 8,
              }}
            >
              <span style={{ color: "#9CA3AF", fontSize: 13 }}>S/ 0.00</span>
            </div>
            <div
              style={{
                width: 42,
                background: "white",
                border: "1px solid #E5E7EB",
                borderRadius: 12,
                padding: "10px 8px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "#374151", fontSize: 13 }}>1</span>
            </div>
          </div>

          {/* Register button */}
          <div
            style={{
              background: "#C04422",
              borderRadius: 16,
              padding: "14px 0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "white", fontSize: 15, fontWeight: 600 }}>
              Registrar venta
            </span>
          </div>
        </div>
      </div>
    </div>,
    { width: 1280, height: 720 },
  )
}
