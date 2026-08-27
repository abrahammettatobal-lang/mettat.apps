import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const buffer = await readFile(join(process.cwd(), "public/logo.png"));
  const base64 = buffer.toString("base64");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          background: "#faf8f5",
          overflow: "hidden",
        }}
      >
        {/* Recorte del isotipo (lado izquierdo del logo horizontal) */}
        <img
          src={`data:image/png;base64,${base64}`}
          alt=""
          height={32}
          width={108}
          style={{
            objectFit: "cover",
            objectPosition: "left center",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
