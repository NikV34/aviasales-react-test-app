import React from "react";

import './load-button.css';

const LoadButton = ({updateTicketList}) => {
  return (
    <button type="button"
            className='btn load-button'
            onClick={() => {updateTicketList()}}
    >ЗАГРУЗИТЬ ЕЩЕ</button>
  )
};

export default LoadButton;