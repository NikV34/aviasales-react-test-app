import React from "react";

import './spinner.css';
import spinner from './spinner.svg';

const Spinner = () => {
  return (
    <div className="spinner-wrapper">
      <img className="spinner-img" src={spinner} alt="spinner"/>
    </div>
  )
}

export default Spinner;