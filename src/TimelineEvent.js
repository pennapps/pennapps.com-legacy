import React, { Component } from 'react';
import  { Link, Element } from 'react-scroll';

const LINK_OFFSET = -175;
const SCROLL_DURATION = 1000;

class TimelineEvent extends Component {
  static propTypes = {
    date: React.PropTypes.string.isRequired,
    num: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    eventName: React.PropTypes.string.isRequired,
    eventSelectionCallback: React.PropTypes.func.isRequired,
  }

  render() {
    return (
        <Element id={this.props.eventName + '-timeline'}
          className="timeline-event">
          <div className="date">{this.props.date}</div>
          <Link
            id={this.props.eventName + '-timeline-contents'}
            to={this.props.eventName + '-header'}
            activeClass="active"
            offset={LINK_OFFSET}
            spy={true}
            duration={SCROLL_DURATION}
            smooth={true}
            isDynamic={true}
            onClick={
              this.props.eventSelectionCallback.bind(this, this.props.eventName)
            }>
            <div className="event-wrapper">
              <span className="event">PENNAPPS</span>
              <span className="eventnum"> {this.props.num}</span>
              <span className="description">{this.props.description}</span>
            </div>
          </Link>
        </Element>
    );
  }
}

export default TimelineEvent;
