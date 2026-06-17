"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./CctvMap.module.css";
import MapView from "./MapView";
import {
  cctvPins,
  MAP_CENTER,
  MAP_ZOOM,
  type CctvStatus,
} from "@/lib/data";

const STATUS_DOT: Record<CctvStatus, string> = {
  정상: "dot-green",
  장애: "dot-red",
  점검: "dot-amber",
};
const STATUS_LABEL: Record<CctvStatus, string> = {
  정상: "정상 운영",
  장애: "장애 발생",
  점검: "점검중",
};

const FILTERS: ("전체" | CctvStatus)[] = ["전체", "정상", "장애", "점검"];

export default function CctvMap() {
  const [filter, setFilter] = useState<"전체" | CctvStatus>("전체");

  const visiblePins = useMemo(
    () =>
      filter === "전체"
        ? cctvPins
        : cctvPins.filter((p) => p.status === filter),
    [filter]
  );

  const counts = useMemo(
    () => ({
      정상: cctvPins.filter((p) => p.status === "정상").length,
      장애: cctvPins.filter((p) => p.status === "장애").length,
      점검: cctvPins.filter((p) => p.status === "점검").length,
    }),
    []
  );

  return (
    <section className="section" id="map">
      <div className="page-shell">
        <span className="section-label">CCTV MAP · 위치 관제</span>
        <h2 className="section-title">방범CCTV 위치 지도</h2>
        <p className="section-desc">
          시흥시 관내 주요 방범CCTV의 설치 위치와 실시간 상태를 지도에 표기합니다.
          목록 또는 지도 마커를 선택하면 해당 CCTV의 상세 페이지가 열립니다.
        </p>

        <div className={styles.filters}>
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className={`${styles.filter} ${
                filter === f ? styles.filterActive : ""
              }`}
              onClick={() => setFilter(f)}
            >
              {f}
              {f !== "전체" && (
                <span className={styles.filterCount}>{counts[f]}</span>
              )}
            </button>
          ))}
        </div>

        <div className={styles.layout}>
          {/* ---------- 네이버 지도 ---------- */}
          <div className={styles.mapCol}>
            <MapView
              pins={visiblePins}
              center={MAP_CENTER}
              zoom={MAP_ZOOM}
              linkable
              height={560}
            />
            <div className={styles.legend}>
              {(Object.keys(STATUS_LABEL) as CctvStatus[]).map((s) => (
                <span key={s} className={styles.legendItem}>
                  <span className={`dot ${STATUS_DOT[s]}`} />
                  {STATUS_LABEL[s]}
                </span>
              ))}
            </div>
          </div>

          {/* ---------- CCTV 목록 (클릭 시 별도 동적 페이지) ---------- */}
          <aside className={styles.listCol}>
            <div className={styles.listHead}>
              <span className={styles.listTitle}>CCTV 목록</span>
              <span className={styles.listCount}>
                {visiblePins.length}개소
              </span>
            </div>
            <ul className={styles.list}>
              {visiblePins.map((p) => (
                <li key={p.id}>
                  <Link href={`/cctv/${p.id}`} className={styles.row}>
                    <span className={`dot ${STATUS_DOT[p.status]}`} />
                    <span className={styles.rowMain}>
                      <span className={`${styles.rowId} mono`}>{p.id}</span>
                      <span className={styles.rowLoc}>{p.location}</span>
                    </span>
                    <span className={styles.rowDong}>{p.dong}</span>
                    <span className={styles.rowArrow} aria-hidden>
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
