import React from 'react';

interface Stat {
  value: string;
  label: string;
}

const defaultStats: Stat[] = [
  { value: '15', label: 'Built-in features' },
  { value: 'Free', label: 'No credit card required' },
  { value: '< 10 min', label: 'With the setup wizard' },
  { value: '6+', label: 'Plugins replaced' },
];

export function StatsBar() {
  return (
    <div className="stats-bar">
      {defaultStats.map((stat) => (
        <div key={stat.label} className="stats-bar__item">
          <span className="stats-bar__value">{stat.value}</span>
          <span className="stats-bar__label">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
