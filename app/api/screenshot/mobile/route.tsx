import { ImageResponse } from "next/og"

export function GET() {
  return new ImageResponse(
    <div
      style={{
        width: 390,
        height: 844,
        background: "#EDE8E2",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 390,
          background: "#FAF8F5",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "28px 20px 8px",
          }}
        >
          <span style={{ fontSize: 26, fontWeight: 700, color: "#111827" }}>Locería</span>
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
              padding: "12px 0",
              marginRight: 24,
              borderBottom: "2px solid #C04422",
            }}
          >
            Vender
          </span>
          <span style={{ fontSize: 14, color: "#9CA3AF", padding: "12px 0" }}>
            Resumen
          </span>
        </div>

        {/* Body */}
        <div
          style={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Puesto label */}
          <span
            style={{ fontSize: 10, color: "#9CA3AF", letterSpacing: 2, marginBottom: 10 }}
          >
            PUESTO DE VENTA
          </span>

          {/* Puesto buttons */}
          <div style={{ display: "flex", marginBottom: 16 }}>
            <div
              style={{
                flex: 1,
                background: "#C04422",
                borderRadius: 16,
                padding: "14px 0",
                color: "white",
                fontSize: 14,
                fontWeight: 600,
                display: "flex",
                justifyContent: "center",
                marginRight: 12,
              }}
            >
              Puesto 1
            </div>
            <div
              style={{
                flex: 1,
                background: "white",
                border: "1px solid #E5E7EB",
                borderRadius: 16,
                padding: "14px 0",
                color: "#374151",
                fontSize: 14,
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
              borderRadius: 16,
              padding: "12px 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <span style={{ color: "#C04422", fontSize: 13 }}>Vendido hoy · Puesto 1</span>
            <span style={{ color: "#C04422", fontWeight: 700, fontSize: 14 }}>S/ 42.00</span>
          </div>

          {/* Columns header */}
          <div style={{ display: "flex", marginBottom: 8, padding: "0 2px" }}>
            <span style={{ flex: 1, fontSize: 10, color: "#9CA3AF", letterSpacing: 2 }}>
              PRODUCTO
            </span>
            <span style={{ fontSize: 10, color: "#9CA3AF", letterSpacing: 2, marginRight: 40 }}>
              PRECIO
            </span>
            <span style={{ fontSize: 10, color: "#9CA3AF", letterSpacing: 2 }}>CANT.</span>
          </div>

          {/* Input row */}
          <div style={{ display: "flex", marginBottom: 12 }}>
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
                width: 80,
                background: "white",
                border: "1px solid #E5E7EB",
                borderRadius: 12,
                padding: "10px 8px",
                marginRight: 8,
                display: "flex",
              }}
            >
              <span style={{ color: "#9CA3AF", fontSize: 13 }}>S/ 0.00</span>
            </div>
            <div
              style={{
                width: 44,
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

          {/* Add product */}
          <div
            style={{
              border: "1px dashed #D1D5DB",
              borderRadius: 16,
              padding: "12px 0",
              display: "flex",
              justifyContent: "center",
              marginBottom: 60,
            }}
          >
            <span style={{ color: "#9CA3AF", fontSize: 14 }}>+ Agregar producto</span>
          </div>

          {/* Register button */}
          <div
            style={{
              background: "#C04422",
              borderRadius: 20,
              padding: "18px 0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "white", fontSize: 16, fontWeight: 600 }}>
              Registrar venta
            </span>
          </div>
        </div>
      </div>
    </div>,
    { width: 390, height: 844 },
  )
}
