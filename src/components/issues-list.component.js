import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Ticket = props => (
  <tr>
    <td>{props.ticket.username}</td>
    <td>{props.ticket.description}</td>
    <td>{props.ticket.duration}</td>
    <td>{props.ticket.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.ticket._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteTicket(props.ticket._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class IssuesList extends Component {
  constructor(props) {
    super(props);

    this.deleteTicket = this.deleteTicket.bind(this);

    this.state = { tickets: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/issues/")
      .then(response => {
        this.setState({ tickets: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteTicket(id) {
    axios.delete("http://localhost:5000/issues/" + id).then(response => {
      console.log(response.data);
    });

    this.setState({
      tickets: this.state.tickets.filter(el => el._id !== id)
    });
  }

  ticketList() {
    return this.state.tickets.map(currentticket => {
      return (
        <Ticket
          ticket={currentticket}
          deleteTicket={this.deleteTicket}
          key={currentticket._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Logged Ticket</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.ticketList()}</tbody>
        </table>
      </div>
    );
  }
}
