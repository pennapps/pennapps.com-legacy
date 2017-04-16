import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import HistoryEvent from './HistoryEvent';

var sortEvents = (a, b) => {
  let diff = Number(a.substring(0, 4)) - Number(b.substring(0, 4));
  return (diff > 0) ? 1 : (diff < 0) ? -1 : b.charCodeAt(4) - a.charCodeAt(4);
};

class History extends Component {
  static propTypes = {
    eventViewCallback: React.PropTypes.func.isRequired,
    event: React.PropTypes.string.isRequired,
    events: React.PropTypes.object.isRequired,
    lockScrollListeners: React.PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);

    let eventVisibilities = {}
    Object.keys(this.props.events).forEach(e => eventVisibilities[e] = false);
    this.state = eventVisibilities;

    this.shouldComponentUpdate =
      PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  visibilityChangeCallback(event) {
    if (!this.props.lockScrollListeners) {

      let eventName = Object.keys(event)[0];
      this.setState({ [eventName]: event[eventName] }, () => {
        // Take the lowest viewable event
        let sorted = Object.keys(this.state)
          .filter(k => this.state[k])
          .sort(sortEvents);
        if (sorted.length > 0) {
          this.props.eventViewCallback(sorted[0]);
        }
      });
    }
  }

  render() {
    // Only load data for up to one beyond the current event
    let eventList = Object.keys(this.props.events).sort(sortEvents).reverse();
    let eventsToLoad = eventList;
    // TODO: replace for infinite scroll
    // let eventsToLoad = eventList.slice(0, eventList.indexOf(this.props.event) + 2);
    return (
      <div className="history" id="history">
        <h2>History</h2>
        {eventsToLoad.map((eventName, i) => {
          return (
            <HistoryEvent
              key={eventName}
              eventName={eventName}
              fullName={this.props.events[eventName].full}
              longHTML={this.props.events[eventName].longHTML}
              link={this.props.events[eventName].link}
              visibilityChangeCallback={
                this.visibilityChangeCallback.bind(this)
              }
            />
          );
        })}
      </div>
    );
  }
}

export default History;
