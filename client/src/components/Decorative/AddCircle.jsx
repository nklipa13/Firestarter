import React from 'react';

export default function AddCircle(props) {
  return (
    <svg width={34} height={34} viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx={17} cy={17} r={16} fill="#FF613C" stroke="#FF613C" strokeWidth={2} />
      <path d="M16 16V10H19V16H25V19H19V25H16V19H10V16H16Z" fill="white" />
    </svg>
  );
}
