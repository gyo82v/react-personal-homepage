// CircularProgressWithLabel.jsx
import React from "react";
// import { GRADIENTS } from "./gradients"; // optional shared import
const GRADIENTS = {
  "teal-blue": {
    css: "linear-gradient(90deg,#06b6d4,#3b82f6)",
    svgStops: [
      { offset: "0%", color: "#06b6d4" },
      { offset: "100%", color: "#3b82f6" },
    ],
  },
  "green-cyan": {
    css: "linear-gradient(90deg,#34d399,#06b6d4)",
    svgStops: [
      { offset: "0%", color: "#34d399" },
      { offset: "100%", color: "#06b6d4" },
    ],
  },
  "sunset": {
    css: "linear-gradient(90deg,#f97316,#ef4444,#a78bfa)",
    svgStops: [
      { offset: "0%", color: "#f97316" },
      { offset: "50%", color: "#ef4444" },
      { offset: "100%", color: "#a78bfa" },
    ],
  },
  "ocean": {
    css: "linear-gradient(90deg,#06b6d4,#0ea5a4,#3b82f6)",
    svgStops: [
      { offset: "0%", color: "#06b6d4" },
      { offset: "50%", color: "#0ea5a4" },
      { offset: "100%", color: "#3b82f6" },
    ],
  },
  "rose-gold": {
    css: "linear-gradient(90deg,#fb7185,#f59e0b,#ef4444)",
    svgStops: [
      { offset: "0%", color: "#fb7185" },
      { offset: "50%", color: "#f59e0b" },
      { offset: "100%", color: "#ef4444" },
    ],
  },
};

function clampToPercent(n) {
  if (typeof n !== "number" || Number.isNaN(n) || !Number.isFinite(n)) return 0;
  if (n <= 0) return 0;
  if (n >= 100) return 100;
  return n;
}

const DEFAULT_LEVEL_MAP = [
  { name: "Novice", max: 20 },
  { name: "Basic", max: 40 },
  { name: "Intermediate", max: 60 },
  { name: "Advanced", max: 80 },
  { name: "Expert", max: 100 },
];

function getLevelName(value, levelMap = DEFAULT_LEVEL_MAP) {
  const v = clampToPercent(value);
  const found = levelMap.find((r) => v <= r.max);
  return found ? found.name : levelMap[levelMap.length - 1].name;
}

export default function CircularProgressWithLabel({
  value = 50,
  size = 96,
  stroke = 10,
  gradient = "teal-blue",
  showLabel = true,
  className = "",
  levelMap = DEFAULT_LEVEL_MAP,
}) {
  const pct = clampToPercent(value);
  const pctRounded = Math.round(pct);

  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - pct / 100);

  // unique id for SVG gradient
  const uid = (React.useId && React.useId()) || `id${Math.random().toString(36).slice(2, 9)}`;
  const gradId = `grad-${uid}`;

  const chosen = GRADIENTS[gradient] || GRADIENTS["teal-blue"];
  const levelLabel = getLevelName(pct, levelMap);

  return (
    <div className={`inline-flex flex-col items-center ${className}`} style={{ width: size }}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          role="img"
          aria-hidden="false"
        >
          <defs>
            <linearGradient id={gradId} x1="0%" x2="100%">
              {chosen.svgStops.map((s, i) => (
                <stop key={i} offset={s.offset} stopColor={s.color} />
              ))}
            </linearGradient>
          </defs>

          {/* background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
          />

          {/* progress arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={`url(#${gradId})`}
            strokeWidth={stroke}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{ transition: "stroke-dashoffset 700ms ease" }}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pctRounded}
            aria-label={`Progress ${pctRounded} percent`}
          />
        </svg>

        {/* percent inside the circle, centered absolutely */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <div className="text-sm font-medium text-neutral-700">{pctRounded}%</div>
        </div>
      </div>

      {/* level label below (outside the circle) */}
      {showLabel && (
        <div className="mt-2 text-center">
          <div className="text-sm font-medium text-neutral-700">{levelLabel}</div>
        </div>
      )}
    </div>
  );
}
