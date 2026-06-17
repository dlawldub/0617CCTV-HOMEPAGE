import styles from "./DongStatus.module.css";
import { dongStats } from "@/lib/data";

export default function DongStatus() {
  const maxCameras = Math.max(...dongStats.map((d) => d.cameras));
  const ranked = [...dongStats].sort((a, b) => b.cameras - a.cameras);

  return (
    <section className="section" id="dong">
      <div className="page-shell">
        <span className="section-label">BY DISTRICT · 동별 현황</span>
        <h2 className="section-title">동별 설치 현황</h2>
        <p className="section-desc">
          행정동별 설치 대수·개소와 현재 장애 건수를 비교합니다. 막대는 동 간 설치
          규모를 상대적으로 나타냅니다.
        </p>

        <div className={`card ${styles.card}`}>
          <div className={styles.headerRow}>
            <span className={styles.colDong}>행정동</span>
            <span className={styles.colBar}>설치 규모</span>
            <span className={styles.colNum}>대수</span>
            <span className={styles.colNum}>개소</span>
            <span className={styles.colNum}>장애</span>
          </div>

          {ranked.map((d, i) => (
            <div key={d.dong} className={styles.row}>
              <span className={styles.colDong}>
                <span className={styles.rank}>{i + 1}</span>
                {d.dong}
              </span>
              <span className={styles.colBar}>
                <span className={styles.track}>
                  <span
                    className={styles.fill}
                    style={{ width: `${(d.cameras / maxCameras) * 100}%` }}
                  />
                </span>
              </span>
              <span className={`${styles.colNum} ${styles.strong} mono`}>
                {d.cameras.toLocaleString()}
              </span>
              <span className={`${styles.colNum} mono`}>{d.sites}</span>
              <span className={`${styles.colNum} mono`}>
                {d.faults > 0 ? (
                  <span className={styles.fault}>{d.faults}</span>
                ) : (
                  <span className={styles.zero}>0</span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
