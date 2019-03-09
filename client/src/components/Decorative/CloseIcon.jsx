/* eslint-disable */
import React from 'react';

export default function CloseIcon({ size = 13, color = '#FFFFFF' }) {
  return (
    <div className="close-icon">
      <svg width={size} height={size} viewBox="0 0 13 13" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <line stroke={color} strokeWidth={2} x1="1" y1="1" x2="12" y2="12"/>
        <line stroke={color} strokeWidth={2} x1="12" y1="1" x2="1" y2="12"/>
      </svg>
    </div>
  );
}
