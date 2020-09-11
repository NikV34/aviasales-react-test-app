import React, { Component } from "react";

import './filter.css';

export default class Filter extends Component {

  state = {
    checkboxes: [null]
  }

  numbTitle(number, titles) {
    if (!number) {
      return "Без " + titles[2];
    } else {
      const cases = [2, 0, 1, 1, 1, 2];
      return number + ' ' + titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    };
  }

  render() {
    const { checkboxes } = this.props;

    const renderItems = checkboxes.map((item) => {
      const {key, content, isActive} = item;
      return (
        <div className="filter__checkbox-wrapper" key={key}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="19" height="19" rx="1.5" stroke={isActive? "#2196F3":"#9ABBCE"}/>
            <path style={{display: isActive ? 'block': 'none'}} d="M8.28571 14L4 10.1612L5.20857 9.0787L8.28571 11.8273L14.7914 6L16 7.09021L8.28571 14Z" fill="#2196F3"/>
          </svg>
          <input className={`${ isActive ? "checked" : ""} filter__checkbox`}
                 type="checkbox"
                 value=""
                 id={key}
                 onChange={() => {this.props.onChecked(key)}}
                 checked={isActive ? true : false}
          />
          <label className=" filter__checkbox-label" htmlFor={key}>{content === null ? 'Все' : this.numbTitle(content, ['пересадка',
            'пересадки',
            'пересадок'])}</label>
        </div>
      );
    });

    return (
      <div className="card filter-wrapper">
        <div className="card-body filter-body">
          <h5 className="card-title filter__title">Количество пересадок</h5>
          {renderItems}
        </div>
      </div>
    );
  };
};