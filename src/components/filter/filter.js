import React, { Component } from "react";

import Checkbox from '../checkbox';

import './filter.css';

export default class Filter extends Component {

  state = {
    checkboxes: [null]
  }

  numbTitle = (number, titles) => {
    //зависимость окончаний слов от числа
    if (!number) {
      return "Без " + titles[2];
    } else {
      const cases = [2, 0, 1, 1, 1, 2];
      return number + ' ' + titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }
  }

  renderItems = (checkboxes, onChecked) => checkboxes.map(({ key, content, isActive }) => {
    const labelContent = content === null ? 'Все' : this.numbTitle(content, ['пересадка', 'пересадки', 'пересадок'])
    
    return (
      <div className="filter__checkbox-wrapper" key={key} onClick={() => onChecked(key)}>
        <Checkbox isActive={isActive} />
        <span className=" filter__checkbox-label" >{labelContent}</span>
      </div>
    );
  });

  render() {
    const { checkboxes, onChecked } = this.props
    
    return (
      <div className="card filter-wrapper">
        <div className="card-body filter-body">
          <h5 className="card-title filter__title">Количество пересадок</h5>
          {this.renderItems(checkboxes, onChecked)}
        </div>
      </div>
    );
  };
};