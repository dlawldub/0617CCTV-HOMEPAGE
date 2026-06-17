"use client";

import { useEffect, useRef } from "react";
import styles from "./MapView.module.css";
import type { CctvPin, CctvStatus } from "@/lib/data";

/** VWorld 인증키가 있으면 VWorld 배경지도, 없으면 공개 OpenStreetMap 사용 */
const VWORLD_KEY = process.env.NEXT_PUBLIC_VWORLD_KEY;

const STATUS_COLOR: Record<CctvStatus, string> = {
  정상: "#228a56",
  장애: "#e0584b",
  점검: "#d8a23a",
};

interface Props {
  pins: CctvPin[];
  center: { lat: number; lng: number };
  zoom?: number;
  /** 마커 팝업에 상세페이지 링크 노출 여부 */
  linkable?: boolean;
  height?: number;
}

function markerHtml(pin: CctvPin): string {
  const color = STATUS_COLOR[pin.status];
  return `
    <div style="transform:translate(-50%,-50%);display:inline-flex;align-items:center;gap:5px;
      background:rgba(14,16,18,0.92);border:1.5px solid ${color};color:#fff;
      font-family:'Plus Jakarta Sans','Pretendard',sans-serif;font-size:11px;font-weight:700;
      letter-spacing:0.2px;padding:3px 8px 3px 7px;border-radius:100px;white-space:nowrap;
      box-shadow:0 2px 7px rgba(0,0,0,0.5);cursor:pointer;">
      <span style="width:8px;height:8px;border-radius:50%;background:${color};box-shadow:0 0 0 2px rgba(255,255,255,0.15)"></span>${pin.id}
    </div>`;
}

function popupHtml(pin: CctvPin, linkable: boolean): string {
  const color = STATUS_COLOR[pin.status];
  const link = linkable
    ? `<a href="/cctv/${pin.id}" style="display:inline-block;margin-top:11px;color:#007afc;font-weight:700;font-size:13px;text-decoration:none;">상세 페이지 열기 →</a>`
    : "";
  return `
    <div style="min-width:196px;font-family:'Plus Jakarta Sans','Pretendard',sans-serif;">
      <div style="display:flex;align-items:center;gap:7px;">
        <span style="width:8px;height:8px;border-radius:50%;background:${color};"></span>
        <span style="font-size:11px;letter-spacing:0.5px;color:#566171;">${pin.id} · ${pin.status}</span>
      </div>
      <div style="font-size:15px;font-weight:700;color:#fff;margin-top:5px;">${pin.location}</div>
      <div style="font-size:12px;color:#a0aaba;margin-top:6px;">${pin.dong} · ${pin.type} · ${pin.installedYear}년 설치</div>
      ${link}
    </div>`;
}

export default function MapView({
  pins,
  center,
  zoom = 12,
  linkable = true,
  height = 560,
}: Props) {
  const elRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const layerRef = useRef<any>(null);
  const LRef = useRef<any>(null);

  // 지도 초기화 (1회)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const mod = await import("leaflet");
      const L = (mod as any).default ?? mod;
      if (cancelled || !elRef.current || mapRef.current) return;
      LRef.current = L;

      const map = L.map(elRef.current, {
        center: [center.lat, center.lng],
        zoom,
        scrollWheelZoom: true,
      });
      mapRef.current = map;

      if (VWORLD_KEY) {
        L.tileLayer(
          `https://api.vworld.kr/req/wmts/1.0.0/${VWORLD_KEY}/Base/{z}/{y}/{x}.png`,
          {
            maxZoom: 19,
            attribution:
              '&copy; <a href="https://www.vworld.kr">VWorld</a> · 국토교통부',
          }
        ).addTo(map);
      } else {
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
      }

      layerRef.current = L.layerGroup().addTo(map);
      renderMarkers();
    })();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 핀(마커) 갱신
  useEffect(() => {
    renderMarkers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pins, linkable]);

  function renderMarkers() {
    const L = LRef.current;
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!L || !map || !layer) return;

    layer.clearLayers();
    pins.forEach((pin) => {
      const icon = L.divIcon({
        className: styles.markerWrap,
        html: markerHtml(pin),
        iconSize: [0, 0],
        iconAnchor: [0, 0],
      });
      const marker = L.marker([pin.lat, pin.lng], {
        icon,
        zIndexOffset: pin.status === "장애" ? 1000 : 0,
      });
      marker.bindPopup(popupHtml(pin, linkable), { closeButton: true });
      marker.addTo(layer);
    });
  }

  return (
    <div className={styles.wrap} style={{ height }}>
      <div ref={elRef} className={styles.map} />
    </div>
  );
}
