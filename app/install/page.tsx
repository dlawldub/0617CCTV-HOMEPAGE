import type { Metadata } from "next";
import InstallStatus from "@/components/InstallStatus";

export const metadata: Metadata = {
  title: "설치 현황 · 시흥시 방범CCTV",
  description: "시흥시 방범CCTV 설치 수량·개소 및 용도별 구성",
};

export default function InstallPage() {
  return <InstallStatus />;
}
