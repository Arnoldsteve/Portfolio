import { ImageResponse } from "next/og";
import { lightToken } from "@/lib/token-values";

// Plain jacaranda tile: no monogram until one is designed on purpose (brand book, Logo).
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", borderRadius: 7, background: lightToken("jacaranda") }} />,
    size,
  );
}
