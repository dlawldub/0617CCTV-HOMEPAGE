import type { Metadata } from "next";
import DongStatus from "@/components/DongStatus";

export const metadata: Metadata = {
  title: "동별 설치 현황 · 시흥시 방범CCTV",
  description: "시흥시 20개 행정동별 방범CCTV 설치 현황",
};

export default function DistrictsPage() {
  return <DongStatus />;
}
