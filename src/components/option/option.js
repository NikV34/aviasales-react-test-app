import React, {Component} from "react";

import "./option.css";

export default class Option extends Component {

  render() {
    const {fastestOption} = this.props;
    const fastestButtonClass = fastestOption ? 'btn btn-lg button-primary': 'btn btn-lg button-secondary';
    const cheapestButtonClass = fastestOption ? 'btn btn-lg button-secondary': 'btn btn-lg button-primary';

    return (
      <div className="btn-group option-wrapper" role="group">
        <button type="button"
                className={cheapestButtonClass}
                onClick={()=>{this.props.onToggleOption(false)}}>САМЫЙ ДЕШЕВЫЙ </button>
        <button type="button"
                className={fastestButtonClass}
                onClick={()=>{this.props.onToggleOption(true)}}>САМЫЙ БЫСТРЫЙ</button>
      </div>
    );
  }
};