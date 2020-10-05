import React, {Component} from "react";

import "./ticket-list.css";
import AviaApiService from "../../services/avia-api-service";
import LoadButton from "../load-button";
import Spinner from "../spinner/spinner";
import Ticket from "../ticket";
import Error from "../error";

export default class TicketList extends Component {

  ticketApi = new AviaApiService();

  state = {
    availableRequest: null,
    error: false,
    loading: true,
    searchId: null,
    ticketList: [],
  }

  componentDidMount() {
  this.ticketApi
    .getSearchId()
    .then((res) => {
      this.setState({
        searchId: res.searchId,
        error: false,
        loading: false
      });
      this.updateTicketList();
    })
    .catch(this.onError);
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
      availableRequest: true
    });
  };

  updateTicketList = () => {
    this.setState({ loading: true });
    this.ticketApi.getTickets(this.state.searchId)
      .then((data) => {
        this.setState(()=>{
          let newArray = [...this.state.ticketList];
          newArray.push(...data.tickets.slice(0, 5));
          return ({
            availableRequest: !data.stop,
            error: false,
            loading: false,
            ticketList: newArray
          })
        })
      })
      .catch(this.onError);
  }

  render() {
    const { fastestOption, filter } = this.props;
    const { availableRequest, ticketList, error, loading } = this.state;

    if (!fastestOption) {
      ticketList.sort((a, b) => a.price - b.price);
    } else {
      ticketList.sort((a, b) => a.segments[0].duration - b.segments[0].duration);
    }

    let filteredTicketList = ticketList;

    //применение фильтра, если не выбрано ВСЕ
    if (!filter.includes(null)) {
      filteredTicketList = ticketList.filter((ticket) => filter.includes(ticket.segments[0].stops.length));
    }

    const errorMessage = error ? <Error msg={"Ошибка сервера, загрузите еще"}/> : null;
    const spinner = loading ? <Spinner /> : null;
    const option = filter.length === 0 ? <div>Выберите количество пересадок</div> : null;
    const content = filteredTicketList.map((item) => <Ticket ticket={item}/>);
    const loadButton = availableRequest && filter.length !== 0 ? <LoadButton updateTicketList={this.updateTicketList}/> : null;

    return(
      <React.Fragment>
        {option}
        {content}
        {spinner}
        {errorMessage}
        {loadButton}
      </React.Fragment>
    );
  }
}