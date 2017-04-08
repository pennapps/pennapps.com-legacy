import React, { Component } from 'react';

class TimelineEvent extends Component {
  static propTypes = {
    date: React.PropTypes.string.isRequired,
    num: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
  }

  render() {
    return (
      <td>
        <div className="timeline-bubble"></div>
        <div className="date">{this.props.date}</div>
        <div className="event-wrapper">
          <span className="event">PENNAPPS</span>
          <span className="eventnum"> {this.props.num}</span>
          <span className="description">{this.props.description}</span>
        </div>
      </td>
    )
  }
}

export default TimelineEvent;
