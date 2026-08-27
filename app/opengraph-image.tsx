import { ImageResponse } from "next/og";

export const alt = "Metta T. Apps — construye exactamente la app que necesitas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#1c1917",
          color: "#f7f3ee",
        }}
      >
        <div style={{ fontSize: 28, color: "#7dcec4" }}>Metta T. Apps</div>
        <div style={{ fontSize: 64, fontWeight: 700, marginTop: 16, letterSpacing: -1.5 }}>
          Construye exactamente la app que necesitas.
        </div>
      </div>
    ),
    size,
  );
}
