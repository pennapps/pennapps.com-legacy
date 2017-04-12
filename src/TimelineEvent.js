import React, { Component } from 'react';
import { Link } from 'react-scroll';

class TimelineEvent extends Component {
  static propTypes = {
    date: React.PropTypes.string.isRequired,
    num: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    eventName: React.PropTypes.string.isRequired
  }

  render() {
    return (
        <td>
          <div className="timeline-bubble"></div>
          <div className="date">{this.props.date}</div>
          <Link 
            to={this.props.eventName + "-header"}
            activeClass="active"
            offset={-175}
            spy={true}
            duration={1000}
            smooth={true}>
            <div className="event-wrapper">
              <span className="event">PENNAPPS</span>
              <span className="eventnum"> {this.props.num}</span>
              <span className="description">{this.props.description}</span>
            </div>
          </Link>
        </td>
    )
  }
}

export default TimelineEvent;
