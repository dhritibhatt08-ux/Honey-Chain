import React from 'react';

export const SensorSparkline = ({
  data = [],
  dataKey = 'temp',
  color = '#D97706',
  unit = '°C',
  title = 'Sensor Trend',
  height = 140
}) => {
  if (!data || data.length === 0) return null;

  const values = data.map(d => d[dataKey] || 0);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const range = maxVal - minVal || 1;
  const padding = 15;
  const width = 360;
  const chartHeight = height - padding * 2;

  // Build points string
  const points = data.map((d, index) => {
    const x = (index / (data.length - 1)) * (width - padding * 2) + padding;
    const y = chartHeight - ((d[dataKey] - minVal) / range) * chartHeight + padding;
    return { x, y, val: d[dataKey], time: d.time };
  });

  const pathD = points.reduce((acc, curr, idx) => {
    return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
  }, '');

  // Closed path for subtle gradient fill
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  const gradientId = `grad-${dataKey}-${Math.random().toString(36).substr(2, 5)}`;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-chocolate-700 dark:text-chocolate-300">{title}</span>
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400">
          Latest: {values[values.length - 1]} {unit}
        </span>
      </div>

      <div className="relative w-full overflow-hidden rounded-lg bg-ivory-50 dark:bg-charcoal-800/50 p-1 border border-chocolate-200/50 dark:border-chocolate-800">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.28" />
              <stop offset="100%" stopColor={color} stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Area under curve */}
          <path d={areaD} fill={`url(#${gradientId})`} />

          {/* Line stroke */}
          <path
            d={pathD}
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points */}
          {points.map((p, i) => (
            <g key={i}>
              <circle
                cx={p.x}
                cy={p.y}
                r="3.5"
                fill="#FFFFFF"
                stroke={color}
                strokeWidth="2"
              />
            </g>
          ))}
        </svg>

        {/* X-axis labels */}
        <div className="flex justify-between px-2 pt-1 text-[10px] text-chocolate-500 dark:text-chocolate-400">
          {data.map((d, i) => (
            <span key={i}>{d.time}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
