import type { Metadata } from "next";
import YearlyChart from "@/components/YearlyChart";

export const metadata: Metadata = {
  title: "연도별 설치 통계 · 시흥시 방범CCTV",
  description: "시흥시 방범CCTV 연도별 신규·누적 설치 추세",
};

export default function YearlyPage() {
  return <YearlyChart />;
}
