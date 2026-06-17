# 시흥시 방범CCTV 유지보수 정보공유 플랫폼

방범CCTV의 위치·설치 현황·일일 장애 보고·동별/연도별 통계를 **메뉴별 페이지**로
나누어 제공하는 정보 공유 홈페이지입니다. 지도는 **키 없이 동작하는 공개 지도
(Leaflet + OpenStreetMap)** 를 사용하며, 디자인은 [`DESIGN.md`](DESIGN.md)의
Mapbox "Satellite console at midnight" 다크 테마를 적용했습니다.

## 페이지 구성 (라우트)

| 경로 | 내용 | 컴포넌트 |
|------|------|----------|
| `/` | 개요(핵심 지표) + 메뉴 카드 | `app/page.tsx`, `components/Hero.tsx`, `components/OverviewGrid.tsx` |
| `/map` | **CCTV 지도** + 목록 | `app/map/page.tsx`, `components/CctvMap.tsx`, `components/MapView.tsx` |
| `/install` | 설치 현황(수량·개소·용도별) | `app/install/page.tsx`, `components/InstallStatus.tsx` |
| `/faults` | 일일 장애 보고 | `app/faults/page.tsx`, `components/FaultReport.tsx` |
| `/districts` | 동별 설치 현황(20개 행정동) | `app/districts/page.tsx`, `components/DongStatus.tsx` |
| `/yearly` | 연도별 설치 통계(그래프) | `app/yearly/page.tsx`, `components/YearlyChart.tsx` |
| `/board` | **유지보수 게시판** (Supabase 저장) | `app/board/page.tsx`, `components/PostForm.tsx` |
| `/cctv/[id]` | 관리번호별 CCTV 상세 | `app/cctv/[id]/page.tsx` |

상단 네비게이션의 각 메뉴는 해당 **독립 페이지**로 이동하며(앵커 스크롤 방식이
아님), 현재 페이지가 강조 표시됩니다. 지도 페이지의 CCTV 목록/마커를 클릭하면
`/cctv/[관리번호]` 상세 페이지가 열립니다.

## 지도 (공개 지도, 키 불필요)

기본값으로 **OpenStreetMap** 타일을 사용하므로 별도 API 키 없이 즉시 표시됩니다.

선택적으로 **VWorld** 배경지도를 쓰려면 `.env.local`에 인증키를 설정하면 자동으로
전환됩니다 ([`.env.local.example`](.env.local.example) 참고):

```bash
NEXT_PUBLIC_VWORLD_KEY=발급받은_VWorld_인증키   # 미설정 시 OpenStreetMap 사용
```

## 게시판 데이터베이스 (Supabase)

`/board`의 게시글은 **Supabase**(Postgres)에 저장됩니다.

- 테이블: `public.posts` (id, category[공지/점검/장애/일반], title, content, author, dong, created_at)
- **RLS 활성화**: 공개 읽기(SELECT) + 공개 작성(INSERT) 정책. 인증은 사용하지
  않는 데모 구성이라 누구나 글을 쓸 수 있습니다(추후 Supabase Auth로 제한 가능).
- 클라이언트: `@supabase/supabase-js` + publishable(anon) 키 (`lib/supabase.ts`)

`.env.local` 설정 ([`.env.local.example`](.env.local.example) 참고):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<프로젝트ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_xxxxxxxx
```

## 기술 스택

- **Next.js 15** (App Router, 다중 라우트 + 동적 라우트) + **React 19** + **TypeScript**
- 데이터베이스: **Supabase** (Postgres, RLS) — 게시판 글 저장
- 지도: **Leaflet 1.9** + OpenStreetMap(기본) / VWorld(선택)
- 차트: 외부 라이브러리 없이 **순수 SVG**
- 디자인 토큰: `app/globals.css` CSS 변수

## 실행

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm start
```

## 데이터

데모 데이터(시흥시 20개 행정동 기준, 좌표 포함)는 `lib/data.ts`에 정의되어
있습니다. 모든 수치는 임의값이며, 실제 운영 시 이 모듈을 API/DB 연동으로 교체하면
됩니다.
