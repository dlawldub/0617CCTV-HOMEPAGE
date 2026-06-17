import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="page-shell">
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <span className={styles.brand}>
              시흥시 <strong>CCTV·관제</strong>
            </span>
            <p className={styles.tagline}>
              방범CCTV 유지보수 정보공유 플랫폼 · 관제센터 · 현장 점검반 공동 운영
            </p>
          </div>
          <div className={styles.cols}>
            <div className={styles.col}>
              <span className={styles.colTitle}>바로가기</span>
              <a href="/map">CCTV 지도</a>
              <a href="/install">설치 현황</a>
              <a href="/faults">장애 보고</a>
              <a href="/yearly">연도별 통계</a>
            </div>
            <div className={styles.col}>
              <span className={styles.colTitle}>운영</span>
              <a href="/faults">장애 신고</a>
              <a href="/districts">동별 현황</a>
              <a href="/">관제 안내</a>
            </div>
            <div className={styles.col}>
              <span className={styles.colTitle}>문의</span>
              <a href="/">통합관제센터 ☎ 1599-0000</a>
              <a href="/">긴급 야간상황실</a>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <span>© 2026 시흥시 통합관제센터. 데모용 화면입니다.</span>
          <span>데이터 기준 2026. 06. 17</span>
        </div>
      </div>
    </footer>
  );
}
