/* =========================================================
   방범CCTV 유지보수 플랫폼 — 데모 데이터 (경기도 시흥시)
   · 행정동: 시흥시 20개 행정동 기준
   · 좌표: 시흥시 권역 내 임의 위경도(데모). 추후 실제 데이터로 교체.
   ========================================================= */

export type CctvStatus = "정상" | "장애" | "점검";

export interface CctvPin {
  /** 관리번호 */
  id: string;
  dong: string;
  /** 설치 위치 설명 */
  location: string;
  /** 위도 (네이버 지도 마커) */
  lat: number;
  /** 경도 (네이버 지도 마커) */
  lng: number;
  status: CctvStatus;
  /** 카메라 종류 */
  type: "고정형" | "회전형(PTZ)" | "다목적";
  /** 설치 연도 */
  installedYear: number;
}

export interface DongStat {
  dong: string;
  /** 설치 대수 */
  cameras: number;
  /** 설치 개소 */
  sites: number;
  /** 장애 대수 */
  faults: number;
}

export interface YearStat {
  year: number;
  /** 해당 연도 신규 설치 대수 */
  installed: number;
}

export interface FaultRecord {
  id: string;
  cctvId: string;
  dong: string;
  /** 장애 유형 */
  type: string;
  /** 접수 시각 */
  reportedAt: string;
  severity: "긴급" | "주의" | "경미";
  /** 처리 상태 */
  status: "접수" | "출동" | "처리중" | "완료";
  assignee: string;
}

/** 지도 초기 중심 — 시흥시청 인근 */
export const MAP_CENTER = { lat: 37.3799, lng: 126.8031 };
export const MAP_ZOOM = 12;

/* ---------- CCTV 지도 핀 (시흥시 20개 행정동 표본) ---------- */
export const cctvPins: CctvPin[] = [
  { id: "SH-2001", dong: "대야동", location: "대야사거리 교차로", lat: 37.4395, lng: 126.796, status: "정상", type: "회전형(PTZ)", installedYear: 2019 },
  { id: "SH-2002", dong: "신천동", location: "신천역 2번 출구", lat: 37.431, lng: 126.7925, status: "정상", type: "고정형", installedYear: 2020 },
  { id: "SH-2003", dong: "신현동", location: "신현초교 통학로", lat: 37.415, lng: 126.769, status: "장애", type: "다목적", installedYear: 2021 },
  { id: "SH-2004", dong: "은행동", location: "은행동 시장 입구", lat: 37.4255, lng: 126.812, status: "정상", type: "고정형", installedYear: 2019 },
  { id: "SH-2005", dong: "매화동", location: "매화공단 진입로", lat: 37.405, lng: 126.836, status: "정상", type: "다목적", installedYear: 2022 },
  { id: "SH-2006", dong: "목감동", location: "목감지구 중앙공원", lat: 37.365, lng: 126.8665, status: "장애", type: "회전형(PTZ)", installedYear: 2023 },
  { id: "SH-2007", dong: "군자동", location: "거모사거리", lat: 37.345, lng: 126.7855, status: "정상", type: "고정형", installedYear: 2020 },
  { id: "SH-2008", dong: "월곶동", location: "월곶포구 해안로", lat: 37.392, lng: 126.7385, status: "점검", type: "다목적", installedYear: 2024 },
  { id: "SH-2009", dong: "정왕본동", location: "오이도역 환승센터", lat: 37.3505, lng: 126.745, status: "정상", type: "회전형(PTZ)", installedYear: 2019 },
  { id: "SH-2010", dong: "정왕1동", location: "시화공단 1로", lat: 37.3415, lng: 126.7385, status: "정상", type: "고정형", installedYear: 2021 },
  { id: "SH-2011", dong: "정왕2동", location: "정왕동 어린이보호구역", lat: 37.336, lng: 126.733, status: "정상", type: "다목적", installedYear: 2022 },
  { id: "SH-2012", dong: "정왕3동", location: "옥구공원 산책로", lat: 37.348, lng: 126.7225, status: "장애", type: "회전형(PTZ)", installedYear: 2023 },
  { id: "SH-2013", dong: "정왕4동", location: "정왕시장 주차장", lat: 37.3555, lng: 126.7305, status: "정상", type: "고정형", installedYear: 2020 },
  { id: "SH-2014", dong: "배곧1동", location: "배곧한울공원 광장", lat: 37.3735, lng: 126.7285, status: "점검", type: "다목적", installedYear: 2024 },
  { id: "SH-2015", dong: "배곧2동", location: "서울대시흥캠퍼스 앞", lat: 37.3805, lng: 126.7205, status: "정상", type: "회전형(PTZ)", installedYear: 2025 },
  { id: "SH-2016", dong: "과림동", location: "과림저수지 진입로", lat: 37.435, lng: 126.845, status: "정상", type: "고정형", installedYear: 2022 },
  { id: "SH-2017", dong: "연성동", location: "시흥시청 정문", lat: 37.3875, lng: 126.808, status: "장애", type: "다목적", installedYear: 2021 },
  { id: "SH-2018", dong: "장곡동", location: "장현지구 중심상가", lat: 37.378, lng: 126.795, status: "정상", type: "회전형(PTZ)", installedYear: 2024 },
  { id: "SH-2019", dong: "능곡동", location: "능곡중학교 정문", lat: 37.37, lng: 126.8, status: "정상", type: "고정형", installedYear: 2023 },
  { id: "SH-2020", dong: "거북섬동", location: "거북섬 웨이브파크 앞", lat: 37.336, lng: 126.7, status: "점검", type: "다목적", installedYear: 2025 },
];

/* ---------- 동별 설치 현황 (시흥시 20개 행정동, 데모 수치) ---------- */
export const dongStats: DongStat[] = [
  { dong: "대야동", cameras: 268, sites: 44, faults: 1 },
  { dong: "신천동", cameras: 154, sites: 27, faults: 0 },
  { dong: "신현동", cameras: 142, sites: 24, faults: 1 },
  { dong: "은행동", cameras: 236, sites: 39, faults: 0 },
  { dong: "매화동", cameras: 128, sites: 22, faults: 0 },
  { dong: "목감동", cameras: 247, sites: 41, faults: 1 },
  { dong: "군자동", cameras: 188, sites: 31, faults: 0 },
  { dong: "월곶동", cameras: 132, sites: 23, faults: 0 },
  { dong: "정왕본동", cameras: 174, sites: 29, faults: 0 },
  { dong: "정왕1동", cameras: 196, sites: 33, faults: 0 },
  { dong: "정왕2동", cameras: 165, sites: 28, faults: 0 },
  { dong: "정왕3동", cameras: 152, sites: 26, faults: 1 },
  { dong: "정왕4동", cameras: 159, sites: 27, faults: 0 },
  { dong: "배곧1동", cameras: 211, sites: 34, faults: 0 },
  { dong: "배곧2동", cameras: 158, sites: 25, faults: 0 },
  { dong: "과림동", cameras: 96, sites: 18, faults: 0 },
  { dong: "연성동", cameras: 142, sites: 24, faults: 1 },
  { dong: "장곡동", cameras: 138, sites: 23, faults: 0 },
  { dong: "능곡동", cameras: 121, sites: 21, faults: 0 },
  { dong: "거북섬동", cameras: 113, sites: 19, faults: 0 },
];

/* ---------- 용도별 설치 분류 (합계 = 총 설치 대수) ---------- */
export interface PurposeStat {
  purpose: string;
  cameras: number;
}
export const purposeStats: PurposeStat[] = [
  { purpose: "방범·생활안전", cameras: 1940 },
  { purpose: "어린이보호구역", cameras: 742 },
  { purpose: "교통·불법주정차", cameras: 458 },
  { purpose: "재난·하천감시", cameras: 180 },
];

/* ---------- 연도별 신규 설치 현황 (누적 = 총 설치 대수) ---------- */
export const yearStats: YearStat[] = [
  { year: 2018, installed: 286 },
  { year: 2019, installed: 342 },
  { year: 2020, installed: 388 },
  { year: 2021, installed: 451 },
  { year: 2022, installed: 506 },
  { year: 2023, installed: 538 },
  { year: 2024, installed: 472 },
  { year: 2025, installed: 337 },
];

/* ---------- 일일 장애 접수 현황 ---------- */
export const faultRecords: FaultRecord[] = [
  { id: "F-2606-031", cctvId: "SH-2003", dong: "신현동", type: "영상 송출 끊김", reportedAt: "08:12", severity: "긴급", status: "출동", assignee: "1반 김유지" },
  { id: "F-2606-032", cctvId: "SH-2006", dong: "목감동", type: "전원 불안정", reportedAt: "09:40", severity: "긴급", status: "접수", assignee: "2반 박정비" },
  { id: "F-2606-033", cctvId: "SH-2012", dong: "정왕3동", type: "렌즈 흐림/결로", reportedAt: "10:55", severity: "주의", status: "처리중", assignee: "1반 이순찰" },
  { id: "F-2606-034", cctvId: "SH-2017", dong: "연성동", type: "네트워크 지연", reportedAt: "13:05", severity: "주의", status: "처리중", assignee: "3반 정통신" },
  { id: "F-2606-035", cctvId: "SH-2014", dong: "배곧1동", type: "회전 모터 오작동", reportedAt: "14:20", severity: "경미", status: "완료", assignee: "3반 최보수" },
];

/* ---------- 점검 이력 (상세페이지용 데모) ---------- */
export interface MaintenanceLog {
  date: string;
  action: string;
  worker: string;
  result: "정상" | "부품교체" | "재설정" | "현장점검";
}

/** 관리번호별 점검 이력 — 데모용 표본 데이터 */
export function getMaintenanceHistory(id: string): MaintenanceLog[] {
  return [
    { date: "2026-05-28", action: "정기 점검 및 렌즈 청소", worker: "유지보수 1반", result: "정상" },
    { date: "2026-03-14", action: "영상저장장치(NVR) 펌웨어 업데이트", worker: "관제센터", result: "재설정" },
    { date: "2025-11-02", action: "전원 어댑터 교체", worker: "유지보수 2반", result: "부품교체" },
    { date: "2025-08-19", action: `설치 상태 현장 확인 (${id})`, worker: "현장 점검반", result: "현장점검" },
  ];
}

/* ---------- 집계 헬퍼 ---------- */
export const totals = {
  cameras: dongStats.reduce((s, d) => s + d.cameras, 0),
  sites: dongStats.reduce((s, d) => s + d.sites, 0),
  dongs: dongStats.length,
  faultsToday: faultRecords.length,
  faultsOpen: faultRecords.filter((f) => f.status !== "완료").length,
  faultsClosed: faultRecords.filter((f) => f.status === "완료").length,
};

/** 가동률(%) = (전체 - 장애) / 전체 */
export const uptimeRate = (() => {
  const faults = dongStats.reduce((s, d) => s + d.faults, 0);
  return (((totals.cameras - faults) / totals.cameras) * 100).toFixed(2);
})();

/** 관리번호로 CCTV 조회 */
export function getCctvById(id: string): CctvPin | undefined {
  return cctvPins.find((p) => p.id === id);
}
