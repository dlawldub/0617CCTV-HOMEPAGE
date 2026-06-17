import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "유지보수 게시판 · 시흥시 방범CCTV",
  description: "시흥시 방범CCTV 유지보수 공지·점검·장애 정보 공유 게시판",
};

export default function BoardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
