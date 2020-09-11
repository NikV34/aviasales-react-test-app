import React, {Component} from "react";

import './app.css';
import logo from './site-logo.svg';
import Filter from "../filter";
import Option from "../option";
import TicketList from "../ticket-list";

export default class App extends Component {
  state = {
    checkboxes: [
      {key: 'all', content: null, isActive: true},
      {key: 'without', content: 0, isActive: true},
      {key: 'one', content: 1, isActive: true},
      {key: 'two', content: 2, isActive: true},
      {key: 'three', content: 3, isActive: true}
    ],
    fastestOption: false
  };

  onChecked = (checkedKey) => {
    let newState = {checkboxes: []};
    const all = this.state.checkboxes.filter(item => item.key === 'all')[0];
    if (checkedKey === 'all') {
      for (let i of this.state.checkboxes) {
        let {key, content, isActive} = i;
        isActive = !all.isActive;
        newState.checkboxes.push({key, content, isActive});
      }
      this.setState(newState);
      return
    } else {
      for (let i of this.state.checkboxes) {
        let {key, content, isActive} = i;
        switch (key) {
          case checkedKey:
            isActive = !isActive;
            newState.checkboxes.push({key, content, isActive});
            break;
          case 'all':
            all.isActive = false;
            newState.checkboxes.push(all);
            break;
          default:
            newState.checkboxes.push({key, content, isActive});
        }
      }
    }
    this.setState(newState);
  };

  onToggleOption = (status) => {
    this.setState(() => {
      return ({fastestOption: status})
    });
  }

  render() {
    const {checkboxes, fastestOption} = this.state
    // eslint-disable-next-line array-callback-return
    let filter = checkboxes.map(({ content, isActive }) => {if (isActive) {return content} else {}})
                           .filter(item => typeof item !== 'undefined');

    return (
      <div className="row">
        <div className="col-12 site-logo-wrapper">
          <img className="site-logo" src={logo} alt="logo"/>
        </div>
        <div className="col-md-5 col-12 nopadding">
          <Filter checkboxes={checkboxes} onChecked={this.onChecked} />
        </div>
        <div className="col-md-6 col-12 nopadding mob-padding">
          <Option fastestOption={fastestOption} onToggleOption={this.onToggleOption}/>
          <TicketList fastestOption={fastestOption} filter={filter}/>
        </div>
      </div>
    );
  };
};