"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Nav.module.css";

const links = [
  { label: "지도", href: "/map" },
  { label: "설치현황", href: "/install" },
  { label: "장애보고", href: "/faults" },
  { label: "동별현황", href: "/districts" },
  { label: "연도별통계", href: "/yearly" },
  { label: "게시판", href: "/board" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          <span className={styles.mark} aria-hidden>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#007afc" strokeWidth="2" />
              <circle cx="12" cy="12" r="3" fill="#007afc" />
            </svg>
          </span>
          <span className={styles.wordmark}>
            시흥시 <strong>CCTV·관제</strong>
          </span>
        </Link>

        <nav className={styles.links}>
          {links.map((l) => {
            const active =
              pathname === l.href ||
              (l.href === "/map" && pathname.startsWith("/cctv"));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`${styles.link} ${active ? styles.active : ""}`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.actions}>
          <button className="btn-icon" type="button">
            KO
          </button>
          <Link href="/map" className="btn-primary">
            실시간 관제
          </Link>
        </div>
      </div>
    </header>
  );
}
