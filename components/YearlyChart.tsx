"use client";

import { useState } from "react";
import styles from "./YearlyChart.module.css";
import { yearStats } from "@/lib/data";

// SVG 좌표계
const W = 920;
const H = 380;
const PAD = { top: 30, right: 16, bottom: 44, left: 48 };
const innerW = W - PAD.left - PAD.right;
const innerH = H - PAD.top - PAD.bottom;

export default function YearlyChart() {
  const [active, setActive] = useState<number>(yearStats.length - 1);

  const maxVal = Math.max(...yearStats.map((d) => d.installed));
  const yTop = Math.ceil(maxVal / 100) * 100;
  const total = yearStats.reduce((s, d) => s + d.installed, 0);

  // 누적 합계
  let running = 0;
  const cumulative = yearStats.map((d) => (running += d.installed));
  const maxCum = cumulative[cumulative.length - 1];

  const bandW = innerW / yearStats.length;
  const barW = bandW * 0.46;

  const x = (i: number) => PAD.left + bandW * i + bandW / 2;
  const yBar = (v: number) => PAD.top + innerH - (v / yTop) * innerH;
  const yCum = (v: number) => PAD.top + innerH - (v / maxCum) * innerH * 0.92;

  const gridLines = [0, 0.25, 0.5, 0.75, 1];

  const linePath = cumulative
    .map((v, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${yCum(v)}`)
    .join(" ");

  const activeDatum = yearStats[active];

  return (
    <section className="section" id="yearly">
      <div className="page-shell">
        <span className="section-label">YEARLY TREND · 연도별 통계</span>
        <h2 className="section-title">연도별 설치 현황</h2>
        <p className="section-desc">
          연도별 신규 설치 대수와 누적 설치 추세를 함께 보여줍니다. 막대에 마우스를
          올리면 상세 수치를 확인할 수 있습니다.
        </p>

        <div className={`card ${styles.card}`}>
          <div className={styles.head}>
            <div className={styles.legend}>
              <span className={styles.legendItem}>
                <span className={styles.swatchBar} />
                연도별 신규 설치
              </span>
              <span className={styles.legendItem}>
                <span className={styles.swatchLine} />
                누적 설치
              </span>
            </div>
            <div className={styles.readout}>
              <span className={styles.readoutYear}>{activeDatum.year}년</span>
              <span className={`${styles.readoutVal} mono`}>
                {activeDatum.installed.toLocaleString()}
                <em>대 신규</em>
              </span>
              <span className={`${styles.readoutCum} mono`}>
                누적 {cumulative[active].toLocaleString()}대
              </span>
            </div>
          </div>

          <svg
            viewBox={`0 0 ${W} ${H}`}
            className={styles.chart}
            role="img"
            aria-label="연도별 방범CCTV 설치 현황 그래프"
          >
            {/* 가로 격자 + Y축 라벨 */}
            {gridLines.map((g) => {
              const yy = PAD.top + innerH - g * innerH;
              return (
                <g key={g}>
                  <line
                    x1={PAD.left}
                    y1={yy}
                    x2={W - PAD.right}
                    y2={yy}
                    stroke="#1c1f24"
                    strokeWidth="1"
                  />
                  <text
                    x={PAD.left - 10}
                    y={yy + 4}
                    textAnchor="end"
                    className={styles.axisLabel}
                  >
                    {Math.round(g * yTop)}
                  </text>
                </g>
              );
            })}

            {/* 막대 */}
            {yearStats.map((d, i) => {
              const bx = x(i) - barW / 2;
              const by = yBar(d.installed);
              const bh = PAD.top + innerH - by;
              const isActive = i === active;
              return (
                <g
                  key={d.year}
                  onMouseEnter={() => setActive(i)}
                  className={styles.barGroup}
                >
                  {/* hover 영역 */}
                  <rect
                    x={PAD.left + bandW * i}
                    y={PAD.top}
                    width={bandW}
                    height={innerH}
                    fill="transparent"
                  />
                  <rect
                    x={bx}
                    y={by}
                    width={barW}
                    height={bh}
                    rx="5"
                    fill={isActive ? "var(--color-signal-blue)" : "#2c5f86"}
                    className={styles.bar}
                  />
                  {isActive && (
                    <text
                      x={x(i)}
                      y={by - 10}
                      textAnchor="middle"
                      className={styles.barValue}
                    >
                      {d.installed}
                    </text>
                  )}
                  <text
                    x={x(i)}
                    y={H - 16}
                    textAnchor="middle"
                    className={styles.xLabel}
                  >
                    {d.year}
                  </text>
                </g>
              );
            })}

            {/* 누적 추세선 */}
            <path
              d={linePath}
              fill="none"
              stroke="var(--color-map-green)"
              strokeWidth="2.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {cumulative.map((v, i) => (
              <circle
                key={i}
                cx={x(i)}
                cy={yCum(v)}
                r={i === active ? 5 : 3.5}
                fill="var(--color-void-black)"
                stroke="var(--color-map-green)"
                strokeWidth="2"
              />
            ))}
          </svg>

          <div className={styles.foot}>
            <div className={styles.footStat}>
              <span className={styles.footLabel}>누적 설치 총계</span>
              <span className={`${styles.footVal} mono`}>
                {total.toLocaleString()}대
              </span>
            </div>
            <div className={styles.footStat}>
              <span className={styles.footLabel}>연평균 설치</span>
              <span className={`${styles.footVal} mono`}>
                {Math.round(total / yearStats.length).toLocaleString()}대
              </span>
            </div>
            <div className={styles.footStat}>
              <span className={styles.footLabel}>최다 설치 연도</span>
              <span className={`${styles.footVal} mono`}>
                {yearStats.reduce((a, b) => (a.installed > b.installed ? a : b)).year}년
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
