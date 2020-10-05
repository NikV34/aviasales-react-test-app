import React from "react";

import "./ticket.css";

const Ticket = ({ticket}) => {
  const {price, carrier} = ticket;

  //"9" to "09"
  const twoDigitsFormat = (value) => {
    return value > 9 ? value.toString() : '0' + value;
  }
  
  // number to 10:25 
  const timeFormat = (value) => {
    const date = new Date(value);
    let timeList = [
      date.getHours(),
      date.getMinutes()
    ];
    timeList.forEach((item, idx) => {
      timeList[idx] = twoDigitsFormat(item);
    })
    return (`${timeList[0]}:${timeList[1]}`)
  }

  const arrivalDate = (date, duration) => {
    const startDate = new Date(date);
    let finishDate = new Date();
    return finishDate.setMinutes(startDate.getMinutes() + duration);
  }

  const numbTitle = (number, titles) => {
    const cases = [2, 0, 1, 1, 1, 2];
    return number + ' ' + titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
  }

  const numberSeparator = (number) => {
    const numberText = number.toString();
    let start = numberText.length % 3;
    let triad = start ? [numberText.slice(0, start)] : [];
    for (let i=0; i < Math.floor(numberText.length / 3); i++) {
      triad.push(numberText.slice(start + i * 3, start + i * 3 + 3))
    }
    return triad.join(' ')
  }

  const renderSegment = (label, value) => {
    return (
      <div className="ticket__segment-body">
        <p className="ticket__segment-label">{label}</p>
        <p className="ticket__segment-value">{value}</p>
      </div>
    )
  }

  const transformSegment = ({ origin, destination, date, duration, stops }) => {
    const stopsLabel= stops.length ? numbTitle(stops.length, ['пересадка', 'пересадки','пересадок']) : 'Без пересадок';

    return (
      <div className="ticket__segment-wrapper" key={ origin + '-' + destination }>
        {[
          renderSegment(`${origin} - ${destination}`, `${timeFormat(date)} - ${timeFormat(arrivalDate(date, duration))}`),
          renderSegment("В ПУТИ", `${twoDigitsFormat(Math.floor(duration/60))}ч ${twoDigitsFormat(duration % 60)}м`),
          renderSegment(stopsLabel, stops.join(', '))
        ]}
      </div>
    )
  }

  let segmentList = ticket.segments.map(segment => transformSegment(segment))

  return (
    <div className="card ticket-wrapper">
      <div className="card-body ticket-body">
        <div className="ticket__header-wrapper">
          <div className="ticket__price-wrapper">
            <p className="ticket__price-label">{numberSeparator(price)} Р</p>
          </div>
          <div className="ticket__aviacompany-wrapper">
            <img className="ticket__aviacompany-logo" src={`https://pics.avs.io/99/36/${carrier}.png`} alt="aviacompany-logo"/>
          </div>
        </div>
        {segmentList}
      </div>
    </div>
  )
};

export default Ticket;