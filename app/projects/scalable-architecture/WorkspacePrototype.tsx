"use client";
import { useEffect, useRef, useState } from "react";

const DEMO_W = 1440;
const DEMO_H = 900;

export function WorkspacePrototype() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.75);

  useEffect(() => {
    const obs = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / DEMO_W);
    });
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{
      borderRadius: 14, overflow: "hidden",
      border: "1px solid #e8e6e0",
      boxShadow: "0 1px 0 rgba(0,0,0,.02), 0 30px 60px -25px rgba(0,0,0,.18)",
      userSelect: "none",
    }}>
      {/* macOS browser chrome */}
      <div style={{
        display: "flex", alignItems: "center", gap: 7,
        padding: "10px 14px", background: "#ececec",
        borderBottom: "1px solid #dddad5",
      }}>
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ff6058", display: "block" }} />
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ffbe2f", display: "block" }} />
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#2aca44", display: "block" }} />
        <span style={{ flex: 1, marginLeft: 8, background: "#fff", borderRadius: 6, padding: "4px 10px", fontSize: 11, color: "#6b6b72" }}>
          art19.com
        </span>
      </div>

      {/* Scaled iframe viewport */}
      <div ref={containerRef} style={{
        position: "relative",
        width: "100%",
        aspectRatio: `${DEMO_W} / ${DEMO_H}`,
        overflow: "hidden",
        background: "#f4f5f7",
      }}>
        <iframe
          src="/demo/workspace-flow?autoplay=1"
          style={{
            width: DEMO_W,
            height: DEMO_H,
            border: "none",
            display: "block",
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}
