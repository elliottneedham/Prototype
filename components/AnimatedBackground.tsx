// components/AnimatedBackground.tsx
import React from 'react';

const iconNames = [
  'book.png',
  'pen.png',
  'hat.png',
  'globe.png',
  'art.png',
  'footy.png',
  'music.png',
  'pencil.png',
  'alarm.png' ,
  'science.png' ,
  'calculator.png' ,
];

const generateIcons = (columnIndex: number, repeat: number = 2) => {
  const icons = [];
  for (let r = 0; r < repeat; r++) {
    for (let i = 0; i < 30; i++) {
      const icon = iconNames[i % iconNames.length];
      icons.push(
        <img
          key={`${columnIndex}-${r}-${i}`}
          src={`/${icon}`}
          alt={icon}
          className="bg-icon"
        />
      );
    }
  }
  return icons;
};

const AnimatedBackground = () => {
  const columnCount = 12;
  return (
    <div className="floating-bg">
      {Array.from({ length: columnCount }).map((_, columnIndex) => (
        <div
          key={columnIndex}
          className={`floating-column-wrapper ${
            columnIndex % 2 === 0 ? 'up' : 'down'
          }`}
        >
          <div className="floating-column">
            {generateIcons(columnIndex)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnimatedBackground;