import React from "react";

import "./ticket.css";

const Ticket = ({ticket}) => {
  const {price, carrier} = ticket;

  const twoDigitsFormat = (value) => {
    return value > 9 ? value.toString() : '0' + value;
  }

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
    let start = numberText.length%3;
    let triad = start ? [numberText.slice(0, start)] : [];
    for (let i=0; i < Math.floor(numberText.length/3); i++) {
      triad.push(numberText.slice(start + i*3, start + i*3 + 3))
    }
    return triad.join(' ')
  }

  const transformSegment = (segment) => {
    return (<div className="row nopadding ticket__segment-wrapper" key={segment.origin + '-' + segment.destination}>
      <div className="col-4 nopadding">
        <p className="ticket__segment-label">{segment.origin + ' - ' + segment.destination}</p>
        <p className="ticket__segment-value">{timeFormat(segment.date) + ' - ' + timeFormat(arrivalDate(segment.date, segment.duration))}</p>
      </div>
      <div className="col-4 nopadding">
        <p className="ticket__segment-label">В ПУТИ</p>
        <p className="ticket__segment-value">{twoDigitsFormat(Math.floor(segment.duration/60)) + 'ч ' + twoDigitsFormat(segment.duration % 60) + 'м'}</p>
      </div>
      <div className="col-4 nopadding">
        <p className="ticket__segment-label">{segment.stops.length
          ? numbTitle(segment.stops.length, ['пересадка', 'пересадки','пересадок'])
          : 'Без пересадок'}
        </p>
        <p className="ticket__segment-value">{segment.stops.join(', ')}</p>
      </div>
    </div>)
  }

  let segmentList = [];
  for (let segment in ticket.segments) {
    segmentList.push(transformSegment(ticket.segments[segment]))
  }

  return (
    <div className="card ticket-wrapper">
      <div className="card-body ticket-body">
        <div className="row nopadding">
          <div className="col-8 nopadding ticket__price-wrapper">
            <p className="ticket__price-label">{numberSeparator(price)} Р</p>
          </div>
          <div className="col-4 nopadding">
            <img className="ticket__aviacompany-logo" src={`https://pics.avs.io/99/36/${carrier}.png`} alt="aviacompany-logo"/>
          </div>
        </div>
        {segmentList}
      </div>
    </div>
  )
};

export default Ticket;