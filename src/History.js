import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import HistoryEvent from './HistoryEvent'
import events from '../data/events.json';

class History extends Component {
  static propTypes = {
    eventViewCallback: React.PropTypes.func.isRequired,
    event: React.PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    let eventVisibilities = {}
    Object.keys(events).forEach(e => eventVisibilities[e] = false);
    this.state = eventVisibilities;

    this.shouldComponentUpdate =
      PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  visibilityChangeCallback(event) {
    let eventName = Object.keys(event)[0];
    this.setState({ [eventName]: event[eventName] });
  }

  componentDidUpdate() {
    let ordered = Object.keys(this.state)
      .filter(e => this.state[e])
      .sort((a, b) => {
        let diff = Number(a.substring(0, 4)) - Number(b.substring(0, 4));
        return (diff > 0) ? -1 : (diff < 0) ? 1 : b.charAt(4) - a.charAt(4);
      });
    if (ordered[0] !== this.props.event) {
      this.props.eventViewCallback(ordered[0]);
    }
  }

  render() {
    return (
      <div className="history">
        <h2>History</h2>
        {Object.keys(events).map((eventName, i) => {
          return (
            <HistoryEvent
              key={eventName}
              eventName={eventName}
              fullName={events[eventName].full}
              longHTML={events[eventName].longHTML}
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
