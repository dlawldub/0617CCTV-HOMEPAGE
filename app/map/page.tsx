import type { Metadata } from "next";
import CctvMap from "@/components/CctvMap";

export const metadata: Metadata = {
  title: "CCTV 지도 · 시흥시 방범CCTV",
  description: "시흥시 방범CCTV 위치 지도 및 목록",
};

export default function MapPage() {
  return <CctvMap />;
}
