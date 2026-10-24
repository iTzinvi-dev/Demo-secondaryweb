import React from 'react';

interface PetalConfig {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
  color: string;
  initialRotate: number;
}

const PETAL_CONFIGS: PetalConfig[] = [
  { id: 1, left: 6, duration: 14, delay: 0, size: 14, color: '#DFC7CD', initialRotate: 12 },
  { id: 2, left: 14, duration: 18, delay: 4.5, size: 11, color: '#CEC2DC', initialRotate: -24 },
  { id: 3, left: 23, duration: 13, delay: 8, size: 16, color: '#E5D6D8', initialRotate: 45 },
  { id: 4, left: 32, duration: 16, delay: 2, size: 12, color: '#D5C9E0', initialRotate: -15 },
  { id: 5, left: 42, duration: 15, delay: 10, size: 15, color: '#E8D4D6', initialRotate: 30 },
  { id: 6, left: 51, duration: 19, delay: 6, size: 10, color: '#CEC2DC', initialRotate: -35 },
  { id: 7, left: 59, duration: 13.5, delay: 1, size: 17, color: '#DFC7CD', initialRotate: 20 },
  { id: 8, left: 68, duration: 17, delay: 7.5, size: 13, color: '#DED3E8', initialRotate: -10 },
  { id: 9, left: 77, duration: 14.5, delay: 3, size: 15, color: '#E5D6D8', initialRotate: 40 },
  { id: 10, left: 86, duration: 16.5, delay: 11, size: 12, color: '#CEC2DC', initialRotate: -25 },
  { id: 11, left: 93, duration: 15, delay: 5, size: 14, color: '#DFC7CD', initialRotate: 18 },
  { id: 12, left: 18, duration: 20, delay: 12, size: 11, color: '#E8D4D6', initialRotate: -40 },
  { id: 13, left: 47, duration: 17.5, delay: 13.5, size: 13, color: '#CEC2DC', initialRotate: 28 },
  { id: 14, left: 73, duration: 18.5, delay: 9.5, size: 12, color: '#DFC7CD', initialRotate: -18 },
];

export const PetalBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden"
    >
      {PETAL_CONFIGS.map((petal) => (
        <div
          key={petal.id}
          className="absolute top-0 will-change-transform"
          style={{
            left: `${petal.left}%`,
            animationName: 'petalDrift',
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.4}
            viewBox="0 0 24 32"
            fill="none"
            style={{ transform: `rotate(${petal.initialRotate}deg)` }}
            className="drop-shadow-xs"
          >
            {/* Minimalist delicate curved petal silhouette */}
            <path
              d="M12 2 C18 10, 22 20, 16 28 C11 34, 4 30, 3 22 C2 14, 7 5, 12 2 Z"
              fill={petal.color}
              fillOpacity="0.55"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};
