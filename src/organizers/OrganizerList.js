import React, { Component } from "react";
import Organizer from "./Organizer.js";

import organizers from "../data/organizers.json";

const DIRECTOR = "Director";
const BOARD = "Board";

var isDirector = (person, event) => person.events[event].includes(DIRECTOR);
var isBoard = (person, event) => person.events[event] === BOARD;

class OrganizerList extends Component {
  static propTypes = {
    event: React.PropTypes.string.isRequired,
    showAll: React.PropTypes.bool, // true on mobile
    showAny: React.PropTypes.bool.isRequired
  };

  state = {
    // Which event currently being viewed
    event: this.props.event,
    // Should be true on mobile
    showAll: this.props.showAll
  };

  componentWillReceiveProps(props) {
    this.setState({
      event: props.event,
      showAll: props.showAll
    });
  }

  generateOrganizerComps() {
    let relevantOrganizers = [];
    // Filter by event
    organizers.forEach((organizer, i) => {
      if (
        this.state.showAll || // show all organizers, mobile
        Object.keys(organizer.events).includes(this.state.event)
      ) {
        relevantOrganizers.push(organizer);
      }
    });

    // on mobile, sort descending year, then alphabetical
    if (this.state.showAll) {
      relevantOrganizers = relevantOrganizers
        .sort((a, b) => {
          return a.name > b.name ? 1 : -1;
        })
        .sort((a, b) => {
          let aEvents = Object.keys(a.events);
          let bEvents = Object.keys(b.events);
          return parseInt(aEvents[aEvents.length - 1].substring(0, 4), 10) >
            parseInt(bEvents[bEvents.length - 1].substring(0, 4), 10)
            ? -1
            : 1;
        });
      // on larger devices, only show current event sorted by position
    } else {
      // Sort by role
      var e = this.state.event;
      relevantOrganizers = relevantOrganizers.sort((a, b) => {
        if (isDirector(a, e) && isBoard(b, e)) {
          return -1;
        }
        if (isBoard(a, e) && isDirector(b, e)) {
          return 1;
        }
        // Other role case
        if (
          (isDirector(a, e) || isBoard(a, e)) &&
          (!isDirector(b, e) && !isBoard(b, e))
        ) {
          return -1;
        }
        if (
          (isDirector(b, e) || isBoard(b, e)) &&
          (!isDirector(a, e) && !isBoard(a, e))
        ) {
          return 1;
        }
        if (a.events[e] === "Director" && b.events[e] === "Vice-Director") {
          return -1;
        }
        if (b.events[e] === "Director" && a.events[e] === "Vice-Director") {
          return 1;
        }
        return 0;
      });
    }

    // Generate comps
    return relevantOrganizers.map((organizer, i) => {
      return (
        <Organizer
          event={this.state.event}
          showDesc={this.state.showAll}
          key={i}
          {...organizer}
        />
      );
    });
  }

  render() {
    let organizerComps = null;
    let header = null;
    if (
      this.props.showAny &&
      !!this.props.event &&
      this.props.events.hasOwnProperty(this.props.event)
    ) {
      organizerComps = this.generateOrganizerComps();
      header = <h2>{this.props.events[this.props.event].full}</h2>;
    }
    if (this.props.showAll) {
      organizerComps = this.generateOrganizerComps();
      header = <h2>Organizers</h2>;
    }
    return (
      <div className="organizers">
        {header}
        {organizerComps}
      </div>
    );
  }
}

export default OrganizerList;
