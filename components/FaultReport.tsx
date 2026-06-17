import styles from "./FaultReport.module.css";
import { faultRecords, totals, type FaultRecord } from "@/lib/data";

const severityClass: Record<FaultRecord["severity"], string> = {
  긴급: styles.sevUrgent,
  주의: styles.sevWarn,
  경미: styles.sevMinor,
};

const statusClass: Record<FaultRecord["status"], string> = {
  접수: styles.stReceived,
  출동: styles.stDispatch,
  처리중: styles.stWorking,
  완료: styles.stDone,
};

export default function FaultReport() {
  const summary = [
    { label: "금일 접수", value: totals.faultsToday, tone: "white" as const },
    { label: "처리중", value: totals.faultsOpen, tone: "alert" as const },
    { label: "처리완료", value: totals.faultsClosed, tone: "green" as const },
  ];

  return (
    <section className="section" id="faults">
      <div className="page-shell">
        <div className={styles.head}>
          <div>
            <span className="section-label">DAILY REPORT · 장애 보고</span>
            <h2 className="section-title">방범CCTV 일일 장애 현황 보고</h2>
            <p className="section-desc">
              금일 접수된 장애를 실시간 집계합니다. 현장 점검반 배정과 처리 상태를
              관제센터와 공유합니다.
            </p>
          </div>
          <div className={styles.summary}>
            {summary.map((s) => (
              <div key={s.label} className={styles.summaryItem}>
                <span
                  className={`${styles.summaryValue} mono`}
                  data-tone={s.tone}
                >
                  {s.value}
                  <em>건</em>
                </span>
                <span className={styles.summaryLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`card ${styles.tableCard}`}>
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>접수번호</th>
                  <th>관리번호</th>
                  <th>행정동</th>
                  <th>장애 유형</th>
                  <th>심각도</th>
                  <th>접수시각</th>
                  <th>담당</th>
                  <th>처리상태</th>
                </tr>
              </thead>
              <tbody>
                {faultRecords.map((f) => (
                  <tr key={f.id}>
                    <td className="mono">{f.id}</td>
                    <td className={`mono ${styles.strong}`}>{f.cctvId}</td>
                    <td>{f.dong}</td>
                    <td>{f.type}</td>
                    <td>
                      <span className={`${styles.sev} ${severityClass[f.severity]}`}>
                        {f.severity}
                      </span>
                    </td>
                    <td className="mono">{f.reportedAt}</td>
                    <td className={styles.muted}>{f.assignee}</td>
                    <td>
                      <span className={`${styles.status} ${statusClass[f.status]}`}>
                        {f.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.foot}>
            <span>
              총 <strong className="mono">{totals.faultsToday}</strong>건 ·
              미처리 <strong className="mono">{totals.faultsOpen}</strong>건
            </span>
            <span className={styles.updated}>최근 갱신 13:20</span>
          </div>
        </div>
      </div>
    </section>
  );
}
