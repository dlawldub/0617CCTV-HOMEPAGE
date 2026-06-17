import styles from "./Hero.module.css";
import { totals, uptimeRate } from "@/lib/data";

const today = "2026. 06. 17 (수)";

export default function Hero() {
  const stats = [
    { label: "총 설치 대수", value: totals.cameras.toLocaleString(), unit: "대" },
    { label: "설치 개소", value: totals.sites.toLocaleString(), unit: "개소" },
    { label: "운영 행정동", value: String(totals.dongs), unit: "개 동" },
    { label: "장비 가동률", value: uptimeRate, unit: "%", accent: true },
  ];

  return (
    <section className={styles.hero} id="top">
      <div className="page-shell">
        <div className={styles.eyebrow}>
          <span className="badge badge-green">
            <span className="dot dot-green" style={{ background: "#fff" }} />
            LIVE 관제
          </span>
          <span className={styles.date}>기준일 {today}</span>
        </div>

        <h1 className={styles.title}>
          시흥시 방범CCTV
          <br />
          유지보수 정보공유 플랫폼
        </h1>

        <p className={styles.subtitle}>
          시흥시 관내 방범CCTV의 위치·설치 현황·일일 장애 보고를 한 화면에서 공유합니다.
          현장 점검반과 관제센터가 동일한 데이터를 보며 신속하게 대응합니다.
        </p>

        <div className={styles.cta}>
          <a href="/map" className="btn-primary">
            CCTV 지도 보기
          </a>
          <a href="/faults" className="btn-outline">
            금일 장애 현황 →
          </a>
        </div>

        <div className={styles.statStrip}>
          {stats.map((s) => (
            <div key={s.label} className={styles.stat}>
              <span className={styles.statLabel}>{s.label}</span>
              <span className={styles.statValue}>
                <strong
                  className="mono"
                  style={s.accent ? { color: "var(--color-signal-blue)" } : undefined}
                >
                  {s.value}
                </strong>
                <em className={styles.statUnit}>{s.unit}</em>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
