const GRADIENTS = {
  "teal-blue": { css: "linear-gradient(90deg,#06b6d4,#3b82f6)" },
  "green-cyan": { css: "linear-gradient(90deg,#34d399,#06b6d4)" },
  "sunset": { css: "linear-gradient(90deg,#f97316,#ef4444,#a78bfa)" },
  "ocean": { css: "linear-gradient(90deg,#06b6d4,#0ea5a4,#3b82f6)" },
  "rose-gold": { css: "linear-gradient(90deg,#fb7185,#f59e0b,#ef4444)" },
};

function clampToPercent(n) {
  if (typeof n !== "number" || Number.isNaN(n) || !Number.isFinite(n)) return 0;
  if (n <= 0) return 0;
  if (n >= 100) return 100;
  return n;
}

export default function PillBubbleProgressWithMarkers({
  value = 50,
  segments = 5,
  showLabel = true,
  className = "",
  gradient = "teal-blue",
  levelMap = [
    { name: "Novice", max: 20 },
    { name: "Basic", max: 40 },
    { name: "Intermediate", max: 60 },
    { name: "Advanced", max: 80 },
    { name: "Expert", max: 100 },
  ],
}) {
  const pctRaw = clampToPercent(value);
  const pct = Math.round(pctRaw);

  // markers (positions between segments)
  const safeSegments = Math.max(1, Math.floor(segments));
  const markerPositions = Array.from({ length: Math.max(0, safeSegments - 1) }, (_, i) =>
    ((i + 1) / safeSegments) * 100
  );

  // Keep bubble from overflowing edges
  const bubbleLeft = Math.min(97, Math.max(3, pct));
  const chosenGradient = GRADIENTS[gradient]?.css || GRADIENTS["teal-blue"].css;

  // compute level label
  const levelLabel = (function getLevelName(v) {
    const val = clampToPercent(v);
    const found = levelMap.find((r) => val <= r.max);
    return found ? found.name : levelMap[levelMap.length - 1].name;
  })(pctRaw);

  return (
    <div className={`w-full ${className}`}>
      <div className="relative">
        {/* Track */}
        <div className="h-3 bg-neutral-200 rounded-full overflow-hidden relative">
          {/* Filled portion */}
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct} // screen readers get numeric value
            aria-label={`Progress ${pct} percent`}
            className="h-full rounded-full transition-all duration-600 ease-in-out"
            style={{ width: `${pct}%`, background: chosenGradient }}
          />

          {/* thin marker lines (visual markers every segment) */}
          <div className="absolute inset-0 pointer-events-none">
            {markerPositions.map((pos, idx) => (
              <div
                key={idx}
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: `${pos}%`,
                  top: "50%",
                  transform: "translate(-50%,-50%)",
                  width: "1px",
                  height: "70%",
                  backgroundColor: "rgba(0,0,0,0.08)",
                  borderRadius: "1px",
                }}
              />
            ))}
          </div>
        </div>

        {/* Floating bubble (always shown) */}
        <div
          className="absolute -top-7 transform -translate-x-1/2 px-2 py-1 text-xs font-semibold rounded-md text-white shadow-md"
          style={{
            left: `${bubbleLeft}%`,
            background: chosenGradient,
            whiteSpace: "nowrap",
            transition: "left 600ms ease",
            pointerEvents: "none",
          }}
        >
          {pct}%
        </div>
      </div>

      {/* label row below (no numeric percent) */}
      <div className="mt-2 flex items-center justify-start text-xs text-neutral-600">
        <span className="font-medium">{showLabel ? levelLabel : ""}</span>
      </div>
    </div>
  );
}








/*
const DEFAULT_LEVEL_MAP = [
  { name: "Novice", max: 20 },
  { name: "Basic", max: 40 },
  { name: "Intermediate", max: 60 },
  { name: "Advanced", max: 80 },
  { name: "Expert", max: 100 },
];

function clampToPercent(n) {
  if (typeof n !== "number" || Number.isNaN(n) || !Number.isFinite(n)) return 0;
  if (n <= 0) return 0;
  if (n >= 100) return 100;
  return n;
}

function getLevelName(value, levelMap = DEFAULT_LEVEL_MAP) {
  // finds first range where value <= max
  const v = clampToPercent(value);
  const found = levelMap.find((r) => v <= r.max);
  return found ? found.name : levelMap[levelMap.length - 1].name;
}

export default function PillBubbleProgressWithMarkers({
  value = 80,
  segments = 5,
  showLabel = true,
  className = "",
  levelMap = DEFAULT_LEVEL_MAP,
}) {
  // parse & clamp numeric value (your document guarantees a number, but we still clamp)
  const pctRaw = clampToPercent(value);
  const pct = Math.round(pctRaw); // displayed as integer %

  // marker positions (exclude 0% and 100%)
  const safeSegments = Math.max(1, Math.floor(segments));
  const markerPositions = Array.from({ length: Math.max(0, safeSegments - 1) }, (_, i) =>
    ((i + 1) / safeSegments) * 100
  );

  // bubble left position with small margins so it doesn't overflow
  const bubbleLeft = Math.min(97, Math.max(3, pct));

  // optional level label from mapping
  const levelLabel = getLevelName(pctRaw, levelMap);

  return (
    <div className={`w-full ${className}`}>
      <div className="relative">
        <div className="h-3 bg-neutral-200 rounded-full overflow-hidden relative">
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
            aria-label={`Progress ${pct} percent`}
            className="h-full rounded-full transition-all duration-600 ease-in-out"
            style={{
              width: `${pct}%`,
              background: "linear-gradient(90deg,#06b6d4,#3b82f6)",
            }}
          />
          <div className="absolute inset-0 pointer-events-none">
            {markerPositions.map((pos, idx) => (
              <div
                key={idx}
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: `${pos}%`,
                  top: "50%",
                  transform: "translate(-50%,-50%)",
                  width: "1px",
                  height: "70%", // marker height relative to track
                  backgroundColor: "rgba(0,0,0,0.08)",
                  borderRadius: "1px",
                }}
              />
            ))}
          </div>
        </div>


        <div
          className="absolute -top-7 transform -translate-x-1/2 px-2 py-1 text-xs font-semibold rounded-md text-white shadow-md"
          style={{
            left: `${bubbleLeft}%`,
            background: "linear-gradient(90deg,#06b6d4,#3b82f6)",
            whiteSpace: "nowrap",
            transition: "left 600ms ease",
            pointerEvents: "none",
          }}
        >
          {pct}%
        </div>
      </div>

 
      {showLabel && (
        <div className="mt-2 flex items-center justify-between text-xs text-neutral-600">
          <span className="font-medium">{levelLabel}</span>
          <span className="font-mono">{pct}%</span>
        </div>
      )}
    </div>
  );
}
*/