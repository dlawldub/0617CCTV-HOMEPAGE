import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="page-shell"
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        textAlign: "center",
      }}
    >
      <span className="section-label">404</span>
      <h1 style={{ fontSize: "var(--text-heading)", fontWeight: 700 }}>
        해당 관리번호의 CCTV를 찾을 수 없습니다
      </h1>
      <p style={{ color: "var(--color-ash)" }}>
        관리번호가 올바른지 확인해 주세요.
      </p>
      <Link href="/map" className="btn-primary">
        CCTV 지도로 돌아가기
      </Link>
    </main>
  );
}
