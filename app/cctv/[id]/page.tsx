import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MapView from "@/components/MapView";
import {
  cctvPins,
  faultRecords,
  getCctvById,
  getMaintenanceHistory,
  type CctvStatus,
} from "@/lib/data";
import styles from "./detail.module.css";

const STATUS_DOT: Record<CctvStatus, string> = {
  정상: "dot-green",
  장애: "dot-red",
  점검: "dot-amber",
};
function statusBadge(status: CctvStatus) {
  if (status === "장애") return "badge-alert";
  if (status === "점검") return "badge-muted";
  return "badge-green";
}

// 모든 관리번호를 정적 페이지로 생성
export function generateStaticParams() {
  return cctvPins.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const cctv = getCctvById(id);
  if (!cctv) return { title: "CCTV를 찾을 수 없음 · 시흥시 방범CCTV" };
  return {
    title: `${cctv.id} ${cctv.location} · 시흥시 방범CCTV`,
    description: `${cctv.dong} ${cctv.location} 방범CCTV 상세 정보 및 점검 이력`,
  };
}

export default async function CctvDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cctv = getCctvById(id);
  if (!cctv) notFound();

  const history = getMaintenanceHistory(cctv.id);
  const relatedFaults = faultRecords.filter((f) => f.cctvId === cctv.id);

  const fields = [
    { label: "행정동", value: cctv.dong },
    { label: "장비 종류", value: cctv.type },
    { label: "설치 연도", value: `${cctv.installedYear}년`, mono: true },
    { label: "위도", value: cctv.lat.toFixed(5), mono: true },
    { label: "경도", value: cctv.lng.toFixed(5), mono: true },
  ];

  return (
    <>
      <main className="page-shell">
        <nav className={styles.crumb}>
          <Link href="/#map" className={styles.back}>
            ← CCTV 지도로 돌아가기
          </Link>
        </nav>

        <header className={styles.header}>
          <div className={styles.headLeft}>
            <div className={styles.headMeta}>
              <span className={`badge ${statusBadge(cctv.status)}`}>
                {cctv.status}
              </span>
              <span className={`${styles.id} mono`}>{cctv.id}</span>
            </div>
            <h1 className={styles.title}>{cctv.location}</h1>
            <p className={styles.sub}>
              {cctv.dong} · 시흥시 통합관제센터 운영
            </p>
          </div>
          <div className={styles.headActions}>
            <button className="btn-primary" type="button">
              점검 요청
            </button>
            <button className="btn-outline" type="button">
              장애 신고
            </button>
          </div>
        </header>

        <div className={styles.grid}>
          {/* 미니 지도 */}
          <section className={styles.mapBlock}>
            <MapView
              pins={[cctv]}
              center={{ lat: cctv.lat, lng: cctv.lng }}
              zoom={16}
              linkable={false}
              height={380}
            />
          </section>

          {/* 상세 정보 */}
          <section className={`card ${styles.infoCard}`}>
            <h2 className={styles.cardTitle}>장비 정보</h2>
            <dl className={styles.fields}>
              {fields.map((f) => (
                <div key={f.label} className={styles.field}>
                  <dt>{f.label}</dt>
                  <dd className={f.mono ? "mono" : undefined}>{f.value}</dd>
                </div>
              ))}
              <div className={styles.field}>
                <dt>현재 상태</dt>
                <dd>
                  <span
                    className={`dot ${STATUS_DOT[cctv.status]}`}
                    style={{ marginRight: 7 }}
                  />
                  {cctv.status}
                </dd>
              </div>
            </dl>
          </section>
        </div>

        {/* 관련 장애 */}
        {relatedFaults.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.blockTitle}>관련 장애 접수</h2>
            <div className={`card ${styles.tableCard}`}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>접수번호</th>
                    <th>유형</th>
                    <th>심각도</th>
                    <th>접수시각</th>
                    <th>담당</th>
                    <th>상태</th>
                  </tr>
                </thead>
                <tbody>
                  {relatedFaults.map((f) => (
                    <tr key={f.id}>
                      <td className="mono">{f.id}</td>
                      <td>{f.type}</td>
                      <td>{f.severity}</td>
                      <td className="mono">{f.reportedAt}</td>
                      <td className={styles.muted}>{f.assignee}</td>
                      <td>{f.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* 점검 이력 */}
        <section className={styles.section}>
          <h2 className={styles.blockTitle}>점검 이력</h2>
          <div className={`card ${styles.tableCard}`}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>점검일</th>
                  <th>작업 내용</th>
                  <th>수행</th>
                  <th>결과</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h, i) => (
                  <tr key={i}>
                    <td className="mono">{h.date}</td>
                    <td>{h.action}</td>
                    <td className={styles.muted}>{h.worker}</td>
                    <td>{h.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}
