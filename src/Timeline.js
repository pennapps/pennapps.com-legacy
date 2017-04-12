import React, { Component } from 'react';
import TimelineEvent from './TimelineEvent'
import events from '../data/events.json';
import { Element } from 'react-scroll';

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animating: true,
      curr : 0
    }
  }

  animate (el) {
    var el2 = document.getElementsByClassName("active");
    this.setState({curr: el.scrollLeft});

    // stop scrolling if hovering over timeline
    if (this.props.noScroll || el.querySelector(':hover') || el.parentNode.querySelector(':hover') === el) {
      return;
    }

    // stop automatic scroll once user starts browsing
    if (el2[0] && this.state.animating) {
      this.setState({animating : false});
    }

    // scroll to section user is currently watching, or idle animate scroll on landing page
    if (el2[0] && el2[0].offsetLeft > this.state.curr) {
      this.setState({curr: this.state.curr + (el2[0].offsetLeft + 350 - this.state.curr)/1000});
      el.scrollLeft += (el2[0].offsetLeft + 350 - this.state.curr)/1000;
    } else if (el2[0]) {
      this.setState({curr: this.state.curr + (el2[0].offsetLeft - 350 - this.state.curr)/1000});
      el.scrollLeft += (el2[0].offsetLeft - 350 - this.state.curr)/1000;
    } else if (this.state.animating) {
      this.setState({curr: this.state.curr + 1});
      el.scrollLeft += 1;
    }
  }

  componentDidMount () {
    var el = document.getElementById("timeline-scroll");
    setInterval(() => {this.animate(el)}, 10);
  }

  render() {
    return (
      <div className="timeline-wrapper">
        <Element className="scrollable" id="timeline-scroll">
          {Object.keys(events).reverse().map((eventName, i) => {
              let event = events[eventName];
              return (
                <TimelineEvent
                  key={eventName}
                  eventName={eventName}
                  date={event.full}
                  num={event.roman}
                  description={event.short}
                />);
          })}
        </Element>
      </div>
    );
  }
}

export default Timeline;
