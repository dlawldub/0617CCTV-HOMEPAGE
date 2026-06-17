import type { Metadata } from "next";
import FaultReport from "@/components/FaultReport";

export const metadata: Metadata = {
  title: "일일 장애 보고 · 시흥시 방범CCTV",
  description: "시흥시 방범CCTV 일일 장애 접수 및 처리 현황",
};

export default function FaultsPage() {
  return <FaultReport />;
}
