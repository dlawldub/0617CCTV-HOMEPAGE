import Link from "next/link";
import styles from "./OverviewGrid.module.css";
import { totals } from "@/lib/data";

const items = [
  {
    href: "/map",
    label: "CCTV 지도",
    eyebrow: "MAP",
    desc: "관내 방범CCTV 위치·상태를 지도와 목록에서 확인",
    metric: `${totals.dongs}개 행정동`,
  },
  {
    href: "/install",
    label: "설치 현황",
    eyebrow: "INSTALL",
    desc: "총 설치 수량·개소와 용도별 구성 비율",
    metric: `${totals.cameras.toLocaleString()}대`,
  },
  {
    href: "/faults",
    label: "일일 장애 보고",
    eyebrow: "DAILY",
    desc: "금일 접수된 장애와 처리 상태 현황",
    metric: `금일 ${totals.faultsToday}건`,
    alert: totals.faultsOpen > 0,
  },
  {
    href: "/districts",
    label: "동별 설치 현황",
    eyebrow: "DISTRICT",
    desc: "20개 행정동별 설치 대수·개소 비교",
    metric: `${totals.sites.toLocaleString()}개소`,
  },
  {
    href: "/yearly",
    label: "연도별 통계",
    eyebrow: "YEARLY",
    desc: "연도별 신규 설치와 누적 설치 추세 그래프",
    metric: "2018–2025",
  },
];

export default function OverviewGrid() {
  return (
    <section className="section">
      <div className="page-shell">
        <span className="section-label">MENU · 정보 메뉴</span>
        <h2 className="section-title">살펴보기</h2>
        <p className="section-desc">
          항목을 선택하면 각 정보 페이지로 이동합니다.
        </p>

        <div className={styles.grid}>
          {items.map((it) => (
            <Link key={it.href} href={it.href} className={styles.card}>
              <div className={styles.top}>
                <span className={styles.eyebrow}>{it.eyebrow}</span>
                {it.alert && <span className="badge badge-alert">장애</span>}
              </div>
              <h3 className={styles.label}>{it.label}</h3>
              <p className={styles.desc}>{it.desc}</p>
              <div className={styles.foot}>
                <span className={`${styles.metric} mono`}>{it.metric}</span>
                <span className={styles.arrow} aria-hidden>
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
