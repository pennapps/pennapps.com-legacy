import React, { Component } from 'react';
import Organizer from './Organizer.js'

import organizers from '../../data/organizers.json'

const DIRECTOR = 'Director'
const BOARD = 'Board';

class OrganizerList extends Component {
  static propTypes = {
    event: React.PropTypes.string.isRequired,
    showAll: React.PropTypes.bool, // true on mobile
  }

  state = {
    // Which event currently being viewed
    event: this.props.event,
    // Should be true on mobile
    showAll: false
  }

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

    // Sort by role
    relevantOrganizers.sort((a, b) => {
      if (a === DIRECTOR && b === BOARD) {
        return 1;
      }
      if (a === BOARD && b === DIRECTOR) {
        return -1;
      }
      return 0;
    });

    // Generate comps
    return relevantOrganizers.map((organizer, i) => {
      return <Organizer key={i} {...organizer} />;
    });
  }

  render() {
    return (
      <div className="organizers">
        {this.generateOrganizerComps()}
      </div>
    );
  }
}

export default OrganizerList
