// SegmentedLevelProgress.jsx
import React from "react";

const LEVEL_TO_VALUE = {
  low: 20,
  fair: 40,
  medium: 60,
  high: 80,
  expert: 100,
};

function clamp(v){ return Math.max(0, Math.min(100, Number(v)||0)); }

export default function SegmentedLevelProgress({ value, level, segments = 5, className = "" }) {
  // accept either numeric value or level string
  let v = (typeof level === "string") ? (LEVEL_TO_VALUE[level.toLowerCase()] ?? 0) : clamp(value || 0);
  v = clamp(v);
  const activeSegments = Math.round((v / 100) * segments);

  return (
    <div className={`w-full ${className}`}>
      <div className="flex gap-2">
        {Array.from({ length: segments }).map((_, i) => {
          const active = i < activeSegments;
          return (
            <div
              key={i}
              className={`flex-1 h-3 rounded ${active ? "bg-emerald-500" : "bg-neutral-200"}`}
              aria-hidden
            />
          );
        })}
      </div>
      <div className="mt-2 flex items-center justify-between text-xs text-neutral-600">
        <span>{level ? level.toString().toUpperCase() : `${v}%`}</span>
        <span>{v}%</span>
      </div>
    </div>
  );
}
