import React from "react";

import './error.css';

const Error = ({msg}) => {
  return (
    <div className="card error-wrapper">
      <div className="card-body error-body">
        <span>{msg}</span>
      </div>
    </div>
  )
};

export default Error;