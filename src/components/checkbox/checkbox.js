import React from "react";

import './checkbox.css';

const Checkbox = ({isActive}) => {
  if (isActive) {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="19" height="19" rx="1.5" stroke="#2196F3"/>
        <path style={{display: 'block'}} d="M8.28571 14L4 10.1612L5.20857 9.0787L8.28571 11.8273L14.7914 6L16 7.09021L8.28571 14Z" fill="#2196F3"/>
      </svg>
    )
  }
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="19" height="19" rx="1.5" stroke="#9ABBCE"/>
    </svg>
  )
}

export default Checkbox;