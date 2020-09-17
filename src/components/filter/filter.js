import React, { Component } from "react";

import Checkbox from '../checkbox';

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
    }
  }

  render() {
    const { checkboxes } = this.props;

    const renderItems = checkboxes.map((item) => {
      const {key, content, isActive} = item;
      const labelContent = content === null ? 'Все' : this.numbTitle(content, ['пересадка', 'пересадки', 'пересадок'])
      return (
        <div className="filter__checkbox-wrapper" key={key}>
          <Checkbox isActive={isActive}/>
          <input className="filter__checkbox"
                 type="checkbox"
                 id={key}
                 onChange={() => {this.props.onChecked(key)}}
          />
          <label className=" filter__checkbox-label" htmlFor={key}>{labelContent}</label>
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