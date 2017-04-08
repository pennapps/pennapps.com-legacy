import React, { Component } from 'react';
import organizers from '../../scraper/organizers.json'

class OrganizerList extends Component {
  static propTypes = {
    event: React.PropTypes.string.isRequired
  }

  state = {
    event: this.props.event
  }

  constructor(props) {

  }

  componentWillReceiveProps(props) {
    this.setState({ event: props.event });
  }

  generateOrganizerComps() {
    let organizerComps = [];

    organizers.forEach((organizer) => {
      if (organizer.events.includes(this.state.event)) {

      }
    });

    return organizerComps;
  }

  sortOrganizers(organizerCollection) {
    
  }

  render() {



    return (
      <div>

      </div>
    );
  }
}
