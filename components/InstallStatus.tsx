import styles from "./InstallStatus.module.css";
import { totals, purposeStats } from "@/lib/data";

const purposeColors = [
  "var(--color-signal-blue)",
  "var(--color-map-green)",
  "var(--color-slate)",
  "var(--color-warn-amber)",
];

export default function InstallStatus() {
  const purposeTotal = purposeStats.reduce((s, p) => s + p.cameras, 0);
  const perSite = (totals.cameras / totals.sites).toFixed(1);

  const tiles = [
    { label: "총 설치 대수", value: totals.cameras.toLocaleString(), unit: "대" },
    { label: "총 설치 개소", value: totals.sites.toLocaleString(), unit: "개소" },
    { label: "개소당 평균", value: perSite, unit: "대/개소" },
    { label: "운영 행정동", value: String(totals.dongs), unit: "개 동" },
  ];

  return (
    <section className="section" id="install">
      <div className="page-shell">
        <span className="section-label">INSTALLATION · 설치 현황</span>
        <h2 className="section-title">방범CCTV 설치 현황</h2>
        <p className="section-desc">
          관내 방범CCTV 설치 수량과 개소를 집계하고, 용도별 구성 비율을 함께
          제공합니다.
        </p>

        <div className={styles.grid}>
          {tiles.map((t) => (
            <div key={t.label} className={`card ${styles.tile}`}>
              <span className={styles.tileLabel}>{t.label}</span>
              <span className={styles.tileValue}>
                <strong className="mono">{t.value}</strong>
                <em>{t.unit}</em>
              </span>
            </div>
          ))}
        </div>

        <div className={`card ${styles.purpose}`}>
          <div className={styles.purposeHead}>
            <h3 className={styles.purposeTitle}>용도별 설치 구성</h3>
            <span className={styles.purposeTotal}>
              합계 <strong className="mono">{purposeTotal.toLocaleString()}</strong>대
            </span>
          </div>

          <div className={styles.bar} role="img" aria-label="용도별 설치 비율">
            {purposeStats.map((p, i) => (
              <span
                key={p.purpose}
                className={styles.barSeg}
                style={{
                  width: `${(p.cameras / purposeTotal) * 100}%`,
                  background: purposeColors[i],
                }}
                title={`${p.purpose} ${p.cameras.toLocaleString()}대`}
              />
            ))}
          </div>

          <ul className={styles.legend}>
            {purposeStats.map((p, i) => (
              <li key={p.purpose} className={styles.legendItem}>
                <span
                  className="dot"
                  style={{ background: purposeColors[i] }}
                />
                <span className={styles.legendName}>{p.purpose}</span>
                <span className={`${styles.legendVal} mono`}>
                  {p.cameras.toLocaleString()}대
                </span>
                <span className={styles.legendPct}>
                  {((p.cameras / purposeTotal) * 100).toFixed(1)}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
